/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import algoliasearch from 'algoliasearch/lite'
import { Configure, InstantSearch } from 'react-instantsearch-dom'
import { useQuery } from 'react-apollo'

import {
  setSearchClient,
  setSearchingState,
  setQSIndex,
  setUpdateSearchState,
} from './Storage'
import GET_CONFIG from './graphql/getAlgoliaConfig.gql'

import './algolia.css'

interface InstantSearchProps {
  children: ReactNode
  indexName: string
  isInHeader: boolean
  resultsState?: any
  onSearchParameters?: any
  refresh?: boolean
  stalledSearchDelay?: number
  initialUiState: any
}

const createURL = function (state: any) {
  const url = new URLSearchParams(state).toString()

  return `?${url}`
}

interface SearchObject {
  [key: string]: any
}

function searchStateToUrl(
  location: any,
  searchState: any,
  isInHeader: boolean
) {
  if (Object.keys(searchState).length === 0) {
    return ''
  }

  const sourcePath = isInHeader ? '/algolia' : location.pathname

  console.log(`searchStateToURL(${isInHeader}) returning ${sourcePath}`)

  return `${sourcePath}${createURL(searchState)}`
}

const urlToSearchState = function (isInHeader: boolean) {
  const search: SearchObject = {}

  if (window?.location) {
    const searchParams = new URLSearchParams(window.location.search.slice(1))

    // Log the values

    searchParams.forEach(function (value: string, key: string) {
      search[key] = value
    })
  }

  console.log(
    `urlToSearchState(${isInHeader}) returning ${JSON.stringify(search)}`
  )

  return search
}

const AppInstantSearch: FC<InstantSearchProps> = ({
  children,
  indexName,
  isInHeader,
  resultsState,
  onSearchParameters,
  refresh,
  stalledSearchDelay,
}) => {
  const { data, loading } = useQuery(GET_CONFIG, { ssr: false })

  const [searchState, setSearchState] = useState(urlToSearchState(isInHeader))

  const updateSearchState = function (q: string) {
    console.log(`updateSearchState(${q}) in header: ${isInHeader}`)
    setSearchState(ss => ({
      ...ss,
      query: q,
    }))
    // eslint-disable-next-line vtex/prefer-early-return
    if (isInHeader) {
      // send my event
      const event = new MessageEvent('algoliaEvent', { data: q })

      window.dispatchEvent(event)

      window.location.href = `/algolia?query=${q}`
    }
  }

  if (!isInHeader) {
    window.addEventListener('algoliaEvent', ((event: MessageEvent) => {
      console.log(`addAlgoliaEvent, ${event.data}`, event)
      updateSearchState(event.data)
    }) as EventListener)
  }

  useEffect(() => {
    // clearTimeout(timerRef.current)

    setTimeout(() => {
      window.history.pushState(
        searchState,
        '',
        searchStateToUrl(window.location, searchState, isInHeader)
      )
    }, 400)
  }, [searchState, isInHeader])

  if (loading || !data) {
    return null
  }

  if (
    !data?.getAlgoliaConfigInfo?.applicationId ||
    !data?.getAlgoliaConfigInfo?.searchAPIKey
  ) {
    console.error('Algolia: missing credentials')

    return null
  }

  const searchClient = algoliasearch(
    data.getAlgoliaConfigInfo.applicationId,
    data.getAlgoliaConfigInfo.searchAPIKey
  )

  // used with Autocomplete
  setSearchClient(searchClient)
  setSearchingState(searchState)
  setQSIndex(data?.getAlgoliaConfigInfo?.querySuggestionsIndex)
  setUpdateSearchState(updateSearchState)

  return (
    <>
      <InstantSearch
        searchClient={searchClient}
        indexName={indexName ?? data?.getAlgoliaConfigInfo?.indexName}
        searchState={searchState}
        resultsState={resultsState}
        createURL={createURL}
        onSearchStateChange={setSearchState}
        onSearchParameters={onSearchParameters}
        refresh={refresh}
        stalledSearchDelay={stalledSearchDelay}
      >
        <Configure facetingAfterDistinct />
        {children}
      </InstantSearch>
    </>
  )
}

export default AppInstantSearch

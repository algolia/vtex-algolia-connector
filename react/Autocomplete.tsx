/* eslint-disable no-console */
/* eslint-disable react/jsx-no-bind */

import { autocomplete } from '@algolia/autocomplete-js'
import React, {
  createElement,
  Fragment,
  useEffect,
  useRef,
  useCallback,
} from 'react'
import type { FunctionComponent, ReactElement } from 'react'
import type { WrappedComponentProps } from 'react-intl'
import { render } from 'react-dom'
import { createLocalStorageRecentSearchesPlugin } from '@algolia/autocomplete-plugin-recent-searches'
import { createQuerySuggestionsPlugin } from '@algolia/autocomplete-plugin-query-suggestions'

import { getSearchClient, getQSIndex, getUpdateSearchState } from './Storage'

// import style from './algolia.css'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Autocomplete: FunctionComponent<WrappedComponentProps & any> = props => {
  const containerRef = useRef(null)
  const searchClient = getSearchClient()
  const updateSearchState = getUpdateSearchState()

  const recentSearchesPlugin = createLocalStorageRecentSearchesPlugin({
    key: 'instantsearch',
    limit: 5,
    transformSource({ source }) {
      return {
        ...source,
        onSelect({ item }) {
          console.log('recent searches item', item)
          updateSearchState(item.label)
        },
      }
    },
  })

  const querySuggestionsPlugin = createQuerySuggestionsPlugin({
    searchClient,
    indexName: getQSIndex(),
    getSearchParams({ state }) {
      return { hitsPerPage: state.query ? 5 : 10 }
    },
    transformSource({ source }) {
      return {
        ...source,
        onSelect({ item }) {
          console.log('QS item', item)
          updateSearchState(item.query)
        },
      }
    },
  })

  const onSubmit = useCallback(
    state => {
      updateSearchState(state.state.query)
    },
    [updateSearchState]
  )

  const onReset = useCallback(() => {
    updateSearchState('')
  }, [updateSearchState])

  useEffect(() => {
    if (!containerRef.current) {
      return undefined
    }

    const search = autocomplete({
      container: containerRef.current,
      renderer: { createElement, Fragment },
      plugins: [recentSearchesPlugin, querySuggestionsPlugin],
      render({ children }: { children: ReactElement }, root: HTMLElement) {
        render(children as ReactElement, root as HTMLElement)
      },
      onSubmit,
      onReset,
      onSelect: onSubmit,
      ...props,
    })

    return () => {
      search.destroy()
    }
  }, [props])

  return <div ref={containerRef} />
}

export default Autocomplete

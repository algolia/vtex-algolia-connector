import type { FC } from 'react'
import React, { useState } from 'react'
import { useMutation, useQuery } from 'react-apollo'
import type { WrappedComponentProps } from 'react-intl'
import { FormattedMessage, injectIntl } from 'react-intl'
import {
  Layout,
  PageHeader,
  Card,
  Button,
  Input,
  Divider,
} from 'vtex.styleguide'

import saveAlgoliaConfigGQL from './graphql/saveAlgoliaConfig.gql'
import getAlgoliaConfigGQL from './graphql/getAlgoliaConfig.gql'
import CatalogService from './CatalogService'
import type { AlgoliaConfigBinding } from '../node/resolvers/AlgoliaConfigInfoBinding'

interface DataMutation {
  config: AlgoliaConfigBinding
}

interface MutationResponse {
  saveAlgoliaConfigInfo: AlgoliaConfigBinding
}

const Admin: FC<WrappedComponentProps & any> = () => {
  /** Enable / Disable Full reindexing button  */
  const [disableIndexButton, setDisableIndexButton] = React.useState(false)

  /** Number of records indexed in Algolia during full (re)indexation */
  const [algoliaMessage, setAlgoliaMessage] = useState('')

  /** Used to display/hide the number of records indexed in Algolia during full (re)indexation */
  const [isCatalogShown, setCatalogShown] = useState(false)

  /** config state variable used to load/save the Algolia config properties */
  const [configObj, setConfig] = useState<AlgoliaConfigBinding>({
    applicationId: '',
    searchAPIKey: '',
    writeAPIKey: '',
    indexName: '',
    querySuggestionsIndex: '',
    fields: '',
    skuFields: '',
  })

  /** Loading the Algolia config properties from vbase when the page is loaded */
  useQuery(getAlgoliaConfigGQL, {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onCompleted: (loadedConfigObj: any) => {
      const appIdinput = document.querySelector('#appIdInput')

      if (
        appIdinput !== null &&
        loadedConfigObj.getAlgoliaConfigInfo !== null
      ) {
        Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          'value'
        )?.set?.call(
          appIdinput,
          loadedConfigObj.getAlgoliaConfigInfo.applicationId
        )
        appIdinput.dispatchEvent(new Event('change', { bubbles: true }))
      }

      const searchApiInput = document.querySelector('#searchApiInput')

      if (
        searchApiInput !== null &&
        loadedConfigObj.getAlgoliaConfigInfo !== null
      ) {
        Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          'value'
        )?.set?.call(
          searchApiInput,
          loadedConfigObj.getAlgoliaConfigInfo.searchAPIKey
        )
        searchApiInput.dispatchEvent(new Event('change', { bubbles: true }))
      }

      const writeApiInput = document.querySelector('#writeApiInput')

      if (
        writeApiInput !== null &&
        loadedConfigObj.getAlgoliaConfigInfo !== null
      ) {
        Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          'value'
        )?.set?.call(
          writeApiInput,
          loadedConfigObj.getAlgoliaConfigInfo.writeAPIKey
        )
        writeApiInput.dispatchEvent(new Event('change', { bubbles: true }))
      }

      const indexNameInput = document.querySelector('#indexNameInput')

      if (
        indexNameInput !== null &&
        loadedConfigObj.getAlgoliaConfigInfo !== null
      ) {
        Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          'value'
        )?.set?.call(
          indexNameInput,
          loadedConfigObj.getAlgoliaConfigInfo.indexName
        )
        indexNameInput.dispatchEvent(new Event('change', { bubbles: true }))
      }

      const querySuggestionsInput = document.querySelector(
        '#querySuggestionsInput'
      )

      if (
        querySuggestionsInput !== null &&
        loadedConfigObj.getAlgoliaConfigInfo !== null
      ) {
        Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          'value'
        )?.set?.call(
          querySuggestionsInput,
          loadedConfigObj.getAlgoliaConfigInfo.querySuggestionsIndex
        )
        querySuggestionsInput.dispatchEvent(
          new Event('change', { bubbles: true })
        )
      }

      const fieldsInput = document.querySelector('#fieldsInput')

      if (
        fieldsInput !== null &&
        loadedConfigObj.getAlgoliaConfigInfo !== null
      ) {
        Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          'value'
        )?.set?.call(fieldsInput, loadedConfigObj.getAlgoliaConfigInfo.fields)
        fieldsInput.dispatchEvent(new Event('change', { bubbles: true }))
      }

      const skuFieldsInput = document.querySelector('#skuFieldsInput')

      if (
        skuFieldsInput !== null &&
        loadedConfigObj.getAlgoliaConfigInfo !== null
      ) {
        Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          'value'
        )?.set?.call(
          skuFieldsInput,
          loadedConfigObj.getAlgoliaConfigInfo.skuFields
        )
        skuFieldsInput.dispatchEvent(new Event('change', { bubbles: true }))
      }
    },
  })

  /** Mutation declaration  */
  const [saveAlgoliaConfig, { loading: saving }] = useMutation<
    MutationResponse,
    DataMutation
  >(saveAlgoliaConfigGQL)

  /** Triggered when the admin user clicks on the "Full (Re)indexation" button */
  const onIndexActionClick = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setDisableIndexButton(true)
    setCatalogShown(true)
    setAlgoliaMessage('Starting indexing')
  }

  /** Triggered once the records are stored in Algolia */
  const dataIsSentToAlgolia = (nbRecordsSyncedwithAlgolia: number) => {
    setDisableIndexButton(false)
    setCatalogShown(false)
    setAlgoliaMessage(
      `${nbRecordsSyncedwithAlgolia} products indexed with Algolia`
    )
  }

  const algoliaMessageEvent = (message: string) => {
    setAlgoliaMessage(message)
  }

  /** Rendering the Module Admin Page  */
  return (
    <Layout
      pageHeader={
        <div className="flex justify-center">
          <div className="w-100 mw-reviews-header">
            <PageHeader title="Algolia Integration" />
          </div>
        </div>
      }
      fullWidth
    >
      <div className="bg-base pa8">
        <Card>
          <div className="flex">
            <div className="w-100">
              <p>
                <FormattedMessage id="admin/algolia.documentation.description" />{' '}
                <a
                  href="https://www.algolia.com/doc/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Official Documentation
                </a>
              </p>
            </div>
          </div>
        </Card>
        <br />
        <div>
          <Card>
            <div className="w-40">
              <div className="mb5">
                <Input
                  required
                  id="appIdInput"
                  label="Application ID"
                  onChange={(e: any) => {
                    e.persist()
                    setConfig((prevState: any) => {
                      return { ...prevState, applicationId: e?.target?.value }
                    })
                  }}
                />
              </div>
            </div>
            <div className="w-40">
              <div className="mb5">
                <Input
                  required
                  id="searchApiInput"
                  type="text"
                  label="Search API Key"
                  onChange={(e: any) => {
                    e.persist()
                    setConfig((prevState: any) => {
                      return { ...prevState, searchAPIKey: e?.target?.value }
                    })
                  }}
                />
              </div>
            </div>
            <div className="w-40">
              <div className="mb5">
                <Input
                  required
                  id="writeApiInput"
                  type="text"
                  label="Write API Key"
                  onChange={(e: any) => {
                    e.persist()
                    setConfig((prevState: any) => {
                      return { ...prevState, writeAPIKey: e?.target?.value }
                    })
                  }}
                />
              </div>
            </div>
            <div className="w-40">
              <div className="mb5">
                <Input
                  required
                  id="indexNameInput"
                  type="text"
                  label="Index Name"
                  onChange={(e: any) => {
                    e.persist()
                    setConfig((prevState: any) => {
                      return { ...prevState, indexName: e?.target?.value }
                    })
                  }}
                />
              </div>
            </div>
            <div className="w-40">
              <div className="mb5">
                <Input
                  required
                  id="querySuggestionsInput"
                  type="text"
                  label="Query Suggestions Index Name"
                  onChange={(e: any) => {
                    e.persist()
                    setConfig((prevState: any) => {
                      return {
                        ...prevState,
                        querySuggestionsIndex: e?.target?.value,
                      }
                    })
                  }}
                />
              </div>
            </div>
            <div className="w-40">
              <div className="mb5">
                <Input
                  required
                  id="fieldsInput"
                  type="text"
                  label="Fields Mapping"
                  onChange={(e: any) => {
                    e.persist()
                    setConfig((prevState: any) => {
                      return {
                        ...prevState,
                        fields: e?.target?.value,
                      }
                    })
                  }}
                />
              </div>
            </div>
            <div className="w-40">
              <div className="mb5">
                <Input
                  required
                  id="skuFieldsInput"
                  type="text"
                  label="SKU Fields Mapping"
                  onChange={(e: any) => {
                    e.persist()
                    setConfig((prevState: any) => {
                      return {
                        ...prevState,
                        skuFields: e?.target?.value,
                      }
                    })
                  }}
                />
              </div>
            </div>
            <div>
              <div className="mb4 flex justify-between">
                <Button
                  variation="primary"
                  disabled={saving}
                  onClick={() => {
                    saveAlgoliaConfig({ variables: { config: configObj } })
                  }}
                >
                  Save
                </Button>
              </div>
            </div>
          </Card>
        </div>
        <br />
        <Card>
          <div className="flex">
            <div className="w-70">
              <p>
                <FormattedMessage id="admin/algolia.reindex.description" />
              </p>
              {algoliaMessage && (
                <p
                  style={{
                    fontSize: '12px',
                    fontStyle: 'italic',
                    color: '#09732b',
                  }}
                >
                  {algoliaMessage}
                </p>
              )}
            </div>
            <div
              style={{ flexGrow: 1 }}
              className="flex items-stretch w-20 justify-center"
            >
              <Divider orientation="vertical" />
            </div>
            <div className="w-30 items-center flex">
              <Button
                disabled={disableIndexButton}
                variation="primary"
                collapseLeft
                block
                onClick={onIndexActionClick}
              >
                <FormattedMessage id="admin/algolia.reindex.button" />
              </Button>
              {isCatalogShown && (
                <CatalogService
                  algoliaConfig={configObj}
                  dataIsSentToAlgolia={dataIsSentToAlgolia}
                  algoliaMessageEvent={algoliaMessageEvent}
                />
              )}
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  )
}

export default injectIntl(Admin)

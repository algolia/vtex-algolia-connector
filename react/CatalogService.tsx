/* eslint-disable no-console */
import type { FC } from 'react'
import { useEffect, useState } from 'react'
import { useApolloClient } from 'react-apollo'
import type { WrappedComponentProps } from 'react-intl'
import { injectIntl } from 'react-intl'

import indexAllProducts from './graphql/indexAllProducts.gql'

/**
 * Function component loading the whole full catalog from VTex and indexing it within Algolia
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CatalogService: FC<WrappedComponentProps & any> = ({
  dataIsSentToAlgolia,
}) => {
  const client = useApolloClient()

  /** loading mechanism used during the full process (VTex catalog loading + indexing in Algolia) */
  const [loading, setLoading] = useState(true)

  /**
   * Async method loading the catalog from VTex, transforming the data to records & sending it to Algolia
   */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getCatalog = async () => {
    console.time('getCatalog')
    // get categories first
    const length = await client.query({
      query: indexAllProducts,
      variables: {},
    })

    console.log(length)

    dataIsSentToAlgolia(length.data.indexAllProducts)

    setLoading(false)
    console.timeEnd('getCatalog')
  }

  useEffect(() => {
    if (loading) {
      getCatalog()
    }
  }, [getCatalog, loading])

  return null
}

export default injectIntl(CatalogService)

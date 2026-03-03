/**
 * Interface used from the {@link saveAlgoliaConfigInfo} resolver
 */
export interface AlgoliaConfigBinding {
  applicationId: string
  searchAPIKey: string
  writeAPIKey: string
  indexName: string
  querySuggestionsIndex: string
  fields: string
  skuFields: string
}

/**
 * Interface used from the {@link getAlgoliaConfigInfo} resolver
 */
export interface GetAlgoliaConfigResponse {
  data: AlgoliaConfigBinding
}

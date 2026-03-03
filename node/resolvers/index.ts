import { getAlgoliaConfigInfo } from './getAlgoliaConfigInfo'
import { getProducts } from './getProducts'
import { indexAllProducts } from './indexProducts'
import { getCategories } from './getCategories'

import { saveAlgoliaConfigInfo } from './saveAlgoliaConfigInfo'

/**
 * Declaring GraphQL Mutations
 */
export const mutations = {
  saveAlgoliaConfigInfo,
}

/**
 * Declaring GraphQL Queries
 */
export const queries = {
  getAlgoliaConfigInfo,
  getProducts,
  getCategories,
  indexAllProducts
}

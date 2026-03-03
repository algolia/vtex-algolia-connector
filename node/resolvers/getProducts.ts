/* eslint-disable no-console */
import { mapSkus } from '../utils'

export const getProducts = async (_: unknown, params: any, ctx: Context) => {
  const {
    clients: { search, algolia },
  } = ctx

  const { from, to, categoryId, subCategoryId } = params

  let result: any = {}

  const config: any = await algolia.config()
  const { fields, skuFields } = config

  if (!from || !to) {
    throw new Error('Please specify both "from" and "to"')
  }

  let products = {resources:{}, items: []}
  const categoryQuery = (subCategoryId == 0)? `C:/${categoryId}/` : `C:/${categoryId}/${subCategoryId}`;
  console.log('categoryQuery:' + categoryQuery);

  try {
    products = await search.products(from, to, '', categoryQuery).then((res: any) => {
      return {
        resources: res.headers.resources,
        items: res.data,
      }
    })
  
  } catch (e) {
    console.log('error in the get ', e)
  }

  result = {
    resources: products.resources,
    items: [],
  }

  products.items.forEach((item: any) => {
    const skus = mapSkus(item, fields, skuFields)

    skus.forEach((sku: any) => {
      result.items.push(sku)
    })
  })
  return result
}

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
import { mapSkus } from '../utils'

export const indexAllProducts = async (
  _: unknown,
  __: unknown,
  ctx: Context
) => {
  const {
    clients: { search, algolia },
  } = ctx

  const config: any = await algolia.config()
  const { fields, skuFields } = config

  const getProducts = async (categoryId: number, subCategoryId: number) => {
    const nbItemsPerPage = 50
    let pageNumber = 0
    let hasResultsInPage = true

    const allSkus: any = []

    while (hasResultsInPage) {
      const from = nbItemsPerPage * pageNumber + 1
      const to = nbItemsPerPage * (pageNumber + 1)
      let products = { resources: {}, items: [] }

      try {
        const categoryQuery =
          subCategoryId === 0
            ? `C:/${categoryId}/`
            : `C:/${categoryId}/${subCategoryId}`

        console.log(`categoryQuery:${categoryQuery}`)

        products = await search
          .products(from, to, '', categoryQuery)
          .then((res: any) => {
            return {
              resources: res.headers.resources,
              items: res.data,
            }
          })

        if (products.items.length < nbItemsPerPage) {
          hasResultsInPage = false
        }

        products.items.forEach((product: any) => {
          const skus = mapSkus(product, fields, skuFields)

          skus.forEach((sku: any) => {
            allSkus.push(sku)
          })
        })
      } catch (e) {
        console.log(`Some error ${typeof e}`, e)
        hasResultsInPage = false
      }

      pageNumber++
    }

    return allSkus
  }

  let categories = { resources: {}, items: [] }

  try {
    categories = await search.categories().then((res: any) => {
      return {
        resources: res.headers.resources,
        items: res.data,
      }
    })
  } catch (e) {
    console.log('error in the get ', e)
  }

  const categoryList = categories.items

  for (let i = 0; i < categoryList.length; i++) {
    const category: any = categoryList[i]

    if (category.hasChildren) {
      const subCategories = category.children

      subCategories.forEach(async (subCategory: any) => {
        const products: any = await getProducts(category.id, subCategory.id)

        if (products.length > 100) {
          let start = 0

          do {
            const subs = products.slice(start, start + 100)

            algolia.saveObjects(subs)
            start += 100
          } while (start > products.length)
        }
      })
    } else {
      const products: any = await getProducts(category.id, 0)

      if (products.length > 100) {
        let start = 0

        do {
          const subs = products.slice(start, start + 100)

          algolia.saveObjects(subs)
          start += 100
        } while (start > products.length)
      }
    }
  }

  return 0
}

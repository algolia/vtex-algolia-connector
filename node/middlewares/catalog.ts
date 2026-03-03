/* eslint-disable no-console */
import { mapSkus } from '../utils'

export async function catalogHandler(ctx: EContext, next: () => Promise<any>) {
  const {
    body,
    vtex: { logger },
    clients: { search, algolia },
  } = ctx

  /** Body example
  {
    IdSku: '12',
    An: 'sandboxusdev',
    DateModified: '2022-03-11T15:11:51.3661935Z',
    IsActive: true,
    StockModified: true,
    PriceModified: false,
    HasStockKeepingUnitModified: false,
    HasStockKeepingUnitRemovedFromAffiliate: false,
  }
  */

  logger.info({
    name: 'Algolia-Broadcast-Body',
    body,
  })

  const config: any = await algolia.config()
  const { fields, skuFields } = config

  if (body.IdSku) {
    if (body.IsActive) {
      const products: any = await search.products(
        0,
        0,
        `fq=skuId:${body.IdSku}`,
        ''
      )

      const skus: any = []

      products?.data?.forEach((item: any) => {
        const productSkus = mapSkus(item, fields, skuFields)

        productSkus.forEach((sku: any) => {
          skus.push(sku)
        })
      })

      const currentSku = skus?.find((item: any) => item.sku_id === body.IdSku)

      logger.info({
        name: `Algolia-Broadcast-Sku-${body.IsActive ? 'Active' : 'Inactive'}`,
        currentSku,
      })

      if (currentSku) {
        algolia
          .saveObject(currentSku, body.IdSku)
          .then((res: any) => {
            console.log('saveObjects =>', res)
          })
          .catch((err: any) => {
            console.log('saveObjects error =>', err)
          })
      }
    } else {
      algolia
        .deleteObject(body.IdSku)
        .then((res: any) => {
          console.log('deleteObjects =>', res)
        })
        .catch((err: any) => {
          console.log('deleteObjects error =>', err)
        })
    }
  }

  await next()
}

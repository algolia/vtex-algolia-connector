/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/restrict-plus-operands */

/* eslint-disable no-console */
export const mapSkus = (item: any, fields: string, skuFields: string) => {
  // Build the base data
  // fields  product_reference=productReference, name=productName, description=description, brand=brand, categories=categories

  const product: any = {
    product_id: item.productId,
    link: `/${item.linkText}/p`,
  }

  // price_value=sellers.0.commertialOffer.PriceWithoutDiscount
  const getSourceValue = (obj: any, fieldName: string) => {
    let val = null

    if (fieldName.indexOf('.') > -1) {
      // sellers, 0, commertialOffer, PriceWithoutDiscount
      const sourceValues = fieldName.split('.')

      for (let i = 0; i < sourceValues.length; i++) {
        if (val == null) val = obj
        val = val[sourceValues[i]]
      }

      return val
    }

    return obj[fieldName]
  }

  // price.discount
  const setLeftValue = (obj: any, fieldName: string, value: string) => {
    if (fieldName.indexOf('.') > -1) {
      // price, discount
      const sourceValues = fieldName.split('.')
      let val = obj

      for (let i = 0; i < sourceValues.length; i++) {
        if (i === sourceValues.length - 1) {
          val[sourceValues[i]] = value
        } else {
          val = obj[sourceValues[i]]
          if (typeof val === 'undefined') val = {}
          obj[sourceValues[i]] = val
        }
      }

    } else {
      obj[fieldName] = value
    }
  }

  if (typeof fields === 'undefined') {
    fields =
      'product_reference=productReference, name=productName, description=description, brand=brand, categories=categories'
  }

  if (typeof skuFields === 'undefined') {
    skuFields =
      'objectID=itemId,sku_id=itemId,sku_name=name,ean=ean,videos=Videos,images=image.imageUrl,variations=variations, price.value=sellers.0.commertialOffer.PriceWithoutDiscount,price.listValue=sellers.0.commertialOffer.ListPrice, price.discount=sellers.0.commertialOffer.Price'
  }

  function fixCategories(categories: any) {
    //  Extracting categories
    let categNb = item.categories?.length - 1
    let attributeLbl
    let categoryValue
    let lastSlashPos

    product.categories = {}

    categories?.forEach((category: any) => {
      attributeLbl = `lvl${categNb}`
      categoryValue = category.substring(1)
      lastSlashPos = categoryValue.lastIndexOf('/')
      categoryValue =
        categoryValue.slice(0, lastSlashPos) +
        categoryValue.slice(lastSlashPos + 1)
      categoryValue = categoryValue.replace(/\//g, ' > ')
      product.categories[attributeLbl] = categoryValue
      categNb--
    })
  }

  const fieldsArray = fields.split(',')

  fieldsArray.forEach((f: string) => {
    const field = f.trim()
    const fieldGroups = field.split('=')
    const rightVal = getSourceValue(item, fieldGroups[1])

    if (fieldGroups[1] === 'categories') {
      fixCategories(item.categories)
    } else {
      setLeftValue(product, fieldGroups[0], rightVal)
    }
  })

  // Extract specification groups
  if (item.allSpecificationsGroups?.length) {
    item.allSpecificationsGroups.forEach((element: string) => {
      product[element] = item[element]
    })
  }

  // Extract specification
  if (item.allSpecifications?.length) {
    item.allSpecifications.forEach((element: string) => {
      product[element] = item[element]
    })
  }

  const skuFieldsArray = skuFields.split(',')

  const ret = item?.items?.map((sku: any) => {
    const skuData: any = {
      objectID: sku.itemId,
      link: `/${item.linkText}/p`,
    }

    skuFieldsArray.forEach((f: string) => {
      const field = f.trim()
      const fieldGroups = field.split('=')
      const rightVal = getSourceValue(sku, fieldGroups[1])

      setLeftValue(skuData, fieldGroups[0], rightVal)
    })

    if (sku?.variations?.length) {
      skuData.color = {}
      sku.variations.forEach((element: string) => {
        if (element === 'Color') {
          skuData.color.filter_group = sku[element][0]
          skuData.color.original_name = sku[element][0]
        } else {
          skuData[element] = sku[element]
        }
      })
    }

    return {
      ...product,
      ...skuData,
    }
  })

  return ret
}

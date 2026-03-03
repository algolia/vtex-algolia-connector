# vtex-algolia-integration

## Install VTex and the App
1. First, you need to install the VTtex CLI, docs are [here](https://developers.vtex.com/vtex-developer-docs/docs/vtex-io-documentation-vtex-io-cli-install)
2. Once installed, do a trial call to vtex login to make sure it works.  In the command line:
```
vtex login
```
3. Update the manifest.json to include your app name:
```
{
  "name": "alg-int",
  "vendor": "algoliapartnerus",
  "version": "1.0.0-beta.0",
  "title": "Integration with Algolia",
  "description": "Integration with Algolia",
  "billingOptions": {
    "setupRoute": "/admin/app/alg-int/",
    "termsURL": "https://compliance.vtex.com/gdpr/policies/vtex-privacy-policy",
    "support": {
      "url": "https://support.vtex.com/hc/requests"
    },
    "free": true,
    "type": "free",
    "availableCountries": [
      "*"
    ]
  },
```

The vendor is the app name:
```
  "vendor": "algoliapartnerus",
```
4. To install the app to your V-Tex environment, do vtex link in the command line
```
vtex link
```

## Incorporating InstantSearch as blocks into your theme

This is an integration to be able to use Algolia's InstantSearch functionality in your v-tex theme

There is a file [Algolia Example](/store/algolia_example.jsonc) that can be put into the store folder and be referenced by other pages and the header for the store
To incorporate the contents of algolia_example.jsonc into the header, update the header jsonc to include the search box:
```
  "flex-layout.row#4-desktop": {
    "props": {
      "blockClass": "main-header",
      "horizontalAlign": "center",
      "verticalAlign": "center",
      "preventHorizontalStretch": true,
      "preventVerticalStretch": true,
      "fullWidth": true
    },
    "children": [
      "flex-layout.col#logo-desktop",
      "flex-layout.col#category-menu",
      "flex-layout.col#spacer",
      "instant-search#header",
      "locale-switcher",
      "login",
      "minicart.v2"
    ]
  },
```

To add an algolia search results page, simply create a file called `algolia-results.jsonc` and add:
```
{
    "store.custom#algolia": {
        "children": [
        "instant-search#results"
        ]
    }
}
```

and in your `routes.jsonc` add the route:
```
...
  "store.custom#algolia": {
    "path": "/algolia"
  }
```

The `instant-search#header` is defined in algolia_example.jsonc

The code in the link is an example on incorporating Algolia's InstantSearch React components into your pages/themes or home page

A example theme json can be found [here](/docs/example_algolia_theme.json)

Another example of overriding the header theme to use instantsearch [here](/docs/example_header.json)

It looks like this:
![Header Page](/docs/header_image.png)




It has an admin section where you can edit certain properties, and do a full indexing:
![Admin Page](/docs/admin_page.png)

### Blocks
Here are the blocks that can be used
```
instant-search
search-box
hits
refinement-list
pagination
clear-refinements
algolia-menu-item
range-input
```

Some blocks don't have any parameters, but some do:

| Block  | Parameters | Description |
| ------------- | ------------- | ------------- |
| instant-search  | indexName  | The name of the index |
| search-box  | none  | |
| hits  | none  | |
| refinement-list  | attribute  | The name of a facet |
| pagination  | none  | |
| clear-refinements  | none  | |
| algolia-menu-item  | attribute, searchable, limit, showMore  | The name of a facet, whether it's searchable, the display limit, and whether to show the show more button |
| range-input  | attribute | The name of a facet |

The main block that needs to be in the theme is the instant-search one, and the other blocks are there as children of instant-search

```
search-box
hits
```

### Attributes
The attributes needed to use instantsearch are:
| Name  | Description |
| ------------- | ------------- |
| Application Id | This is the name/Id of the Algolia Application |
| Search API Key | The search API Key. This shouldn't be the Admin API Key |
| Write API Key | The write API Key to be able to index products |
| Index Name | The name of the index |
| Query Suggestions Index Name | The name of the Query Suggestions Index  [More](https://www.algolia.com/doc/guides/building-search-ui/ui-and-ux-patterns/query-suggestions/js/)  |
| Field Mapping | This is a set of fields to map between V-Tex and Algolia. More info below |
| SKU Field Mapping | Very similar to Field Mapping, but it's per SKU for a given product |

### Field Mapping
An example field mapping is:
```
product_reference=productReference, name=productName, description=description, brand=brand, categories=categories
```
Each mapping is separated by a comma.  The left of the equals sign is the algolia attribute name, and the right is the V-Tex attribute name.
so: `[algolia_attribute]=[V-Tex attribute]`
Example: `name=productName`  Where `name` is the algolia attribute and `productName` is the V-Tex attribute

[Here](/docs/example_product.json) is a set of V-Tex attributes in json format

An example SKU field mapping is:
```
objectID=itemId,sku_id=itemId,sku_name=name,ean=ean,videos=Videos,images=image.imageUrl,variations=variations, price.value=sellers.0.commertialOffer.PriceWithoutDiscount,price.listValue=sellers.0.commertialOffer.ListPrice, price.discount=sellers.0.commertialOffer.Price,images=images
```
Notice that for the price info, it's `sellers.0.commertialOffer.Price`  This means that it gets the price from the first element in the sellers array using dot-notation

## Customizing Code
There are several areas to make customizations:
| File  | Description |
| ------------- | ------------- |
| InstantSearch.tsx | This is the main file that sets up instantsearch, shouldn't need any modifications |
| SearchBox.tsx | This code includes the Autocomplete functionality [Docs](https://www.algolia.com/doc/api-reference/widgets/autocomplete/react/) |
| MenuItem.tsx | A wrapper around the default React Menu [Docs](https://www.algolia.com/doc/api-reference/widgets/menu/react/) |
| Pagination.tsx | A wrapper around the default Pagination Menu [Docs](https://www.algolia.com/doc/api-reference/widgets/pagination/react/) |
| Hits.tsx | A wrapper around the Hits functionality. [Docs](https://www.algolia.com/doc/api-reference/widgets/hits/react/)   |
| RefinementList.tsx | A wrapper around the default RefinementList [Docs](https://www.algolia.com/doc/api-reference/widgets/refinement-list/react/) |
| ClearRefinements.tsx | A wrapper around the default ClearRefinements [Docs](https://www.algolia.com/doc/api-reference/widgets/clear-refinements/react/) |


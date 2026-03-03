import type { InstanceOptions, IOContext, RequestConfig } from '@vtex/api'
import { JanusClient } from '@vtex/api'

export class SearchClient extends JanusClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(ctx, {
      ...options,
      headers: {
        ...options?.headers,
        VtexIdclientAutCookie: ctx.authToken,
      },
    })
  }

  public products = (from: number, to: number, query: string, categoryQuery: string) =>
    this.get(this.routes.products(from, to, query, categoryQuery), {
      metric: 'algolia-index-search',
    })

  public categories = () =>
    this.get(this.categoryRoutes.categories(), {
      metric: 'algolia-index-search',
    })

  protected get = <T>(url: string, config: RequestConfig = {}) => {
    config.headers = {
      ...config.headers,
    }
    // eslint-disable-next-line no-console
    // console.log('URL: ' + url);
    return this.http.getRaw<T>(url, config)
  }

  private get routes() {
    const base = '/api/catalog_system/pub/products'

    return {
      products: (from: number, to: number, query: string, categoryQuery: string) => 
        `${base}/search?${query ? `${query}` : `_from=${from}&_to=${to}&fq=${categoryQuery}`}`,
    }
  }

  private get categoryRoutes() {
    const base = '/api/catalog_system/pub/category/tree'

    // eslint-disable-next-line no-console
    // console.log('categoryRoute')

    return {
      categories: () =>
        `${base}/1`,
    }
  }

}
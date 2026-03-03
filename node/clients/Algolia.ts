/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient, VBase } from '@vtex/api'

export class AlgoliaClient extends ExternalClient {
  private vbase: VBase
  private bucket = 'account.algolia'
  private filename = 'configs'

  constructor(context: IOContext, options?: InstanceOptions) {
    super(``, context, options)
    this.vbase = new VBase(context)
  }

  public saveObject = async (body: any, id: string) => {
    const config: any = await this.config()
    const { applicationId, writeAPIKey, indexName } = config

    console.log(`index name ${indexName}`)

    return this.put(
      this.routes.saveDeleteObject(applicationId, indexName, id),
      body,
      {
        metric: 'algolia-saveObject',
        headers: {
          'X-Vtex-Use-Https': true,
          'X-Algolia-API-Key': writeAPIKey,
          'X-Algolia-Application-Id': applicationId,
        },
      }
    )
  }

  public saveObjects = async (products: []) => {
    const config: any = await this.config()
    const { applicationId, writeAPIKey, indexName } = config

    const jsonObject: { requests: any[] } = { requests: [] }

    for (let i = 0; i < products.length; i++) {
      const product: Record<string, unknown> = products[i]
      const json: { action: string; body: Record<string, unknown> } = {
        action: 'updateObject',
        body: product,
      }

      jsonObject.requests.push(json)
    }

    return this.post(
      this.routes.saveMultipleObjects(applicationId, indexName),
      jsonObject,
      {
        metric: 'algolia-saveObjects',
        headers: {
          'X-Vtex-Use-Https': true,
          'X-Algolia-API-Key': writeAPIKey,
          'X-Algolia-Application-Id': applicationId,
        },
      }
    )
  }

  public deleteObject = async (id: string) => {
    const config: any = await this.config()
    const { applicationId, writeAPIKey, indexName } = config

    return this.delete(
      this.routes.saveDeleteObject(applicationId, indexName, id),
      {
        metric: 'algolia-deleteObject',
        headers: {
          'X-Vtex-Use-Https': true,
          'X-Algolia-API-Key': writeAPIKey,
          'X-Algolia-Application-Id': applicationId,
        },
      }
    )
  }

  public config = async () => {
    const data = await this.vbase.getJSON(this.bucket, this.filename)

    return data
  }

  protected put = (url: string, data: any, config: any = {}) => {
    config.headers = {
      ...config.headers,
    }

    return this.http.put(url, data, config)
  }

  protected post = (url: string, data: any, config: any = {}) => {
    config.headers = {
      ...config.headers,
    }

    return this.http.post(url, data, config)
  }

  protected delete = (url: string, config: any = {}) => {
    config.headers = {
      ...config.headers,
    }

    return this.http.delete(url, config)
  }

  private get routes() {
    return {
      saveDeleteObject: (appId: string, indexName: string, objectId: string) =>
        `http://${appId}-dsn.algolia.net/1/indexes/${indexName}/${objectId}`,
      saveMultipleObjects: (appId: string, indexName: string) =>
        `https://${appId}-dsn.algolia.net/1/indexes/${indexName}/batch`,
    }
  }
}

import { IOClients } from '@vtex/api'

import { SearchClient } from './Search'
import { AlgoliaClient } from './Algolia'

export class Clients extends IOClients {
  public get search() {
    return this.getOrSet('search', SearchClient)
  }

  public get algolia() {
    return this.getOrSet('algolia', AlgoliaClient)
  }
}

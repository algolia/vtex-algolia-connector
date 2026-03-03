let myVar = ''
let searchState: any = null
let searchClient: any = null
let autocompleteSources: any = null
let qsIndex = ''
let updateSearchState: any = null

export function setVar(strVar: string) {
  myVar = strVar
}

export function getVar() {
  return myVar
}

export function setSearchingState(state: any) {
  searchState = state
}

export function getSearchingState() {
  return searchState
}

export function setSearchClient(client: any) {
  searchClient = client
}

export function getSearchClient() {
  return searchClient
}

export function setAutocompleteSources(sources: any) {
  autocompleteSources = sources
}

export function getAutocompleteSources() {
  return autocompleteSources
}

export function setQSIndex(index: string) {
  qsIndex = index
}

export function getQSIndex() {
  return qsIndex
}

export function setUpdateSearchState(stateFunction: any) {
  updateSearchState = stateFunction
}

export function getUpdateSearchState() {
  return updateSearchState
}

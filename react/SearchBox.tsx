/* eslint-disable no-console */
import React from 'react'
import type { FunctionComponent } from 'react'
import type { WrappedComponentProps } from 'react-intl'
import { connectSearchBox } from 'react-instantsearch-dom'
import '@algolia/autocomplete-theme-classic'
import '@algolia/autocomplete-theme-classic/dist/theme.css'
import { useCssHandles } from 'vtex.css-handles'

import { getSearchingState } from './Storage'
import Autocomplete from './Autocomplete'

const VirtualSearchBox = connectSearchBox(() => null)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AppSearchBox: FunctionComponent<WrappedComponentProps & any> = () => {
  const searchState = getSearchingState()

  const CSS_HANDLES = ['aisSearchBox']
  const handles = useCssHandles(CSS_HANDLES)

  return (
    <div className={`${handles.aisSearchBox}`}>
      <Autocomplete
        placeholder="Search"
        detachedMediaQuery="none"
        initialState={{
          query: searchState.query,
        }}
        openOnFocus
      />
      <VirtualSearchBox />
    </div>
  )
}

export default AppSearchBox

import React from 'react'
import type { FunctionComponent } from 'react'
import type { WrappedComponentProps } from 'react-intl'
import { ClearRefinements } from 'react-instantsearch-dom'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AppClearRefinementsButton: FunctionComponent<
  WrappedComponentProps & any
> = () => {
  return <ClearRefinements />
}

export default AppClearRefinementsButton

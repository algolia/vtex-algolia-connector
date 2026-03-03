import React from 'react'
import type { FunctionComponent } from 'react'
import type { WrappedComponentProps } from 'react-intl'
import { Pagination } from 'react-instantsearch-dom'

import style from './algolia.css'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AppPagination: FunctionComponent<WrappedComponentProps & any> = () => {
  return (
    <div className={style['algolia-pagination-container']}>
      <Pagination header="Pagination" />
    </div>
  )
}

export default AppPagination

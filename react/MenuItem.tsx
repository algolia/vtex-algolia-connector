import type { FunctionComponent } from 'react'
import React from 'react'
import type { WrappedComponentProps } from 'react-intl'
import { injectIntl } from 'react-intl'
import { Menu } from 'react-instantsearch-dom'

import style from './algolia.css'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AppMenuItem: FunctionComponent<WrappedComponentProps & any> = props => {
  return (
    <Menu
      attribute={props.attribute}
      searchable={props.searchable}
      className={style['algolia-menu-container']}
      showMoreLimit={props.limit}
      showMore={props.showMore}
    />
  )
}

export default injectIntl(AppMenuItem)

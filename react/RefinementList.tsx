import React from 'react'
import type { FunctionComponent } from 'react'
import type { WrappedComponentProps } from 'react-intl'
import { injectIntl } from 'react-intl'
import { Panel, RefinementList } from 'react-instantsearch-dom'

const AppRefinementList: FunctionComponent<
  WrappedComponentProps & any
> = props => {
  return (
    <div>
      <Panel header={props.label}>
        <RefinementList attribute={props.attribute}  searchable={props.searchable} />
      </Panel>
    </div>
  )
}

export default injectIntl(AppRefinementList)

import React from 'react'
import type { FunctionComponent } from 'react'
import type { WrappedComponentProps } from 'react-intl'
import { injectIntl } from 'react-intl'
import { Panel, RangeInput } from 'react-instantsearch-dom'

const AppRangeInput: FunctionComponent<WrappedComponentProps & any> = props => {
  return (
    <div>
      <Panel header={props.label}>
        <RangeInput attribute={props.attribute} />
      </Panel>
    </div>
  )
}

export default injectIntl(AppRangeInput)

/* eslint-disable no-console */
import React from 'react'
import type { FunctionComponent } from 'react'
import type { WrappedComponentProps } from 'react-intl'

// eslint-disable-next-line func-names

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProductItem: FunctionComponent<WrappedComponentProps & any> = props => {
  return (
    <a href={props.hit.url} className="aa-ItemLink">
      <div className="aa-ItemContent">
        <div className="aa-ItemTitle">
          <props.components.Highlight hit={props.hit} attribute="name" />
        </div>
      </div>
    </a>
  )
}

export default ProductItem

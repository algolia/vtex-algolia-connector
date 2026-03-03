/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-console */

import type { FunctionComponent } from 'react'
import React from 'react'
import { injectIntl } from 'react-intl'
import { connectHits } from 'react-instantsearch-dom'
import { useCssHandles } from 'vtex.css-handles'

// eslint-disable-next-line import/order

const AppHits: FunctionComponent = () => {
  const index = 0

  const CSS_HANDLES = [
    'aisHitContainer',
    'aisHit',
    'aisHitItem',
    'aisHitLink',
    'aisHitImgContainer',
    'aisHitImg',
    'aisHitTitleContainer',
    'aisHitTitle',
    'aisHitPrice',
    'aisHitOverlay',
  ]

  const handles = useCssHandles(CSS_HANDLES)

  const HitElement = (props: any) => {
    const { hit } = props
    const productImage = hit.images ? hit.images[0].imageUrl : false

    if (productImage) {
      return (
        <div key={`${index}`} className={`${handles.aisHit}`}>
          <a href={`${hit.link}`} className={`${handles.aisHitLink}`}>
            <div className={`${handles.aisHitItem}`}>
              <div className={`${handles.aisHitImgContainer}`}>
                <img
                  src={`${productImage}`}
                  className={`${handles.aisHitImg}`}
                  alt={`${hit.brand}`}
                />
              </div>
              <div className={`${handles.aisHitTitleContainer}`}>
                <span className={`${handles.aisHitTitle}`}>{hit.name}</span>
                <span className={`${handles.aisHitPrice}`}>
                  {hit.price ? hit.price.currency : ''}$ $
                  {hit.price ? hit.price.value : ''}
                </span>
              </div>
              <div className={`${handles.aisHitOverlay}`} />
            </div>
          </a>
        </div>
      )
    }

    return <div />
  }

  const Hits = (hitsArray: any) => {
    const rows = []

    for (let i = 0; i < hitsArray.hits.length; i++) {
      const hit = hitsArray.hits[i]

      rows.push(<HitElement key={i} hit={hit} />)
    }

    return <div className={`${handles.aisHitContainer}`}>{rows}</div>
  }

  const CustomHits = connectHits(Hits)

  return (
    <div data-testid="HitsContainer">
      <CustomHits />
    </div>
  )
}

export default injectIntl(AppHits)

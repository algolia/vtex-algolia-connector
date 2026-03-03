/* eslint-disable no-console */
import React, { useState } from 'react'
import type { FunctionComponent } from 'react'
import type { WrappedComponentProps } from 'react-intl'

import style from './algolia.css'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const QuickView: FunctionComponent<WrappedComponentProps & any> = (
  props: any
) => {
  const [show, setShow] = useState(false)

  const closeModal = () => {
    setShow(false)
    document.removeEventListener('click', closeModal)
  }

  const showModal = () => {
    setShow(true)
    document.addEventListener('click', closeModal)
  }

  const ModalHtml: FunctionComponent<WrappedComponentProps & any> = () => {
    if (show) {
      return (
        <div className={style.modal}>
          <h2>{props.title}</h2>

          <div className={style.content}>
            <table>
              <tbody>
                <tr>
                  <td>
                    <img
                      src={`${props.image}`}
                      className={style['content-image-big']}
                      alt=""
                    />
                  </td>
                  <td dangerouslySetInnerHTML={{ __html: props.description }} />
                </tr>
              </tbody>
            </table>
          </div>
          <div className={style.actions}>
            <button className="{style['toggle-button']}" onClick={closeModal}>
              close
            </button>
          </div>
        </div>
      )
    }

    return null
  }

  return (
    <div>
      <button
        onClick={showModal}
        className={style['algolia-quickview-button']}
      />
      <ModalHtml
        title={`${props.title}`}
        description={`${props.description}`}
        image={`${props.image}`}
      />
    </div>
  )
}

export default QuickView

import React from 'react'
import { render } from '@vtex/test-tools/react'

import Component from './Hits'

test('Hits Test', () => {
  const { getByTestId } = render(<Component />)
  expect(getByTestId("HitsContainer")).toBeDefined()
})
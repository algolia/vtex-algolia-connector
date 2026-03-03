import React from 'react'
import { render } from '@vtex/test-tools/react'

import Component from './MenuItem'

test('MenuItem Test', () => {
  const { getByTestId } = render(<Component />)
  expect(getByTestId("MenuItem")).toBeDefined()
})
import React from 'react'
import { render } from '@testing-library/react'
import Range from '.'

describe('Range', () => {
    it('renders', () => {
        render(<Range data={{ min: 1, max: 10 }} />)
    })
})

import React from 'react'
import { render } from '@testing-library/react'
import RangeContainer from '.'
import { QueryClientProvider, QueryClient } from 'react-query'

const queryClient = new QueryClient()

describe('RangeContainer', () => {
    it('renders in normal mode', () => {
        render(
            <QueryClientProvider client={queryClient}>
                <RangeContainer type="normal" />
            </QueryClientProvider>
        )
    })

    it('renders in fixedvalues mode', () => {
        render(
            <QueryClientProvider client={queryClient}>
                <RangeContainer type="fixedvalues" />
            </QueryClientProvider>
        )
    })
})

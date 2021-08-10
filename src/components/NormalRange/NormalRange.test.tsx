import React from 'react'
import { render } from '@testing-library/react'
import {NormalRange} from '.'
import {QueryClientProvider,QueryClient} from 'react-query'

const queryClient=new QueryClient()

describe('NormalRange', () => {
    it('renders', () => {
      render(<QueryClientProvider client={queryClient}><NormalRange /></QueryClientProvider>)
    });
  });
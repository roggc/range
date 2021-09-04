import React, { useLayoutEffect, createContext } from 'react'
import styled from 'styled-components'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import RangeContainer from '../RangeContainer'

export const RangeContext = createContext({ barLength: 0 })
const queryClient = new QueryClient()

interface IAppProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * renders a range component in two modalities, normal and fixed values
 * @param {IAppProps} props 
 * @returns {React.ReactElement}
 */
const App: React.FC<IAppProps> = ({...props}):React.ReactElement => {
    useLayoutEffect(() => {
        document.body.style.height = '100%'
    }, [])

    return (
        <AppContainer {...props}>
            <QueryClientProvider client={queryClient}>
                <RangeContext.Provider value={{ barLength: 1000 }}>
                    <Router>
                        <Switch>
                            <Route path="/exercise1">
                                <RangeContainer type="normal" />
                            </Route>
                            <Route path="/exercise2">
                                <RangeContainer type="fixedvalues" />
                            </Route>
                        </Switch>
                    </Router>
                </RangeContext.Provider>
            </QueryClientProvider>
        </AppContainer>
    )
}

export default App

/**
 * sets height 100%
 */
const AppContainer = styled.div`
    height: 100%;
`

import React, { useEffect } from 'react'
import styled from 'styled-components'
import { QueryClient, QueryClientProvider } from 'react-query'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import {NormalRange} from '../NormalRange'
import {FixedValuesRange} from '../FixedValuesRange'

const queryClient=new QueryClient()

interface IAppProps{
}

export const App:React.FC<IAppProps>=({})=>{
    useEffect(()=>{
        document.body.style.height='100%'
    },[])
    
    return (
        <AppContainer>
            <QueryClientProvider client={queryClient}>
                <Router>
                    <Switch>
                        <Route path='/exercise1' component={NormalRange} />
                        <Route path='/exercise2' component={FixedValuesRange} />
                    </Switch>
                </Router>
            </QueryClientProvider>
        </AppContainer>
    )
}

const AppContainer=styled.div`
height:100%;
`
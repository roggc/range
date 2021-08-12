import React, { useLayoutEffect,createContext } from 'react'
import styled from 'styled-components'
import { QueryClient, QueryClientProvider } from 'react-query'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import {RangeContainer} from '../RangeContainer'

export const RangeContext=createContext({barLength:0})
const queryClient=new QueryClient()

interface IAppProps{
}

export const App:React.FC<IAppProps>=({})=>{
    useLayoutEffect(()=>{
        document.body.style.height='100%'
    },[])
    
    return (
        <AppContainer>
            <QueryClientProvider client={queryClient}>
                <RangeContext.Provider value={{barLength:1000}}>
                <Router>
                    <Switch>
                        <Route path='/exercise1'>
                            <RangeContainer type='normal' />
                        </Route>
                        <Route path='/exercise2'>
                            <RangeContainer type='fixedvalues' />
                        </Route>
                    </Switch>
                </Router>
                </RangeContext.Provider>
            </QueryClientProvider>
        </AppContainer>
    )
}

const AppContainer=styled.div`
height:100%;
`
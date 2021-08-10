import React, { useEffect } from 'react'
import styled from 'styled-components'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import {NormalRange} from '../NormalRange'
import {FixedValuesRange} from '../FixedValuesRange'

interface IAppProps{
}

export const App:React.FC<IAppProps>=({})=>{
    useEffect(()=>{
        document.body.style.height='100%'
    },[])
    
    return (
        <AppContainer>
            <Router>
                <Switch>
                    <Route path='/exercise1' component={NormalRange} />
                    <Route path='/exercise2' component={FixedValuesRange} />
                </Switch>
            </Router>
        </AppContainer>
    )
}

const AppContainer=styled.div`
height:100%;
`
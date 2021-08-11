import React from 'react'
import styled from 'styled-components'
import {useQuery} from 'react-query'
import {Range} from '../Range'

interface IRangeContainerProps extends React.HTMLAttributes<HTMLDivElement>{
    type:string;
}

export const RangeContainer:React.FC<IRangeContainerProps>=({type,...props}):React.ReactElement=>{
    const { isLoading, error, data } = useQuery('range', () =>
     fetch(`/api/${type}/`).then(res =>
       res.json()
     )
   )

    if (isLoading) return <div>Loading...</div>
        
    // @ts-ignore
    if (error) return <div>An error has occurred: {error.message}</div>
    
    return (
        <RangeContainerContainer {...props}>  
            <Range data={data} />
        </RangeContainerContainer>
    )
}

const RangeContainerContainer=styled.div`
height:100%;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
`

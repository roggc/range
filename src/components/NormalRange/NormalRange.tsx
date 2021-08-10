import React,{useRef} from 'react'
import styled from 'styled-components'
import {useQuery} from 'react-query'
import {Range} from '../Range'

interface INormalRangeProps extends React.HTMLAttributes<HTMLDivElement>{}

export const NormalRange:React.FC<INormalRangeProps>=({...props}):React.ReactElement=>{
    const { isLoading, error, data } = useQuery('minmax', () =>
     fetch('/api/minmax/').then(res =>
       res.json()
     )
   )

    if (isLoading) return <div>Loading...</div>
        
    // @ts-ignore
    if (error) return <div>An error has occurred: {error.message}</div>
    
    return (
        <NormalRangeContainer {...props}>  
            <Range data={data} />
        </NormalRangeContainer>
    )
}

const NormalRangeContainer=styled.div`
height:100%;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
`

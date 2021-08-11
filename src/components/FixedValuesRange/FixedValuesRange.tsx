import React from 'react'
import styled from 'styled-components'
import {useQuery} from 'react-query'
import {Range} from '../Range'

interface IFixedValuesRangeProps extends React.HTMLAttributes<HTMLDivElement>{}

export const FixedValuesRange:React.FC<IFixedValuesRangeProps>=({...props}):React.ReactElement=>{
    const { isLoading, error, data } = useQuery('fixedvalues', () =>
     fetch('/api/fixedvalues/').then(res =>
       res.json()
     )
   )

    if (isLoading) return <div>Loading...</div>
        
    // @ts-ignore
    if (error) return <div>An error has occurred: {error.message}</div>

    return (
        <FixedValuesRangeContainer {...props}>
            <Range data={data} />
        </FixedValuesRangeContainer>
    )
}

const FixedValuesRangeContainer=styled.div`
height:100%;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
`

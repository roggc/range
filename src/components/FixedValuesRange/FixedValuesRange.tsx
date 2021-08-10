import React from 'react'
import styled from 'styled-components'
import {Range} from '../Range'

interface IFixedValuesRangeProps extends React.HTMLAttributes<HTMLDivElement>{}

export const FixedValuesRange:React.FC<IFixedValuesRangeProps>=({...props}):React.ReactElement=>{
    return (
        <FixedValuesRangeContainer {...props}>
            <Range data={{min:1,max:100,rangeValues:[1.99,5.99,10.99,30.99,50.99,70.99]}} />
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

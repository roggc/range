import React from 'react'
import styled from 'styled-components'

interface IFixedValuesRangeProps extends React.HTMLAttributes<HTMLDivElement>{}

export const FixedValuesRange:React.FC<IFixedValuesRangeProps>=({...props}):React.ReactElement=>
<FixedValuesRangeContainer {...props}></FixedValuesRangeContainer>

interface IFixedValuesRangeContainerProps{}

const FixedValuesRangeContainer=styled.div<IFixedValuesRangeContainerProps>`
`
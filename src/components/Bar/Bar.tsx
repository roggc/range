import React from 'react'
import styled from 'styled-components'

interface IBarProps extends React.HTMLAttributes<HTMLDivElement>{}

export const Bar=React.forwardRef<HTMLDivElement,IBarProps>(({...props},ref):React.ReactElement=>{
    return (
        <BarContainer {...props} ref={ref}></BarContainer>
    )
})

interface IBarContainerProps{}

const BarContainer=styled.div<IBarContainerProps>`
border-radius:10px;
width:300px;
height:4px;
background-color:black;
`
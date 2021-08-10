import React from 'react'
import styled from 'styled-components'

export interface IBulletProps extends React.HTMLAttributes<HTMLDivElement>{}

export const Bullet=React.forwardRef<HTMLDivElement,IBulletProps>(({...props},ref):React.ReactElement=>{
    return (
        <BulletContainer ref={ref} {...props}></BulletContainer>
    )
})

interface IBulletContainerProps {}

const BulletContainer=styled.div<IBulletContainerProps>`
border-radius:50%;
width:15px;
height:15px;
background-color:black;
`
import React from 'react'
import styled from 'styled-components'

interface IBulletProps extends React.HTMLAttributes<HTMLDivElement>{}

export const Bullet=React.forwardRef<HTMLDivElement,IBulletProps>(({...props},ref):React.ReactElement=>{
    return (
        <BulletContainer ref={ref} {...props}></BulletContainer>
    )
})

interface IBulletContainerProps {}

const BulletContainer=styled.div<IBulletContainerProps>`
border-radius:50%;
width:16px;
height:16px;
background-color:black;
`
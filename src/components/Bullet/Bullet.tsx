import React from 'react'
import styled from 'styled-components'

interface IBulletProps extends React.HTMLAttributes<HTMLDivElement> {}

const Bullet = React.forwardRef<HTMLDivElement, IBulletProps>(
    ({ ...props }, ref): React.ReactElement => (
        <BulletContainer ref={ref} {...props}></BulletContainer>
    )
)

export default Bullet

interface IBulletContainerProps {}

const BulletContainer = styled.div<IBulletContainerProps>`
    border-radius: 50%;
    width: 16px;
    height: 16px;
    background-color: black;
`

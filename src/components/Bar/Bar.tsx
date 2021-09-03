import React from 'react'
import styled from 'styled-components'

interface IBarProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: number
}

const Bar = React.forwardRef<HTMLDivElement, IBarProps>(
    ({ size = 300, ...props }, ref): React.ReactElement => (
        <BarContainer {...props} ref={ref} width={size}></BarContainer>
    )
)

export default Bar

interface IBarContainerProps {
    width: number
}

const BarContainer = styled.div<IBarContainerProps>`
    border-radius: 10px;
    ${({ width }): string => `
width:${width}px;
`}
    height:4px;
    background-color: black;
`

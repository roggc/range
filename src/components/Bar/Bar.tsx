import React from 'react'
import styled from 'styled-components'

interface IBarProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * the length of the bar
     */
    size?: number
}

/**
 * black bar of certain length (size)
 * @param {IBarProps} props
 * @returns {React.ReactElement}
 */
const Bar = React.forwardRef<HTMLDivElement, IBarProps>(
    ({ size = 300, ...props }, ref): React.ReactElement => (
        <BarContainer {...props} ref={ref} width={size} />
    )
)

export default Bar

interface IBarContainerProps {
    width: number
}

/**
 * a black bar
 */
const BarContainer = styled.div<IBarContainerProps>`
    border-radius: 10px;
    ${({ width }): string => `
width:${width}px;
`}
    height:4px;
    background-color: black;
`

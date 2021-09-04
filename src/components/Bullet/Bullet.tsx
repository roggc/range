import React from 'react'
import styled from 'styled-components'

interface IBulletProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * renders a black knob of 16 px diameter
 * @param {IBulletProps} props
 * @returns {React.ReactElement}
 */
const Bullet = React.forwardRef<HTMLDivElement, IBulletProps>(
    ({ ...props }, ref): React.ReactElement => (
        <BulletContainer ref={ref} {...props} />
    )
)

export default Bullet

/**
 * renders a black knob of 16 px diameter
 */
const BulletContainer = styled.div`
    border-radius: 50%;
    width: 16px;
    height: 16px;
    background-color: black;
`

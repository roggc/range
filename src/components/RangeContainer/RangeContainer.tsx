import React, { useContext } from 'react'
import styled from 'styled-components'
import { useQuery } from 'react-query'
import Range from '../Range'
import { RangeContext } from '../App'

interface IRangeContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    type: string
}

const RangeContainer: React.FC<IRangeContainerProps> = ({
    type,
    ...props
}): React.ReactElement => {
    const { barLength } = useContext(RangeContext)
    const { isLoading, error, data } = useQuery('range', () =>
        fetch(`/api/${type}/`).then((res) => res.json())
    )

    if (isLoading) return <div>Loading...</div>

    // @ts-ignore
    if (error) return <div>An error has occurred: {error.message}</div>

    return (
        <RangeContainerContainer {...props}>
            <Range data={data} barLength={barLength} />
        </RangeContainerContainer>
    )
}

export default RangeContainer

const RangeContainerContainer = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

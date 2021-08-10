import React,{useRef} from 'react'
import styled from 'styled-components'
import {useQuery} from 'react-query'
import {Bullet} from '../Bullet'
import {Bar} from '../Bar'
import {useMoveBullet} from '../../hooks'

interface INormalRangeProps extends React.HTMLAttributes<HTMLDivElement>{}

export const NormalRange:React.FC<INormalRangeProps>=({...props}):React.ReactElement=>{
    const { isLoading, error, data } = useQuery('minmax', () =>
     fetch('/api/minmax/').then(res =>
       res.json()
     )
   )

    const refMin=useRef<HTMLDivElement>(null)
    const refMax=useRef<HTMLDivElement>(null)
    const refBar=useRef<HTMLDivElement>(null)
    const [isGrabbingMin,activateMin]=useMoveBullet({isMin:true,refBullet:refMin,refOtherBullet:refMax,refBar,range:100-1})
    const [isGrabbingMax,activateMax]=useMoveBullet({isMin:false,refBullet:refMax,refOtherBullet:refMin,refBar,range:100-1})

    if (isLoading) return <div>Loading...</div>
        
    // @ts-ignore
    if (error) return <div>An error has occurred: {error.message}</div>
    
    return (
        <NormalRangeContainer {...props}>  
            <NormalRangeSubContainer> 
            <Label>{data.min}€</Label>
            <StyledBar ref={refBar}>
                <StyledBullet 
                    onMouseDown={activateMin} 
                    isGrabbing={isGrabbingMin} 
                    ref={refMin}
                />
                <StyledBullet 
                    onMouseDown={activateMax} 
                    isGrabbing={isGrabbingMax} 
                    ref={refMax}
                />
            </StyledBar>
            <Label>{data.max}€</Label>
            </NormalRangeSubContainer>
        </NormalRangeContainer>
    )
}

interface INormalRangeContainerProps{}

const NormalRangeContainer=styled.div<INormalRangeContainerProps>`
height:100%;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
`

const NormalRangeSubContainer=styled.div`
display:flex;
flex-direction:row;
justify-content:space-between;
align-items:center;
`

const Label=styled.div`
font-family:sans-serif;
margin:20px;
`

const StyledBar=styled(Bar)`
display:flex;
justify-content:space-between;
`

interface IStyledBulletProps {
    isGrabbing:boolean;
}

const StyledBullet=styled(Bullet)<IStyledBulletProps>`
position:relative;
top:-5px;
${({isGrabbing}):string=>`
cursor:${isGrabbing?'grabbing':'grab'};
${isGrabbing?'height:20px;width:20px;top:-7px;':''}
`}
&:hover{
    width:20px;
    height:20px;
    top:-7px;
}
`

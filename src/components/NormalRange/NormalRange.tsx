import React,{useRef} from 'react'
import styled from 'styled-components'
import {Bullet,IBulletProps} from '../Bullet'
import {Bar} from '../Bar'
import {useMoveBullet} from '../../hooks'

interface INormalRangeProps extends React.HTMLAttributes<HTMLDivElement>{}

export const NormalRange:React.FC<INormalRangeProps>=({...props}):React.ReactElement=>{
    const refMin=useRef<HTMLDivElement>(null)
    const refMax=useRef<HTMLDivElement>(null)
    const refBar=useRef<HTMLDivElement>(null)
    const [isGrabbingMin,activateMin]=useMoveBullet({isMin:true,refBullet:refMin,refOtherBullet:refMax,refBar})
    const [isGrabbingMax,activateMax]=useMoveBullet({isMin:false,refBullet:refMax,refOtherBullet:refMin,refBar})

    return (
        <NormalRangeContainer {...props}>   
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

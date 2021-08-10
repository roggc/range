import React,{useRef} from 'react'
import styled from 'styled-components'
import {Bullet} from '../Bullet'
import {Bar} from '../Bar'
import {useMoveBullet} from '../../hooks'

interface IRangeProps extends React.HTMLAttributes<HTMLDivElement>{
    data:any;
}

export const Range:React.FC<IRangeProps>=({data,...props}):React.ReactElement=>{
    const refMin=useRef<HTMLDivElement>(null)
    const refMax=useRef<HTMLDivElement>(null)
    const refBar=useRef<HTMLDivElement>(null)
    const [isGrabbingMin,activateMin]=useMoveBullet({isMin:true,refBullet:refMin,refOtherBullet:refMax,refBar,min:data?data.min:undefined,max:data?data.max:undefined,rangeValues:data?data.rangeValues:undefined})
    const [isGrabbingMax,activateMax]=useMoveBullet({isMin:false,refBullet:refMax,refOtherBullet:refMin,refBar,min:data?data.min:undefined,max:data?data.max:undefined,rangeValues:data?data.rangeValues:undefined})

    return (
        <RangeContainer {...props}> 
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
        </RangeContainer>
    )
}

const RangeContainer=styled.div`
display:flex;
flex-direction:row;
justify-content:space-between;
align-items:center;
`
const Label=styled.div`
font-family:sans-serif;
margin:20px;
user-select:none;
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
user-select:none;
`

import React,{useRef} from 'react'
import styled from 'styled-components'
import {Bullet} from '../Bullet'
import {Bar} from '../Bar'
import {useMoveBullet} from '../../hooks'

interface IRangeProps extends React.HTMLAttributes<HTMLDivElement>{
    data:any;
    barLength?:number;
}

export const Range:React.FC<IRangeProps>=({data,barLength,...props}):React.ReactElement=>{
    const refMin=useRef<HTMLDivElement>(null)
    const refMax=useRef<HTMLDivElement>(null)
    const refBar=useRef<HTMLDivElement>(null)
    const minUnitsRef=useRef(0)
    const maxUnitsRef=useRef(0)
    const [isGrabbingMin,activateMin]=useMoveBullet({isMin:true,refBullet:refMin,refOtherBullet:refMax,refBar,min:data?data.min:undefined,max:data?data.max:undefined,rangeValues:data?data.rangeValues:undefined,refUnits:minUnitsRef,refOtherUnits:maxUnitsRef})
    const [isGrabbingMax,activateMax]=useMoveBullet({isMin:false,refBullet:refMax,refOtherBullet:refMin,refBar,min:data?data.min:undefined,max:data?data.max:undefined,rangeValues:data?data.rangeValues:undefined,refUnits:maxUnitsRef,refOtherUnits:minUnitsRef})

    return (
        <RangeContainer {...props}> 
            <Label>{data.min}€</Label>
            <StyledBarAndBulletsContainer>
                <StyledBulletContainerMin>
                    <StyledBullet 
                        onMouseDown={activateMin} 
                        isGrabbing={isGrabbingMin} 
                        ref={refMin}
                    />
                </StyledBulletContainerMin>
                <Bar ref={refBar} size={barLength} />
                <StyledBulletContainerMax>
                    <StyledBullet 
                        onMouseDown={activateMax} 
                        isGrabbing={isGrabbingMax} 
                        ref={refMax}
                    />
                </StyledBulletContainerMax>
            </StyledBarAndBulletsContainer>
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

interface IStyledBulletProps {
    isGrabbing:boolean;
}

const StyledBullet=styled(Bullet)<IStyledBulletProps>`
position:relative;
top:0px;
left:0px;
${({isGrabbing}):string=>`
cursor:${isGrabbing?'grabbing':'grab'};
${isGrabbing?'height:22px;width:22px;':''}
`}
&:hover{
    width:22px;
    height:22px;
}
user-select:none;
`

const StyledBulletContainerMax=styled.div`
position:relative;
left:-8px;
`

const StyledBulletContainerMin=styled.div`
position:relative;
left:8px; 
`

const StyledBarAndBulletsContainer=styled.div`
display:flex;
align-items:center;
`

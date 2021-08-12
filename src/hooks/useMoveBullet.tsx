import React, {useState,useEffect,useLayoutEffect,useRef} from 'react'

interface IUseMoveBulletProps{
    isMin:boolean;
    refBullet:React.RefObject<HTMLDivElement>;
    refOtherBullet:React.RefObject<HTMLDivElement>;
    refBar:React.RefObject<HTMLDivElement>;
    min:number|undefined;
    max:number|undefined;
    rangeValues:number[];
    refUnits:React.MutableRefObject<number>;
    refOtherUnits:React.MutableRefObject<number>;
}

export const useMoveBullet=({isMin,refBullet,refOtherBullet,refBar,min,max,rangeValues,refUnits,refOtherUnits}:IUseMoveBulletProps):[boolean,((e:React.MouseEvent)=>void)]=>{
    const [isGrabbing,setIsGrabbing]=useState(false)
    const [element,setElement]=useState<HTMLElement|null>(null)
    const [offsetX,setOffsetX]=useState<number>(0)
    const previousNumberRef=useRef(0)
    const previousDiffRef=useRef(true)
    const previousRangeValueRef=useRef<number|undefined>()

    const numberOfPixelsPerUnit=min&&max?(refBar.current?.getBoundingClientRect().right!-refBar.current?.getBoundingClientRect().left!)/(max-min):undefined

  const move=(event:MouseEvent)=>
  {
      if(numberOfPixelsPerUnit){
          let number=event.pageX-offsetX
          number=number/numberOfPixelsPerUnit

          if(rangeValues){
            let diff=number-previousNumberRef.current
            if(diff===0){
              if(previousDiffRef.current){
                diff=1
              }else{
                diff=-1
              }
            }else if(diff>0){
              previousDiffRef.current=true
            }else{
              previousDiffRef.current=false
            }
            previousNumberRef.current=number

            if(isMin){
              if(previousRangeValueRef.current===undefined){
                previousRangeValueRef.current=rangeValues[0]
              }
              number=number+rangeValues[0]-min!
              if(diff>0){
                let aux
                rangeValues.forEach((rangeValue,index,array)=>{
                  if((number+min!)>rangeValue && index<array.length-1){
                    aux=rangeValue
                  }
                })
                if(aux){
                  if(aux>=previousRangeValueRef.current){
                    number=aux-min!
                    previousRangeValueRef.current=aux
                  }else{
                    number=previousRangeValueRef.current-min!
                  }
                }else{
                  number=rangeValues[0]-min!
                  previousRangeValueRef.current=rangeValues[0]
                }
              }else if(diff<0){
                let aux
                rangeValues.some((value,index,array)=>{
                  if((number+min!)<value&&index<array.length-1){
                    aux=value
                    return true
                  }
                })
                if(aux){
                  if(aux<=previousRangeValueRef.current){
                    number=aux-min!
                    previousRangeValueRef.current=aux
                  }else{
                    number=previousRangeValueRef.current-min!
                  }
                }else{
                  number=rangeValues[rangeValues.length-2]-min!
                  previousRangeValueRef.current=rangeValues[rangeValues.length-2]
                }
              }
            }else{
              if(previousRangeValueRef.current===undefined){
                previousRangeValueRef.current=rangeValues[rangeValues.length-1]
              }
              number=number-(max!-rangeValues[rangeValues.length-1])
              if(diff<0){
                let aux
                rangeValues.some((rangeValue,index)=>{
                  if(number<-(max!-rangeValue)&&index>0){
                    aux=rangeValue
                    return true
                  }
                })
                if(aux){
                  if(aux<=previousRangeValueRef.current){
                    number=-(max!-aux)
                    previousRangeValueRef.current=aux
                  }else{
                    number=-(max!-previousRangeValueRef.current)
                  }
                }else{
                  number=-(max!-rangeValues[rangeValues.length-1])
                  previousRangeValueRef.current=rangeValues[rangeValues.length-1]
                }
              }else if(diff>0){
                let aux
                rangeValues.forEach((rangeValue,index)=>{
                  if(number>-(max!-rangeValue)&&index>0){
                    aux=rangeValue
                  }
                })
                if(aux){
                  if(aux>=previousRangeValueRef.current){
                    number=-(max!-aux)
                    previousRangeValueRef.current=aux
                  }else{
                    number=-(max!-previousRangeValueRef.current)
                  }
                }else{
                  number=-(max!-rangeValues[1])
                  previousRangeValueRef.current=rangeValues[1]
                }
              }
            }
          }else{
            number=Math.round(number)
          }
          
          refUnits.current=number

          if(!isMin&&refOtherUnits.current<0){
            refOtherUnits.current=0
          }
          if(isMin&&refOtherUnits.current>0){
            refOtherUnits.current=0
          }


          if(isMin&&
            number>=0&&
            min!+number<max!+refOtherUnits.current||
            !isMin&&
            number<=0&&
            min!+refOtherUnits.current<max!+number){
              number=number*numberOfPixelsPerUnit
              element!.style.left = `${number}px`
            }
      }
  }

  const activate=(event:React.MouseEvent)=>
  {
    setIsGrabbing(true)
    const targetElement=event.target as HTMLElement
    setElement(targetElement)
    if(offsetX===0){
        setOffsetX(event.clientX)
    }
  }

  const deactivate=(event:MouseEvent)=>{
    setIsGrabbing(false)
    setElement(null)
  }

  useEffect(()=>{
    if(element!==null){
        document.addEventListener('mouseup',deactivate)
        document.addEventListener('mousemove',move)
    }

    return ()=>{
        document.removeEventListener('mouseup',deactivate)
        document.removeEventListener('mousemove',move)
    }
  },[element])

  useEffect(()=>{
    if(isGrabbing){
        document.body.style.cursor='grabbing'
    }else{
        document.body.style.cursor='default'
    }
  },[isGrabbing])

  useLayoutEffect(()=>{
      const numberOfPixelsPerUnit_=(refBar.current?.getBoundingClientRect().right!-refBar.current?.getBoundingClientRect().left!)/(max!-min!)
      if(numberOfPixelsPerUnit_){
        if(rangeValues){
          let number
          if(isMin){
            number=(rangeValues[0]-min!)*numberOfPixelsPerUnit_
          }else{
            number=-(max!-rangeValues[rangeValues.length-1])*numberOfPixelsPerUnit_
          }
          refBullet.current!.style.left = `${number}px`
        }
      }
  },[])

  return [isGrabbing,activate]
}
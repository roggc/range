import React, {useState,useEffect,useLayoutEffect,useRef} from 'react'

interface IUseMoveBulletProps{
    isMin:boolean;
    refBullet:React.RefObject<HTMLDivElement>;
    refOtherBullet:React.RefObject<HTMLDivElement>;
    refBar:React.RefObject<HTMLDivElement>;
    min:number|undefined;
    max:number|undefined;
    rangeValues:number[];
}

export const useMoveBullet=({isMin,refBullet,refOtherBullet,refBar,min,max,rangeValues}:IUseMoveBulletProps):[boolean,((e:React.MouseEvent)=>void)]=>{
    const [isGrabbing,setIsGrabbing]=useState(false)
    const [element,setElement]=useState<HTMLElement|null>(null)
    const [offsetX,setOffsetX]=useState<number>(0)
    //const [previousNumber,setPreviousNumber]=useState(0)
    const previousNumberRef=useRef(0)
    const previousDiffRef=useRef(true)

    const numberOfPixelsPerUnit=min&&max?(refBar.current?.getBoundingClientRect().right!-refBar.current?.getBoundingClientRect().left!)/(max-min):undefined

  const move=(event:MouseEvent)=>
  {
      if(numberOfPixelsPerUnit){
          let step
          if(rangeValues){
            step=0.01
          }else{
            step=numberOfPixelsPerUnit
          }
          let number=event.pageX-offsetX
          number=number/numberOfPixelsPerUnit
          //console.log(number)

          if(rangeValues){
            //setPreviousNumber(number)
            //const diff=number-previousNumber
            //console.log(diff)
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
            //console.log(diff)
            if(isMin){
              number=number+rangeValues[0]
              if(diff>0){
                let aux
                rangeValues.forEach((rangeValue,index,array)=>{
                  if(number>rangeValue && index<array.length-1){
                    aux=rangeValue
                  }
                })
                if(aux){
                  number=aux
                }else{
                  number=rangeValues[0]
                }
              }else if(diff<0){
                let aux
                rangeValues.some((value,index,array)=>{
                  if(number<value&&index<array.length-1){
                    aux=value
                    return true
                  }
                })
                if(aux){
                  number=aux
                }else{
                  number=rangeValues[rangeValues.length-2]
                }
              }
            }else{
              // !isMin
              //console.log(number)
              number=number-((max!-min!)-rangeValues[rangeValues.length-1])
              if(diff<0){
                let aux
                rangeValues.some((rangeValue,index)=>{
                  if(number<-((max!-min!)-rangeValue)&&index>0){
                    aux=rangeValue
                    return true
                  }
                })
                if(aux){
                  number=-((max!-min!)-aux)
                }else{
                  number=-((max!-min!)-rangeValues[rangeValues.length-1])
                }
              }else if(diff>0){
                let aux
                rangeValues.forEach((rangeValue,index)=>{
                  if(number>-((max!-min!)-rangeValue)&&index>0){
                    aux=rangeValue
                  }
                })
                if(aux){
                  number=-((max!-min!)-aux)
                }else{
                  number=-((max!-min!)-rangeValues[1])
                }
              }
            }
          }else{
            number=Math.round(number)
          }
          
            number=number*numberOfPixelsPerUnit
          
          if(!isMin&& 
            refBullet.current?.getBoundingClientRect().right!-(refBullet.current?.getBoundingClientRect().right!-refBullet.current?.getBoundingClientRect().left!)/2<=refBar.current?.getBoundingClientRect().right!&&
            refBullet.current?.getBoundingClientRect().left!+(refBullet.current?.getBoundingClientRect().right!-refBullet.current?.getBoundingClientRect().left!)/2>refOtherBullet.current?.getBoundingClientRect().right!-(refOtherBullet.current?.getBoundingClientRect().right!-refOtherBullet.current?.getBoundingClientRect().left!)/2|| 
            isMin&&
            refBullet.current?.getBoundingClientRect().left!+(refBullet.current?.getBoundingClientRect().right!-refBullet.current?.getBoundingClientRect().left!)/2>=refBar.current?.getBoundingClientRect().left!&&
            refBullet.current?.getBoundingClientRect().right!-(refBullet.current?.getBoundingClientRect().right!-refBullet.current?.getBoundingClientRect().left!)/2<refOtherBullet.current?.getBoundingClientRect().left!+(refOtherBullet.current?.getBoundingClientRect().right!-refOtherBullet.current?.getBoundingClientRect().left!)/2){
              element!.style.left = `${number}px`
              while(isMin&&refBullet.current?.getBoundingClientRect().right!-(refBullet.current?.getBoundingClientRect().right!-refBullet.current?.getBoundingClientRect().left!)/2>=refOtherBullet.current?.getBoundingClientRect().left!+(refOtherBullet.current?.getBoundingClientRect().right!-refOtherBullet.current?.getBoundingClientRect().left!)/2){
                  number-=step
                  element!.style.left=`${number}px`
              }
              while(isMin&&refBullet.current?.getBoundingClientRect().left!+(refBullet.current?.getBoundingClientRect().right!-refBullet.current?.getBoundingClientRect().left!)/2<refBar.current?.getBoundingClientRect().left!){
                  number+=step
                  element!.style.left=`${number}px`
              }
              while(!isMin&& 
                refBullet.current?.getBoundingClientRect().right!-(refBullet.current?.getBoundingClientRect().right!-refBullet.current?.getBoundingClientRect().left!)/2>refBar.current?.getBoundingClientRect().right!){
                  number-=step
                  element!.style.left=`${number}px`
              }
              while(!isMin&&
                refBullet.current?.getBoundingClientRect().left!+(refBullet.current?.getBoundingClientRect().right!-refBullet.current?.getBoundingClientRect().left!)/2<=refOtherBullet.current?.getBoundingClientRect().right!-(refOtherBullet.current?.getBoundingClientRect().right!-refOtherBullet.current?.getBoundingClientRect().left!)/2){
                  number+=step
                  element!.style.left=`${number}px`
              }
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
    //previousDiffRef.current=true
    //previousNumberRef.current=0
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
    if(rangeValues){
      const numberOfPixelsPerUnit_=(refBar.current?.getBoundingClientRect().right!-refBar.current?.getBoundingClientRect().left!)/(max!-min!)
      if(numberOfPixelsPerUnit_){
        let number
        if(isMin){
          number=rangeValues[0]*numberOfPixelsPerUnit_
          refBullet.current!.style.left = `${number}px`
        }else{
          number=((max!-min!)-rangeValues[rangeValues.length-1])*numberOfPixelsPerUnit_
          refBullet.current!.style.left = `${-number}px`
        }
      }
    }
  },[])

//   useLayoutEffect(()=>{
//       const step=-0.1
//       let left=0
//     while(isMin&&refBullet.current?.getBoundingClientRect().left!+(refBullet.current?.getBoundingClientRect().right!-refBullet.current?.getBoundingClientRect().left!)/2>refBar.current?.getBoundingClientRect().left!){
//         refBullet.current!.style.left=`${left}px`
//         left=left+step
//         //console.log('adjusting ...')
//     }
//     // if(isMin){
//     //     console.log(refBullet.current?.getBoundingClientRect().left!+(refBullet.current?.getBoundingClientRect().right!-refBullet.current?.getBoundingClientRect().left!)/2,refBar.current?.getBoundingClientRect().left!)
//     // }
//   },[])

  return [isGrabbing,activate]
}
import React, {useState,useEffect,useLayoutEffect} from 'react'

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

    const numberOfPixelsPerUnit=min&&max?(refBar.current?.getBoundingClientRect().right!-refBar.current?.getBoundingClientRect().left!)/(max-min):undefined

  const move=(event:MouseEvent)=>
  {
      if(numberOfPixelsPerUnit){
          const step=numberOfPixelsPerUnit
          let number=event.pageX-offsetX
          number=Math.round(number/numberOfPixelsPerUnit)
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
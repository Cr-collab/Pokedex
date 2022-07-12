import { typesColor } from "./types";

interface styles{
  backgroundImage? : string;
  background?: string;
  lineHeight?: string;
  color?: string; 
  height?: string;
  width?: string;
} 

interface boxTypeStyleParans {
  isGradient: boolean;
  height?: string;
  width?: string;
  lineHeight?: string;
  type: {
    name: string
  }
}
export function boxTypeStyle({isGradient, type ,height,width , lineHeight} : boxTypeStyleParans){

  let styles :styles = {}

  if(height || width){
    styles.height = height;
    styles.width = width;
    styles.lineHeight = lineHeight
  }
  
  if(isGradient){
    styles.backgroundImage = `linear-gradient(to bottom, ${typesColor[type.name][0]} , ${typesColor[type.name][1]} )`
    
    if(type.name === 'dragon' ){
     styles.color = 'white'
    }else {
     styles.color = 'black'
    }
   } else {
     styles.background =  typesColor[type.name]
  }
  
   return  styles
 }
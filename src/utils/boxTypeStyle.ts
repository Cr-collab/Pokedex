import { typesColor } from "./types";

interface styles{
  backgroundImage? : string;
  background?: string;
  color?: string; 
} 

interface boxTypeStyleParans {
  isGradient: boolean;
  type: {
    name: string
  }
}
export function boxTypeStyle({isGradient, type} : boxTypeStyleParans){

  let styles :styles = {}
  
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
import { CSSProperties } from "react";

export default function ImageContainer(props:imageContainerProps){
    const divStyle = {marginTop:'10px'};
    const imageStyle = {width:'86%' };

    return(
        <div className="image-container">
        {props.imageBase64 ? (
  
                 <img className="imgStyle" style={props.style} src={props.imageBase64} alt="selected image"/>
     
       ) : null}
 
       {props.imageURL ? (
         <div>
           <div style={divStyle}>
                 <img className="imgStyle" style={imageStyle} src={props.imageURL} alt="selected image"/>
           </div>
         </div>
       ) : null}
       </div>
    )
}
interface imageContainerProps{
    style?:CSSProperties;
    imageURL:string;
    imageBase64:string;
}
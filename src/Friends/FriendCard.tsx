import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { profileDTO } from "../Profile/profiles.models";

export default function FriendCard(props:profileDTO){
    const [image,setImage] = useState<string>();
    const navigate = useNavigate()
    useEffect(()=>{
        if(props.profileImage === "undefined" || props.profileImage === "null" || props.profileImage === undefined || props.profileImage === null)
        {
          setImage("/noProfile.jpg")
          return
        }
        setImage(props.profileImage)
      
      },[props.profileImage])
    
    return(
        <>
            <div className="friendCard" onClick={()=>{
                navigate(`/profile/${props.email}`)
            }}>
                <img className="friendCard-image" src={image}/>
                <span className="friendCard-text">{props.email}</span>
            </div>
        </>
    )
}
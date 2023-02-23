import { useEffect, useState } from "react";
import { ReadyImagesURL } from "../apiPaths";

export default function UserImage(props:userImageProps){
    const [image, setImage] = useState('')
    useEffect(()=>{
        if (props.profileImage == null){
            setImage(`${ReadyImagesURL}/noProfile.jpg`)
        }else{
            setImage(props.profileImage)
        }
    }, [])
    return(
        <img
        className="profile-image postForm-image"
        src={image}
      />
    )
}
interface userImageProps{
    profileImage?:string;
}
UserImage.defaultProps = {
    profileImage:`${ReadyImagesURL}/noProfile.jpg`
}
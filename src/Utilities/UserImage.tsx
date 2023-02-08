import { useEffect, useState } from "react";

export default function UserImage(props:userImageProps){
    const [image, setImage] = useState('')
    useEffect(()=>{
        if (props.profileImage == null){
            setImage("https://localhost:7064/public/noProfile.jpg")
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
    profileImage:"https://localhost:7064/public/noProfile.jpg"
}
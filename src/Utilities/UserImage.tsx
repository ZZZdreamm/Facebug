import { useEffect, useState } from "react";

export default function UserImage(props:userImageProps){
    return(
        <img
        className="profile-image postForm-image"
        src={props.profileImage}
      />
    )
}
interface userImageProps{
    profileImage?:string;
}
UserImage.defaultProps = {
    profileImage:"/noProfile.jpg"
}
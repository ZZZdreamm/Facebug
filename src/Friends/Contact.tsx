import { Dispatch, JSXElementConstructor, ReactElement, SetStateAction, useContext, useEffect, useState } from "react";
import { ReadyImagesURL } from "../apiPaths";
import ChatWithFriend from "../Messages/ChatWithFriend";
import ProfileContext from "../Profile/ProfileContext";
import { profileDTO } from "../Profile/profiles.models";

export default function Contact(props:contactProps){
    const [image,setImage] = useState<string>();
    const {profileDTO} = useContext(ProfileContext)
    const [chatOpened, setChatOpened] = useState(false)
    // const {amountOfChatsOpened,updateAmountOfChatsOpened} = useContext(ChatsOpenedContext)
    useEffect(()=>{
        if(props.profile.profileImage === "undefined" || props.profile.profileImage === "null" || props.profile.profileImage === undefined || props.profile.profileImage === null)
        {
          setImage(`${ReadyImagesURL}/noProfile.jpg`)
          return
        }
        setImage(props.profile.profileImage)

      },[props.profile.profileImage])

    return(
        <>
            <div className="contact-friend" onClick={()=>{
                if(chatOpened== false){
                    setChatOpened(true)
                    props.setOpenedChats([...props.openChats,
                        {key:props.profile.id,userProfile:profileDTO,friendProfile:props.profile,
                             setChatOpened:setChatOpened}])
                }

            }}>
                <img className="contact-friend-image" src={image}/>
                <span className="contact-friend-name">{props.profile.email}</span>
            </div>
        </>
    )
}

interface contactProps{
    profile:profileDTO;
    setOpenedChats:any;
    openChats:any
}
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ReadyImagesURL, urlFriends } from "../apiPaths";
import ProfileContext from "../Profile/ProfileContext";
import Button from "../Utilities/Button";
import { friendRequest } from "./friends.models";

export default function SentFriendRequest(props: friendRequest) {
  const [requestStyle,setRequestStyle] = useState("flex")
  const [profileImage,setProfileImage] = useState(`${ReadyImagesURL}/noProfile.jpg`)
  useEffect(()=>{
    if(props.friendProfileImage != "null" && props.friendProfileImage != undefined){
      setProfileImage(props.friendProfileImage)
    }
  },[])
  function cancelSentRequest(){
    axios.delete(`${urlFriends}/cancelSentRequest/${props.userId}/${props.friendId}`)
    setRequestStyle("none")
  }
  return (
    <>
      <div className="sentFriendRequest" style={{display:`${requestStyle}`}}>
        <div>
          <img className="sentFriendRequest-image" src={profileImage}></img>
          <span className="sentFriendRequest-name">{props.friendName}</span>
        </div>
        <div className="friendsReq">
          <Button className="friendRequest-refuse" onClick={cancelSentRequest}>Cancel invitation</Button>
        </div>
      </div>
    </>
  );
}
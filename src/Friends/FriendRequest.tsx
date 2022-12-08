import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { urlFriends } from "../apiPaths";
import ProfileContext from "../Profile/ProfileContext";
import Button from "../Utilities/Button";
import { friendRequest } from "./friends.models";

export default function FriendRequest(props: friendRequest) {
  const [requestStyle,setRequestStyle] = useState("flex")
  const [profileImage,setProfileImage] = useState("/noProfile.jpg")
  useEffect(()=>{
    if(props.senderProfileImage != "null" && props.senderProfileImage != undefined){
      setProfileImage(props.senderProfileImage)
    }
  },[])
  function acceptFriendship(){
    axios.post(`${urlFriends}/acceptFriendRequest/${props.friendId}/${props.userId}`)
    setRequestStyle("none")
  }
  function refuseFriendship(){
    axios.delete(`${urlFriends}/refuseFriendRequest/${props.friendId}/${props.userId}`)
    setRequestStyle("none")
  }
  return (
    <>
      <div className="friendRequest" style={{display:`${requestStyle}`}}>
        <div>
          <img className="friendRequest-image" src={profileImage}></img>
          <span className="friendRequest-name">{props.senderName}</span>
        </div>
        <div>
          <Button className="friendRequest-accept" onClick={acceptFriendship}>Accept Friendship</Button>
          <Button className="friendRequest-refuse" onClick={refuseFriendship}>Refuse Friendship</Button>
        </div>
      </div>
    </>
  );
}

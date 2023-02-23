import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReadyImagesURL } from "../apiPaths";
import ProfileContext, { ProfileFriendsContext } from "../Profile/ProfileContext";
import { profileDTO } from "../Profile/profiles.models";
import Button from "../Utilities/Button";
import FriendCard from "./FriendCard";
import FriendsCardList from "./FriendCardList";

export default function UserFriends() {
  const { profileDTO, updateProfile } = useContext(ProfileContext);
  const { profileFriends, updateFriends } = useContext(ProfileFriendsContext);
  const [friends,setFriends] = useState<profileDTO[]>([])
  const navigate = useNavigate()
  useEffect(()=>{
    setFriends(profileFriends)
  },[profileFriends])

  return (
    <>
      <div className="leftBar" style={{borderLeft:"5px grey"}}>
        <span
          className="event"
          onClick={() => {
            navigate(`/friends/${profileDTO.email}`);
          }}
        >
          <img className="event-image" src={`${ReadyImagesURL}/friends.png`} />
          <Button className="custom-eventsBtn">Main Page</Button>
        </span>
        <span
          className="event"
          onClick={() => {
            navigate(`/friends/${profileDTO.email}/requests`);
          }}
        >
          <img className="event-image" src={`${ReadyImagesURL}/friends.png`} />
          <Button className="custom-eventsBtn">Friends Requests</Button>
        </span>
      </div>


      {<FriendsCardList friends={profileFriends}/>}
    </>
  );
}


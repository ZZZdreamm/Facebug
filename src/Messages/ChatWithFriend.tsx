import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { profileDTO } from "../Profile/profiles.models";
import Modal from "../Utilities/Modal";
import ChatsOpenedContext from "./ChatsOpenedContext";
import { messageDTO } from "./messages.models";

export default function ChatWithFriend(props: chatWithFriendProps) {
  const [image, setImage] = useState<string>();
  const [messages, setMessages] = useState<messageDTO[]>([]);
  useEffect(() => {
    if (
      props.friendProfile.profileImage === "undefined" ||
      props.friendProfile.profileImage === "null" ||
      props.friendProfile.profileImage === undefined ||
      props.friendProfile.profileImage === null
    ) {
      setImage("/noProfile.jpg");
      return;
    }
    setImage(props.friendProfile.profileImage);
  }, [props.friendProfile.profileImage]);
  useEffect(() => {
    getMessages();
  }, []);
  async function getMessages() {
  }
  return (
    <>
      <div className="chat">
        <div className="chat-header">
          <div>
            <img className="chat-header-image" src={image} />
            <span className="chat-header-name">
              {props.friendProfile.email}
            </span>
          </div>
          <div className="chat-close" onClick={()=>{
            console.log(props.openChats)
            props.setOpenedChats(props.openChats.filter((item: { key: string; }) => item.key !== props.friendProfile.id))
            props.setChatOpened(false)
            }}>
            X
          </div>
        </div>
        <div className="chat-body"></div>
        <div className="chat-footer"></div>
      </div>
    </>
  );
}

interface chatWithFriendProps {
  userProfile: profileDTO;
  friendProfile: profileDTO;
  setOpenedChats:any;
  openChats:any;
  setChatOpened:any;
}

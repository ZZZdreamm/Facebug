import axios from "axios";
import { ReactElement, useContext, useState } from "react";
import { urlMessages } from "../apiPaths";
import { messageDTO } from "./messages.models";
import MessagesContext from "./MessagesContext";

export default function Message(props: messageProps) {
  const messageStyle = (props.fromMeMessage ? "my" : "friend") + "-message";
  const messageColor = props.fromMeMessage
    ? "rgb(147, 111, 189)"
    : "rgb(111, 172, 189)";
  const fromFriend = props.fromMeMessage ? "messs" : "message";
  const isText = props.message.imageContent ? false : true;

  const [showImage, setShowImage] = useState(false);
  const [bigImage, setBigImage] = useState<ReactElement>();
  const {messages, updateMessages} = useContext(MessagesContext)

  function showImageAsGreater(image: string) {
    var img = (
      <div className="bigImageContainer" style={{ pointerEvents: "auto" }}>
        <img
          className="bigImage"
          src={image}
          onClick={() => console.log("SDSD")}
        />
        <img
          src="/red X.png"
          className="closeBigImage"
          style={{ marginLeft: "5px", cursor: "pointer" }}
          onClick={() => setShowImage(false)}
        />
      </div>
    );
    setBigImage(img);
    setShowImage(true);
  }
  function deleteMessage(messageId:number){
    axios.delete(`${urlMessages}/delete/${messageId}`)
    var messes : any = []
    messages.forEach(mess => {
      if(mess.id != messageId){
        messes.push(mess)
      }
    });
    // console.log(messes)
    updateMessages(messes)
  }

  var overlay = showImage ? "overlayDisplayed" : "overlay";
  return (
    <>
      {showImage ? <div id={overlay}></div> : null}
        <div className={`${fromFriend}`}>
          {props.fromMeMessage == false ? (
            <img className="chat-header-image" src={props.friendProfileImage} />
          ) : null}
          {isText ? (
            <div
              className={messageStyle}
              style={{ backgroundColor: `${messageColor}` }}
            >
              <img src="/deleteBin.png" className="deleteMessage" onClick={() => {
                deleteMessage(props.id)
              }}/>
              <span className="message-text">{props.message.textContent}</span>
            </div>
          ) : (
            <div className={messageStyle}>
              <img src="/deleteBin.png" className="deleteMessage" onClick={() => {
                deleteMessage(props.id)
              }}/>
              <img
                className="message-image"
                src={props.message.imageContent}
                onClick={() => showImageAsGreater(props.message.imageContent!)}
              />
            </div>
          )}
          {showImage ? bigImage : null}
        </div>
    </>
  );
}
interface messageProps {
  message: messageDTO;
  fromMeMessage: boolean;
  friendProfileImage: string;
  id: number;
}

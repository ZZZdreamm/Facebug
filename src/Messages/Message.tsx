import { ReactElement, useState } from "react";
import { messageDTO } from "./messages.models";

export default function Message(props: messageProps) {
  const messageStyle = (props.fromMeMessage ? "my" : "friend") + "-message";
  const messageColor = props.fromMeMessage
    ? "rgb(147, 111, 189)"
    : "rgb(111, 172, 189)";
  const fromFriend = props.fromMeMessage ? "" : "message";
  const isText = props.message.imageContent ? false : true;

  const [showImage, setShowImage] = useState(false);
  const [bigImage, setBigImage] = useState<ReactElement>();
  function showImageAsGreater(image: string) {
    var img = (
      <div className="bigImageContainer" style={{pointerEvents: "auto" }}>
        <img className="bigImage" src={image} onClick={()=>console.log("SDSD")}/>
        <img src="/red X.png" className="closeBigImage" style={{marginLeft:"5px", cursor:"pointer"}}
             onClick={() => setShowImage(false)}/>
        {/* <span className="closeImage" onClick={()=> setShowImage(false)}>X</span> */}
      </div>
    );
    setBigImage(img);
    setShowImage(true);
  }

  var overlay = showImage ? "overlayDisplayed" : "overlay";
  return (
    <>
    {showImage ?<div id={overlay}></div>: null}
    <div className={fromFriend}>
      {props.fromMeMessage == false ? (
        <img className="chat-header-image" src={props.friendProfileImage} />
      ) : null}
      {isText ? (
        <div
          className={messageStyle}
          style={{ backgroundColor: `${messageColor}` }}
        >
          <span className="message-text">{props.message.textContent}</span>
        </div>
      ) : (
        <div className={messageStyle}>
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
}

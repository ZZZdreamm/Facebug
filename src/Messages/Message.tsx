import axios from "axios";
import { ReactElement, useContext, useState } from "react";
import { ReadyImagesURL, urlMessages } from "../apiPaths";
import DeleteMessageModal from "./DeleteMessageModal";
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
  const { messages, updateMessages } = useContext(MessagesContext);

  const [deleteModal, setDeleteModal] = useState<any>();

  const [displayDelete, setDisplayDelete] = useState("none");

  function showImageAsGreater(image: string) {
    var img = (
      <div className="bigImageContainer" style={{ pointerEvents: "auto" }}>
        <img
          className="bigImage"
          src={image}
          onClick={() => console.log("SDSD")}
        />
        <img
          src={`${ReadyImagesURL}/red X.png`}
          className="closeBigImage"
          style={{ marginLeft: "5px", cursor: "pointer" }}
          onClick={() => setShowImage(false)}
        />
      </div>
    );
    setBigImage(img);
    setShowImage(true);
  }
  function deleteMessage(messageId: number) {
    axios.delete(`${urlMessages}/delete/${messageId}`);
    var messes: any = [];
    messages.forEach((mess) => {
      if (mess.id != messageId) {
        messes.push(mess);
      }
    });
    // console.log(messes)
    updateMessages(messes);
  }
  let displayCount = 1;
  const openDeleteModal = (messageId: number) => {
    displayCount = 1;
    setDeleteModal(
      <DeleteMessageModal
        id={messageId}
        doDisplay={displayCount}
        deleteMessage={deleteMessage}
        closeModal={closeModal}
      />
    );
    displayCount = 0;
  };
  const closeModal = () => {
    setDeleteModal(null);
  };

  let isHolding = false
  const holdEvent = () => {
    isHolding = true
    const duration = 1000
    setTimeout(() => {
      if(isHolding){
        openDeleteModal(props.id);
      }
      else{
        // setDisplayDelete("none")
      }
    }, duration);
  }

  var overlay = showImage ? "overlayDisplayed" : "overlay";
  return (
    <>
      {deleteModal}
      {showImage ? <div id={overlay}></div> : null}
      <div
        className={`${fromFriend}`}
        // onMouseEnter={() => setDisplayDelete("inline")}
        // onMouseLeave={() => setDisplayDelete("none")}
        onMouseDown={()=> {holdEvent()}}
        onMouseUp={()=> {
          isHolding = false
        }}
      >
        {props.fromMeMessage == false ? (
          <img className="chat-header-image" src={props.friendProfileImage} />
        ) : null}
        {isText ? (
          <div
            className={messageStyle}
            style={{ backgroundColor: `${messageColor}` }}
          >
            {/* <img
              style={{ display: displayDelete }}
              src={`${ReadyImagesURL}/deleteBin.png`}
              className="deleteMessage"
              onClick={() => {
                openDeleteModal(props.id);
              }}
            /> */}
            <span className="message-text">{props.message.textContent}</span>
          </div>
        ) : (
          <div className={messageStyle}>
            {/* <img
              style={{ display: displayDelete }}
              src={`${ReadyImagesURL}/deleteBin.png`}
              className="deleteMessage"
              onClick={() => {
                openDeleteModal(props.id);
              }}
            /> */}
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

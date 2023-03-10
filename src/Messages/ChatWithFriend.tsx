import axios, { Axios, AxiosResponse } from "axios";
import { LegacyRef, useContext, useEffect, useRef, useState } from "react";
import { ReadyImagesURL, urlMessages } from "../apiPaths";
import { profileDTO } from "../Profile/profiles.models";
import Modal from "../Utilities/Modal";
import ListOfMessages from "./ListOfMessages";
import { messageDTO } from "./messages.models";
import ImageUploader from "../Utilities/ImageUploader";
import { BaseSchema } from "yup";
import * as ReactDOMServer from "react-dom/server";
import UploadManyImages from "../Utilities/UploadManyImages";
import MessagesContext from "./MessagesContext";
import useIsInViewport from "../Utilities/IsInViewPort";
import { number } from "yup/lib/locale";
import { useNavigate } from "react-router-dom";

export default function ChatWithFriend(props: chatWithFriendProps) {
  const [image, setImage] = useState<string>();
  // const [messages, setMessages] = useState<any>([]);
  const [messages, setMessages] = useState<any>([]);

  const [sendingMessage, setSendingMessage] = useState(false);
  const refScroll1 = useRef<any>(null);
  const refScroll2 = useRef<any>(null);
  const [numberOfMessagesStacks, setNumberOfMessagesStacks] = useState(1);
  const [chatOpenedAlready, setChatOpenedAlready] = useState(false);

  const [textToSend, setTextToSend] = useState("");
  const [textingDivState, setTextingDivState] = useState<string>();

  const [ifLongTextStyle, setIfLongTextStyle] = useState("");
  // const [tooMuchCharacters, setTooMuchCharacters] = useState('')

  const {
    imageName,
    fileToData,
    baseImage,
    ImageUpload,
    deleteImage,
    images,
    setImages,
    setFileToData,
  } = UploadManyImages({
    textContent: "Send Image",
    image: ``,
    onChange() {},
  });

  const navigate = useNavigate();

  const [imagesToSend, setImagesToSend] = useState(false);

  useEffect(() => {
    if (textToSend != "") {
      setIfLongTextStyle("longTextSendBtn");
    } else {
      setIfLongTextStyle("");
    }
    // if (textToSend.length >= 250){
    //   setTooMuchCharacters('Maximum message length is 250 characters!')
    // }
  }, [textToSend]);

  useEffect(() => {
    if (
      props.friendProfile.profileImage === "undefined" ||
      props.friendProfile.profileImage === "null" ||
      props.friendProfile.profileImage === undefined ||
      props.friendProfile.profileImage === null
    ) {
      setImage(`${ReadyImagesURL}/noProfile.jpg`);
      return;
    }
    setImage(props.friendProfile.profileImage);
  }, [props.friendProfile.profileImage]);
  useEffect(() => {
    getMessages();
  }, []);

  useEffect(() => {
    if (refScroll1.current == null) {
      return;
    }
    refScroll1.current.scrollIntoView();
  }, [refScroll1, chatOpenedAlready]);

  var scrolledChatUp = useIsInViewport(refScroll2, "1000px");
  useEffect(() => {
    if (scrolledChatUp) {
      setNumberOfMessagesStacks(numberOfMessagesStacks + 1);
      getMessages();
    }
  }, [scrolledChatUp]);

  async function getMessages() {
    await axios
      .get(
        `${urlMessages}/get/${props.userProfile.id}/${props.friendProfile.id}/${numberOfMessagesStacks}`
      )
      .then((response: AxiosResponse<messageDTO[]>) => {
        setNumberOfMessagesStacks(numberOfMessagesStacks + 1);
        setMessages(response.data);
        setChatOpenedAlready(true);
      });
  }
  function sendMessage(image?: File[]) {
    setSendingMessage(true);
    var formData = new FormData();
    var date = new Date().toTimeString();
    var textDiv = document.getElementById("message " + props.friendProfile.id);
    const text = textDiv?.textContent;
    formData.append("SenderId", props.userProfile.id);
    formData.append("ReceiverId", props.friendProfile.id);
    var messagesToGetCount = 1;
    if (image) {
      for (var i = 0; i != image.length; i++) {
        formData.append("ImageContent", image[i]);
      }
      messagesToGetCount = image.length >= 1 ? image.length : 1;
    }
    if (text) {
      formData.append("TextContent", text!);
    }
    formData.append("Date", date);

    axios.post(`${urlMessages}/send`, formData);

    setTimeout(() => {
      setSendingMessage(false);
      axios
        .get(
          `${urlMessages}/getnewest/${props.userProfile.id}/${props.friendProfile.id}/${messagesToGetCount}`
        )
        .then((response) => {
          var messes = [...messages];
          response.data.forEach((message: any) => {
            console.log(message);
            messes.push(message);
          });
          setMessages(messes);
          setTextToSend("");
          setImages([]);
          setFileToData([]);
          textDiv!.innerHTML = "";
          setTimeout(() => {
            refScroll1.current.scrollIntoView();
          }, 300);
        });
    }, 5000);
  }

  async function handleScroll() {
    var element = document.getElementById(
      "modal-body-" + `${props.friendProfile.id}`
    );
    if (element!.scrollTop < element!.clientHeight) {
      setNumberOfMessagesStacks(numberOfMessagesStacks + 1);
      getMessages();
    }
  }

  function removeSendingImage(imageId: number) {
    console.log(imageId);
    var imgs = images.filter((image) => image.id !== imageId);
    setImages(imgs);
    console.log(images);
  }

  useEffect(() => {
    setTextingDivState(
      textToSend === "" ? "chat-footer-text" : "long-message-text"
    );
  }, [textToSend]);

  useEffect(() => {
    setTextingDivState(
      imagesToSend == true ? "image-message-to-send" : "chat-footer-text"
    );
  }, [imagesToSend]);

  useEffect(() => {
    var messageContainer = document.getElementById(
      "message " + props.friendProfile.id
    );
    if (images[0]) {
      messageContainer?.setAttribute("contentEditable", "false");
      setImagesToSend(true);
    } else {
      messageContainer?.setAttribute("contentEditable", "true");
      setImagesToSend(false);
    }
  }, [images]);

  function goIntoProfile(profileEmail: string) {
    navigate(`/profile/${profileEmail}`);
  }

  let isKeyboardOpen = false;
  const openKeyboard = () => {
      const MIN_KEYBOARD_HEIGHT = 300;

      const isMobile = window.innerWidth < 768;
      isKeyboardOpen =
        isMobile &&
        window.screen.height - MIN_KEYBOARD_HEIGHT >
          window.visualViewport!.height;
      console.log("sdsd");
      if (isKeyboardOpen) {
        setStyles({
          top: "-10px",
        });
        setImageStyles({
          width: "20px",
          height: "20px",
        });
      } else {
        setStyles({
          top: "5px",
        });
        setImageStyles({
          width: "40px",
          height: "40px",
        });
      }
  };

  window.addEventListener("resize", openKeyboard);

  const [styles, setStyles] = useState({});
  const [imageStyles, setImageStyles] = useState({});
  return (
    <MessagesContext.Provider
      value={{ messages: messages, updateMessages: setMessages }}
    >
      <div className="chat">
        <div className="chat-header">
          <div>
            <img
              className="chat-header-image"
              style={imageStyles}
              src={image}
              onClick={() => {
                goIntoProfile(props.friendProfile.email);
              }}
            />
            <span className="chat-header-name">
              {props.friendProfile.email}
            </span>
          </div>
          <div
            className="chat-close"
            onClick={() => {
              var opened = props.openChats.filter(
                (item: { key: string }) => item.key !== props.friendProfile.id
              );
              props.setOpenedChats(opened);
              props.setChatOpened(false);
            }}
          >
            X
          </div>
        </div>
        <div
          className="chat-body"
          id={"modal-body-" + `${props.friendProfile.id}`}
          onScroll={handleScroll}
        >
          <ListOfMessages
            messages={messages}
            userId={props.userProfile.id}
            friendId={props.friendProfile.id}
            friendProfileImage={image!}
            ref1={refScroll1}
            ref2={refScroll2}
          />
        </div>
        <div className="chat-footer">
          {textToSend == "" ? (
            <div className="uploader">{ImageUpload}</div>
          ) : null}
          <div className={textingDivState}>
            <div
              id={"message " + `${props.friendProfile.id}`}
              className="message-to-send"
              contentEditable
              onInput={(e) => {
                // @ts-ignore
                setTextToSend(e.target.textContent);
              }}
              // onClick={()=>{
              //   // setStyles({
              //   //   top: "-20px"
              //   // })
              //   // setImageStyles({
              //   //   width: "20px",
              //   //   height: "20px"
              //   // })
              //   if(isKeyboardOpen){
              //     setStyles({
              //       top: "-20px"
              //     })
              //     setImageStyles({
              //       width: "20px",
              //       height: "20px"
              //     })
              //   }

              // }}
            ></div>
            <div
              id={`image-to-send ${props.friendProfile.id}`}
              className="sending-images-holder"
            >
              {images.map((image) => (
                <div
                  id={`sendingImage ${props.friendProfile.id} ${image.id}`}
                  key={image.id}
                >
                  <img className="toSendImage" src={image.src} />
                  <span
                    className="deleteImage"
                    onClick={() => removeSendingImage(image.id)}
                  >
                    {deleteImage}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {textToSend === "" && imagesToSend == false ? (
            <img
              className="sendLikeBtn"
              src={`${ReadyImagesURL}/like.png`}
              onClick={() => sendMessage()}
            />
          ) : (
            <button
              id="sendMessageButton"
              disabled={sendingMessage}
              type="submit"
              className={`${ifLongTextStyle} sendMessageBtn`}
              style={styles}
              onClick={() => {
                sendMessage(fileToData);
              }}
            >
              <img
                className="chat-footer-sendMessage"
                src={`${ReadyImagesURL}/sendBtn.png `}
              />
            </button>
          )}
        </div>
      </div>
    </MessagesContext.Provider>
  );
}

interface chatWithFriendProps {
  userProfile: profileDTO;
  friendProfile: profileDTO;
  setOpenedChats: any;
  openChats: any;
  setChatOpened: any;
}

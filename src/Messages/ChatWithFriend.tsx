import axios, { AxiosResponse } from "axios";
import { LegacyRef, useContext, useEffect, useRef, useState } from "react";
import { urlMessages } from "../apiPaths";
import { profileDTO } from "../Profile/profiles.models";
import Modal from "../Utilities/Modal";
import ChatsOpenedContext from "./ChatsOpenedContext";
import ListOfMessages from "./ListOfMessages";
import { messageDTO } from "./messages.models";
import ImageUploader from "../Utilities/ImageUploader";

export default function ChatWithFriend(props: chatWithFriendProps) {
  const [image, setImage] = useState<string>();
  const [messages, setMessages] = useState<any>([]);
  const [sendingMessage,setSendingMessage] = useState(false)
  const refScroll = useRef<any>(null)
  const [numberOfMessagesStacks, setNumberOfMessagesStacks] = useState(1)
  const [chatOpenedAlready,setChatOpenedAlready] = useState(false)

  const [textToSend,setTextToSend] = useState("")
  const [textingDivState, setTextingDivState] = useState<string>()

  const {imageName, fileToData, baseImage, ImageUpload,deleteImage} = ImageUploader({
    textContent: "Send Image",
    image: ``,
    onChange() {},
  });



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
  useEffect(()=>{
    console.log(chatOpenedAlready)
    if(refScroll.current == null){
      return
    }
    refScroll.current.scrollIntoView()
  },[refScroll,chatOpenedAlready])

  // useEffect(()=>{
  //   console.log(textToSend)
  // },[textToSend])
  async function getMessages() {
    await axios.get(`${urlMessages}/get/${props.userProfile.id}/${props.friendProfile.id}/${numberOfMessagesStacks}`)
      .then((response:AxiosResponse<messageDTO[]>) => {
        setNumberOfMessagesStacks(numberOfMessagesStacks+1)
        setMessages(response.data)
        setChatOpenedAlready(true)
      })
    
  }
  async function sendMessage(image?: any){
    setSendingMessage(true)
    var formData = new FormData()
    var date = new Date().toTimeString()
    var textDiv = document.getElementById("message " + props.friendProfile.id)
    const text = textDiv?.textContent
    formData.append("SenderId",props.userProfile.id)
    formData.append("ReceiverId",props.friendProfile.id)
    if(image){
      formData.append("ImageContent",image)
    }
    else{
      formData.append("TextContent",text!)
    }
    formData.append("Date",date)
    console.log(image)
    axios.post(`${urlMessages}/send`,formData)
    textDiv!.innerHTML = ""

    setTimeout(()=> {
      setSendingMessage(false)
      axios.get(`${urlMessages}/getnewest/${props.userProfile.id}/${props.friendProfile.id}`)
      .then((response) => {
      setMessages([...messages,response.data[0]])
      setTimeout(() => {
        refScroll.current.scrollIntoView()
      }, 300);
    })
    },2000)
  }

  async function handleScroll(){
    var element = document.getElementById("modal-body-" + `${props.friendProfile.id}`)
    console.log(messages.length)
    console.log(numberOfMessagesStacks)
    if(element!.scrollTop < element!.clientHeight && (numberOfMessagesStacks-1)*15 == messages.length){
        setNumberOfMessagesStacks(numberOfMessagesStacks+1)
      
        getMessages()

    }
  }

  function removeSendingImage(){
    var senderImage = document.getElementById(`image-to-send + ${props.friendProfile.id}`)
    senderImage?.remove()
  }

  useEffect(()=>{
    setTextingDivState(textToSend == "" ? "chat-footer-text" : "long-message-text")
  },[textToSend])
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
            var opened = props.openChats.filter((item: { key: string; }) => item.key !== props.friendProfile.id)
            props.setOpenedChats(opened)
            props.setChatOpened(false)
            }}>
            X
          </div>
        </div>
        <div className="chat-body" id={"modal-body-" + `${props.friendProfile.id}`} onScroll={handleScroll}>
          <ListOfMessages messages={messages} userId={props.userProfile.id} friendId={props.friendProfile.id} friendProfileImage={image!}  refff={refScroll}/>        
        </div>
        <div className="chat-footer">
          {textToSend === "" ? ImageUpload : null}
          <div id={'message '+`${props.friendProfile.id}`} className={textingDivState} contentEditable
           onKeyDown={()=> {setTextToSend(document.getElementById(`message ${props.friendProfile.id}`)?.textContent!)}}>
            {baseImage ? <div id={`image-to-send +${props.friendProfile.id}`} className="sending-image">{imageName}<span onClick={removeSendingImage}>{deleteImage}</span></div>: null}
            </div>
          
          {textToSend === "" ? <img className="sendLikeBtn" src="/like.png" onClick={()=> sendMessage()}/> :
            <button id="sendMessageButton" disabled={sendingMessage} type="submit" className="sendMessageBtn"  onClick={()=> {
              sendMessage(baseImage)
              }}>
              <img className="chat-footer-sendMessage" src="/sendBtn.png"/>
            </button>
          }
        </div>
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

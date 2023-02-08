import { useContext, useEffect, useState } from "react";
import { ProfileFriendsContext } from "../Profile/ProfileContext";
import { Portal } from "../Utilities/Modal";
import ModalOpenedContext from "../Utilities/ModalOpenedContext";
import SearchContactsTypeahead from "../Utilities/SearchContactsTypehead";
import SearchTypeahead from "../Utilities/SearchTypeahead";
import { OpenedChatssContext } from "./ChatsOpenedContext";

export default function ContactModal(props: contactModalProps) {
  const { modalNotOpened, updateModalState } = useContext(ModalOpenedContext);
  const { profileFriends } = useContext(ProfileFriendsContext);
  const [visibleModal, setVisibleModal] = useState(true);



  useEffect(() => {
    if (props.doDisplay > 0) {
      setVisibleModal(true)
    } else {
      setVisibleModal(false)
    }
  }, [props.doDisplay]);
  const closeChatStyle : any = {
    position:'absolute',
    right:'0px',
    top:'4px'
  };
  const display = visibleModal ? 'flex' : 'none'
  return (
    <>
      <div className="contactModal" style={{display:display}}>
        <div className="contact-header">
          <SearchContactsTypeahead profiles={profileFriends} setVisibleModal={props.setDisplay}/>
          <div className="chat-close" style={closeChatStyle}><span onClick={() => {
            props.setDisplay(0)
            setVisibleModal(false)}}>X</span></div>
        </div>
      </div>
    </>
  );
}

interface contactModalProps {
  doDisplay:number;
  closeModal: any;
  setDisplay:any;
}

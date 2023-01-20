import GenericList from "../Utilities/GenericList";
import FriendMessage from "./FriendMessage";
import Message from "./Message";
import { messageDTO } from "./messages.models";

export default function ListOfMessages(props: listOfMessagesProps) {

    return (
      <GenericList list={props.messages}>
        <div className="list-of-messages">
        <span ref={props.ref2} id="scrollTo-span"></span>
          {props.messages ? props.messages?.map((message) => (

            props.userId == message.senderId ?
            (
             <Message key={message.id} id={message.id} message={message} fromMeMessage={true} friendProfileImage={props.friendProfileImage}/>

            )
            :
            <FriendMessage key={message.id} id={message.id} message={message} fromMeMessage={false} friendProfileImage={props.friendProfileImage}/>
              ))
            : "There are no contacts"}
            <span ref={props.ref1} id="scrollTo-span"></span>
        </div>
      </GenericList>
    );
  }
  interface  listOfMessagesProps {
    messages?: messageDTO[];
    userId:string;
    friendId:string;
    friendProfileImage:string;
    ref1:any;
    ref2:any;
  }

import GenericList from "../Utilities/GenericList";
import Message from "./Message";
import { messageDTO } from "./messages.models";

export default function ListOfMessages(props: listOfMessagesProps) {
    
    return (
      <GenericList list={props.messages}>
        <div className="list-of-messages">
          {props.messages ? props.messages?.map((message) => (

            props.userId == message.senderId ?
            (
             <Message key={message.id} message={message} fromMeMessage={true} friendProfileImage={props.friendProfileImage}/>

            )
            :
            <Message key={message.id} message={message} fromMeMessage={false} friendProfileImage={props.friendProfileImage}/>
              ))
            : "There are no contacts"}
            <span ref={props.refff} id="scrollTo-span"></span>
        </div>
      </GenericList>
    );
  }
  interface  listOfMessagesProps {
    messages?: messageDTO[];
    userId:string;
    friendId:string;
    friendProfileImage:string;
    refff:any;
  }
  
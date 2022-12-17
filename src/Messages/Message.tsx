import { messageDTO } from "./messages.models";

export default function Message(props: messageProps) {
  const messageStyle = (props.fromMeMessage ? "my" : "friend") + "-message";
  const messageColor = (props.fromMeMessage ? "rgb(147, 111, 189)" : "rgb(111, 172, 189)")
  const fromFriend = props.fromMeMessage ? "" : "message";
  const isText = props.message.imageContent ? false : true;
  return (
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
          <img className="message-image" src={props.message.imageContent} />
        </div>
      )}
    </div>
  );
}
interface messageProps {
  message: messageDTO;
  fromMeMessage: boolean;
  friendProfileImage: string;
}

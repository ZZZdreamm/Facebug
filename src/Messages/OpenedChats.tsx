import { profileDTO } from "../Profile/profiles.models";
import ChatWithFriend from "./ChatWithFriend";

export default function OpenedChats(props:openedChatsProps){
    return(
        <>
            <div className="listOfOpenedChats">
              {props.openedChats.map(
                // @ts-ignore
                ({ key, userProfile, friendProfile, setChatOpened }) => (
                  <ChatWithFriend
                    key={key}
                    userProfile={userProfile}
                    friendProfile={friendProfile}
                    setOpenedChats={props.updateChatsOpened}
                    openChats={props.openedChats}
                    setChatOpened={setChatOpened}
                  />
                )
              )}
            </div>
        </>
    )
}
interface openedChatsProps{
    openedChats:any;
    updateChatsOpened:any;
}
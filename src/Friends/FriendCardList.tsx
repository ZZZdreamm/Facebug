import GenericList from "../Utilities/GenericList";
import Friend from "./FriendInUserProfile";
import { profileDTO } from "../Profile/profiles.models";
import FriendCard from "./FriendCard";

export default function FriendsCardList(props: friendsListProps) {
  return (
    <GenericList list={props.friends}>
      <div className="listOfFriendCards">
        {props.friends
          ? props.friends?.map((friend) => (
             <FriendCard {...friend} key={friend.id}/>
            ))
          : "There are no friends"}
        
      </div>
    </GenericList>
  );
}
interface friendsListProps {
  friends?: profileDTO[];
}

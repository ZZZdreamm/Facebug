import GenericList from "../Utilities/GenericList";
import Friend from "./FriendInUserProfile";
import { profileDTO } from "../Profile/profiles.models";

export default function FriendsList(props: friendsListProps) {
  return (
    <GenericList list={props.friends}>
      <div className="listOfPosts">
        {props.friends
          ? props.friends?.map((friend) => (
              <Friend
                {...friend}
                key={friend.id}
                deleteFriend={() => {
                  props.deleteFriend(friend.id)
                }}
              />
            ))
          : "There are no friends"}
        
      </div>
    </GenericList>
  );
}
interface friendsListProps {
  friends?: profileDTO[];
  deleteFriend(id: string): void;
}

import GenericList from "../Utilities/GenericList";
import FriendRequest from "./FriendRequest";
import { friendRequest } from "./friends.models";

export default function FriendRequestsList(props: friendRequestsListProps) {
  return (
    <GenericList
      list={props.friendRequests}
      emptyListUI={
        <>
          <div className="noFriendRequests">If you get friend requests, you will see them there</div>
        </>
      }
    >
      <div className="listOfFriendRequests">
        {props.friendRequests
          ? props.friendRequests?.map((friendRequests) => (
              <FriendRequest {...friendRequests} key={friendRequests.id} />
            ))
          : "There are no friends"}
      </div>
    </GenericList>
  );
}
interface friendRequestsListProps {
  friendRequests?: friendRequest[];
}

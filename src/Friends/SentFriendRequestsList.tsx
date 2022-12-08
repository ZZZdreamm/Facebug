import GenericList from "../Utilities/GenericList";
import FriendRequest from "./FriendRequest";
import { friendRequest } from "./friends.models";
import SentFriendRequest from "./SentFriendRequest";

export default function SentFriendRequestsList(props: friendRequestsListProps) {
  return (
    <GenericList
      list={props.friendRequests}
      emptyListUI={
        <>
          <div className="noFriendRequests">If you get friend requests, you will see them there</div>
        </>
      }
    >
      <div className="listOfMyFriendRequests">
        {props.friendRequests
          ? props.friendRequests?.map((friendRequests) => (
              <SentFriendRequest {...friendRequests} key={friendRequests.id} />
            ))
          : "There are no friends"}
      </div>
    </GenericList>
  );
}
interface friendRequestsListProps {
  friendRequests?: friendRequest[];
}

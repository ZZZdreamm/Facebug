import axios, { AxiosResponse } from "axios";
import { useContext, useEffect, useState } from "react";
import { urlFriends } from "../apiPaths";
import ProfileContext from "../Profile/ProfileContext";
import GoBackButton from "../Utilities/GoBackButton";
import Modal from "../Utilities/Modal";
import FriendRequestsList from "./FriendRequestsList";
import { friendRequest } from "./friends.models";
import SentFriendRequestsList from "./SentFriendRequestsList";

export default function UserFriendsRequests() {
  const { profileDTO, updateProfile } = useContext(ProfileContext);
  const [friendRequests, setFriendRequests] = useState<friendRequest[]>([]);
  const [sentfriendRequests, setSentFriendRequests] = useState<friendRequest[]>(
    []
  );
  const [displayModal, setDisplayModal] = useState(0);
  const [amountOfSentRequests, setAmountOfSentRequests] = useState(0);

  useEffect(() => {
    if (
      profileDTO.email !== undefined &&
      profileDTO.email !== "null" &&
      profileDTO.email !== ""
    ) {
      axios
        .get(`${urlFriends}/yourFriendRequests/${profileDTO.id}`)
        .then((response: AxiosResponse<friendRequest[]>) => {
          setFriendRequests(response.data);
        });
      axios
        .get(`${urlFriends}/sentFriendRequests/${profileDTO.email}`)
        .then((response: AxiosResponse<friendRequest[]>) => {
          setSentFriendRequests(response.data);
        });
    }
  }, [profileDTO]);
  useEffect(() => {
    setAmountOfSentRequests(sentfriendRequests.length);
  }, [sentfriendRequests]);
  return (
    <>
      <div className="leftBar">
        <GoBackButton />
        <div className="yourRequests">
          <span>Friend Requests</span>
          <Modal
            modalDisplayer={
              <span
                className="showYourRequests"
                onClick={() => {
                  setDisplayModal(displayModal + 1);
                  console.log("oaksd");
                }}
              >
                Show your sent requests
              </span>
            }
            header={
              <>
                <div className="requestsModalHeader">Friend Requests</div>
                <span
                  className="closeModal"
                  onClick={() => {
                    setDisplayModal(displayModal - 1);
                  }}
                >
                  X
                </span>
              </>
            }
            body={
              <div className="requestsModalBody">
                <div className="sentRequests">
                  <span>Sent requests</span>
                  <SentFriendRequestsList friendRequests={sentfriendRequests} />
                </div>
              </div>
            }
            withFooter={false}
            doDisplay={displayModal}
          />
        </div>
      </div>
      <FriendRequestsList friendRequests={friendRequests} />
    </>
  );
}

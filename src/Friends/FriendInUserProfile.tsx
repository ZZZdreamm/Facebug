import axios, { AxiosResponse } from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReadyImagesURL, urlAccounts } from "../apiPaths";
import ProfileContext from "../Profile/ProfileContext";
import { profileDTO } from "../Profile/profiles.models";

export default function Friend(props: friendsProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [userProfile, setUserProfile] = useState<profileDTO>();
  const { profileDTO } = useContext(ProfileContext);
  const [image, setImage] = useState<string>();
  const navigate = useNavigate();
  const [friendIsNotUser, setFriendIsNotUser] = useState(true);

  useEffect(() => {
    axios
      .post(`${urlAccounts}/loginProfile/${props.email}`)
      .then((response: AxiosResponse<profileDTO>) => {
        setUserProfile(response.data);
      });
  }, []);

  useEffect(() => {
    if (
      props.profileImage === "undefined" ||
      props.profileImage === "null" ||
      props.profileImage === undefined ||
      props.profileImage === null
    ) {
      setImage(`${ReadyImagesURL}/noProfile.jpg`);
      return;
    }
    setImage(props.profileImage);
  }, [props.profileImage]);

  useEffect(() => {
    if (userProfile && profileDTO) {
      if (userProfile!.id == profileDTO.id) {
        setFriendIsNotUser(false);
      }
    }
  }, [userProfile]);

  function changeModalState() {
    if (modalVisible === false) {
      setModalVisible(true);
      return;
    }
    setModalVisible(false);
  }
  function goToFriendProfile() {
    navigate(`/profile/${userProfile?.email}`);
    navigate(0);
  }
  return (
    <div className="friendBlock">
      <img
        className="friendImage"
        src={`${image}`}
        onClick={goToFriendProfile}
      />
      <span className="friendSmallInfo" onClick={goToFriendProfile}>
        {props.email}
      </span>
      {friendIsNotUser ? (
        <div className="friendOptions" onClick={() => changeModalState()}>
          <img
            className="moreOptionsImg"
            src={`${ReadyImagesURL}/moreOptions.png`}
          />
          {modalVisible && (
            <div className="moreOptionsAboutFriend">
              <span
                className="deleteOption"
                onClick={() => props.deleteFriend(userProfile!.email)}
              >
                Delete Friend
              </span>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
interface friendsProps {
  profileImage?: string;
  email: string;
  deleteFriend(id: string): void;
}

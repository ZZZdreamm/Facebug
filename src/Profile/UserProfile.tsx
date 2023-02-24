import axios, { Axios, AxiosResponse } from "axios";
import { Form, Formik, FormikHelpers, FormikValues } from "formik";
import { ReactElement, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { urlAccounts, urlFriends, urlPosts } from "../apiPaths";
import { userCredentials } from "../auth/auth.models";
import ImageContainer from "../Forms/ImageContainer";
import ImageField from "../Forms/ImageField";
import PostsList from "../Posts/PostsList";
import Button from "../Utilities/Button";
import { convertProfileToFormData } from "../Utilities/FormDataUtils";
import ImageUploader from "../Utilities/ImageUploader";
import Friend from "../Friends/FriendInUserProfile";
import FriendsList from "../Friends/FriendsList";
import { getProfile, saveProfile } from "./HandleProfile";
import ProfileContext, {
  ProfileFriendRequestsContext,
  ProfileFriendsContext,
  ProfilePostsContext,
} from "./ProfileContext";
import { profileDTO, profileImageCreationDTO } from "./profiles.models";
import { friendRequest } from "../Friends/friends.models";
import { boolean } from "yup";
import { BlobOptions } from "buffer";
import { FetchJsonData } from "../Utilities/FetchJsonData";

export default function UserProfile() {
  const { profileDTO, updateProfile } = useContext(ProfileContext);
  const { profileFriends, updateFriends } = useContext(ProfileFriendsContext);
  const { profileFriendRequests, updateFriendRequests } = useContext(
    ProfileFriendRequestsContext
  );
  const [userProfile, setUserProfile] = useState<profileDTO>();
  const [belowImageContent, setBelowImageContent] = useState<ReactElement>(
    <></>
  );
  const [posts, setPosts] = useState<postDTO[]>();
  const [friends, setFriends] = useState<profileDTO[]>([]);
  const [notMyProfile, setNotMyProfile] = useState(true);
  const [notInMyFriends, setNotInMyFriends] = useState(true);
  const [notInMySentFriendRequests, setNotInMySentFriendRequests] =
    useState(true);

  const { fileToData, baseImage, ImageUpload, chooseModal } = ImageUploader({
    textContent: "Choose new photo",
    image: `${userProfile?.profileImage}`,
    onChange() {
      uploadImageToDatabase(fileToData!);
    },
  });

  const { id } = useParams();
  const navigate = useNavigate();

  let belowImageContentNumber = 1;

  useEffect(() => {
    openProfile(id!);
    loadData(id!);
  }, []);

  useEffect(() => {
    if (profileDTO.id == userProfile?.id) {
      setNotMyProfile(false);
    }
    if (
      userProfile?.id != undefined &&
      profileFriends != null &&
      profileFriends != undefined
    ) {
      const jsonFriends = JSON.stringify(profileFriends);
      const jsonRequests = JSON.stringify(profileFriendRequests);

      if (jsonFriends != "[]") {
        fetch(`${urlFriends}/checkIfInMyFriends/${userProfile?.id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: jsonFriends,
        }).then((response) => {
          response.json().then((data) => {
            if (data == false) {
              setNotInMyFriends(data);
            }
          });
        });
        fetch(`${urlFriends}/checkIfInMyRequests/${userProfile?.id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: jsonRequests,
        }).then((response) => {
          response.json().then((data) => {
            if (data == false) {
              setNotInMySentFriendRequests(data);
            }
          });
        });
        // var friendRequestsResult = FetchJsonData(profileFriendRequests,`${urlFriends}/checkIfInMyRequests/${userProfile?.id}`)
        // console.log(friendRequestsResult)
        // if(notInMyFriends == true){
        //   setNotInMyFriends(friendRequestsResult)
        // }
      }
    }
    chooseContent(belowImageContentNumber);
    console.log(profileDTO);
  }, [userProfile, profileFriends, profileFriendRequests]);

  function openProfile(email: string) {
    axios
      .post(`${urlAccounts}/loginProfile/${email}`)
      .then((response: AxiosResponse<profileDTO>) => {
        setUserProfile(response.data);
      });
  }

  function loadData(email: string) {
    axios({
      method: "GET",
      url: `${urlPosts}/userPosts/${email}`,
    }).then((response: AxiosResponse<postDTO[]>) => {
      setPosts(response.data);
    });
    axios({
      method: "GET",
      url: `${urlFriends}/userFriends/${email}`,
    }).then((response: AxiosResponse<profileDTO[]>) => {
      // var friendss = response.data.filter((friend) => friend.id != profileDTO.id)
      setFriends(response.data);
    });
  }
  function chooseContent(id: number) {
    if (belowImageContentNumber === 1) {
      setBelowImageContent(<PostsList posts={posts} />);
      return;
    }
    if (belowImageContentNumber === 2) {
      setBelowImageContent(
        <FriendsList friends={friends} deleteFriend={deleteFriend} />
      );
      return;
    }
  }

  function showImage() {}

  async function uploadImageToDatabase(image: File) {
    const profile: profileImageCreationDTO = {
      id: userProfile!.id,
      email: userProfile!.email,
      profileImage: image,
    };
    const formData = convertProfileToFormData(profile);
    await axios({
      method: "POST",
      url: `${urlAccounts}/profileImage`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });

    const profilesChanges = await axios.post<profileDTO>(
      `${urlAccounts}/loginProfile/${profileDTO.email}`
    );
    console.log(profilesChanges.data);
    saveProfile(profilesChanges.data);
    updateProfile(getProfile());
    setTimeout(() => {
      navigate(0);
    }, 300);
    // setTimeout(() => {
    //   console.log(getProfile())
    //   console.log(profileDTO)
    // }, 2000);
  }

  // useEffect(()=>{
  //   updateProfile(getProfile());
  //   console.log(profileDTO)
  // }, [profileDTO])

  function sendFriendRequest() {
    axios.post(
      `${urlFriends}/sendFriendRequest/${profileDTO.id}/${userProfile?.id}`
    );
    setNotInMySentFriendRequests(false);
  }

  function cancelSentRequest() {
    axios.delete(
      `${urlFriends}/cancelSentRequest/${profileDTO.id}/${userProfile?.id}`
    );
    setNotInMySentFriendRequests(true);
  }

  const [loading, setLoading] = useState(true);
  async function deleteFriend(friendId: string) {
    console.log(friends);
    await axios
      .delete(`${urlFriends}/removeFriend/${profileDTO.id}/${friendId}`)
      .then(() => {
        axios({
          method: "GET",
          url: `${urlFriends}/userFriends/${userProfile?.email}`,
        }).then((response: AxiosResponse<profileDTO[]>) => {
          setFriends(response.data);
          setLoading(false);
        });
      });
    console.log(friends);
    setContent();
  }
  useEffect(() => {
    if (loading) {
      chooseContent(belowImageContentNumber);
      return;
    }
    setBelowImageContent(
      <FriendsList friends={friends} deleteFriend={deleteFriend} />
    );
  }, [friends]);
  function setContent() {
    console.log(friends);
    setBelowImageContent(
      <FriendsList friends={friends} deleteFriend={deleteFriend} />
    );
  }
  // useEffect(()=>{
  //   console.log(friends);
  //   console.log(userProfile)
  // },[friends])
  return (
    <>
      <div className="profile-container">
        <div className="imageContainer">
          <img
            className="profileImage"
            src={baseImage}
            alt="Profile Image"
            onClick={() => showImage()}
          />
          {notMyProfile ? null : (
            <div className="imageChangeOptions">
              {ImageUpload}
              {chooseModal}
            </div>
          )}
        </div>
        <div className="profile-buttonsContainer">
          <button
            className="profileBtn"
            style={{ margin: "10px" }}
            onClick={() => {
              belowImageContentNumber = 1;
              chooseContent(belowImageContentNumber);
            }}
          >
            Posts
          </button>
          <button
            className="profileBtn"
            style={{ margin: "10px" }}
            onClick={() => {
              belowImageContentNumber = 2;
              chooseContent(belowImageContentNumber);
            }}
          >
            Friends
          </button>
          {notInMyFriends && notMyProfile && notInMySentFriendRequests ? (
            <button
              className="profileBtn"
              style={{ margin: "10px" }}
              onClick={() => {
                sendFriendRequest();
              }}
            >
              Add To Friends
            </button>
          ) : null}
          {notInMySentFriendRequests ? null : (
            <button
              className="requestAlreadySent"
              style={{ margin: "10px" }}
              onClick={() => {
                cancelSentRequest();
              }}
            >
              Friend Request sent X
            </button>
          )}
        </div>
        {/* <button
          className="profileBtn"
          style={{ margin: "10px" }}
          onClick={() => {
            belowImageContentNumber = 3;
            chooseContent(belowImageContentNumber);
          }}
        >
          Photos
        </button>
        <button
          className="profileBtn"
          style={{ margin: "10px" }}
          onClick={() => {
            belowImageContentNumber = 4;
            chooseContent(belowImageContentNumber);
          }}
        >
          Info
        </button>  */}
      </div>
      <div className="profileInfo-container">{belowImageContent}</div>
    </>
  );
}

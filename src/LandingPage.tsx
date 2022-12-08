import axios, { AxiosResponse } from "axios";
import { ReactElement, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { urlPosts } from "./apiPaths";
import Authorized from "./auth/Authorized";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ListOfContacts from "./Friends/ListOfContacts";
import PostContainer from "./Posts/PostContainer";
import PostForm from "./Posts/PostForm";
import PostsList from "./Posts/PostsList";
import ProfileContext, {
  ProfileFriendsContext,
} from "./Profile/ProfileContext";
import Button from "./Utilities/Button";
import GenericList from "./Utilities/GenericList";

export default function LandingPage() {
  const [posts, setPosts] = useState<postDTO[]>();
  const { profileDTO } = useContext(ProfileContext);
  const { profileFriends } = useContext(ProfileFriendsContext);

  let [openedChats,setOpenedChats] = useState<[]>([])

  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  function loadData() {
    axios.get(`${urlPosts}/all`).then((response: AxiosResponse<postDTO[]>) => {
      setPosts(response.data);
    });
  }

  return (
    <>
      <Authorized
        isAuthorized={
          <>
            <PostForm
              model={{
                autorName: `${profileDTO.email}`,
                textContent: "",
                autorProfileImage: `${profileDTO.profileImage}`,
              }}
              imageURL={""}
            />

            <div className="events-friends-etc">
              <span
                className="event"
                onClick={() => {
                  navigate(`/profile/${profileDTO.email}`);
                }}
              >
                <img
                  className="profile-image postForm-image"
                  src={profileDTO.profileImage}
                  style={{ marginLeft: "10px", marginRight: "10px" }}
                />
                <Button className="custom-eventsBtn">{profileDTO.email}</Button>
              </span>
              <span
                className="event"
                onClick={() => {
                  navigate(`/friends/${profileDTO.email}`);
                }}
              >
                <img className="event-image" src="/friends.png" />
                <Button className="custom-eventsBtn">Friends</Button>
              </span>
            </div>

            <div className="rightBar">
              <span className="contacts">Contacts
                <img className="contacts-search" src="/search.png"/>
              </span>
              <ListOfContacts friends={profileFriends}  setCurrentOpenChats={setOpenedChats} openChats={openedChats}/>
            </div>
            <div className="listOfOpenedChats">
              {openedChats}
            </div>
          </>
        }
      />

      {posts ? (
        <div className="allPosts">
          <PostsList posts={posts} />
        </div>
      ) : (
        <div className="postsList">
          <PostsList posts={posts} />
        </div>
      )}
    </>
  );
}

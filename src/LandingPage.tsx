import axios, { AxiosResponse } from "axios";
import { ReactElement, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { urlPosts } from "./apiPaths";
import Authorized from "./auth/Authorized";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ListOfContacts from "./Friends/ListOfContacts";
import { OpenedChatssContext } from "./Messages/ChatsOpenedContext";
import ChatWithFriend from "./Messages/ChatWithFriend";
import PostContainer from "./Posts/PostContainer";
import PostForm from "./Posts/PostForm";
import PostsList from "./Posts/PostsList";
import ProfileContext, {
  ProfileFriendsContext,
} from "./Profile/ProfileContext";
import Button from "./Utilities/Button";
import GenericList from "./Utilities/GenericList";
import useIsInViewPort from "./Utilities/IsInViewPort";

export default function LandingPage() {
  const [posts, setPosts] = useState<postDTO[]>();
  const { profileDTO } = useContext(ProfileContext);
  const { profileFriends } = useContext(ProfileFriendsContext);

  const { openedChats, updateChatsOpened } = useContext(OpenedChatssContext);

  const navigate = useNavigate();
  const [currentAmountOfMessages, setCurrentAmountOfMessages] = useState(1);

  const refPosts = useRef<any>(null);

  useEffect(() => {
    getMorePosts();
  }, []);

  var scrolledPageBottom = useIsInViewPort(refPosts);
  useEffect(() => {
    window.onscroll = (e) => {
      if (scrolledPageBottom) {
        setCurrentAmountOfMessages(currentAmountOfMessages + 1);
        getMorePosts();
      }
    };
  }, [scrolledPageBottom]);

  function getMorePosts() {
    axios
      .get(`${urlPosts}/getMore/${currentAmountOfMessages}`)
      .then((response: AxiosResponse<postDTO[]>) => {
        setPosts(response.data);
      });
    console.log("polak");
  }
  // function handleScroll() {
  //   if (window!.scrollY < elementtt!.clientHeight && (currentAmountOfMessages) * 10 == posts!.length) {
  //     setCurrentAmountOfMessages(currentAmountOfMessages + 1);
  //     getMorePosts();
  //   }
  //   console.log('polak')
  // }

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
              <span className="contacts">
                Contacts
                <img className="contacts-search" src="/search.png" />
              </span>
              <ListOfContacts
                friends={profileFriends}
                setCurrentOpenChats={updateChatsOpened}
                openChats={openedChats}
              />
            </div>
          </>
        }
      />

      <div>
        {posts ? (
          <div className="allPosts">
            <PostsList posts={posts} />
          </div>
        ) : (
          <div className="postsList">
            <PostsList posts={posts} />
          </div>
        )}
        <span ref={refPosts}></span>
      </div>
    </>
  );
}

import React, { useEffect, useState, useRef, useContext } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Menu from "./Menu";
import routes from "./route-config";
import Login from "./auth/Login";
import Authorized from "./auth/Authorized";
import PostModal from "./Posts/PostModal";
import configureInterceptor from "./Utilities/httpInterceptors";
import AuthenticationContext from "./auth/AuthenticationContext";
import { claim, userCredentials } from "./auth/auth.models";
import { getClaims } from "./auth/HandleJWT";
import ProfileContext, {
  ProfileFriendRequestsContext,
  ProfileFriendsContext,
  ProfilePostsContext,
} from "./Profile/ProfileContext";
import { profileDTO } from "./Profile/profiles.models";
import { getProfile } from "./Profile/HandleProfile";
import axios, { AxiosResponse } from "axios";
import { urlAccounts, urlFriends, urlPosts } from "./apiPaths";
import ModalOpenedContext from "./Utilities/ModalOpenedContext";
import { friendRequest } from "./Friends/friends.models";
import ChatsOpenedContext from "./Messages/ChatsOpenedContext";

configureInterceptor();

function App() {
  const [claims, setClaims] = useState<claim[]>([]);
  const [profileDTO, setProfileDTO] = useState<profileDTO>({
    email: "",
    id: "",
  });
  const [profilePosts, setProfilePosts] = useState<postDTO[]>([]);
  const [profileFriends, setProfileFriends] = useState<profileDTO[]>([]);
  const [profileFriendRequests, setProfileFriendRequests] = useState<
    friendRequest[]
  >([]);

  const [modalNotOpened, setModalNotOpened] = useState<boolean>(true);

  const [amountOfChatsOpened,setAmountOfChatsOpened] = useState(0)

  useEffect(() => {
    setClaims(getClaims());
    setProfileDTO(getProfile());
  }, [localStorage]);
  useEffect(() => {
    if (
      profileDTO.email !== undefined &&
      profileDTO.email !== "null" &&
      profileDTO.email !== ""
    ) {
      axios({
        method: "GET",
        url: `${urlPosts}/userPosts/${profileDTO.email}`,
      }).then((response: AxiosResponse<postDTO[]>) => {
        setProfilePosts(response.data);
      });
      axios({
        method: "GET",
        url: `${urlFriends}/userFriends/${profileDTO.email}`,
      }).then((response: AxiosResponse<profileDTO[]>) => {
        setProfileFriends(response.data);
      });


      axios({
        method: "GET",
        url: `${urlFriends}/sentFriendRequests/${profileDTO.email}`,
      }).then((response: AxiosResponse<friendRequest[]>) => {
        setProfileFriendRequests(response.data);
      });
    }
  }, [profileDTO]);
  
  function isAdmin() {
    return (
      claims.findIndex(
        (claim) => claim.name === "role" && claim.value === "admin"
      ) > -1
    );
  }

  var className =
    "pointer-events" + (modalNotOpened ? "-enabled" : "-disabled");

  return (
    <BrowserRouter>
      <AuthenticationContext.Provider value={{ claims, update: setClaims }}>
        <ProfileContext.Provider
          value={{ profileDTO, updateProfile: setProfileDTO }}
        >
          <ProfileFriendsContext.Provider
            value={{ profileFriends, updateFriends: setProfileFriends }}
          >
            <ProfilePostsContext.Provider
              value={{ profilePosts, updatePosts: setProfilePosts }}
            >
              <ProfileFriendRequestsContext.Provider
                value={{ profileFriendRequests, updateFriendRequests: setProfileFriendRequests }}
              >
                <ModalOpenedContext.Provider
                  value={{
                    modalNotOpened,
                    updateModalState: setModalNotOpened,
                  }}
                >
                  <ChatsOpenedContext.Provider value={{amountOfChatsOpened,updateAmountOfChatsOpened: setAmountOfChatsOpened}}>
                  <div className={className}>
                    <div className="wrapper">
                      <Menu></Menu>
                      <Routes>
                        {routes.map((route) => (
                          <Route
                            key={route.path}
                            path={route.path}
                            element={<route.component />}
                          />
                        ))}
                      </Routes>
                    </div>
                  </div>
                  </ChatsOpenedContext.Provider>
                </ModalOpenedContext.Provider>
              </ProfileFriendRequestsContext.Provider>
            </ProfilePostsContext.Provider>
          </ProfileFriendsContext.Provider>
        </ProfileContext.Provider>
      </AuthenticationContext.Provider>
    </BrowserRouter>
  );
}

export default App;

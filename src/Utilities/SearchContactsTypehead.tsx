import { css } from '@emotion/react'
import axios, { AxiosResponse } from "axios";
import { ReactElement, useContext, useEffect, useState } from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import {
  Link,
  Navigate,
  NavLink,
  redirect,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { urlAccounts } from "../apiPaths";
import { OpenedChatssContext } from '../Messages/ChatsOpenedContext';
import ProfileContext, { ProfileFriendsContext } from "../Profile/ProfileContext";
import { profileDTO } from "../Profile/profiles.models";
import UserProfile from "../Profile/UserProfile";
import UserImage from "./UserImage";


export default function SearchContactsTypeahead(props: searchTypeaheadProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [profiles, setProfiles] = useState<profileDTO[]>([]);
  const { profileDTO, updateProfile } = useContext(ProfileContext);
  const { openedChats, updateChatsOpened } = useContext(OpenedChatssContext);
  const [chatOpened, setChatOpened] = useState(false)
  const {profileFriends, updateFriends} = useContext(ProfileFriendsContext)

  const navigate = useNavigate();
  function handleSearch(query: string) {
    setIsLoading(true);

    axios
      .get(`${urlAccounts}/searchByName/${query}/${profileDTO.email}`)
      .then((response: AxiosResponse<profileDTO[]>) => {
        var friends : any = []
        response.data.forEach(profile => {
          profileFriends.forEach(profileFriend => {
            console.log(profileFriend.id)
            if(profile.id == profileFriend.id){
              friends.push(profile)
            }
          })
        });
        setProfiles(friends);
        setIsLoading(false);
      });
  }
  // THAT IS SHITTY ROZWIAZANIE
  // function goIntoProfile(profileEmail: string) {
  //   navigate(`/profile/${profileEmail}`);
  //   navigate(0)
  // }

  return (
    <>
      <div style={{width:'350px'}}>
        <AsyncTypeahead
          id="typeahead"
          onChange={(profiles: profileDTO[]) => {
            // if(props.profiles.findIndex((x) => x.id === profiles[0].id) === -1){
            //   props.onAdd(...props.profiles, profiles[0])
            //   console.log(profiles)
            // }
          }}
          labelKey={(profile: profileDTO) => profile.email}
          isLoading={false}
          onSearch={handleSearch}
          options={profiles}
          placeholder="Search person.."
          filterBy={() => true}
          minLength={1}
          flip={true}
          renderMenuItemChildren={(profile: profileDTO) => (
            <>
              <div
                onClick={()=>{
                  var chats =  openedChats.filter((x:any) => x.key == profile.id)
                  // if (chats.length == 0)
                  if(chats.length == 0){
                      setChatOpened(true)
                      // @ts-ignore
                      updateChatsOpened([...openedChats,
                          {key:profile.id,userProfile:profileDTO,friendProfile:profile,
                               setChatOpened:setChatOpened}])
                      props.setVisibleModal(0)
                  }
                  // var typeahead = document.getElementsByClassName('rbt-input-main form-control rbt-input')[0]
                  // typeahead.nodeValue = ''
                  // var asyncTypeAhead = typeAhead as AsyncTypeahead;
                  // asyncTypeAhead.getInstance().clear();
                  // console.log(typeahead)
                  // setTimeout(()=>{
                  //   console.log(typeahead)
                  //   typeahead.value = ''
                  // }, 1000)
                  // // typeahead.value = ''

              }}
              >
                <UserImage profileImage={profile.profileImage} />
                <span>{profile.email}</span>
              </div>
            </>
          )}
        />

      </div>

    </>
  );
}

interface searchTypeaheadProps {
  profiles: profileDTO[];
  setVisibleModal:any;
  //  onAdd(profiles: profileDTO[]): void;
  //   listUI(profile: profileDTO): ReactElement;
  //   onClick(profile: profileDTO): void;
}

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
import ProfileContext from "../Profile/ProfileContext";
import { profileDTO } from "../Profile/profiles.models";
import UserProfile from "../Profile/UserProfile";
import UserImage from "./UserImage";

export default function SearchTypeahead(props: searchTypeaheadProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [profiles, setProfiles] = useState<profileDTO[]>([]);
  const { profileDTO, updateProfile } = useContext(ProfileContext);

  const navigate = useNavigate();

  function handleSearch(query: string) {
    setIsLoading(true);

    axios
      .get(`${urlAccounts}/searchByName/${query}/${profileDTO.email}`)
      .then((response: AxiosResponse<profileDTO[]>) => {
        setProfiles(response.data);
        setIsLoading(false);
      });
  }
  // THAT IS SHITTY ROZWIAZANIE
  function goIntoProfile(profileEmail: string) {
    navigate(`/profile/${profileEmail}`);
    navigate(0)
  }

  return (
    <>
      <div style={{ width: "350px" }}>
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
                onClick={() => {
                  goIntoProfile(profile.email);
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
  //  onAdd(profiles: profileDTO[]): void;
  //   listUI(profile: profileDTO): ReactElement;
  //   onClick(profile: profileDTO): void;
}

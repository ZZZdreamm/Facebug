import axios, { AxiosResponse } from "axios";
import {
  MouseEventHandler,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
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
import { autocomplete } from "@algolia/autocomplete-js";
//@ts-ignore
import {
  createLocalStorageRecentSearchesPlugin,
  search,
} from "@algolia/autocomplete-plugin-recent-searches";
import AddItemToSetStateList from "./AddItemToSetStateList";
import { render } from "react-dom";
import { rename } from "fs";
import useCookies from "react-cookie/cjs/useCookies";

export default function SearchTypeahead(props: searchTypeaheadProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [profiles, setProfiles] = useState<profileDTO[]>([]);
  const { profileDTO, updateProfile } = useContext(ProfileContext);
  const [enteredText, setEnteredText] = useState("");

  const navigate = useNavigate();

  // const [cookies, setCookies] = useCookies()

  function handleSearch(query: string) {
    setIsLoading(true);
    if (query == "") {
      showLastSearches();
    } else {
      axios
        .get(`${urlAccounts}/searchByName/${query}/${profileDTO.email}`)
        .then((response: AxiosResponse<profileDTO[]>) => {
          setProfiles(response.data);
          setIsLoading(false);
        });
    }
  }
  // THAT IS SHITTY ROZWIAZANIE
  function goIntoProfile(profileEmail: string) {
    navigate(`/profile/${profileEmail}`);
    navigate(0);
  }

  async function showLastSearches() {
    if (enteredText == "") {
      if(recentSeaches.length > 5){
        var lastFiveSearches = lastSearches.slice(recentSeaches.length-5,recentSeaches.length )
      }else{
        var lastFiveSearches = lastSearches.slice(0,recentSeaches.length)
      }
      var lastSearches = JSON.parse(localStorage.getItem("recentSearches")!);
      setRecentSearches(lastFiveSearches);
    }
  }
  const [recentSeaches, setRecentSearches] = useState<profileDTO[]>([]);
  const [showSearches, setShowSearches] = useState(false)
  useEffect(() => {
    if(recentSeaches.length > 5){
      localStorage.removeItem('recentSearches')
      localStorage.setItem("recentSearches", JSON.stringify(recentSeaches));
      var searches =  JSON.parse(localStorage.getItem("recentSearches")!)
      console.log(recentSeaches)
      setRecentSearches(searches.slice(searches.length-5, searches.length))
    }else{
      localStorage.setItem("recentSearches", JSON.stringify(recentSeaches));
    }
  }, [recentSeaches]);
  const [choosingProfile, setChoosingProfile] = useState(true);


  return (
    <>
      <div className="typeaheadContainer">
        <div className="typeahead-with-searches">
          <input
            type="text"
            className="searchTypeahead"
            value={enteredText}
            placeholder="Search person..."
            id="async-typeahead"
            onFocus={(e: React.ChangeEvent<HTMLInputElement>) => {
              setEnteredText(e.target.value);
              handleSearch(e.target.value);
              setChoosingProfile(true);
              setShowSearches(true)
            }}
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {
              setTimeout(() => {
                setShowSearches(false)
              }, 100);
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setChoosingProfile(true);
              setEnteredText(e.target.value);
              handleSearch(e.target.value);
              setShowSearches(true)
            }}
          />
          <div className="typeahead-searches">
            {(enteredText !== "" &&
              choosingProfile && showSearches) &&
              profiles.map((profile) => (
                <div
                  key={profile.id}
                  className="search-option"
                  onClick={() => {
                    AddItemToSetStateList(
                      recentSeaches,
                      setRecentSearches,
                      profile
                    );
                    setProfiles([]);
                    setEnteredText("");
                    setChoosingProfile(true);
                    goIntoProfile(profile.email);

                  }}
                >
                  <UserImage profileImage={profile.profileImage} />
                  <span>{profile.email}</span>
                </div>
              ))}
            {(enteredText === "" &&
              choosingProfile && showSearches) &&
              recentSeaches.map((profile) => (
                <div
                  key={profile.id}
                  className="search-option"
                  onClick={() => {
                    AddItemToSetStateList(
                      recentSeaches,
                      setRecentSearches,
                      profile
                    );
                    setProfiles([]);
                    setEnteredText("");
                    setChoosingProfile(true);
                    goIntoProfile(profile.email);
                  }}
                >
                  <UserImage profileImage={profile.profileImage} />
                  <span>{profile.email}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

interface searchTypeaheadProps {
  profiles: profileDTO[];
}

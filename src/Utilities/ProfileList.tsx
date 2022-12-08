import { useNavigate } from "react-router-dom";
import { profileDTO } from "../Profile/profiles.models";
import GenericList from "./GenericList";
import UserImage from "./UserImage";

export default function ProfileList(props: profilesListProps) {
  const navigate = useNavigate();
  function goIntoProfile(profileEmail: string) {
    navigate(`/profile/${profileEmail}`);
  }

  return (
    <GenericList list={props.profiles}>
      <div className="listOfPosts">
        {props.profiles?.map((profile) => (
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
        ))}
      </div>
    </GenericList>
  );
}

interface profilesListProps {
  profiles?: profileDTO[];
}

export default function UserImage(props:userImageProps){
    return(
        <img
        className="profile-image postForm-image"
        src={props.profileImage}
        alt="profile"
      />
    )
}
interface userImageProps{
    profileImage:string;
}
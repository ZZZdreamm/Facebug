import React from "react";
import { userCredentials } from "../auth/auth.models";
import { friendRequest } from "../Friends/friends.models";
import { profileDTO } from "./profiles.models.d";

const profile: profileDTO = { id: "", email: "" };
const ProfileContext = React.createContext<{
    profileDTO:profileDTO;
    updateProfile(profileDTO:profileDTO):void;  
}>({profileDTO:profile,updateProfile: () => {}});

export default ProfileContext;

const friends: profileDTO[] =[];
const ProfileFriendsContext = React.createContext<{
    profileFriends:profileDTO[];
    updateFriends(profileFriends:profileDTO[]):void;  
}>({profileFriends:friends,updateFriends: () => {}});


const posts: postDTO[] = []
const ProfilePostsContext = React.createContext<{
    profilePosts:postDTO[];
    updatePosts(profilePosts:postDTO[]):void;  
}>({profilePosts:posts,updatePosts: () => {}});



const friendsRequests: friendRequest[] = []
const ProfileFriendRequestsContext = React.createContext<{
    profileFriendRequests:friendRequest[];
    updateFriendRequests(profileFriendRequests:friendRequest[]):void;  
}>({profileFriendRequests:friendsRequests,updateFriendRequests: () => {}});


export {ProfileFriendsContext,ProfilePostsContext,ProfileFriendRequestsContext};



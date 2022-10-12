import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { urlPosts } from "./apiPaths";
import Authorized from "./auth/Authorized";
import Login from "./auth/Login";
import Register from "./auth/Register";
import PostContainer from "./Posts/PostContainer";
import PostForm from "./Posts/PostForm";
import PostsList from "./Posts/PostsList";
import GenericList from "./Utilities/GenericList";

export default function LandingPage(){
    const [posts,setPosts] = useState<postDTO[]>();

    useEffect(()=>{
        loadData();
    },[])

    function loadData() {
        axios.get(`${urlPosts}/all`).then((response: AxiosResponse<postDTO[]>) => {
            setPosts(response.data);
        });
      }
    return (
        <>
            <PostForm model={{autorName:"Kacper Multan",textContent:"", autorProfileImage:"profile-image.jpg"}} profileName={"Kacper"} profileSurname={"Multan"} imageURL={""}/> 
            {posts? <PostsList posts={posts}/>:  <div className="postsList">
            <PostsList posts={posts}/>
            </div>}
                
        </>
    )
}
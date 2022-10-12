import axios from "axios";
import { useState } from "react"
import { urlPosts } from "../apiPaths";

export default function CreatePost(){
    const [posts,setPosts] = useState();

    function createPost(){
        try{
            axios.post(`${urlPosts}/post`);
        }catch(error){

        }
    }
    return(
        <>
            <input onClick={()=> createPost()}></input>
        </>
    )
}
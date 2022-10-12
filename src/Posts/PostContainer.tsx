import { useEffect } from "react";
import Button from "../Utilities/Button";
import UserImage from "../Utilities/UserImage";

export default function PostContainer(props:postDTO){

    let isNoImage:boolean = true;
    useEffect(() =>{
        if (props.mediaFile) {
            isNoImage = false;
        }
        console.log(isNoImage);
    })
    return(
        <>
        {isNoImage ?  <div className="postContainer-withoutImage">
        <div className="postContainer-post">
            <div className="postContainer-post-header">
                <UserImage profileImage={props.autorProfileImage}/><span className="postContainer-post-autorName">{props.autorName}</span>
            </div>
            <div className="postContainer-post-text">
            {props.textContent}
            </div>
            
            <div className="postContainer-post-footer">
                <button className="likeBtn">Like</button>
                <button className="commentBtn">Comment</button>
            </div>
        </div>

    </div>


    :
    
    
    <div className="postContainer-withImage">
        <div className="postContainer-post">
            <div className="postContainer-post-header">
                <UserImage profileImage={props.autorProfileImage}/><span className="postContainer-post-autorName">{props.autorName}</span>
            </div>
            <div className="postContainer-post-text">
            {props.textContent}
            </div>
            <div className="postContainer-post-image">
                {!props.mediaFile}
            </div>
            
            <div className="postContainer-post-footer">
                <Button>Like</Button>
            </div>
        </div>

        <div className="postContainer-space">

        </div>
    </div>}
    </>
    )
}

import GenericList from "../Utilities/GenericList";
import PostContainer from "./PostContainer";

export default function PostsList(props:postsListProps){
    return <GenericList list={props.posts}>
        <div className="listOfPosts">
            {props.posts?.map((post) => 
            (
                <PostContainer {...post} key={post.id}/>
                
            ))}
       </div>

    </GenericList>
}

interface postsListProps{
    posts?:postDTO[];
}
interface commentsDTO{
    id:number;
    postId:number;
    autorName:string;
    textContent:string;
    autorProfileImage:string;
}
interface commentsCreationDTO{
    postId:number;
    autorId:string;
    textContent:string;
}
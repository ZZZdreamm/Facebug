interface postCreationDTO{
    autorName:string;
    textContent:string;
    mediaFile?:File;
    autorProfileImage:string;
}
interface postDTO{
    id:number;
    autorName:string;
    textContent:string;
    mediaFile?:File;
    amountOfComments:number;
    amountOfLikes:number;
    autorProfileImage:string;
}
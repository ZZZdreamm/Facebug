interface postCreationDTO{
    autorName:string;
    textContent:string;
    mediaFile?:File;
}
interface postDTO{
    id:number;
    autorName:string;
    textContent:string;
    mediaFile?:string;
    amountOfComments:number;
    amountOfLikes:number;
    autorProfileImage:string;
}
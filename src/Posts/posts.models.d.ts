interface postCreationDTO{
    autorName:string;
    textContent:string;
    mediaFile?:File;
    autorProfileImage?:string;
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
import { format } from "path";
import { profileDTO, profileImageCreationDTO } from "../Profile/profiles.models";


function formatDate(date:Date){
    date = new Date(date);
    const format = new Intl.DateTimeFormat("pl",{
        year:"numeric",
        month:"2-digit",
        day:"2-digit"
    });
    const [
        {value:month},
        {value:day},
        {value:year}
    ] = format.formatToParts(date);
    return `${year}.${month}.${day}`;   
}

export function convertPostToFormData(post:postCreationDTO){
    const formData = new FormData();
    formData.append('autorName',post.autorName);
    formData.append('textContent',post.textContent)

    if(post.mediaFile){
        formData.append('mediaFile', post.mediaFile);
    }
   
    return formData;
}

export function convertCommentToFormData(comment:commentsCreationDTO){
    const formData = new FormData();
    formData.append('autorName',comment.autorName);
    formData.append('textContent',comment.textContent)
    formData.append('postId',comment.postId.toString())

    if(comment.autorProfileImage){
        formData.append('autorProfileImage', comment.autorProfileImage);
    }
   
    return formData;
}


export function convertProfileToFormData(profile:profileImageCreationDTO){
    const formData = new FormData();
    formData.append('id',profile.id);
    formData.append('email',profile.email);


    if(profile.profileImage){
        formData.append('profileImage', profile.profileImage);
    }
   
    return formData;
}
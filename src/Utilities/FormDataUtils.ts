import { format } from "path";


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
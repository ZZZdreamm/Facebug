export interface messageDTO{
    id:number;
    senderId:string;
    receiverId:string;
    textContent?:string;
    imageContent?:string;
    date:string;
}

export interface chat{
    messages:messageDTO[];
    userId:string;
    friendId:string;
}
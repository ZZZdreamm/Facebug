export interface messageDTO{
    senderId:string;
    receiverId:string;
    textContent?:string;
    imageContent?:string;
}

export interface chat{
    messages:messageDTO[];
    userId:string;
    friendId:string;
}
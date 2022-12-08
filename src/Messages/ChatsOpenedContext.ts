import React from "react";

const value = 0
const ChatsOpenedContext = React.createContext<{
    amountOfChatsOpened:number,
    updateAmountOfChatsOpened(amountOfChatsOpened:number):void;  
}
>({amountOfChatsOpened:value,updateAmountOfChatsOpened:()=>{}})

export default ChatsOpenedContext
import React from "react";
import { messageDTO } from "./messages.models";

const messages :any[] = []
const MessagesContext = React.createContext<{
    messages:any[];
    updateMessages(messages:any[]):void;
}>({messages: messages,updateMessages: () => {}});

export default MessagesContext
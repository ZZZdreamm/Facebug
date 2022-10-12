import React from "react";
import { useContext } from "react";
import { string } from "yup";

const PostFormContext = React.createContext<{
    visible:string[];
    update(visible:string):void
}>({visible:[],update: ()=> {}});
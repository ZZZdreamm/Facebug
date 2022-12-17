import { Dispatch, JSXElementConstructor, ReactElement, SetStateAction } from "react";
import { profileDTO } from "../Profile/profiles.models";
import GenericList from "../Utilities/GenericList";
import Contact from "./Contact";

export default function ListOfContacts(props: listOfContactsProps) {
    return (
      <GenericList list={props.friends}>
        <div className="scroller">
          {props.friends
            ? props.friends?.map((friend) => (
             
                <Contact key={friend.id} profile={friend} setOpenedChats={props.setCurrentOpenChats}
                openChats={props.openChats}
                />
              ))
            : "There are no contacts"}
          
        </div>
      </GenericList>
    );
  }
  interface listOfContactsProps {
    friends?: profileDTO[];
    setCurrentOpenChats:any;
    openChats:any
  }
  
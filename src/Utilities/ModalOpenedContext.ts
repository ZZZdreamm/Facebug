import React from "react";

const ModalOpenedContext = React.createContext<{
    modalNotOpened:boolean;
    updateModalState(modalOpened:boolean):void;  
}>({modalNotOpened:false,updateModalState: () => {}});

export default ModalOpenedContext;
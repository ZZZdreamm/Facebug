import { useContext, useEffect, useState } from "react";
import { Portal } from "../Utilities/Modal";
import ModalOpenedContext from "../Utilities/ModalOpenedContext";

export default function DeleteMessageModal(props: deleteMessageModalProps) {
  const [visibleModal, setVisibleModal] = useState("none");
  const { modalNotOpened, updateModalState } = useContext(ModalOpenedContext);
  useEffect(() => {
    if (props.doDisplay > 0) {
      showModal();
    } else {
      hideModal();
    }
  }, [props.doDisplay]);

  function hideModal() {
    setVisibleModal("none");
    updateModalState(true);
  }

  const showModal = () => {
    setVisibleModal("block");
    updateModalState(false);
  };
  var overlay = modalNotOpened ? "overlay" : "overlayDisplayed";
  return (
    <>
      <div id={overlay}></div>
      <Portal>
        <div
          className="deleteMessageModal"
          style={{ display: `${visibleModal}`, pointerEvents: "auto" }}
        >
          <span className="deleteMessageText" style={{marginLeft:'40px'}}>Do you really wanna delete message?</span>
          <div style={{marginTop:'20px'}} >
          <button
            className="messageBtn btn btn-danger"
            onClick={() => {
              hideModal();
              props.closeModal();
              props.deleteMessage(props.id);
            }}
          >
            Yes
          </button>
          <button
            className="messageBtn btn btn-primary"
            onClick={() => {
              hideModal();
              props.closeModal();
            }}
          >
            No
          </button>
          </div>
        </div>
      </Portal>
    </>
  );
}

interface deleteMessageModalProps {
  id: any;
  doDisplay: number;
  deleteMessage: any;
  closeModal: any;
}

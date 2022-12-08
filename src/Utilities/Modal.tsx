import { ReactElement, useContext, useEffect, useState } from "react";
import ProfileContext from "../Profile/ProfileContext";
import ModalOpenedContext from "./ModalOpenedContext";

export default function Modal(props: modalProps) {
  const [visibleModal, setVisibleModal] = useState("none");
  const { modalNotOpened, updateModalState } = useContext(ModalOpenedContext);

  useEffect(() => {
    console.log(props.doDisplay)
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
  var modalClassName = modalNotOpened ? "closedModal" : "openedModal";
  var overlay = modalNotOpened ? "overlay" : "overlayDisplayed";
  return (
    <>
      <div id={overlay}></div>
      {props.modalDisplayer}
      <div
        className={modalClassName}
        style={{ display: `${visibleModal}`, pointerEvents: "auto" }}
      >
        <div className="exampleModal">
          <div className="modal-headerr">
            {props.header}
            {/* <img src="/X Button.png" className="closeModal" onClick={hideModal}/> */}
          </div>
          <div className="modal-bodyy">{props.body}</div>
          {props.withFooter ? <div className="modal-footerr">
            {props.footer}
          </div> : null}
        </div>
      </div>
    </>
  );
}

interface modalProps {
  body: ReactElement;
  header:ReactElement;
  footer?:ReactElement;
  modalDisplayer: ReactElement;
  doDisplay: number;
  withFooter:boolean;
}

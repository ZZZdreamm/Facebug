import axios from "axios";
import { Form, Formik } from "formik";
import { useContext, useEffect, useState } from "react";
import { urlPosts } from "../apiPaths";
import ImageContainer from "../Forms/ImageContainer";
import ImageField from "../Forms/ImageField";
import ProfileContext from "../Profile/ProfileContext";
import Button from "../Utilities/Button";
import { convertPostToFormData } from "../Utilities/FormDataUtils";
import ImageUploader from "../Utilities/ImageUploader";
import Modal from "../Utilities/Modal";
import ModalOpenedContext from "../Utilities/ModalOpenedContext";
import UserImage from "../Utilities/UserImage";
import PostModal from "./PostModal";

export default function PostForm(props: postFormProps) {
  const [disabled, setDisabled] = useState(true);
  const [emptyText, setEmptyText] = useState(true);
  const [text, setText] = useState<string>("");
  const { profileDTO, updateProfile } = useContext(ProfileContext);
  const [displayModal, setDisplayModal] = useState(0);

  const { fileToData, baseImage, ImageUpload } = ImageUploader({
    textContent: "Add Image",
    image: ``,
    onChange() {},
  });

  useEffect(() => {
    if (text !== "") {
      setEmptyText(false);
    } else {
      setEmptyText(true);
    }
    if (emptyText === false) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, []);

  async function submitPost(post: postCreationDTO) {
    try {
      const formData = convertPostToFormData(post);
      await axios({
        method: "post",
        url: `${urlPosts}/post`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (error) {}
  }

  const showModal = () => {
    setText("");
  };
  // var modalClassName = modalNotOpened ? "closedModal" : "openedModal";
  // var overlay = modalNotOpened ? "overlay" : "overlayDisplayed";
  return (
    <>
      <Modal
        body={
          <Formik
            initialValues={props.model}
            onSubmit={(values) => {
              values.textContent = text;
              values.mediaFile = fileToData;
              values.autorProfileImage = profileDTO.profileImage;
              console.log(values);
              submitPost(values);
            }}
          >
            <Form className="myModal">
              <div className="modal-body">
                <div className="modal-body-autorData">
                  <img
                    className="profile-image"
                    src={props.model.autorProfileImage}
                    alt="profile"
                  />
                  <div className="profile-name">{props.model.autorName}</div>
                </div>
                <textarea
                  value={text}
                  className="mt-2 ml-2 postContent"
                  onChange={(e) => setText(e.target.value)}
                  style={{ resize: "none" }}
                ></textarea>
                <div className="mb-3">
                  <img className="postImage" src={baseImage} />
                </div>
              </div>
              <div className="modal-myfooter">
                <span className="fileUploader"> {ImageUpload}</span>
                <Button
                  className="btn btn-primary publish-button"
                  type="submit"
                  onClick={() => setDisplayModal(displayModal - 1)}
                >
                  Publish Post
                </Button>
              </div>
            </Form>
          </Formik>
        }
        header={
          <div className="modal-header">
            <span className="centerContent">Create Post</span>
            <span
              className="closeModal"
              onClick={() => {
                setDisplayModal(displayModal - 1)
              }}
            >
              X
            </span>
          </div>
        }
        modalDisplayer={
          <div className="postForm-container">
            <UserImage profileImage={profileDTO.profileImage} />
            <div
              className="postForm"
              onClick={() => {
                setDisplayModal(displayModal + 1);
                showModal();
              }}
            >
              <h4 className="postForm-text">
                <span className="showYourRequests">
                  What do you want to post today?
                </span>
              </h4>
            </div>
          </div>
        }
        doDisplay={displayModal}
        withFooter={false}
      />
    </>
  );
}

interface postFormProps {
  model: postCreationDTO;
  mediaFile?: string;
  imageURL: string;
}

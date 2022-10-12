import axios from "axios";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { urlPosts } from "../apiPaths";
import ImageContainer from "../Forms/ImageContainer";
import ImageField from "../Forms/ImageField";
import Button from "../Utilities/Button";
import { convertPostToFormData } from "../Utilities/FormDataUtils";
import UserImage from "../Utilities/UserImage";
import PostModal from "./PostModal";

export default function PostForm(props: postFormProps) {

  const [disabled, setDisabled] = useState(true);
  const [emptyText, setEmptyText] = useState(true);
  const [text, setText] = useState<string>("");
  const [visibleModal,setVisibleModal] = useState("none"); 

  const { render, imageURL, imageBase64, fileToData } = ImageField({
    displayName: "",
    imageURL: "",
    field: "",
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
  });

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

  function hideModal(){
    setVisibleModal("none");
  }

  const showModal= () => {
    setVisibleModal("block");
    setText("");
  }
  return (
    <>
      <div className="postForm-container">
      <UserImage profileImage={props.model.autorProfileImage}/>
        <div id="postForm1" className="postForm" onClick={() =>showModal()}>
        
          <h4 className="postForm-text">What do you think about?</h4>
        </div>
        <div className="onlyImageForm">

        </div>
      </div>
      <div id="on-visible" style={{display:`${visibleModal}`}}>
      <Formik
        initialValues={props.model}
        onSubmit={(values) => {
          values.textContent = text;
          values.mediaFile = fileToData;
          console.log(values);
          submitPost(values);
        }}
      >
        <Form className="myModal">
          <div className="modal-header">
            <span className="centerContent">Create Post</span>
          </div>
          <div className="modal-body">
            <div>
              <img
                className="profile-image"
                src={props.model.autorProfileImage}
                alt="profile"
              />
              <div className="ml-2 profile-name">
                {props.profileName} {props.profileSurname}
              </div>
            </div>
            <textarea
             value={text}
              id="textDiv"
              className="mt-2 ml-2 postContent"
              onChange={(e) => setText(e.target.value)}
            ></textarea>

            <div className="mb-3">
              <ImageContainer imageBase64={imageBase64} imageURL={imageURL} />
            </div>
          </div>
          <div className="modal-footer">
            {render}
            <Button
              className="btn btn-primary longBtn centerButton"
              disabled={disabled}
              type="submit"
              onClick={() => hideModal()}
            >
              Publish Post
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
    </>
  );
}

interface postFormProps {
  model: postCreationDTO;
  profileName: string;
  profileSurname: string;
  mediaFile?: string;
  imageURL: string;
}

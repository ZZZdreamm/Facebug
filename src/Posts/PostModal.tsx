import axios from "axios";
import { Form, Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import { urlPosts } from "../apiPaths";
import ImageContainer from "../Forms/ImageContainer";
import ImageField from "../Forms/ImageField";
import Button from "../Utilities/Button";
import { convertPostToFormData } from "../Utilities/FormDataUtils";

export default function PostModal(props: modalProps) {
  const [disabled, setDisabled] = useState(true);
  const [emptyText, setEmptyText] = useState(true);
  const [text, setText] = useState<string>("");
  const [visibleModal,setVisibleModal] = useState("block"); 

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
  return (
    <div id="on-visible" style={{display:`${props.style}`}}>
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
                src={props.profileImage}
                alt="profile"
              />
              <div className="ml-2 profile-name">
                {props.profileName} {props.profileSurname}
              </div>
            </div>
            <textarea
              defaultValue={text}
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
  );
}

interface modalProps {
  model: postCreationDTO;
  profileImage: string;
  profileName: string;
  profileSurname: string;
  mediaFile?: string;
  imageURL: string;
  style:string;
}

// PostModal.defaultProps ={
//     textContent: `What do you think about?`
// }

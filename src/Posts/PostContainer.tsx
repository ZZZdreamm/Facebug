import axios, { AxiosResponse } from "axios";
import { Form, Formik, FormikHelpers, FormikValues } from "formik";
import { cp } from "fs";
import { ReactElement, useContext, useEffect, useState } from "react";
import { urlComments, urlPosts } from "../apiPaths";
import Comment from "../comments/Comment";
import ProfileContext from "../Profile/ProfileContext";
import Button from "../Utilities/Button";
import { convertCommentToFormData } from "../Utilities/FormDataUtils";
import UserImage from "../Utilities/UserImage";

export default function PostContainer(props: postDTO) {
  const { profileDTO } = useContext(ProfileContext);

  const [textOverflown, setTextOverflown] = useState(false);
  const [partOfTextContent, setPartOfTextContent] = useState<string>("");
  const [amountOfLikes, setAmountOfLikes] = useState<number>(
    props.amountOfLikes
  );

  const [amountOfComments, setAmountOfComments] = useState<number>(
    props.amountOfComments
  );
  const [commentsOpened, setCommentsOpened] = useState(false);
  const [comments, setComments] = useState<commentsDTO[]>([]);
  const [partOfComments, setPartOfComments] = useState<commentsDTO[]>([]);
  const [text, setText] = useState<string>("");
  const [tooMuchComments, setTooMuchComments] = useState(false);

  const [exists, setExists] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const [isImage, setIsImage] = useState(false);

  const [userLiked, setUserLiked] = useState<boolean>(false);
  useEffect(() => {
    if (props.textContent.length > 180) {
      setTextOverflown(true);
      setPartOfTextContent(props.textContent.slice(0, 180));
    }
    if (props.mediaFile) {
      setIsImage(true);
    }
    axios
    .get(`${urlPosts}/userLiked/${props.id}/${profileDTO.id}`)
    .then((response: AxiosResponse<boolean>) => {
      setUserLiked(response.data);
    });
  },[]);

  useEffect(()=>{
    axios
    .get(`${urlComments}/${props.id}`)
    .then((response: AxiosResponse<commentsDTO[]>) => {
      const coms = response.data;
      setComments(coms);
    });
  },[comments])

  function showMoreText() {
    setExists(false);
    setPartOfTextContent(props.textContent);
    setIsClicked(true);
  }

  async function likePost(id: number) {
    axios.put(`${urlPosts}/likes/${id}/${profileDTO.id}`).then(() => {
      axios
        .get(`${urlPosts}/userLiked/${id}/${profileDTO.id}`)
        .then((response: AxiosResponse<boolean>) => {
          setUserLiked(response.data);
        });
      setAmountOfLikes(amountOfLikes + 1);
    });
  }

  async function deleteLike(id: number) {
    axios.delete(`${urlPosts}/likes/${id}/${profileDTO.id}`).then(() => {
      axios
        .get(`${urlPosts}/userLiked/${id}/${profileDTO.id}`)
        .then((response: AxiosResponse<boolean>) => {
          setUserLiked(response.data);
        });
      setAmountOfLikes(amountOfLikes - 1);
    });
  }

  async function commentPost(comment: commentsCreationDTO) {
    console.log(comment);
    const formData = convertCommentToFormData(comment);
    console.log(formData);
    axios({
      method: "POST",
      url: `${urlComments}/create`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    setAmountOfComments(amountOfComments + 1);
  }

  function showComments(id: number) {
    axios
      .get(`${urlComments}/${id}`)
      .then((response: AxiosResponse<commentsDTO[]>) => {
        setCommentsOpened(true);
        const coms = response.data;
        setComments(coms);
        if (coms.length > 3) {
          setTooMuchComments(true);
          setPartOfComments(coms.slice(0, 3));
        }
      });
  }

  function showMoreComments() {
    setTooMuchComments(false);
  }
  return (
    <>
      <div className="postContainer">
        <div className="postContainer-post-header">
          <UserImage profileImage={props.autorProfileImage} />
          <span className="postContainer-post-autorName">
            {props.autorName}
          </span>
        </div>

        <div className="postContainer-post-text">
          {textOverflown ? (
            <>
              <>
                {isClicked ? props.textContent : partOfTextContent}
                {exists ? (
                  <span
                    className="showMoreTextBtn"
                    onClick={() => showMoreText()}
                  >
                    {" "}
                    ...Show more
                  </span>
                ) : null}
              </>
            </>
          ) : (
            props.textContent
          )}
        </div>
        {isImage && (
          <img className="postContainer-post-image" src={props.mediaFile} />
        )}

        <div className="postContainer-post-footer">
          <span>
            <img className="likeImage" src="/like.png" />
            {amountOfLikes}
          </span>
          {userLiked ? (
            <button className="likeBtn" style={{ backgroundColor: "blue" }} onClick={() => deleteLike(props.id)}>
              Like
            </button>
          ) : (
            <button className="likeBtn" onClick={() => likePost(props.id)}>
              Like
            </button>
          )}

          <span>
            <img className="messageImage" src="/message.png" />
            {amountOfComments}
          </span>
          <button className="commentBtn" onClick={() => showComments(props.id)}>
            Comment
          </button>
        </div>
        {commentsOpened ? (
          <>
            <Formik
              initialValues={{
                postId: props.id,
                autorName: "Kacper Multan",
                autorProfileImage:
                  "https://localhost:7064/profiles/profile-image.jpg",
                textContent: text,
              }}
              onSubmit={(values) => {
                values.textContent = text;
                commentPost(values);
              }}
            >
              <Form style={{ width: "100%" }}>
                <textarea
                  style={{ resize: "none" }}
                  value={text}
                  id="textDiv"
                  className="mt-2 ml-2 postContent"
                  onChange={(e) => setText(e.target.value)}
                ></textarea>
                <button type="submit">Comment</button>
              </Form>
            </Formik>
            <div className="commentsArea">
              {tooMuchComments ? (
                <>
                  {partOfComments?.map(
                    ({
                      id,
                      postId,
                      autorName,
                      textContent,
                      autorProfileImage,
                    }) => (
                      <Comment
                        key={id}
                        id={id}
                        postId={postId}
                        autorName={autorName}
                        textContent={textContent}
                        autorProfileImage={autorProfileImage}
                      />
                    )
                  )}

                  <span
                    className="showMoreTextBtn"
                    onClick={() => showMoreComments()}
                  >
                    {" "}
                    ...Show more
                  </span>
                </>
              ) : (
                comments?.map(
                  ({
                    id,
                    postId,
                    autorName,
                    textContent,
                    autorProfileImage,
                  }) => (
                    <Comment
                      key={id}
                      id={id}
                      postId={postId}
                      autorName={autorName}
                      textContent={textContent}
                      autorProfileImage={autorProfileImage}
                    />
                  )
                )
              )}
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}

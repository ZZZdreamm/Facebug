import axios, { AxiosResponse } from "axios";
import { Form, Formik, FormikHelpers, FormikValues } from "formik";
import { cp } from "fs";
import { ReactElement, useContext, useEffect, useState } from "react";
import { urlComments, urlPosts } from "../apiPaths";
import Comment from "../comments/Comment";
import ProfileContext from "../Profile/ProfileContext";
import Button from "../Utilities/Button";
import { convertCommentToFormData } from "../Utilities/FormDataUtils";
import useDebounce from "../Utilities/useDebounce";
import useEffectAfterSecondRender from "../Utilities/useEffectAfterSecondRender";
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

  const debouncedAmountOfLikes = useDebounce(amountOfLikes, 2000);
  const [clicked, setClicked] = useState(false);

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
  }, []);

  // useEffect(() => {
  //   axios
  //     .get(`${urlComments}/${props.id}`)
  //     .then((response: AxiosResponse<commentsDTO[]>) => {
  //       const coms = response.data;
  //       setComments(coms);
  //     });
  // }, [comments]);

  function showMoreText() {
    setExists(false);
    setPartOfTextContent(props.textContent);
    setIsClicked(true);
  }

  function likePost(id: number) {
    if (userLiked) {
      axios.put(`${urlPosts}/likes/${id}/${profileDTO.id}`);
    } else {
      axios.delete(`${urlPosts}/likes/${id}/${profileDTO.id}`);
    }
  }
  useEffect(() => {
    if (clicked) {
      likePost(props.id);
    }
  }, [debouncedAmountOfLikes]);

  async function commentPost(comment: commentsCreationDTO) {
    const formData = convertCommentToFormData(comment);
    axios({
      method: "POST",
      url: `${urlComments}/create`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    setText("");
    setAmountOfComments(amountOfComments + 1);
  }

  function showComments(id: number) {
    console.log(comments)
    if (comments.length == 0) {
      axios
        .get(`${urlComments}/${id}`)
        .then((response: AxiosResponse<commentsDTO[]>) => {
          const coms = response.data;
          setComments(coms);
          setCommentsOpened(true);
          if (coms.length > 3) {
            setTooMuchComments(true);
            setPartOfComments(coms.slice(0, 3));
          }
        });
    } else {
      setCommentsOpened(true);
    }
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
            <img
              className="likeImage"
              src="https://localhost:7064/public/like.png"
            />
            {amountOfLikes}
          </span>
          {userLiked ? (
            <button
              className="likeBtn"
              style={{ backgroundColor: "#6495ed" }}
              onClick={() => {
                setAmountOfLikes(amountOfLikes - 1);
                setUserLiked(false);
                setClicked(true);
                setTimeout(() => {
                  setClicked(false);
                }, 10000);
              }}
            >
              Like
            </button>
          ) : (
            <button
              className="likeBtn"
              onClick={() => {
                setAmountOfLikes(amountOfLikes + 1);
                setUserLiked(true);
                setClicked(true);
                setTimeout(() => {
                  setClicked(false);
                }, 10000);
              }}
            >
              Like
            </button>
          )}

          <span>
            <img
              className="messageImage"
              src="https://localhost:7064/public/message.png"
              style={{ marginRight: "20px" }}
            />

          </span>
          <span style={{ marginTop: "7px" }}>{amountOfComments}</span>
          <button
            className="commentBtn"
            style={{ marginLeft: "17px" }}
            onClick={() => {
              if (commentsOpened == false) {
                showComments(props.id);
              } else {
                setCommentsOpened(false);
              }
            }}
          >
            Comment
          </button>
        </div>
        {commentsOpened ? (
          <>
            <Formik
              initialValues={{
                postId: props.id,
                autorId: profileDTO.id,
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
                <button className="submitCommentBtn" type="submit">
                  Comment
                </button>
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

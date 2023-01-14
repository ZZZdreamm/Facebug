import { useEffect, useState } from "react";

export default function Comment(props: commentsDTO) {
  const [textOverflown, setTextOverflown] = useState(false);
  const [exists, setExists] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const [partOfTextContent, setPartOfTextContent] = useState<string>("");



  useEffect(() => {
    if (props.textContent.length > 180) {
      setTextOverflown(true);
      setPartOfTextContent(props.textContent.slice(0, 180));
    }
  })

  function showMoreText() {
    setExists(false);
    setPartOfTextContent(props.textContent);
    setIsClicked(true);
  }
  return (
    <div className="comment-container">

        <img
          className="commentProfileImage"
          src={props.autorProfileImage}
          alt="profile"
        />
      <div className="comment">
       <span className="comment-name">{props.autorName}</span>

      <div className="comment-text" style={{lineBreak:"anywhere"}}>
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
        </div>
    </div>
  );
}

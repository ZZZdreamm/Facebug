import { useEffect, useRef, useState } from "react";
import { ReadyImagesURL } from "../apiPaths";

export default function ImageUploader(props: imageUploaderProps) {
  const [fileToData, setFileToData] = useState<File>();
  const [baseImage, setBaseImage] = useState(props.image);
  const [modalDisplay, setModalDisplay] = useState("none");

  const [imageName,setImageName] = useState("")

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    setImageName(file.name)
    console.log(imageName)
    const base64: any = await convertBase64(file);
    setBaseImage(base64);
    setFileToData(file);
    setModalDisplay("flex");
  };
  useEffect(()=> {
    if(props.image === "undefined" || props.image === "null")
    {
      setBaseImage(`${ReadyImagesURL}/noProfile.jpg`)
      return
    }
    setBaseImage(props.image)
  },[props.image])

  const convertBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  function dismissChanges() {
    setBaseImage(props.image);
    setFileToData(undefined);
    setModalDisplay("none");
  }
  function removeSendingImage(){
    setBaseImage(undefined)
    setFileToData(undefined)
  }
  return {
    imageName,
    fileToData,
    baseImage,
    deleteImage: (
      <span style={{marginLeft:"5px", cursor:"pointer"}}
             onClick={() => removeSendingImage()}>X</span>
    ),
    ImageUpload: (

        <label className="fileUploader-container">
          <input
            style={{ display: "none" }}
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={(e) => uploadImage(e)}
          />
          {props.textContent}
        </label>
        ),
    chooseModal:(
        <div style={{ display: `${modalDisplay}` }} className="doYouWantToDiv">
          <button className="btn btn-warning" onClick={() => dismissChanges()}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              props.onChange();
              setModalDisplay("none");
            }}
          >
            Save Changes
          </button>
        </div>
      )
  };
}
interface imageUploaderProps {
  textContent: string;
  image?: string;
  onChange(): void;
}

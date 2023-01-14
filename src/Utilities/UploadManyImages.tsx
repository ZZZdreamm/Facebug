import { useEffect, useRef, useState } from "react";
import { imageModel } from "./images.models";

export default function UploadManyImages(props: imageUploaderProps) {
  const [fileToData, setFileToData] = useState<File[]>([]);
  const [baseImage, setBaseImage] = useState(props.image);
  const [modalDisplay, setModalDisplay] = useState("none");

  const [imageName,setImageName] = useState("")
  const [images, setImages] = useState<imageModel[]>([])
  let amountOfImages = 1

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    setImageName(file.name)
    // console.log(imageName)
    const base64: any = await convertBase64(file);
    setBaseImage(base64);
    var fils = []
        fileToData.forEach(file => {
                var tempFile = file
                fils.push(tempFile)
        });
        fils.push(file)
    setFileToData(fils);
    setModalDisplay("flex");
  };
  useEffect(()=> {
    setBaseImage(props.image)
  },[props.image])

  useEffect(()=>{
    if(baseImage != '' && baseImage != undefined && baseImage != null){
        var imgs = []
        images.forEach(image => {
            if (image.src != "" && image.src != undefined && image.src != null && image.src != 'undefined'){
                var tempImage: imageModel = {
                    id: image.id,
                    src: image.src
                }
                amountOfImages += 1
                imgs.push(tempImage)
            }
        });
        imgs.push({id: amountOfImages, src: baseImage!})
        setImages(imgs)
        console.log(fileToData)
    }
  }, [baseImage])

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
    setFileToData([]);
    setModalDisplay("none");
  }
  function removeSendingImage(){
    setBaseImage(undefined)
    setFileToData([])
  }
  return {
    images,
    setImages,
    setFileToData,
    imageName,
    fileToData,
    baseImage,
    deleteImage: (
      <img src="/red X.png" className="closeImage" style={{marginLeft:"5px", cursor:"pointer"}}
             onClick={() => removeSendingImage()}/>
    ),
    ImageUpload: (

        <label className="fileUploader-container">
          <input
            style={{ display: "none" }}
            type="file"
            accept=".jpg,.jpeg,.png"
            // multiple
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

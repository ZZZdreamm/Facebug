import { useEffect, useRef, useState } from "react";
import { ReadyImagesURL } from "../apiPaths";
import { imageModel } from "./images.models";

export default function UploadManyImages(props: imageUploaderProps) {
  const [fileToData, setFileToData] = useState<File[]>([]);
  const [baseImage, setBaseImage] = useState(props.image);
  const [modalDisplay, setModalDisplay] = useState("none");

  const [imageName,setImageName] = useState("")
  const [images, setImages] = useState<imageModel[]>([])
  let amountOfImages = 1

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let files : any = []
    for(let i = 0; i < e.target.files!.length; i++){
      files.push(e.target.files![i])
    }
    files.forEach(async (file:any) => {
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
    });
    // setImageName(file.name)
    // // console.log(imageName)
    // const base64: any = await convertBase64(file);
    // setBaseImage(base64);
    // var fils = []
    //     fileToData.forEach(file => {
    //             var tempFile = file
    //             fils.push(tempFile)
    //     });
    //     fils.push(file)
    // setFileToData(fils);
    // setModalDisplay("flex");
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
  function removeSendingImage(id:number){
    // var imgs = fileToData.filter()
    console.log(id)
    console.log(fileToData)
    setFileToData(fileToData.filter((file) => file.name != fileToData[id-1].name))
    // fileToData.forEach((file) => {
    //   console.log(file)
    //   console.log(fileToData[id-1])
    //   file != fileToData[id-1]
    //   console.log(file != fileToData[id-1])
    // })
    // console.log(fileToData)

    setBaseImage(undefined)
    // setFileToData([])
  }
  return {
    images,
    setImages,
    setFileToData,
    imageName,
    fileToData,
    baseImage,
    deleteImage: (
      <img src={`${ReadyImagesURL}/red X.png`} className="closeImage" style={{marginLeft:"5px", cursor:"pointer"}}
             onClick={() => {
              var imageId = amountOfImages
              removeSendingImage(imageId)
            }}/>
    ),
    ImageUpload: (

        <label className="fileUploader-container manyImagesUploader">
          <input
            style={{ display: "none" }}
            type="file"
            accept=".jpg,.jpeg,.png"
            // name="filefield" multiple={true}
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

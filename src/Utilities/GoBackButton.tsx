import { useNavigate } from "react-router-dom"
import { ReadyImagesURL } from "../apiPaths"

export default function GoBackButton(){
    const navigate = useNavigate()
    function goBack(){
        navigate(-1)
    }
    return(
        <div className="goBackButton-container" onClick={goBack}>
            <img src={`${ReadyImagesURL}/goBackArrow.png`} className="goBackButton"/>
            <h3 className="goBack">Go back</h3>
        </div>
    )
}
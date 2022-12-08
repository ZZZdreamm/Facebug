import { useNavigate } from "react-router-dom"

export default function GoBackButton(){
    const navigate = useNavigate()
    function goBack(){
        navigate(-1)
    }
    return(
        <div className="goBackButton-container" onClick={goBack}>
            <img src="/goBackArrow.png" className="goBackButton"/>
            <h3>Go back</h3>
        </div>
    )
}
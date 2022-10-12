import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { urlAccounts } from "../apiPaths";
import DisplayErrors from "../Utilities/DisplayErrors";
import { authenticationResponse, userCredentials } from "./auth.models";
import AuthenticationContext from "./AuthenticationContext";
import AuthForm from "./AuthForm";
import { getClaims, saveToken } from "./HandleJWT";

export default function Login(){

    const [errors, setErrors] = useState<string[]>([]);
    const {update} = useContext(AuthenticationContext);
    const navigate = useNavigate();



    const {claims} = useContext(AuthenticationContext);
    
    async function login(credentials:userCredentials){
        try{
            setErrors([]);
            const response = await axios
            .post<authenticationResponse>(`${urlAccounts}/login`,credentials);
            saveToken(response.data);
            console.log(response.data);
            update(getClaims());
            navigate('/');
        }
        catch(error){
        
        }
    }
    return(
        <>
            <h3>Login</h3>
            <DisplayErrors errors={errors}/>
            <AuthForm model={{email:'', password:''}}
            onSubmit={async values => await login(values)}/>
        </>
    )
}
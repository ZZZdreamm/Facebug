import axios from "axios";import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { urlAccounts } from "../apiPaths";
import DisplayErrors from "../Utilities/DisplayErrors";

import { authenticationResponse, userCredentials } from "./auth.models";
import AuthenticationContext from "./AuthenticationContext";
import AuthForm from "./AuthForm";
import { getClaims, saveToken } from "./HandleJWT";

export default function Register(){

    const [errors, setErrors] = useState<string[]>([]);
    const {update} = useContext(AuthenticationContext);
    const navigate = useNavigate();

    async function register(credentials:userCredentials){
        try{
            setErrors([]);
            const response = await axios
            .post<authenticationResponse>(`${urlAccounts}/create`,credentials);
            saveToken(response.data);
            update(getClaims());
            navigate('/');

        }
        catch(error){

        }
    }
    return(
        <>
            <h3>Register</h3>
            <DisplayErrors errors={errors}/>
            <AuthForm
            model={{email:'', password:''}}
            onSubmit={async values => await register(values)}/>
        </>
    )
}
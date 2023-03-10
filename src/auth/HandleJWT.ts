import { useContext } from "react";
import { date } from "yup";
import { authenticationResponse, claim } from "./auth.models";
import AuthenticationContext from "./AuthenticationContext";

const tokenKey = 'token';
const expirationKey = 'token-expiration';
export function saveToken(authData:authenticationResponse){
    localStorage.setItem(tokenKey,authData.token);
    // localStorage.setItem(expirationKey,authData.expiration.toTimeString());
}
export function getClaims(): claim[]{

    const token = localStorage.getItem(tokenKey);
    if(!token){

        return[];
    }
    const expiration = localStorage.getItem(expirationKey)!;

    const expirationDate = new Date(expiration);

    // if(expirationDate <= new Date()){
    //     logout();
    //     return [];
    // }

    const dataToken = JSON.parse(atob(token.split('.')[1]));
    const response: claim[] = [];
    for(const property in dataToken){
        response.push({name:property,value:dataToken[property]});
    }

    return response;

}



export function logout(){
    localStorage.removeItem(tokenKey);
    localStorage.removeItem(expirationKey);
    localStorage.removeItem("email");
    localStorage.removeItem("id");
    localStorage.removeItem("profileImage");
}

export function getToken(){
    return localStorage.getItem(tokenKey);
}
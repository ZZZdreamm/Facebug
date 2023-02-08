import axios, { AxiosResponse } from "axios";
import React, { useContext, useState } from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { urlAccounts } from "./apiPaths";
import { userCredentials } from "./auth/auth.models";
import AuthenticationContext from "./auth/AuthenticationContext";
import Authorized from "./auth/Authorized";
import { logout } from "./auth/HandleJWT";
import ProfileContext from "./Profile/ProfileContext";
import { profileDTO } from "./Profile/profiles.models";
import SearchTypeahead from "./Utilities/SearchTypeahead";
import UserImage from "./Utilities/UserImage";

export default function Menu() {
  const { update, claims } = useContext(AuthenticationContext);
  const { profileDTO } = useContext(ProfileContext);
  const navigate = useNavigate()

  return (
    <>
    <div className="customNavbar">
    {/* <nav className="navbar navbar-expand-lg navbar-light bg-light">  */}
      {/* <div className="container-fluid"> */}
        <NavLink className="navbar-brand" to="/">
          <span style={{ display: "flex" }}>
            <img className="App-logo" src="https://localhost:7064/public/logo.jpg" alt="SocStor"/>
          </span>
        </NavLink>
        <Authorized
          isAuthorized={
            <>
              <SearchTypeahead profiles={[]} />
              {/* <form className="searchForm">

                <input
                  className="form-control"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button
                  className="btn btn-outline-success my-2 my-sm-0"
                  type="submit"
                >
                  Search
                </button>
              </form> */}
              <ul className="navbar-nav ml-auto">
                <div
                  className="collapse navbar-collapse"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <button
                    className="logoutBtn"
                    onClick={() => {
                      logout();
                      update([]);
                    }}
                  >
                    Logout
                  </button>
                  <div
                    // className="navbar-brand"
                    onClick={()=>{
                      navigate(`/profile/${profileDTO.email}`)
                      navigate(0)
                    }}
                  >
                    <UserImage profileImage={profileDTO.profileImage} />
                  </div>
                </div>
              </ul>
            </>
          }
          notAuthorized={
            <>
              <ul className="navbar-nav ml-auto">
                <div
                  className="collapse navbar-collapse"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div className="d-flex">
                    <Link className="nav-link btn btn-link" to="register">
                      <h3>Register</h3>
                    </Link>
                    <Link className="nav-link btn btn-link" to="login">
                      <h3 style={{marginLeft:"30px",marginRight:"30px"}}>Login</h3>
                    </Link>
                  </div>
                </div>
              </ul>
            </>
          }
        />
      {/* </div> */}
    {/* </nav> */}
    </div>
    </>
  );
}

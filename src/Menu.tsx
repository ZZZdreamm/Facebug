import React from "react";
import { Link, NavLink } from "react-router-dom";
import Authorized from "./auth/Authorized";

export default function Menu() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          <span style={{ display: "flex" }}>
            <img className="App-logo" src="logo.jpg" alt="SocStor"></img>
          </span>
        </NavLink>
        <Authorized
          isAuthorized={ <form className="searchForm">
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
        </form>}
          notAuthorized={<>
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
              <h3>Login</h3>
            </Link>
          </div>
        </div>
        </ul>
          </>
          }
        />
      </div>
    </nav>
  );
}

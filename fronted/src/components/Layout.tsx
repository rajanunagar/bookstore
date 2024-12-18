import { Link, Outlet } from "react-router-dom";
import { loggedInuserIsAdminOrNot } from "../utils/util";
import { signOut } from 'aws-amplify/auth';
import { useEffect, useState } from "react";

function Navbar() {

const [isAdmin,setIsAdmin]=useState(false);
const logout =async ()=>{
    try {
        await signOut();
      } catch (error) {
        console.log('error signing out: ', error);
      }
}

const isUserAdmin = async ()=>{
    const admin = await loggedInuserIsAdminOrNot();
    setIsAdmin(admin);
}

useEffect(()=>{
  isUserAdmin();
},[]);

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Book Store
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {isAdmin && (
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="createbook"
                  >
                    create post
                  </Link>
                </li>
              )}
              <li className="nav-item">
                <Link className="nav-link" to="orders">
                  Orders
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/books">
                  Books
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="profile">
                  Profile
                </Link>
              </li>
              <li
                className="nav-item"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  logout();
                }}
              >
                <div className="nal-link mt-2">Logout</div>
              </li>

              {/* <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Dropdown
          </a>
          <ul className="dropdown-menu">
            <li>
              <a className="dropdown-item" href="#">
                Action
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Another action
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Something else here
              </a>
            </li>
          </ul>
        </li>
        <li className="nav-item">
          <a className="nav-link disabled" aria-disabled="true">
            Disabled
          </a>
        </li> */}
            </ul>
            {/* <form className="d-flex" role="search">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form> */}
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

export default Navbar;

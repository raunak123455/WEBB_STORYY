import React, { useState } from "react";
import "./Header.css";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModel";
import bookmarkIcon from "../assets/Bookmark.png";
import Pfp from "../assets/PFP.png";
import bars from "../assets/Bars.png";
import AddStoryModal from "./AddStoryModal";
import { useUser } from "./UserContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [openRegister, setOpenRegister] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState(false); // State to handle mobile menu
  const [openMobileMenu2, setOpenMobileMenu2] = useState(false); // State to handle mobile menu

  const { name, loggedIn, setloggedIn, openAddStory, setOpenAddStory } =
    useUser();
  const navigate = useNavigate();

  const handleOpenRegisterModal = () => {
    setOpenRegister(true);
    setOpenMobileMenu(!openMobileMenu);
  };

  const handleClose = () => {
    setOpenMobileMenu2(!openMobileMenu2);
  };

  const handleCloseRegisterModal = () => {
    setOpenRegister(false);
  };

  const handleOpenLoginModal = () => {
    setOpenLogin(true);
    setloggedIn(false);
    setOpenMobileMenu(!openMobileMenu);
  };

  const handleCloseLoginModal = () => {
    setOpenLogin(false);
  };

  const handleLoginSuccess = () => {
    setloggedIn(true);
    setOpenLogin(false);
  };

  const handleCloseAddStory = () => {
    setOpenAddStory(false);
  };

  const handleOpenAddStory = () => {
    setOpenAddStory(true);
  };

  const handleNavigateToBookmarks = () => {
    navigate("/bookmarks");
  };

  const handleLogout = () => {
    setloggedIn(false);
  };

  const handleOpenLogoutModal = () => {
    setOpenLogout(!openLogout);
    setOpenMobileMenu2(!openMobileMenu2);
  };

  const handleToggleMobileMenu = () => {
    setOpenMobileMenu(!openMobileMenu);
  };

  return (
    <div className="container2">
      {loggedIn ? (
        <>
          <header className="header2">
            <div className="logo-container">
              {/* Placeholder for logo or brand name */}
            </div>

            <div className="nav-container">
              <button
                className="btn btn-bookmark"
                onClick={handleNavigateToBookmarks}
              >
                <img src={bookmarkIcon} alt="" className="bookicon" />
                Bookmarks
              </button>

              <button
                className="btn btn-add-story"
                onClick={handleOpenAddStory}
              >
                Add story
              </button>

              <button className="btn btn-user">
                <img src={Pfp} alt="" className="pfp" />
              </button>

              <button className="btn btn-menu">
                <img
                  src={bars}
                  alt=""
                  className="bars"
                  onClick={handleOpenLogoutModal}
                />
              </button>

              {openMobileMenu2 && (
                <div className="mobilemenu2">
                  <button className="close-button2" onClick={handleClose}>
                    &times;
                  </button>{" "}
                  <div className="info">
                    <img src={Pfp} alt="" className="pfp2" />
                    <h2>{name}</h2>{" "}
                  </div>
                  <div className="other-btn">
                    <button
                      className="btn btn-add-story"
                      onClick={handleOpenAddStory}
                    >
                      Add story
                    </button>
                    <button
                      className="btn btn-bookmark"
                      onClick={handleNavigateToBookmarks}
                    >
                      <img src={bookmarkIcon} alt="" className="bookicon" />
                      Bookmarks
                    </button>
                    <button className="logout" onClick={handleLogout}>
                      Logout
                    </button>{" "}
                  </div>
                </div>
              )}
              {openLogout && (
                <div className="logoutmodal">
                  <h1>{name}</h1>
                  <button className="logout" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </header>
        </>
      ) : (
        <div className="header1">
          <button onClick={handleOpenRegisterModal} className="register2">
            Register Now
          </button>
          <button onClick={handleOpenLoginModal} className="signin">
            Sign In
          </button>

          <LoginModal
            isOpen={openLogin}
            onClose={handleCloseLoginModal}
            onLoginSuccess={handleLoginSuccess}
            loggedIn={loggedIn}
          />

          <RegisterModal
            isOpen={openRegister}
            onClose={handleCloseRegisterModal}
          />

          {/* Mobile Menu Icon */}
          <img
            src={bars}
            alt=""
            className="bars2"
            onClick={handleToggleMobileMenu}
          />

          {/* Mobile Menu */}
          {openMobileMenu && (
            <div className="mobile-menu">
              <button onClick={handleOpenRegisterModal} className="register2">
                Register Now
              </button>
              <button onClick={handleOpenLoginModal} className="signin">
                Sign In
              </button>
            </div>
          )}
        </div>
      )}

      <AddStoryModal isOpen={openAddStory} onClose={handleCloseAddStory} />
    </div>
  );
};

export default Header;

import React, { useContext, useState } from "react";
import "./Header.css";
import OlxLogo from "../../assets/OlxLogo";
import Search from "../../assets/Search";
import Arrow from "../../assets/Arrow";
import SellButton from "../../assets/SellButton";
import SellButtonPlus from "../../assets/SellButtonPlus";
import { AuthContext, FirebaseContext } from "../../store/Context";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Header() {
  const { user } = useContext(AuthContext);
  const { logoutUser } = useContext(FirebaseContext);
  const history = useHistory();

  const handleLogout = async () => {
    try {
      await logoutUser();
      history.push("/login");
    } catch (error) {
      console.error("Logout Failed", error);
    }
  };

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo />
        </div>
        <div className="placeSearch">
          <Search />
          <input type="text" />
          <Arrow />
        </div>
        <div className="productSearch">
          <div className="input">
            <input type="text" placeholder="Find car, mobile phone and more..." />
          </div>
          <div className="searchAction">
            <Search color="#ffffff" />
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow />
        </div>

        {/* Login & Logout Dropdown */}
        <div className="loginPage">
          {user ? (
            <div className="userDropdown">
              <span className="userName">{`Welcome, ${user.displayName}`}</span>
              <div className="dropdownContent">
                <span onClick={handleLogout}>Logout</span>
              </div>
            </div>
          ) : (
            <span onClick={() => history.push("/login")}>Login</span>
          )}
          <hr />
        </div>

        {/* Sell Button */}
        <div
          className="sellMenu"
          onClick={() => {
            history.push("/create");
          }}
        >
          <SellButton />
          <div className="sellMenuContent">
            <SellButtonPlus />
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;

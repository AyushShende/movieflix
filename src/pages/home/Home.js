import { Logout, Search } from "@mui/icons-material";
import { Alert } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./Home.css";

function Home({ searchValue, setSearchValue }) {
  const [error, setError] = useState("");
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    setError("");
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.log(error);
      setError("Failed to log out");
    }
  };

  return (
    <div className="home">
      <div onClick={handleLogout} className="logout">
        <Logout className="logOutIcon" />
        <span> LogOut</span>
      </div>
      {error && <Alert severity="error">{error}</Alert>}
      <h1 className="homeTitle">MOVIEFLIX</h1>
      <div className="searchBox">
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="searchInput"
          placeholder="Search Movies..."
        />
        <Link to={"/movielist"}>
          <Search className="searchIcon" />
        </Link>
      </div>
      <p className="searchCaption">
        Simply enter your favorite movie in the search field and find the
        results.
      </p>
    </div>
  );
}

export default Home;

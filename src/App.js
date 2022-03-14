import { useState } from "react";
import Home from "./pages/home/Home";
import MovieList from "./pages/movieList/MovieList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<SignUp />} path="/signup" />
          <Route element={<Login />} path="/login" />

          <Route element={<PrivateRoute />}>
            <Route
              element={
                <Home
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                />
              }
              path="/"
            />
            <Route
              element={<MovieList searchValue={searchValue} />}
              path="movielist"
            />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

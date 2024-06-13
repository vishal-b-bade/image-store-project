import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Register, Login, Dashboard, EmailVerifiy } from "./pages"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/register"} element={<Register />} />
          <Route path={"/verify"} element={<EmailVerifiy />} />
          <Route path={"/"} element={<Login />} />
          <Route path={"/dashboard"} element={<Dashboard />} />
          <Route path={"*"} element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

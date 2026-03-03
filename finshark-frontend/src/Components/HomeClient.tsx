"use client";

import { JSX } from "react";
import Navbar from "./Navbar/Navbar";
import { Outlet } from "react-router-dom";


const HomeClient = (): JSX.Element => {
  return (
    <div className="w-full">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default HomeClient;

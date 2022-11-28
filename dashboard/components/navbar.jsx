import Image from "next/image";
import Link from "next/link";
import * as React from "react";


export default function Navbar() {

  return (
    <div className="">
    <div className="desktop" style={{ width: "100%", height: "100vh" }}>
      <div className="navbar-left font-bold flex">
        <div className="navbar-logo">

          <Link href="/">
            <h1 className="text-2xl"> Aziel </h1>
          </Link>
        </div>
        </div>
        </div>
        <div className="navbar-items">
          <div className="navbar-item transition duration-500 ease-in-out hover:text-[#B096D6]">
           Home
          </div>
          </div>
          </div>

  );
}
import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const Navbar = ({ link }) => {
  console.log(link);
  return (
    <div className="learning_navbar">
      <nav className="w-full h-[80px] flex flex-row items-center px-[30px] text-dark1">
        <div className="flex flex-row box-border ml-auto gap-x-[40px] px-[50px]">
          <Link href="/ayurlearn/modules">
            {link == "modules" ? (
              <p className="nav_links nav_links_active">Modules</p>
            ) : (
              <p className="nav_links">Modules</p>
            )}
          </Link>
          <Link href="/ayurlearn/video-modules">
            {link == "videos" ? (
              <p className="nav_links nav_links_active">Videos</p>
            ) : (
              <p className="nav_links">Videos</p>
            )}
          </Link>
          <Link href="/ayurlearn/books">
            {link == "books" ? (
              <p className="nav_links nav_links_active">Books</p>
            ) : (
              <p className="nav_links">Books</p>
            )}
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

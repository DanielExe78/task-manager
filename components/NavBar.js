import Link from "next/link";
import React from "react";

const NavBar = () => {
  return (
    <nav className="flex h-10 items-center gap-32 text-[#333333]">
      <section>
        <h1>LOGO</h1>
      </section>
      <Link href="/">Home</Link>
    </nav>
  );
};

export default NavBar;

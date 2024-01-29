import React from "react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="border-t py-4">
      <span className="block text-sm sm:text-center text-muted-foreground">
        © {currentYear}{" "}
        <a
          href="https://github.com/lokeshkavisth/FileFlow"
          target="_blank"
          className="hover:underline"
        >
          FileFlow™
        </a>
        . All Rights Reserved.
      </span>
    </div>
  );
};

export default Footer;

import React from "react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="border-t h-14 flex items-center justify-center">
      <div className="block  text-sm sm:text-center text-muted-foreground">
        © {currentYear} FileFlow . All Rights Reserved.
      </div>
    </div>
  );
};

export default Footer;

import { useState } from "react";

function Footer() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="w-50 mx-auto">
      <button
        className="btn bg-warning rounded-0 w-100 rounded-top-3"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        ^
      </button>

      {isOpen && (
        <div className="bg-white text-white p-4 border">
          <p className="text-dark">SEPET</p>
        </div>
      )}
    </div>
  );
}

export default Footer;

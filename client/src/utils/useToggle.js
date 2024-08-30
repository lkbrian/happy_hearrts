import React, { useRef, useState } from "react";

function useToggle() {
  const [isOpen, setIsOpen] = useState(true);
  const nodeRef = useRef(null);

  const toggleModal = () => {
    if (nodeRef.current) {
      if (isOpen) {
        nodeRef.current.style.display = "block";
      } else {
        nodeRef.current.style.display = "none";
      }
      setIsOpen(!isOpen);
    }
  };

  return { isOpen, toggleModal, nodeRef };
}

export default useToggle;

import React from "react";
import { useGlobalContext } from "../context/Context";

const Department = () => {
  const {
    isSubmenuOpen,
    isModalOpen,
    setIsModalOpen,
    setShowSubtask,
    showSubtask,
    openSubtaskMenu,
    page: { info },
  } = useGlobalContext();

  const displaySubTask = (e) => {
    const text = e.target.textContent;
    const tempBtn = e.target.getBoundingClientRect();
    const center = (tempBtn.bottom + tempBtn.top) / 2;
    openSubtaskMenu(text, center);
    setShowSubtask(!showSubtask);
  };

  return <div>Department</div>;
};

export default Department;

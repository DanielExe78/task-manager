import React, { useState } from "react";
import { useGlobalContext } from "../context/Context";
import Subtask from "./Subtask";

const Submenu = () => {
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

  return (
    <>
      {isSubmenuOpen && (
        <aside className="bg-[#EAEAEA] rounded p-5 relative">
          <ul className="flex flex-col gap-2">
            {info.map((item) => {
              const { task, id } = item;
              return (
                <button
                  key={id}
                  className="bg-[#FFFFFF] text-black rounded"
                  onClick={displaySubTask}
                >
                  <li>{task}</li>
                </button>
              );
            })}
          </ul>
          <section className="absolute left-40 bottom-0">
            <Subtask />
          </section>
          <button
            onClick={() => setIsModalOpen(!isModalOpen)}
            className="focus:outline-none uppercase text-white bg-purple-400 hover:bg-purple-600 rounded-lg text-sm px-5 py-2.5 mt-4 dark:hover:bg-purple-600"
          >
            add task
          </button>
        </aside>
      )}
    </>
  );
};

export default Submenu;

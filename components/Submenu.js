import React, { useState } from "react";
import { useGlobalContext } from "../context/Context";
import MainTasks from "./MainTasks";
import { TiDelete } from "react-icons/ti";

const Submenu = () => {
  const {
    isSubmenuOpen,
    isModalOpen,
    setIsModalOpen,
    openSubtaskMenu,
    showTask,
    delCompleteTask,
    setShowTask,
    page: { info },
  } = useGlobalContext();

  const displaySubTask = (e) => {
    const text = e.target.textContent;
    const tempBtn = e.target.getBoundingClientRect();
    const center = (tempBtn.bottom + tempBtn.top) / 2;
    const id = e.currentTarget.id;
    openSubtaskMenu(text, id);
    setShowTask(!showTask);
  };

  const handleDelete = (id) => {
    delCompleteTask(id);
  };

  return (
    <>
      {isSubmenuOpen && (
        <aside className="bg-[#EAEAEA] rounded p-4 relative">
          <ul className="flex flex-col gap-2">
            {info.map((item) => {
              const { task, id } = item;
              return (
                <div className="flex gap-2" key={id}>
                  <button
                    key={id}
                    id={id}
                    className="bg-[#FFFFFF] text-black rounded w-24"
                    onClick={displaySubTask}
                  >
                    <li>{task}</li>
                  </button>
                  <button onClick={() => handleDelete(id)}>
                    <TiDelete className="fill-red-800" />
                  </button>
                </div>
              );
            })}
          </ul>
          <section className="absolute left-40 bottom-0">
            <MainTasks />
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

import React from "react";
import { useGlobalContext } from "../context/Context";
import Subtask from "./Subtask";

const MainTasks = () => {
  const {
    showTask,
    showSubtask,
    setShowSubtask,
    addingDep,
    setAddingDep,
    depSubtasks,
    submenuPage: { depTasks },
  } = useGlobalContext();

  const displaySubTask = (e) => {
    const text = e.target.textContent;
    const tempBtn = e.target.getBoundingClientRect();
    const center = (tempBtn.bottom + tempBtn.top) / 2;
    const selector = e.currentTarget.id;
    depSubtasks(selector);
    setShowSubtask(!showSubtask);
  };

  return (
    <>
      {showTask && (
        <ul className="bg-[#EAEAEA] rounded p-5 w-max relative bottom-10 flex flex-col gap-2">
          {depTasks.map((item) => {
            const { id, department } = item;
            return (
              <button
                key={id}
                id={id}
                className="bg-[#FFFFFF] text-black rounded "
                onClick={displaySubTask}
              >
                <li>{department}</li>
              </button>
            );
          })}
          <section className="absolute left-56 bottom-0">
            <Subtask />
          </section>
          <button
            onClick={() => setAddingDep(!addingDep)}
            className="focus:outline-none uppercase text-white bg-purple-400 hover:bg-purple-600 rounded-lg text-sm px-5 py-2.5 mt-4 dark:hover:bg-purple-600"
          >
            ADD DEPARTMENT
          </button>
        </ul>
      )}
    </>
  );
};

export default MainTasks;

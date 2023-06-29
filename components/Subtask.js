import React from "react";
import { useGlobalContext } from "../context/Context";
import { BiEdit } from "react-icons/bi";
import { TiDelete } from "react-icons/ti";

const Subtask = () => {
  const {
    showSubtask,
    editBtn,
    deleteSingletTask,
    addingSub,
    setAddingSub,
    submenuPage: { depTasks },
  } = useGlobalContext();

  // console.log(depTasks);

  return (
    <section>
      {showSubtask && (
        <ul className="bg-[#EAEAEA] rounded p-5 w-max relative bottom-10">
          {depTasks.map((item) => {
            const { id, sub } = item;
            return (
              <div className="flex gap-2" key={id}>
                <li>{sub}</li>
                <button onClick={() => handleDelete(id)}>
                  <TiDelete className="fill-red-800" />
                </button>
                <button onClick={() => handleEdit(id)}>
                  <BiEdit />
                </button>
              </div>
            );
          })}
          <button
            onClick={() => setAddingSub(!addingSub)}
            className="focus:outline-none uppercase text-white bg-purple-400 hover:bg-purple-600 rounded-lg text-sm px-5 py-2.5 mt-4 dark:hover:bg-purple-600"
          >
            ADD SUBTASK
          </button>
        </ul>
      )}
    </section>
  );
};

export default Subtask;

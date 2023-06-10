import React from "react";
import { useGlobalContext } from "../context/Context";
import { BiEdit } from "react-icons/bi";

const Subtask = () => {
  const {
    showSubtask,
    editBtn,
    submenuPage: { subtask },
  } = useGlobalContext();

  const handleClick = (id) => {
    editBtn(id);
  };

  return (
    <section>
      {showSubtask && (
        <ul className="bg-[#EAEAEA] rounded p-5 w-max relative bottom-10">
          {subtask.map((item) => {
            const { id, sub } = item;
            return (
              <div className="flex gap-2" key={id}>
                <li>{sub}</li>
                <button onClick={() => handleClick(id)}>
                  <BiEdit />
                </button>
              </div>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default Subtask;

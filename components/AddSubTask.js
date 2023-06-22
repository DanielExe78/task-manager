import React, { useState } from "react";
import { useGlobalContext } from "../context/Context";
import { v4 as uuidv4 } from "uuid";

const AddSubTask = () => {
  const { setAddingSub, addedSubTask, setShowSubtask } = useGlobalContext();

  const [addSubTask, setAddSubTask] = useState([
    {
      subtask: [
        {
          id: uuidv4(),
          sub: "",
        },
      ],
    },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (addSubTask.subtask) {
      const newTask = {
        ...addSubTask,
        subtask: addSubTask.subtask,
      };

      addedSubTask(newTask);
      setShowSubtask(false);
      setAddingSub(false);
    }
  };

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setAddSubTask({
      ...addSubTask,
      subtask: [
        {
          id: uuidv4(),
          [name]: value,
        },
      ],
    });
  };

  return (
    <form className="text-black bg-white flex flex-col rounded p-3 gap-3 ">
      <div className="flex flex-col">
        <input
          type="text"
          placeholder="Subtarea"
          name="sub"
          onChange={handleChange}
          className="border-b-2 border-b-gray-600 focus:outline-none placeholder:text-slate-400 "
        />
      </div>

      <button
        className="rounded bg-cyan-400 uppercase inline-block shadow-black hover:bg-cyan-500 p-1 mt-1 w-fit self-center"
        onClick={handleSubmit}
      >
        add
      </button>
    </form>
  );
};

export default AddSubTask;

import React, { useState } from "react";
import { useGlobalContext } from "../context/Context";

const EditSubTask = () => {
  const {
    setIsModalOpen,
    editSingleSubTask,
    setShowSubtask,
    editingTask,
    setIsEditing,
  } = useGlobalContext();
  const [editSubTask, setEditSubTasks] = useState([
    {
      subtask: [
        {
          sub: "",
        },
      ],
    },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editSubTask.subtask) {
      const newTask = {
        ...editSubTask,
        subtask: editSubTask.subtask,
      };

      editSingleSubTask(newTask);
      //   setEditSubTasks({ subtask: [{}] });
      setShowSubtask(false);
      setIsEditing(false);
      setIsModalOpen(false);
    }
  };

  //   console.log(editSubTask, editingTask);

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    editingTask.map((item) => {
      const { id } = item;

      setEditSubTasks({
        ...editSubTask,
        subtask: [
          {
            id,
            [name]: value,
          },
        ],
      });
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
        edit
      </button>
    </form>
  );
};

export default EditSubTask;

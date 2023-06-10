"use client";
import React, { useState } from "react";
import { useGlobalContext } from "../context/Context";
import { v4 as uuidv4 } from "uuid";

const FormComponent = () => {
  const { setIsModalOpen, addedTask, setShowSubtask } = useGlobalContext();
  const [tasks, setTasks] = useState([
    {
      department: "",
      task: "",
      subtask: [
        {
          sub: "",
        },
      ],
    },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tasks.task && tasks.department && tasks.subtask) {
      const newTask = {
        ...tasks,
        id: uuidv4(),
        subtask: [...tasks.subtask],
      };
      addedTask(newTask);
      setTasks({ department: "", task: "", subtask: [{}] });
      setShowSubtask(false);
      setIsModalOpen(false);
    }
  };

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setTasks({
      ...tasks,
      [name]: value,
      subtask: [
        {
          id: uuidv4(),
          sub: value,
        },
      ],
    });
  };

  return (
    <form className="text-black bg-white flex flex-col rounded p-3 gap-3 ">
      <div className="flex flex-col">
        <input
          type="text"
          placeholder="Tarea Principal"
          name="task"
          onChange={handleChange}
          className="border-b-2 border-b-gray-600 focus:outline-none placeholder:text-slate-400 "
        />
      </div>
      <div className="flex flex-col">
        <input
          type="text"
          placeholder="Departamento"
          name="department"
          onChange={handleChange}
          className="border-b-2 border-b-gray-600 focus:outline-none placeholder:text-slate-400 "
        />
      </div>
      <div className="flex flex-col">
        <input
          type="text"
          placeholder="Subtarea"
          name="subtask"
          onChange={handleChange}
          className="border-b-2 border-b-gray-600 focus:outline-none placeholder:text-slate-400 "
        />
      </div>

      <button
        className="rounded bg-cyan-400 uppercase inline-block shadow-black hover:bg-cyan-500 p-1 mt-1 w-fit self-center"
        onClick={handleSubmit}
      >
        add task
      </button>
    </form>
  );
};

export default FormComponent;

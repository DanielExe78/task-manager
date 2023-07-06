"use client";
import React, { useState } from "react";
import { useGlobalContext } from "../context/Context";
import { v4 as uuidv4 } from "uuid";

const FormComponent = () => {
  const { setIsModalOpen, addedTask, setShowSubtask } = useGlobalContext();
  const [tasks, setTasks] = useState([
    {
      task: "",
      depTasks: [
        {
          department: "",
          subtask: [
            {
              sub: "",
            },
          ],
        },
      ],
    },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tasks.task) {
      const newTask = {
        ...tasks,
        id: uuidv4(),
        depTasks: [...tasks.depTasks],
      };
      addedTask(newTask);
      setShowSubtask(false);
      setIsModalOpen(false);
    }
  };

  const handleTask = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setTasks({
      ...tasks,
      [name]: value,
    });
  };

  const handleDep = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    console.log(name, value);

    setTasks({
      ...tasks,
      depTasks: [
        {
          id: uuidv4(),
          [name]: value,
        },
      ],
    });
  };

  const handleSub = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setTasks({
      ...tasks,
      depTasks: [
        {
          ...tasks.depTasks[0],
          subtask: [
            {
              id: uuidv4(),
              [name]: value,
            },
          ],
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
          onChange={handleTask}
          className="border-b-2 border-b-gray-600 focus:outline-none placeholder:text-slate-400 "
        />
      </div>

      <div className="flex flex-col">
        <input
          type="text"
          placeholder="Departamento"
          name="department"
          onChange={handleDep}
          className="border-b-2 border-b-gray-600 focus:outline-none placeholder:text-slate-400 "
        />
      </div>

      <div className="flex flex-col">
        <input
          type="text"
          placeholder="Subtarea"
          name="sub"
          onChange={handleSub}
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

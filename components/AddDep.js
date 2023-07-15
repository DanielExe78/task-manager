import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useGlobalContext } from "../context/Context";

const AddDep = () => {
  const { setIsModalOpen, setShowSubtask, addDep, addingDep, setAddingDep } =
    useGlobalContext();
  const [addDepartment, setAddDepartment] = useState([
    {
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

    const newDep = {
      ...addDepartment.depTasks[0],
      subtask: [{ ...addDepartment.subtask[0] }],
    };

    addDep(newDep);
    setShowSubtask(false);
    setIsModalOpen(false);
    setAddingDep(false);
  };

  const handleDep = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setAddDepartment({
      ...addDepartment,
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

    setAddDepartment({
      ...addDepartment,
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
          placeholder="Departamento"
          name="department"
          onChange={handleDep}
          className="border-b-2 border-b-gray-600 focus:outline-none placeholder:text-slate-400 "
        />
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
        ADD
      </button>
    </form>
  );
};

export default AddDep;

"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
export const TaskContext = createContext();

export const useGlobalContext = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("TaskContext must be used within a provider");
  return context;
};

export const AppProvider = ({ children }) => {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSubtask, setShowSubtask] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTask, setEditingTask] = useState([]);
  const [location, setLocation] = useState("");
  const [page, setPage] = useState({ client: "", info: [] });
  const [submenuPage, setSubmenuPage] = useState({ task: "", subtask: [] });
  const [singleTask, setSingleTask] = useState([
    {
      client: "PKC",
      info: [
        {
          id: uuidv4(),
          department: "HR",
          task: "task 1",
          subtask: [
            {
              id: uuidv4(),
              sub: "generic task 1",
            },
            {
              id: uuidv4(),
              sub: "generic task 2",
            },
          ],
        },
      ],
    },
    {
      client: "PGA",
      info: [
        {
          id: uuidv4(),
          department: "HR",
          task: "task 2",
          subtask: [
            {
              id: uuidv4(),
              sub: "generic task 3",
            },
            {
              id: uuidv4(),
              sub: "generic task 4",
            },
          ],
        },
      ],
    },
    {
      client: "GOOGLE",
      info: [
        {
          id: uuidv4(),
          department: "HR",
          task: "task 3",
          subtask: [
            {
              id: uuidv4(),
              sub: "generic task 5",
            },
            {
              id: uuidv4(),
              sub: "generic task 6",
            },
          ],
        },
        {
          id: uuidv4(),
          department: "HR",
          task: "task 4",
          subtask: [
            {
              id: uuidv4(),
              sub: "generic task 7",
            },
            {
              id: uuidv4(),
              sub: "generic task 8",
            },
          ],
        },
      ],
    },
  ]);

  const addedTask = (task) => {
    let curInfo = singleTask.find((item) => item.info === page.info);
    setSingleTask(
      singleTask.map((clientTask) => {
        if (clientTask === curInfo) {
          return { ...clientTask, info: [...curInfo.info, task] };
        } else {
          return clientTask;
        }
      })
    );
    setIsSubmenuOpen(!isSubmenuOpen);
  };

  const editSingleSubTask = (task) => {
    const idToReplace = task.subtask.map((replace) => {
      return replace.id;
    });

    const replaceTask = singleTask.find((item) => {
      const { info } = item;
      info.map((each) => {
        const { subtask } = each;
        const match = subtask.find((specific) => {
          return specific.id === idToReplace[0];
        });

        setSingleTask(
          singleTask.map((finalTask) => {
            if (finalTask === replaceTask) {
              return { ...finalTask, info: [replaceTask] };
            } else {
              return finalTask;
            }
          })
        );
      });
    });
  };

  const openSubmenu = (text, location) => {
    const page = singleTask.find((task) => task.client === text);
    setLocation(location);
    setPage(page);
    setIsSubmenuOpen(!isSubmenuOpen);
  };

  const openSubtaskMenu = (textBtn) => {
    const subPage = singleTask
      .map((task) => {
        const { info } = task;
        return info.find((val) => val.task === textBtn);
      })
      .filter((value) => typeof value !== "undefined");
    setSubmenuPage(...subPage);
  };

  const editBtn = (id) => {
    const editVal = singleTask
      .map((task) =>
        task.info.map((item) => {
          const { subtask } = item;
          return subtask.find((curId) => curId.id === id);
        })
      )
      .flatMap((val) => val)
      .filter((filtered) => filtered);
    setIsEditing(true);
    setEditingTask(editVal);
  };

  return (
    <TaskContext.Provider
      value={{
        openSubmenu,
        isSubmenuOpen,
        isModalOpen,
        setIsModalOpen,
        singleTask,
        page,
        addedTask,
        showSubtask,
        setShowSubtask,
        openSubtaskMenu,
        submenuPage,
        location,
        isEditing,
        setIsEditing,
        editingTask,
        editBtn,
        editSingleSubTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

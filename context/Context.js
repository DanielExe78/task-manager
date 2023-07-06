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
  const [showTask, setShowTask] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [addingSub, setAddingSub] = useState(false);
  const [subValue, setSubValue] = useState([]);
  const [editingTask, setEditingTask] = useState([]);
  const [location, setLocation] = useState("");
  const [page, setPage] = useState({ client: "", info: [] });
  const [submenuPage, setSubmenuPage] = useState({
    task: "",
    depTasks: [],
  });
  const [depSubTask, setDepSubTask] = useState({
    department: "",
    subtask: [],
  });
  const [singleTask, setSingleTask] = useState([
    {
      client: "PKC",
      info: [
        {
          task: "task 1",
          id: uuidv4(),
          depTasks: [
            {
              id: uuidv4(),
              department: "HR",
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
      ],
    },
    {
      client: "PGA",
      info: [
        {
          task: "task 2",
          id: uuidv4(),
          depTasks: [
            {
              id: uuidv4(),

              department: "HR",
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
      ],
    },
    {
      client: "GOOGLE",
      info: [
        {
          task: "task 3",
          id: uuidv4(),
          depTasks: [
            {
              id: uuidv4(),
              department: "HR",
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
          ],
        },
        {
          task: "task 4",
          id: uuidv4(),
          depTasks: [
            {
              id: uuidv4(),
              department: "PRODUCT",
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
      ],
    },
  ]);

  const addedTask = (task) => {
    const curInfo = singleTask.find((item) => item.info === page.info);
    console.log(task);
    setSingleTask(
      singleTask.map((clientTask) => {
        if (clientTask === curInfo) {
          return { ...clientTask, info: [...curInfo.info, { ...task }] };
        } else {
          return clientTask;
        }
      })
    );
    setIsSubmenuOpen(!isSubmenuOpen);
  };

  const addedSubTask = (task) => {
    const curInfo = singleTask.find((item) => item.info === page.info);
    const assignedTasks = curInfo.info
      .flatMap((tasks) => tasks)
      .filter((specific) => specific.task === submenuPage.task);
    const remainingTasks = submenuPage.depTasks.map((sub) => sub);

    setSingleTask(
      singleTask.map((clientTask) => {
        if (clientTask === curInfo && clientTask.info.length > 1) {
          const unmodifiedVal = curInfo.info.find(
            (val) => val.id !== assignedTasks[0].id
          );

          console.log(assignedTasks[0].depTasks[0]);
          console.log(unmodifiedVal);
          console.log(remainingTasks);

          return {
            ...clientTask,
            info: [
              unmodifiedVal,
              {
                ...assignedTasks[0],
                depTasks: [
                  {
                    ...assignedTasks[0].depTasks[0],
                    subtask: [
                      ...remainingTasks[0].subtask,
                      { ...task.subtask[0] },
                    ],
                  },
                ],
              },
            ],
          };
        } else if (clientTask === curInfo) {
          return {
            ...clientTask,
            info: [
              {
                ...assignedTasks[0],
                subtask: [...remainingTasks, { ...task.subtask[0] }],
              },
            ],
          };
        } else {
          return clientTask;
        }
      })
    );
    setIsSubmenuOpen(!isSubmenuOpen);
  };

  const editSingleSubTask = (task) => {
    const curInfo = singleTask.find((item) => item.info === page.info);

    const specificSub = curInfo.info
      .map((specific) =>
        specific.depTasks.flatMap((subs) => {
          return subs;
        })
      )
      .flat();

    const differentSub = curInfo.info
      .flatMap((specific) =>
        specific.depTasks.flatMap((each) =>
          each.subtask.find((sub) => sub.id === task.subtask[0].id)
        )
      )
      .filter((each) => typeof each !== "undefined");

    setSingleTask(
      singleTask.map((finalTask) => {
        const { info } = finalTask;
        const unique = info.find((ala) => ala.task === submenuPage.task);
        const match = curInfo.info
          .map((each) => each)
          .find((a) => a === unique);
        const index = finalTask.info.indexOf(match);

        if (finalTask.info === curInfo.info && specificSub) {
          const test = finalTask.info.filter((a) => a !== match);
          const subIndex = specificSub
            .map((each) => {
              return each;
            })
            .filter((val) => val === match.depTasks[0])
            .flatMap((val) => {
              const { subtask } = val;
              return subtask.find((del) => del !== differentSub[0]);
            })
            .filter((finalVal) => typeof finalVal !== "undefined");

          return {
            ...finalTask,
            info: [
              ...test,
              {
                ...finalTask.info[index],
                depTasks: [
                  {
                    ...finalTask.info[index].depTasks[0],
                    subtask: [...subIndex, { ...task.subtask[0] }],
                  },
                ],
              },
            ],
          };
        } else if (finalTask === curInfo) {
          return {
            ...finalTask,
            info: [
              {
                ...finalTask.info[index],
                depTasks: [
                  {
                    ...finalTask.info[index].depTasks[0],
                    subtask: [{ ...task.subtask[0] }],
                  },
                ],
              },
            ],
          };
        } else {
          return finalTask;
        }
      })
    );
    setIsSubmenuOpen(!isSubmenuOpen);
  };

  const deleteSingletTask = (id) => {
    const curInfo = singleTask.filter((client) => client.info === page.info);
    const assignedTasks = curInfo
      .flatMap((tasks) => tasks.info)
      .filter((each) => each !== submenuPage);
    const remainingTasks = submenuPage.depTasks
      .flatMap((sub) => sub.subtask)
      .filter((remain) => remain.id !== id);

    console.log(remainingTasks);

    setSingleTask(
      singleTask.map((finalTask) => {
        const { info } = finalTask;
        if (info === curInfo[0].info) {
          return {
            ...finalTask,
            info: [
              ...assignedTasks,
              {
                ...submenuPage,
                depTasks: [
                  {
                    ...submenuPage.depTasks[0],
                    subtask: [...remainingTasks],
                  },
                ],
              },
            ],
          };
        } else {
          return finalTask;
        }
      })
    );
    setShowSubtask(!showSubtask);
    setIsSubmenuOpen(!isSubmenuOpen);
  };

  const openSubmenu = (text, location) => {
    const page = singleTask.find((task) => task.client === text);
    setLocation(location);
    setPage(page);
    setIsSubmenuOpen(!isSubmenuOpen);
  };

  const openSubtaskMenu = (textBtn, id) => {
    const subPage = singleTask
      .map((task) => {
        const { info } = task;

        return info.find((val) => val.id === id);
      })
      .filter((value) => typeof value !== "undefined");

    setSubmenuPage(...subPage);
  };

  const depSubtasks = (id) => {
    const subPage = singleTask
      .map((task) => {
        const { info } = task;
        return info.flatMap((val) => {
          const { depTasks } = val;

          return depTasks.find((dep) => dep.id === id);
        });
      })
      .flat()
      .filter((value) => typeof value !== "undefined");

    setDepSubTask(...subPage);
  };

  const editBtn = (id) => {
    const editVal = singleTask
      .map((task) =>
        task.info.map((item) => {
          const { depTasks } = item;
          return depTasks[0].subtask.find((curId) => curId.id === id);
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
        deleteSingletTask,
        addingSub,
        setAddingSub,
        subValue,
        setSubValue,
        addedSubTask,
        showTask,
        setShowTask,
        depSubtasks,
        depSubTask,
        setDepSubTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

"use client";
import { useGlobalContext } from "../../context/Context";
import Submenu from "../../components/Submenu";
import FormComponent from "../../components/FormComponent";
import { useEffect, useRef } from "react";
import EditSubTask from "../../components/EditSubTask";

export default function Home() {
  const { openSubmenu, isModalOpen, singleTask, location, isEditing } =
    useGlobalContext();
  const container = useRef(null);

  useEffect(() => {
    const submenu = container.current;
    submenu.style.top = `${location}px`;
  }, [location]);

  const displaySubmenu = (e) => {
    let text = e.target.textContent;
    const tempBtn = e.target.getBoundingClientRect();
    const center = (tempBtn.top + tempBtn.bottom) / 2.5;
    openSubmenu(text, center);
  };

  return (
    <section className="flex flex-col text-black gap-8 w-40 mt-14 p-10">
      {singleTask.map((item, index) => {
        const { client } = item;
        return (
          <div key={index}>
            <button
              onClick={displaySubmenu}
              className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600"
            >
              {client}
            </button>
          </div>
        );
      })}
      <section className="absolute left-40" ref={container}>
        <Submenu />
      </section>
      {isModalOpen && (
        <article className="absolute w-screen flex justify-center items-center backdrop-brightness-50 h-screen left-0 top-0">
          <FormComponent />
        </article>
      )}
      {isEditing && (
        <article className="absolute w-screen flex justify-center items-center backdrop-brightness-50 h-screen left-0 top-0">
          <EditSubTask />
        </article>
      )}
    </section>
  );
}

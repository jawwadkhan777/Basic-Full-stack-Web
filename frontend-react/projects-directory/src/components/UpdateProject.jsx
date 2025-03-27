import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const UpdateProject = ({ project, onProjectUpdated }) => {
  const [openModal, setOpenModal] = useState(false);
  const [updateProject, setUpdateProject] = useState(project.project_name);

  const updateProjectHandler = async (proj) => {
    console.log(proj);

    try {
      const res = await fetch(`http://localhost:8081/api/projects/${proj.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify({project_name: updateProject})
      });

      if (!res.ok) throw new Error("Failed to update project!");

      const data = await res.json();
      console.log(data);
      onProjectUpdated(data.proj);
      setOpenModal(false);
    } catch (error) {
      console.error(`Error on updating project: ${error}`);
    }
  };

  return (
    <>
      <FontAwesomeIcon
        icon={faPenToSquare}
        onClick={() => setOpenModal(true)}
        className="text-green-500 cursor-pointer hover:text-green-700"
      />

      {/* Modal */}
      {openModal && (
        <div
          id="crud-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center"
        >
          <div className="relative p-4 w-full max-w-md bg-white rounded-lg shadow-md">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold text-green-500">Update Project</h3>
              <button
                type="button"
                onClick={() => setOpenModal(false)}
                className="text-gray-400 hover:text-gray-900"
              >
                ✖
              </button>
            </div>

            {/* Modal Body */}
            <form
              className="p-4"
              onSubmit={(e) => {
                e.preventDefault();
                updateProjectHandler(project);
              }}
            >
              <div>
                <label
                  htmlFor="project"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Project Name
                </label>
                <input
                  type="text"
                  name="project"
                  id="project"
                  value={updateProject}
                  onChange={(e) => setUpdateProject(e.target.value)}
                  className="w-full p-2 border text-gray-800 border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-700"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateProject;

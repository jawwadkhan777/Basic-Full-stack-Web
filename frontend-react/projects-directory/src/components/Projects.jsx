import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faDiagramProject, faPenToSquare, faTrash} from '@fortawesome/free-solid-svg-icons'

const Projects = ({ projects, onProjectDeleted }) => {

    const deleteProject = async (projId)=> {
        // alert(projId);
        try {
            const res = await fetch(`http://localhost:8081/api/projects/${projId}`, {
                method: "DELETE"
            })
    
            if(!res.ok) throw new Error('Failed to delete project!')
    
            const data = await res.json();
            console.log(data);
            onProjectDeleted(data.project);
    
        } catch(error) {
            console.error(`Error deleting project: ${error}`);
        }
    }

    return (
        <ul className='grid grid-cols-3 grid-rows-3 gap-10 mt-10'>
            {projects.map(proj => (
                <li key={proj.id} className='list-none flex gap-2 text-lg items-center'>
                    <FontAwesomeIcon icon={faDiagramProject} className='text-green-500 ' />
                    <div className='flex items-center justify-between w-full'>
                        <p className=''>{proj.project_name}</p>
                        <div className='flex gap-2'>
                            <FontAwesomeIcon icon={faPenToSquare} className='text-green-500 cursor-pointer hover:text-green-700'/>
                            <FontAwesomeIcon icon={faTrash} onClick={() => deleteProject(proj.id)} className='text-red-500 cursor-pointer hover:text-red-700'/>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    )
}

export default Projects;
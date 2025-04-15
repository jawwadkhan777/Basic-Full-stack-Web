import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faDiagramProject} from '@fortawesome/free-solid-svg-icons'
import UpdateProject from './UpdateProject'
import DeleteProject from './DeleteProject'

const Projects = ({ projects, onProjectDeleted, onProjectUpdated }) => {

    

    return (
        <ul className='grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2  gap-10 mt-10 mb-10'>
            {projects.map(proj => (
                <li key={proj._id} className='list-none border-1 rounded border-green-500 p-2 flex gap-2 text-lg items-center'>
                    <FontAwesomeIcon icon={faDiagramProject} className='text-green-500 ' />
                    <div className='flex items-center justify-between w-full'>
                        <p className=''>{proj.proj_name}</p>
                        <div className='flex gap-2'>
                            <UpdateProject project={proj} onProjectUpdated={onProjectUpdated} />
                            <DeleteProject project={proj} onProjectDeleted={onProjectDeleted} />
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    )
}

export default Projects;
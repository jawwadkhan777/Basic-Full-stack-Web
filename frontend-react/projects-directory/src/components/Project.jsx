import React from 'react'

const Project = ({projects}) => {

    return (
        <>
        {projects?.map(proj => {
            <li>{proj.project_name}</li>
        })}
        </>

  )
}

export default Project
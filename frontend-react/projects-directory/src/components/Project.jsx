import React from 'react'

const Project = ({ data }) => {

    return (
        <>
            {data.map(proj => (
                <li key={proj.id}>{proj.project_name}</li>
            ))}
        </>
    )
}

export default Project
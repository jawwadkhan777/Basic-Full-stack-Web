export const getProjects = async ()=> {
    const res = await fetch("http://localhost:8081/api/projects");
    const data = await res.json();
    return data.projects;
}
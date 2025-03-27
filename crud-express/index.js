const express = require('express');
const projects = require('./MOCK_DATA.json');
const fs = require('fs');
const { error, log } = require('console');
const app = express();
const PORT = 8081;

// middle ware
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));


// routes
// GET - fetch all projects
// server side rendring- direct html content
app.get("/projects", (req, res)=> {
    const html = `<ul>
        ${projects.map((proj)=>
                `<li>${proj.project_name}</li>`
            ).join("")}
    </ul>`;
    res.send(html);
})


// REST api
// GET - fetch all projects in json format
app.get("/api/projects", (req, res)=> res.json({status: "success",projects}))
// GET/PUT/Delete single project
app.route("/api/projects/:id")
.get((req, res)=> {
    const id = Number(req.params.id);
    const proj = projects.find((proj)=> proj.id === id);
    return res.json(proj);
})
.put((req, res)=> {
    const id = Number(req.params.id);
    const {project_name} = req.body;
    const projIndex = projects.findIndex(proj => proj.id === id);
    console.log(`Index: ${projIndex}`);
    

    if (projIndex === -1) {
        return res.status(404).json({error: `Project with id: ${id} not found!`})
    }

    if (!project_name || project_name<3) {
        return res.status(400).json({error: "Project name must be atleast 3 characters"})
    }

    // update project
    projects[projIndex].project_name = project_name;

    // save changes to MOCK_DATA.json file
    fs.writeFile("/MOCK_DATA.json", JSON.stringify(projects), (err)=> {
        if (err) {
            return res.status(500).json({error: "Failed to update project!"});
        }
        res.json({status: "success", updatedProjed: projects[projIndex]});
    })

})
.delete((req, res)=> {
    const id = Number(req.params.id);
    const index = projects.findIndex((proj)=> proj.id === id);
    console.log(`index: ${index}`);

    if(index !== -1) {
        const delProj = projects[index];
        projects.splice(index, 1);
        
        fs.writeFileSync("./MOCK_DATA.json", JSON.stringify(projects), "utf-8");

        return res.json({message: `Project deleted successfully!`, project: delProj})
    }

    res.status(404).json({error: `Project not found with id ${id}`})
})


// POST - Add a new project
app.post("/api/projects", (req, res)=> {
    // const body = req.body;
    if(!req.body.project_name || req.body.project_name.length<3)
        return res.status(400).json({error: "Project name must be atleast 3 characters"});

    const newProject = {id: projects.length+1, project_name: req.body.project_name};
    projects.push(newProject);
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(projects), (err, data)=> {
        return res.json({status: "success", project: newProject})
    })
})

// GET - count of the projects
app.get("/api/projects/count", (req, res)=> {
    try {
        const data = fs.readFile("./MOCK_DATA.json", "utf-8"); // Read file
        const projectsData = JSON.parse(data); // Parse JSON
        return res.json({ status: "success", totalProjects: projectsData.length });
    } catch (error) {
        console.error("Error reading projects file:", error);
        return res.status(500).json({ status: "error", message: "Internal Server Error" });
    }

})

// start the server
app.listen(PORT, ()=> {console.log(`Server started at port: ${PORT}`)});


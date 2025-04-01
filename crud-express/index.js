const express = require('express');
require('dotenv').config();
// const projects = require('./MOCK_DATA.json');
const DB_FILE = './MOCK_DATA.json';
const fs = require('fs');
// const { error, log } = require('console');
const app = express();
const PORT = process.env.PORT;
const { v4: uuidv4 } = require('uuid'); // Import UUID

const corsOptions = {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"], 
}

// middle ware
const cors = require("cors");
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Read JSON file dynamically
const readDB = () => {
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(data);
};

// Write JSON file
const writeDB = (data) => {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
};

// routes
// root endpoint
app.get("/", (req, res)=> {
    res.send("Welcome to backend server!")
})

// GET - fetch all projects
// server side rendring- direct html content
app.get("/projects", (req, res)=> {
    const projects = readDB();
    const html = `<ul>
        ${projects.map((proj)=>
                `<li>${proj.project_name}</li>`
            ).join("")}
    </ul>`;
    res.send(html);
})

// REST api
// GET - fetch all projects in json format
app.get("/api/projects", (req, res)=> {
    const projects = readDB();
    res.json({status: "success", projects: projects});
})
// GET - count of the projects
app.get("/api/projects/count", (req, res)=> {
    // console.log(projects.length);
    const projects = readDB();
    return res.json({ status: "success", totalProjects: projects.length});
    
})
// GET/PUT/Delete single project
app.route("/api/projects/:id")
.get((req, res)=> {
    const projects = readDB();
    const id = Number(req.params.id);
    const proj = projects.find((proj)=> proj.id === id);
    return res.json(proj);
})
.put((req, res)=> {
    const projects = readDB();
    const {id} = req.params;
    const {project_name} = req.body;
    const projIndex = projects.findIndex(proj => proj.id === id);
    // console.log(`Index: ${projIndex}`);
    
    if (projIndex === -1) {
        return res.status(404).json({error: `Project with id: ${id} not found!`})
    }

    if (!project_name || project_name.length<3) {
        return res.status(400).json({error: "Project name must be atleast 3 characters"})
    }

    const isDuplicate = projects.some(proj => proj.project_name.toLowerCase() === project_name.toLowerCase());
    if(isDuplicate) {
        return res.status(400).json({error: "Project name already exists"});
    }

    // update project
    projects[projIndex].project_name = project_name;

    // save changes to MOCK_DATA.json file
    // fs.writeFile("/MOCK_DATA.json", JSON.stringify(projects), (err)=> {
    //     if (err) {
    //         return res.status(500).json({error: "Failed to update project!"});
    //     }
    //     res.json({status: "success", updatedProjed: projects[projIndex]});
    // })
    writeDB(projects);
    res.json({status: "success", updatedProjed: projects[projIndex]});
})
.delete((req, res)=> {
    const projects = readDB();
    const {id} = req.params;
    const index = projects.findIndex((proj)=> proj.id === id);
    console.log(`index: ${index}`);

    if(index !== -1) {
        const delProj = projects[index];
        projects.splice(index, 1);        
        writeDB(projects);
        res.json({message: `Project deleted successfully!`, project: delProj})
    }

    res.status(404).json({error: `Project not found with id ${id}`})
})


// POST - Add a new project
app.post("/api/projects", (req, res)=> {
    const projects = readDB();
    const projectName = req.body.project_name;
    console.log(projectName);
    
    if(!projectName || projectName.length<3) 
        return res.status(400).json({error: "Project name must be atleast 3 characters"});

    // check for duplicate project name
    const isDuplicate = projects.some(proj => proj.project_name.toLowerCase() === projectName.toLowerCase());
    if(isDuplicate) 
        return res.status(400).json({error: "Project name already exists"});

    const newProject = {id: uuidv4(), project_name: projectName};
    projects.push(newProject);
    writeDB(projects);
    res.json({status: "success", project: newProject})
})

// start the server
app.listen(PORT, ()=> {console.log(`Server started at port: ${PORT}`)});


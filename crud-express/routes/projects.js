const express = require('express');
const router = express.Router();

const Project = require('../models/projectModel');

// routes
// root endpoint
router.get("/", (req, res)=> {
    res.send("Welcome to backend server!");
})

// REST API
// GET - fetch all projects in json format
router.get("/projects", async (req, res)=> {
    try {
        const projects  = await Project.find();
        res.status(200).json(projects);
    } catch(error) {
        res.status(500).json({succcess: false, message: error.message});
    }
})

// GET - count of the projects
router.get("/projects/count", async (req, res)=> {
    try {
        const projects = await Project.find();
        return res.json({ status: "success", totalProjects: projects.length});
    } catch(error) {
        res.status(500).json({succcess: false, message: error.message});
    }
})

// POST - Add a new project
router.post("/projects", async (req, res)=> {
    try {
        const {proj_name} = req.body;

        if(!proj_name || proj_name.length<3) 
                return res.status(400).json({error: "Project name must be atleast 3 characters"});
        
        // check for duplicate project name
        const existingProject = await Project.findOne({ proj_name: new RegExp(`^${proj_name}$`, 'i') });
        if (existingProject) {
            return res.status(400).json({ error: "Project name already exists" });
        }
        
        const newProject = new Project({proj_name});
        await newProject.save();
        res.status(200).json({success: true, project: newProject});
    } catch(error) {
        res.status(500).json({succcess: false, message: error.message});
    }
})

// PUT - Update a project
router.put("/projects/:id", async (req, res)=> {
    const {id} = req.params;
    const {proj_name} = req.body;

    try {
        if(!proj_name || proj_name.length<3) 
            return res.status(400).json({error: "Project name must be atleast 3 characters"});
    
        // check for duplicate project name
        const existingProject = await Project.findOne({ proj_name: new RegExp(`^${proj_name}$`, 'i') });
        if (existingProject) {
            return res.status(400).json({ error: "Project name already exists" });
        }
        
        const updateProject = await Project.findByIdAndUpdate(id, {proj_name});

        if(!updateProject) {
            res.status(400).json("Project not found!");
        }

        res.status(200).json({success: true, project: updateProject});
    } catch(error) {
        res.status(500).json({succcess: false, message: error.message});
    }
})

// dELETE - delete the project
router.delete("/projects/:id", async (req, res)=> {
    const {id} = req.params;

    try {
        const deletedProject = await Project.findByIdAndDelete(id);

        if(!deletedProject) {
            res.status(400).json("Project not found!");
        }

        res.status(200).json({success: true, project: deletedProject});
    } catch(error) {
        res.status(500).json({succcess: false, message: error.message});
    }
})

module.exports = router;
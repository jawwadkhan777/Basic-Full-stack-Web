const { Schema, model } = require("mongoose");

const ProjectSchema = new Schema({
    proj_name: {
        type: String,
        required: true,
        maxlength: 30
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const ProjectModel = model("Project", ProjectSchema)

module.exports = ProjectModel
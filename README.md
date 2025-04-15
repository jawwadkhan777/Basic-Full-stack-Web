# Project Management App

A simple project management application that allows users to add, view, update and delete projects with real-time updates using React for the frontend, Node.js with Express for the backend and mongoDB for data handling.

## Features
- Add new projects with validation (minimum 3 characters, no duplicates)
- View the list of existing projects
- Update the projects with validation
- Delete projects dynamically
- Backend stores projects in mongoDB database
- RESTful API endpoints
- Error handling for smooth user experience

## Tech Stack
### Frontend
- React.js (with Hooks)
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB 

## Installation

### Prerequisites
Ensure you have the following installed:
- Node.js (v16 or later)
- npm or yarn

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/project-management-app.git
   cd project-management-app
   ```

2. Install dependencies for the backend:
   ```bash
   cd backend
   npm install
   ```

3. Install dependencies for the frontend:
   ```bash
   cd ../frontend
   npm install
   ```

4. Start the backend server:
   ```bash
   npm start or npx nodemon npm start
   ```

5. Start the frontend application:
   ```bash
   npm run dev
   ```

## API Endpoints

### **1. Add a Project**
**Endpoint:** `POST /api/projects`
- **Request Body:** `{ "proj_name": "New Project" }`
- **Response:**
  ```json
  {
    "status": "success",
    "project": { "id": "67fa1950ad453b829ca05388", "proj_name": "New Project" }
  }
  ```
- **Error Responses:**
  ```json
  { "error": "Project name must be at least 3 characters" }
  { "error": "Project name already exists" }
  ```

### **2. Get All Projects**
**Endpoint:** `GET /api/projects`
- **Response:**
  ```json
  [
    { "id": "67fa1950ad453b829ca05388", "proj_name": "New Project" },
    { "id": "67fa1950ad453b829ca05367", "proj_name": "Another Project" }
  ]
  ```

### **3. Update a Project**
**Endpoint:** `PUT /api/projects/:id`
- **Request Body:** `{ "project_name": "updateProject" }`
- **Response:**
  ```json
  {
    "status": "success",
    "project": { "id": "67fa1950ad453b829ca05388", "updatedProjed": "projects[projIndex]" }
  }
  ```
- **Error Responses:**
  ```json
  { "error": "Project name must be at least 3 characters" }
  { "error": "Project name already exists" }
  ```

### **4. Delete a Project**
**Endpoint:** `DELETE /api/projects/:id`
- **Response:**
  ```json
  { "message": "Project deleted successfully!", "project": { "id": "67fa1950ad453b829ca05388", "proj_name": "New Project" } }
  ```
- **Error Response:**
  ```json
  { "error": "Project not found with id 1" }
  ```

### **4. Get Project Count**
**Endpoint:** `GET /api/projects/count`
- **Response:**
  ```json
  { "totalProjects": 5 }
  ```

## Contributing
Contributions are welcome! If you encounter any issues while using this repository or have any suggestions for improvement, please feel free to reach out to the developer, **Muhammad Jawwad Khan**, via [email](mailto:m.jawwadkhan777@gmail.com) or connect on [LinkedIn](https://www.linkedin.com/in/jawwadkhan777/).

## License
This project is licensed under the MIT License.

---

Happy coding! 

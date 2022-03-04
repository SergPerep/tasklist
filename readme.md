# Tasklist
[→ Deployed project on heroku](srgprp-tasklist.herokuapp.com/)

![index-screen](./readme-media/Cover.png)

## Features

- Adding, deleting and editing task
- Setting date and time for a task
- Setting project for a task
- Adding, deleting and editing project
- Setting name and color of a project
- Login and signup

## Data design
I've choosen postgreSQl since I worked with this database before end I needed relational database to connect tasks with projects and users.

![DB diagram](./readme-media/DBdiagram.png)

### Folder table

- Folder is a customizable collection of tasks. 
- Folders are called projects in frontend only for the user convenience.

### Color table

- Contains collection of colors, which user can assign to a project (folder).
- Initialy it had 2 additional colums with color-values. But after redesign they became deprecated.
- User is allowed to select color for a project but not to add new colors or remove any, since they are a part of UI design. 

### Users table

- Contains usernames and hashed passwords of registered users.
- User-sessions are stored separately in MongoDB.

### Task table

- Contains tasks with description, date and time and status of completion. Requied to be connected to a user, and can be assigned to a folder.
- Initially instead of <code>date: date</code> and <code>time: time</code> were <code>date: timestamp</code> and <code>has_time: boolean </code>. <code>Date</code> stored information about both date and time and <code>has_time</code> indicated whether client should read hours and minutes of <code>date</code> or not. Such entries were hard to understand (by human). And since postgres has special types for days and hours anyway, it was decided to use such instead. Though it requied some tweaks of node-postgress configuration to force it to work smoothly.
- <code>time_of_creation</code> is used only for task sorting.
- Originally table also had <code>last_time_was_updated</code> column but it was deprecated, since no use was found for it.

## API

Tasks

<details>
<summary><code>GET</code> /tasks</summary>


Example Request

    GET https://tasklist.heroku.com/tasks


</details>

<details>

<summary><code>POST</code> /tasks</summary>


Example Request
    
    GET https://tasklist.heroku.com/tasks
    {
        "description": "REFACTOR first task",
        "date": "2022-08-17",
        "time": "16:00",
        "folder_id": 1
    }

</details>

<details>
<summary><code>PUT</code> /tasks/:id</summary>

    PUT http://localhost:5000/tasks/110
    {
        "description": "To the dentist",
        "date": "2022-02-11",
        "time": "14:00",
        "folder_id": 1
    }
</details>

<details>
<summary><code>POST</code> /tasks</summary>

Example Request
    
    POST http://localhost:5000/tasks
    {
        "description": "REFACTOR first task",
        "date": "2022-08-17",
        "time": "16:00",
        "folder_id": 1
    }
</details>

<details>
<summary><code>DELETE</code> /tasks</summary>
Example Request
    
    DELETE http://localhost:5000/tasks/120
</details>


Colors
- GET /colors

Folders
- GET /folders
- POST /folders
- PUT /folders/:id
- DELETE /folder/:id

Authentication
- POST /auth/register
- POST /auth/login
- GET /auth/logout
- GET /auth/check-auth

Users
- POST /users

## Authentication

## Icons

## Data
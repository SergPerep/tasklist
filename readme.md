# Tasklist
[→ Deployed project on heroku](srgprp-tasklist.herokuapp.com/)

Tasklist is very basic

## Features

- Tasks
    - Add, delete and edit task
    - Set date and time for a task
    - Set project for a task
- Projects
    - Add, delete and edit project
    - Set name and color of a project
- Authorization
    - Signup
    - Login

## Data design
I've choosen postgreSQl since I worked with this database before end I needed relational database to connect tasks with projects and users.

![DB diagram](./readme-media/DBdiagram.png)

user_id is uuid so it would be very hard to guess

### Folder table

Folder is a customizable collection of tasks. 

Folders are called projects in frontend only for the user convenience.

### Color table

Contains collection of colors, which user can assign to a project (folder).

Initialy it had 2 additional colums with color-values. But after redesign they became deprecated.

User is allowed to select color for a project but not to add new colors or remove any, since they are a part of UI design. 

### Users table

Contains usernames and hashed passwords of registered users.

User-sessions are stored separately in MongoDB.

### Task table

Contains tasks with description, date and time and status of completion. Requied to be connected to a user, and can be assigned to a folder.

Initially instead of <code>date: date</code> and <code>time: time</code> were <code>date: timestamp</code> and <code>has_time: boolean </code>. <code>Date</code> stored information about both date and time and <code>has_time</code> indicated whether client should read hours and minutes of <code>date</code> or not. Such entries were hard to understand (by human). And since postgres has special types for days and hours anyway, it was decided to use such instead. Though it requied some tweaks of node-postgress configuration to force it to work smoothly.

<code>time_of_creation</code> is used only for task sorting.

Originally table also had <code>last_time_was_updated</code> column but it was deprecated, since no use was found for it.

## API
## Authentication

## Icons

## Data
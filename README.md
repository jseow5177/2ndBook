# 2ndBook

A book sharing web app built with the MERN (MondoDB, Express, React, Node) stack!

## Project Demo
I have uploaded a 2 min app demo on [Youtube](https://www.youtube.com/watch?v=sNkqTQHeZ2U&feature=youtu.be).

## Getting started

### Clone the repo
`git clone https://github.com/jseow5177/Bookstagram.git`</br>
`cd Bookstagram`

## File Structure

#### `client` - Holds the client application
- #### `public` - Holds the static files
- #### `src`
    - #### `components` - Holds all the different React components
    - #### `App.js` - Renders browser routes and different pages
    - #### `index.js` - Renders the React app by rendering App.js
- #### `package.json` - Defines npm behaviors and packages for the client
#### `backend` - Holds the server application
- #### `database` - Holds `db.js` which has the local mongoDB connection
- #### `models` - Holds all the data models
- #### `routes` - Holds HTTP to URL path associations for each unique url
- #### `uploads` - Multer file uploads
- #### `server.js` - Holds the server code
- #### `package.json` - Defines npm behaviors and packages for the server
#### `package.json` - Defines npm behaviors like the scripts defined in the next section of the README
#### `.gitignore` - Tells git which files to ignore
#### `README` - This file!

## Available Scripts

Please note that any time the server is run in these scripts `nodemon` is used in place of `node` for easier development.<br/>
In the root directory, you can run:

### `npm run install-all`

Installs all `npm` dependencies in the client and server side.

### `npm run client-install`

Installs all `npm` dependencies in the client side.

### `npm run server-install`

Installs all `npm` dependencies in the server side.

### `npm run client`

Runs just the client app in development mode. <br />
Open [http://localhost:3000](http://localhost:3000) to view the client in the browser.

### `npm run server`

Runs just the server in development mode.

### `npm run dev`

Runs both the client and server in development mode. <br />
Open [http://localhost:3000](http://localhost:3000) to view the client in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## Tech Stacks
<ul>
  <li>Backend
    <ul>
      <li>Node.js</li>
      <li>Express.js</li>
      <li>MongoDB and Mongoose</li>
    </ul>
  </li>
  <li>Frontend
    <ul>
      <li>HTML5, CSS3, JavaScript</li>
      <li>React</li>
      <li>React Bootstrap</li>
      <li>Redux</li>
    </ul>
  </li>
</ul>

## App features
<ol>
  <li>User login, signup and authentication with JSON web token (JWT).</li>
  <li>Users can upload, edit, delete and view books.</li>
  <li>Users can edit their own profile page and view the profile of others.</li>
</ol>

## Next steps
- Implement a chat feature that allows user to talk to each other via web sockets
- Improve API endpoints

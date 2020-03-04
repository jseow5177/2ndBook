*Project still ongoing. Commits will be made consistently.*

# BookShare

A book sharing web app build with the MERN (MondoDB, Express, React, Node) stack!

## Project Demo

## Getting started

### Clone the repo

## File Structure

`client` - Holds the client application

<ul>
  <li>`public` - Holds the static files</li>
  <li>
    `src`
    <ul>
      <li>`components` - Holds all the different React components</li>
      <li>`App.js` - Renders browser routes and different pages</li>
      <li>`index.js` - Renders the React app by rendering App.js</li>
    </ul>
  </li>
  <li>`package.json` - Defines npm behaviors and packages for the client</li>
</ul>

`backend` - Holds the server application

<ul>
  <li>`database` - Holds `db.js` which has the mongoDB uri</li>
  <li>`models` - Holds all the data models</li>
  <li>`routes` - Holds HTTP to URL path associations for each unique url</li>
  <li>`uploads` - Holds file uploads via `Multer`</li>
  <li>`server.js` - Holds the server code</li>
  <li>`package.json` - Defines npm behaviors and packages for the server</li>
</ul>

`package.json` - Defines scripts that are explained in the next section of README

`.gitignore` - Tells git which files to ignore

`README` - This file!

## Available Scripts

Please note that any time the server is run in these scripts `nodemon` is used in place of `node` for easier development. You can learn more about `nodemon` [here](https://www.npmjs.com/package/nodemon). <br/>
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
      <li>React Bootstrap</li>
    </ul>
  </li>
</ul>

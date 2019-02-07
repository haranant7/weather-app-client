This is a sample Weather app . The client side is bootstrapped with Create React App. It is to be used in conjunction with a server which is described below.

Server side - node js server hosted at https://mighty-anchorage-55505.herokuapp.com. This can be changed in utils.js.

The repository for server is https://github.com/haranant7/weather-app-server

How to Install:
1. Once the repository is cloned, run `npm install` in order to install dependencies.
2. Run `npm start` to start the CRA app(details given below)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

Directory structure :

weather-app-client
|
|--- public
|
|---src
    |
    |---- actions - contains action creators
    |---- assets  - Image files
    |---- components  - contains App React Components
    |---- font   - font files 
    |---- reducers  - contains reducers
    |---- styles    - CSS files
    |---- utils  - utility files

# Restaurant Finder React App

This project was created to exemplify an application build using react hooks.\
It creates a simple restaurant finder app that has a search functionality with some filters.\
It uses [Material UI](https://mui.com/) as a component library

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Live Demo
Azure deployed live [demo](https://restaurantfinder-react.azurewebsites.net/) \
Since its hosted in a free tier Azure container, the application may take some time to startup

## Building and Running the APP

In the project directory, you can run:

### `npm install`

to install all the dependencies of the project

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the unit test runner in the interactive watch mode.\
The tests are just simple unit tests to check if the App was build and the main App component is running

### `npm cypress`

Launches the integration test runner using cypress, in the interactive watch mode.\
Cypress tests some interaction between the components and search function of the App
it needs the [backend](https://github.com/henriqueantunes/restaurantfinder) running for tests to
complete without errors

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### Docker support
Alternatively, a Dockerfile is available in the project's root folder and it can be run with the following commands.

create a docker image running:\
`docker build -t henrique/restaurantfinder-react .`

run the docker container:\
`docker run -p 3000:3000 henrique/restaurantfinder-react`

Note that the docker build, builds the app in production mode, so depending on the URL of your backend you will need to alter the `env.production` variable

#### Docker Hub

You can also download the latest working image from my personal docker hub:\
`docker pull henriqueantuness/restaurantfinder-react:1.0.0`

And run it on docker:
`docker run -p 8080:8080 henriqueantuness/restaurantfinder-react:1.0.0`

the docker hub image is pointing to the azure's deployed backend at the address http://restaurantfinder-kotlin.azurewebsites.net/
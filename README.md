# Pokemon App

This application is deployed on vercel and the link to the applicalion can be found [here](https://pokemon-app-three-psi.vercel.app/)

a React application that performs the following tasks:

1. Has a web page that allows a user to enter a pokemon name;
2. When submitting, queries https://pokeapi.co and display the given
   pokemon (at least name, number and sprite), or an error message if no
   match is found;
3. Has “Previous” & “Next” buttons, that switch to the previous/next
   pokemons, base on their id number;
4. Has a text-based search feature, where inputting a name or partial
   name should look for a matching pokemon and show it
5. Has at least two automated tests, for the two features above.

## How to Setup the project

1. Clone the repository into your system but running `git clone https://github.com/thobbyAk/Pokemon-app.git`

2. cd in to the root folde and run `npm install` to install all dependencies

3. In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.

### `npm test`

Launches the test runner in the interactive watch mode.\

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

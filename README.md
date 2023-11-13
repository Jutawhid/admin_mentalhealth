# Getting Started with KRATOS

### `version : 1.0.0`

This project was developed with REACT-REDUX & Typescript

## Available Scripts

In the project directory, you can run:

### `yarn start` 
or
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!


## `.htaccess`

`<IfModule mod_rewrite.c>`\
RewriteEngine On\
RewriteBase /subdirectory\
RewriteRule ^index\.html$ - [L]\
RewriteCond %{REQUEST_FILENAME} !-f\
RewriteCond %{REQUEST_FILENAME} !-d\ 
R0e writeCond %{REQUEST_FILENAME} !-l\
RewriteRule . /index.html [L]\
`</IfModule>`
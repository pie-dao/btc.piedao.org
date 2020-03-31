## How to run

- run `yarn`
- run `yarn start`

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

### `yarn analyze`

Spawns a webpack-bundle-analyzer page showing how much space each component and library is taking
in the production bundle. Once the stats are generated, a webpage will open at
[http://localhost:8888](http://localhost:8888).

NOTE: This tends to take quite a while.

### `yarn clean`

Removes the build directory and stats.json file.

### `yarn compile`

Same as `yarn build` but without first removing the build directory and stats.json file. If you
have any `rimraf` related errors, you can delete the build directory and run this manually.

## Learn More

[React documentation](https://reactjs.org/)
[React Easy State](https://github.com/solkimicreb/react-easy-state)
[TailwindCSS](https://tailwindcss.com/)


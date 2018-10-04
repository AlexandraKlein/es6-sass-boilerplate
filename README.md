# Boilerplate for ES6 & SASS Web Apps

## Structure
All source files belong to the `src` folder. The page itself is served off the `public` folder.

Gulp tasks deploy your compiled and packed styles (one `styles.css`) and scripts (`app.js`) to this public folder either uncompressed with sourcemaps as default or compressed and without sourcemaps for production (use `--production` argument to gulp tasks).

## Installation
```bash
npm install
```

#### Update Node Version
```bash
nvm use 8.9
```

After that execute `npm start`, point your browser to http://localhost:3000 and start adding and editing files in `src`.

## Scripts
* `npm start` - alias for `gulp serve`
* `npm run build` - alias for `gulp build --production`

## Gulp Tasks
* `gulp serve` - starts Browsersync and serves your app for testing in different browsers (default: http://localhost:3000, Browsersync-UI at http://localhost:3001), after changes in SCSS, JS and HTML files in `src` the page is automatically refreshed
* `gulp build` - executes all tasks, but does not start a browsersync server


Add `--production` to any gulp task to activate production mode. In production mode all code will be minified and no sourcemaps are written.

This project was initialized with the [es6-sass-boilerplate](https://github.com/freinbichler/es6-sass-boilerplate)
# es6-sass-boilerplate

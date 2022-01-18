Readme
====================================================================

**Package restore:**
Use `npm install` to install dependent packages.

**Developing:**
Call `npm start` to start debugging

**Building for production**
Call `npm run build`, which will build and bundle the code into `dist` folder.
Note: for the production build, hash sufix (chunkhash) is added for index.js,
so for every build a diffrent index name will be generated (always copy index.html
and as it will always point to the latest index[chunkhash].js file).

**Genereting GraphQL API**
Type `npm run graphgen` to create API from GraphQL schema. Use graphqlrc.yml to 
specify options regarding graphql

**Testing in debug mode**
When you run `npm start`, the command will try to load environment variables,
so make sure that these varaibles are set in `.env` file (root folder).

**Testing for production**
Use live-server module (npm install -g live-server) to test build. To start
web server, go to dist folder and type `npx live-server --port=8084 --entry-file=./index.html`
(please choose port number carefully)
NOTE: Before you start test server, make sure that envirovment variables are set,
this must be done globally, as .ENV file is only used during development. The
following ENV should be set (on windows you can type):
   `$env:API_URL="bloom"`
   `$env:ENVIRONMENT="production"`
   
**TEST Pipline**
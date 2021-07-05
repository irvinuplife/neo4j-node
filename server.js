const express = require('express');
const neo4j = require('neo4j');
const app = express();
const port = 3000;
// Connection to the DB
var dbconf = require('./app/configs/database');
db = new neo4j.GraphDatabase(`http://${dbconf.user}:${dbconf.password}@${dbconf.hostname}:${dbconf.port}`);

// Routing Application
require('./app/routes/main')(app, db);

// Configure public folder
app.use(express.static('public'));

// Start server using port 3000
app.listen(port, () => {
  console.log(`Sample app listening on port ${port}!`)
});

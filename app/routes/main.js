var request = require('request');
var cheerio = require('cheerio');

module.exports=function(app, db) {
  app.get('/', function(req, res) {
    res.send('welcome neo4j');
  }),
  app.get('/register', function(req, res) {
      var url = 'https://20.88.33.168/echo/post/form';

      request(url, function(error, response, html) {
        if (!error) {
          var $ = cheerio.load(html);
          var tableData = $('table#o').html();
          var tableData = '<table id="tableUser">'+tableData+'</table>';

          var $ = cheerio.load(tableData);
          var rowCount = $('#tableUser>tr>td').get().length;

          var users = [];
          for (i = 0; i < rowCount; i++)
            users.push($('#tableUser>tr>td').eq(i).text());

          var persons = [];
          var iCheck = 2;
          var iNumber = 1;
          var iName = 2;
          var iMultiple = 4;

          for (var i = 0, len = users.length; i < len; i++) {
            var iCheck = iCheck + iMultiple;
            if (users[iCheck]) {
              var numberPerson = users[iNumber = iNumber + iMultiple];
              var namePerson = users[iName = iName + iMultiple];

              // Insert Into Database
              db.cypher({
                query: `CREATE (n:Person {number: '${numberPerson}', name: '${namePerson}'}) RETURN n`
              }, function (err, results) {
                if (! err)
                  queryStatus = true;
                return queryStatus;
              });
            }
          }
        }
      });

    res.send('successfully registered');
  });
}

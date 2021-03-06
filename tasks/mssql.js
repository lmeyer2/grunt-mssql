'use strict';

module.exports = function(grunt) {
  grunt.registerMultiTask('mssql', 'query to be excuted against a ms sql server', function() {
      // Merge task-specific and/or target-specific options with these defaults.
      var config = this.options({
        server: '',
        userName: '',
        password: '',
        options: {
          instanceName: ''
        }
      });

      var Connection = require('tedious').Connection;
      var Request = require('tedious').Request;

      var connection = new Connection(config);

      connection.on('debug', function(text) {
        console.log(text);
      });

      var query = this.data.query;
      var done = this.async();

      connection.on('connect', function(err) {
        var request = new Request(query, function(err, rowCount) {
              connection.close();
              if (err) {
                grunt.log.error(err);
                done(false);
              } else{
                grunt.log.ok("Query excuted: " + query);
                done();
              }
          });
          connection.execSql(request);
      });
  });

};

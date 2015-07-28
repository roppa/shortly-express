var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var User = db.Model.extend({
    tableName: 'users'
  }, {

    login: Promise.method(function (username, password) {

      if (!username || !password) {
        throw new Error('Username and password are both required');
      }

      return new this({ username : username })
        .fetch({ require : true })
        .tap(function (user) {

          return bcrypt.compare(password, user.get('password'), function(err, result){
            return result;
          });

        });

    }) //login

});

module.exports = User;
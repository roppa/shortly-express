var db = require('../config');
var bcrypt = require('bcrypt-nodejs');

var User = db.Model.extend({
    tableName: 'users'
  }, {

    login: function (username, password, cb) {

      if (!username || !password) {
        cb(false);
      }

      new this({ username : username })
        .fetch({ require : true })
        .tap(function (user) {
          bcrypt.compare(password, user.get('password'), function(err, result){
            if (err) {
              cb(err);
            } else {
              cb (result);
            }
          });

        });

    } //login

});

module.exports = User;
'use strict'
let Model = require('../model');

class User extends Model {
    data = [];
    constructor() {
        super('users');
    }

}

module.exports = User;
'use strict'

const mysql      = require('mysql2');
const db = require('./config.json');

class Model {
    connection;
    constructor(table) {
        this.table = table;
    }

    async find(id) {
        let query = `SELECT * FROM ${this.table} WHERE id=${id};`;
        let [rows,fields] = await this._connect(query);
        if(rows) {
            rows.map(item => {
                this.data.push(item);
            });
        }
        return this;
    }
    async delete() {
        if(!this.data[0]) {
            return false;
        }
        // console.log(this.data[0].id);
        let query = `SELECT * FROM ${this.table} WHERE id=${this.data[0].id};`;
        let [rows,fields] = await this._connect(query);
        if(rows) {
            let query = `DELETE FROM ${this.table} WHERE id=${this.data[0].id};`;
            let [rows,fields] = await this._connect(query);
            if(rows) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    async save(data) {
        let keys = [];
        let values = [];
        let update = [];
        let query;
        for(let key in data) {
            if(key !== "id") {
                keys.push(key);
                values.push(`'${data[key]}'`);
                update.push(`${key}='${data[key]}'`);
                // `${key}='${data[key]}'`;
            }
        }
        if(data.id) {

            query = `UPDATE ${this.table} SET ${update} WHERE id=${data.id};`;
        } else {
            query = `INSERT ${this.table} (${keys}) VALUES (${values});`;
        }
        console.log(query);
        let [rows,fields] = await this._connect(query);

        return this;
    }
    async getAll() {
        let query = `SELECT * FROM ${this.table};`;
        let [rows,fields] = await this._connect(query);
        if(rows) {
            rows.map(item => {
                this.data.push(item);
            });
        }
        return this;
    }
    async getList(data) {
        let keys = [];
        let values = [];
        let where = [];
        for(let key in data) {
            if(key !== "id") {
                keys.push(key);
                values.push(`'${data[key]}'`);
                where.push(`${key}='${data[key]}'`);
            }
        }

        let query = `SELECT * FROM ${this.table} WHERE ${where.join(" AND ")};`;
        let [rows,fields] = await this._connect(query);
        // console.log([...rows]);
        //return this._getResult(rows);
        return rows;
    }
    _connect(query) {
        this.connection = mysql.createConnection({
            host     : db.host,
            user     : db.user,
            password : db.password,
            database : db.data_base
        });
        this.connection.connect();
        let result;
        try {
            result = this.connection.promise().query(query);
        } catch (err) {
            result = err;
            console.error(err)
        }
        this.connection.end();
        return result;
    }
    _getResult(rows) {
        return rows.map(item => {
            let result = {};
            for(let key in item) {
                result[key] = item[key];
            }
            return result;
        });
    }



}

module.exports = Model;
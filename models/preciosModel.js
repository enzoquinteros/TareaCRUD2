var pool = require('./bd');

async function getPrecios() {
    var query = 'select * from precios';
    var rows = await pool.query(query);
    return rows;
}

async function deletePreciosById(id) {
    var query = 'delete from precios where id = ?';
    var rows = await pool.query(query, [id]);
    return rows;
}

async function insertPrecios(obj) {
    try {
        var query = "insert into precios set ? ";
        var rows = await pool.query(query, [obj]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getPreciosById(id) {
    var query = "select * from precios where id=? ";
    var rows = await pool.query(query, [id]);
    return rows[0];
}

async function modificarPreciosById(obj, id) {
    try {
        var query = "update precios set ? where id=? ";
        var rows = await pool.query(query,[obj,id]);
        return rows;
    }   catch (error) {
        throw error;
    }
}

module.exports = { getPrecios, deletePreciosById, insertPrecios, getPreciosById,modificarPreciosById}
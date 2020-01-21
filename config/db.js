const mysql = require('mysql');
const koneksi = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'data_siswa',
  multipleStatements: true
});

koneksi.connect(err => {
  if (err) throw err;
});

module.exports = koneksi;

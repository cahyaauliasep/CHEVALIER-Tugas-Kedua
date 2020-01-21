const express = require('express');
const bodyParse = require('body-parser');
const koneksi = require('./config/db')
const PORT = 5000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/mahasiswa/', (req ,res)=> {
  koneksi.query('SELECT * FROM mahasiswa', (err, rows , fields)=>{
    if (err){
      return res.status(400).json({ success: false,message: 'Kesalahan Query'});
    }

    res.status(200).json({success:true, data:rows});

    });
  });

  app.post('/mahasiswa/', (req,res)=>{
    var data= {
      nama: req.body.nama,
      nim: req.body.nim,
      kelas: req.body.kelas
    };

    koneksi.query('INSERT INTO mahasiswa SET ?', data, (err, rows, field)=>{
      if(err){
        return res.status(400).json({success:false, message:'Masukkan Field Dengan Benar Ya'});
      }
      res.status(201).json({success: true,data: data});
        });

  app.delete('/mahasiswa/:id', (req,res)=>{
    koneksi.query('DELETE FROM mahasiswa WHERE id = ?'), [req.params.id], (err, rows, fields) => {
      if(!err)
        res.send('Deleted');
      else
        console.log(err);
    }
  });

  app.put('/mahasiswa/:id', (req, res) =>{
    var mhs = {
      nama: req.body.nama,
      nim: req.body.nim,
      kelas: req.body.kelas
    }

    koneksi.query('UPDATE mahasiswa SET ? WHERE id = ?', [mhs, req.params.id], (err, rows, fields) => {
      if (err) {
        return res.status(201).json({ success: false,message: 'Oh No!Failed'});
      }
      res.status(200).json({ success: true, data: mhs});
      });

      app.listen(PORT, () => console.log(`server running at port ${PORT}`));

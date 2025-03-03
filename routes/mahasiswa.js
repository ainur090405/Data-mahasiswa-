var express = require("express");
var router = express.Router();

var connection = require("../config/database.js");

router.get("/", function (req, res, next) {
  connection.query(
    "select * from mahasiswa order by id_mahasiswa desc",
    function (err, rows) {
      if (err) {
        req.flash("error", err);
      } else {
        res.render("mahasiswa/index", {
          data: rows
        });
      }
    }
  );
});

router.get('/create', function(req, res, next){
  res.render('mahasiswa/create')
})

router.post('/store', function(req, res, next){
  try{
    let {NAMA, NRP, TGL_LAHIR, JENIS_KELAMIN, AGAMA, HOBY, ALAMAT, PROGRAM_STUDY} = req.body
    let Data = {
      NAMA, NRP, TGL_LAHIR, JENIS_KELAMIN, AGAMA, HOBY, ALAMAT, PROGRAM_STUDY
    }
    connection.query('insert into mahasiswa set ?', Data, function(err,result){
      if(err){
        req.flash('error', 'gagal menyimpan data')
      }else{
        req.flash('success', 'Berhasil menyimpan data')
      }
      res.redirect('/mahasiswa')
    })
  }catch(err) {
    req.flash('error', "Terjadi kesalahan pada fungsi")
    res.redirect('/mahasiswa')
  }
})

router.get("/edit/(:id)", function(req, res, next) {
  let id = req.params.id
  connection.query("select * from mahasiswa where id_mahasiswa = " + id, function(err, rows){
      if (err) {
        req.flash("error", "query gagal")
      } else {
        res.render("mahasiswa/edit", {
          id: rows[0].id_mahasiswa,
          NAMA: rows[0].NAMA,
          NRP: rows[0].NRP,
          TGL_LAHIR: rows[0].TGL_LAHIR,
          JENIS_KELAMIN: rows[0].JENIS_KELAMIN,
          AGAMA: rows[0].AGAMA,
          HOBY: rows[0].HOBY,
          ALAMAT: rows[0].ALAMAT,
          PROGRAM_STUDY: rows[0].PROGRAM_STUDY
        });
      }
  })
})

router.post('/update/(:id)', function(req, res, next){
  try{
    let id = req.params.id
    let {NAMA, NRP, TGL_LAHIR, JENIS_KELAMIN, AGAMA, HOBY, ALAMAT, PROGRAM_STUDY} = req.body
    let Data = {
      NAMA, NRP, TGL_LAHIR, JENIS_KELAMIN, AGAMA, HOBY, ALAMAT, PROGRAM_STUDY
    }
    connection.query('update mahasiswa set ? where id_mahasiswa = ' +id, Data, function(err){
      if(err){
        req.flash('error', 'query gagal')
      }else{
        req.flash("success", "Berhasil memperbarui data");
      }
      res.redirect('/mahasiswa')
    })
  }catch (error){
    req.flash('error', 'Terjadi kesalahan pada router')
    res.redirect('/mahasiswa')
  }
})

router.get('/delete/(:id)', function(req, res, next){
  let id = req.params.id
  connection.query('delete from mahasiswa where id_mahasiswa = ' +id, function(err){
    if(err){
      req.flash('error', 'gagal query')
    }else{
      req.flash('success', 'Data terhapus')
    }
    res.redirect('/mahasiswa')
  })
})

module.exports = router;
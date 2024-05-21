const express = require('express')
var cors = require('cors')
var mysql = require('mysql')
const app = express()
const port = 3000
const path =require('path');//54-59

const kepekPath = path.join(__dirname, 'kepek'); //54-59


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extend:true}));
app.use('/kepek',express.static(kepekPath)); //54-59


var connection

function kapcsolat(){
    connection = mysql.createConnection({
      host: 'localhost', //127.0.0.1 -et is megadhatnánk mivel local és nem webszerveren
      user: 'root',
      password: '',
      database: 'kelettravel2024'
    })

    connection.connect()
}




app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.get('/celok', (req, res) => {

    kapcsolat()
    connection.query('SELECT * from celok', function (err, rows, fields) {
      if (err) throw err
    
      console.log(rows)
      res.send(rows)
    })
   connection.end()
   })

app.get('/kapcsolatok', (req, res) => {

    kapcsolat()
    connection.query('SELECT * from kapcsolatfelvetel', function (err, rows, fields) {
      if (err) throw err
    
      console.log(rows)
      res.send(rows)
    })
   connection.end()
   })


// 2.-5. feldat megoldás kezdete

app.post('/kapcsolatok', (req,res)=> {
const {nev,email, telefon, megjegyzes} = req.body; //id-t kihagyjuk mertr az auto
//console.log(nev,email, telefon, megjegyzes);

  kapcsolat();
  connection.query('INSERT INTO kapcsolatfelvetel (id, nev, email, telefon, megjegyzes) VALUES (NULL, ?,?,?,?)',[nev, email,telefon, megjegyzes], (err,result)=> {
    if(err){
      return res.status(500).json('Hiba');
    }
    res.status(200).json('Sikeres felvitel');
    connection.end();
  });

}); 
// 2.-5. feldat megoldás vége 

//6.-9. feladat kezdete

app.post('/celok', (req,res)=>{
  const searching = req.body.searching;
  //console.log(searching);

  kapcsolat();
  connection.query('select * from celok where celok_nev like ?',[`%${searching}%`],(err,result) =>{
    if(err){
      return res.status(500).json('Hiba');
    }
    res.status(200).json('result'); ///9.	és kimenete a talált adatsor legyen.
    connection.end();
  } );
});

//6.-9. feladat vége


//10.-13 feladat kezdete

app.delete('/kapcsolatok/:id', (req, res) =>{
  const id = req.params.id;
  //console.log(id);
  kapcsolat();
  connection.query('DELETE FROM kapcsolatfelvetel WHERE id = ?',[id],(err,result)=>{
    if(err){
      return res.status(500).json('Hiba');
    }
    res.status(200).json('Sikeres törlés'); 
    connection.end();


  });


});

//10.-13 feladat vége

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
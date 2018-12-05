const express = require('express');
const app = express();

console.log("hi im in index");
app.post('/register', (req, res) => {
  console.log("look babe");

  res.json({
    success: true
  });
  console.log("look babe2");

  })

app.get('/test', (req, res) => {
  console.log("got to index");
  res.json({success:true})
})


app.listen(process.env.PORT || 8080);

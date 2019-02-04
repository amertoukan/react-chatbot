const express = require ('express');
const path = require ('path');
const app = express ();

const PORT = process.env.PORT || 4002;
const bodyParser = require ('body-parser');

app.use(express.static(__dirname))
app.use(express.static(path.join(_dirname,'build')));

app.get('ping', (req,res) => {
    return res.send('pong');
})

app.get("./", (req,res) =>{
    res.sendFile(path.join(__dirname, 'build', index.html));
});

app.listen(PORT, ()=>{
    console.log('http://localhost:'+PORT)
})
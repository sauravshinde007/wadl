const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

//Server static files from public dir
app.use(express.static(path.join(__dirname,'public')));

app.get('/users' , (req, res) => {
    fs.readFile('users.json','utf-8', (err, data) => {
        if(err){
            return res.status(400).json({error: "Failed to load the user data"});
        }
        const users = JSON.parse(data);
        res.json(users);
    });
});

app.listen(PORT , ()=>{
    console.log(`Server running at PORT ${PORT}`);
});
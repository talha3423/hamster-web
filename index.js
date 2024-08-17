const express = require("express");
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;
const Connect = require('./mongo/connect');
app.use(express.static('./public'))
const KeyModel = require('./mongo/models/key');
require('./lib/telegram')
function generateRandomId() {
    const timestamp = Date.now(); // Current timestamp in milliseconds
    const randomPart = Array.from({ length: 19 }, () => Math.floor(Math.random() * 10)).join(''); // 19 random digits
    return `${timestamp}-${randomPart}`;
}
setInterval(async()=>{
    try {
       fetch('https://hamster-bot-3b752d549dd5.herokuapp.com/') 
    } catch (error) {
        
    }
},20000)


app.get('/key/:id',async (req, res) => {
    try {
        const { id } = req.params;
        const key = await KeyModel.findOneAndDelete({ type: id });
        if (!key) return res.status(404).send({ error: 'Key not found' });
       
        res.send({ key: key.key }).status(200);
    } catch (error) {
        res.status(500).send({ error: 'Internal server error' ,msg: error.message  });
    }
})


app.get('/all', async (req, res) => {
  try {
    const keys = await KeyModel.find({});
    res.send({length:keys.length,keys}).status(200);

  } catch (error) {
    res.status(500).send({ error: 'Internal server error', msg: error.message });
  }
    
})
const start = async () => {
    try {
        await Connect()
        require('./lib/code')
        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
    }
};
start()
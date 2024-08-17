const GetKey = require('./genKey');
const KeyModel = require('../mongo/models/key');

// Function to generate keys
const generateKeys = async () => {
    try {
        for (let i = 1; i < 13; i++) {
            try {

                GetKey(i % 7).then(async (key)=>{
                if (!key) return;
                console.log('Generated key:', key);
                await KeyModel.create({ key, type: i % 7 });
               })
            } catch (error) {
                console.log('Error generating key:', error);
            }
        }
    } catch (error) {
        console.error('Error generating keys:', error);
    }
};

// Run the key generation immediately
generateKeys();

// Set the interval to run the key generation every 5 minutes (300000 ms)
setInterval(generateKeys, 1000 * 60 * 5);

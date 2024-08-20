const GetKey = require('./genKey');
const KeyModel = require('../mongo/models/key');



const removeItemWithtypeFrom7to12FromKeyModel = async () => {
    try {
        const keys = await KeyModel.find({ type: { $gte: 7, $lt: 13 } });
        
       keys.forEach(async (key) => {
        try {
                await KeyModel.findOneAndUpdate(key._id,{type:key.type % 7});
                console.log(' key Updated:', key);
            } catch (error) {
                console.error('Error deleting key:', error);
            }
        });
    } catch (error) {
        console.error('Error removing keys:', error);
    }
};
// removeItemWithtypeFrom7to12FromKeyModel()


// Function to generate keys
const generateKeys = async () => {
    try {
        for (let i = 1; i < 13; i++) {
            try {

                GetKey(i % 7).then(async (key)=>{
                try {
                    if (!key) return;
                    console.log('Generated key:', key);
                    await KeyModel.create({ key, type: i % 7 });
                } catch (e) {
                    console.log('Error saving key to database:', e);
                }
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
// generateKeys();

// // Set the interval to run the key generation every 5 minutes (300000 ms)
// setInterval(generateKeys, 1000 * 60 * 2);

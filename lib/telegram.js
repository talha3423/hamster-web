const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '7222769243:AAG6OP0K46McTV2oBxewL3hh7HEv_dIAL7A';
const token1 = '7503354317:AAG6WKtz42cD8X-Tu8NlPap-UtuaZFKpnc0';
const bot = new TelegramBot(token, { polling: true });

const KeysModel = require('../mongo/models/key');

const channelId = '-1001862686008'
async function getUserVerified(channelId, userId) {
    try {
      const user = await bot.getChatMember(channelId, userId);
      
      if (user.status == 'member' || user.status == 'creator') {
  
  
       
        return true;
      } else {
        joinChannel(userId)
        return false
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  }

  async function joinChannel(chatId) {
    try {
      const options = {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Joined', callback_data: `3` }]
    
    
          ]
        }
      };
    
      await bot.sendMessage(chatId, 'Please Join the channel first:@TalhaRiazC', options);
    
    } catch (error) {
      console.log(error)    
    }
  }
  const commands = [
    { command: '/start', description: 'Start the bot' },
    { description: '/Generate All Keys', command: '/key' },
    { description: '/Generate My Clone Key', command: '/clone' },
    { description: '/Generate Chain Cube key', command: '/cube' },
    { description: '/Generate Train Miner key', command: '/miner' },
    { description: '/Generate Bike Ride Key', command: '/ride' },
    { description: '/Generate Merge Away', command: '/merge' },
    { description: '/Generate Tweak Race 3D', command: '/race' },
   
  ];
  bot.setMyCommands(commands)
bot.onText(/\/start/, async (msg) => {
    console.log('start');

    if(! await getUserVerified(channelId, msg.chat.id)) return  
    const chatId = msg.chat.id;
    const telegramId = msg.from.id;
    try {
        await bot.sendMessage(chatId, 'Welcome to my bot. Use Web app or Send /key to generate Key instantly for all  or \n use These \n /clone \n /cube \n /miner \n /ride \n /merge \n /race  ', {
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Open Web App', web_app: { url: 'https://hamster-bot-3b752d549dd5.herokuapp.com' } }]
                ]
            }
        });
    } catch (e) {
        console.log(e);
    }
});

bot.onText(/\/key/, async (msg) => {
  console.log('key');
    if(! await getUserVerified(channelId, msg.chat.id)) return  
    const chatId = msg.chat.id;
    const key1 = await KeysModel.findOneAndDelete({ type: 1 });
    const key2 = await KeysModel.findOneAndDelete({ type: 2 });
    const key3 = await KeysModel.findOneAndDelete({ type: 3 });
    const key4 = await KeysModel.findOneAndDelete({ type: 4 });
    const key5 = await KeysModel.findOneAndDelete({ type: 5 });
    const key6 = await KeysModel.findOneAndDelete({ type: 6 });
    bot.sendMessage(chatId, 
      `\nKey 2: \`${key1?.key}\`\nKey 3: \`${key2?.key}\`\nKey 4: \`${key3?.key}\`\nKey 5: \`${key4?.key}\`\nKey 6: \`${key5?.key}\`\nKey 7: \`${key6?.key}\``, 
      {
        parse_mode: 'Markdown'
      }
    )

}  
)

bot.onText(/\/clone/, async (msg) => {
  console.log('clone');
    if(! await getUserVerified(channelId, msg.chat.id)) return  
    const chatId = msg.chat.id;
    const key = await KeysModel.findOneAndDelete({ type: 1 });
    const key1 = await KeysModel.findOneAndDelete({ type: 1 });
    const key2 = await KeysModel.findOneAndDelete({ type: 1 });
    const key3 = await KeysModel.findOneAndDelete({ type: 1 });
    bot.sendMessage(chatId, 
      `Key 1: \`${key?.key}\`\nKey 2: \`${key1?.key}\`\nKey 3: \`${key2?.key}\`\nKey 4: \`${key3?.key}\``, 
      {
        parse_mode: 'Markdown'
      }
    )
    
});
bot.onText(/\/cube/, async (msg) => {
  console.log('cube');
  if(! await getUserVerified(channelId, msg.chat.id)) return  
  const chatId = msg.chat.id;

const key1 = await KeysModel.findOneAndDelete({ type: 2 });
const key2 = await KeysModel.findOneAndDelete({ type: 2 });
const key3 = await KeysModel.findOneAndDelete({ type: 2 });
const key4 = await KeysModel.findOneAndDelete({ type: 2 });
bot.sendMessage(chatId, 
  `Key 1: \`${key1?.key}\`\nKey 2: \`${key2?.key}\`\nKey 3: \`${key3?.key}\`\nKey 4: \`${key4?.key}\``, 
  {
    parse_mode: 'Markdown'
  }
)
})
bot.onText(/\/miner/, async (msg) => {
  console.log('miner');
  if(!await getUserVerified(channelId, msg.chat.id)) return  
  const chatId = msg.chat.id;

const key1 = await KeysModel.findOneAndDelete({ type: 3 });
const key2 = await KeysModel.findOneAndDelete({ type: 3 });
const key3 = await KeysModel.findOneAndDelete({ type: 3 });
const key4 = await KeysModel.findOneAndDelete({ type: 3 });
bot.sendMessage(chatId, 
  `Key 1: \`${key1?.key}\`\nKey 2: \`${key2?.key}\`\nKey 3: \`${key3?.key}\`\nKey 4: \`${key4?.key}\``, 
  {
    parse_mode: 'Markdown'
  }
)
})


bot.onText(/\/ride/, async (msg) => {
  console.log('ride');
  if(!await getUserVerified(channelId, msg.chat.id)) return  
  const chatId = msg.chat.id;

const key1 = await KeysModel.findOneAndDelete({ type: 4 });
const key2 = await KeysModel.findOneAndDelete({ type: 4 });
const key3 = await KeysModel.findOneAndDelete({ type: 4 });
const key4 = await KeysModel.findOneAndDelete({ type: 4 });
bot.sendMessage(chatId, 
  `Key 1: \`${key1?.key}\`\nKey 2: \`${key2?.key}\`\nKey 3: \`${key3?.key}\`\nKey 4: \`${key4?.key}\``, 
  {
    parse_mode: 'Markdown'
  }
)
})
bot.onText(/\/merge/, async (msg) => {
  console.log('merge');
  if(!await getUserVerified(channelId, msg.chat.id)) return  
  const chatId = msg.chat.id;

const key1 = await KeysModel.findOneAndDelete({ type: 5 });
const key2 = await KeysModel.findOneAndDelete({ type: 5 });
const key3 = await KeysModel.findOneAndDelete({ type: 5 });
const key4 = await KeysModel.findOneAndDelete({ type: 5 });
bot.sendMessage(chatId, 
  `Key 1: \`${key1?.key}\`\nKey 2: \`${key2?.key}\`\nKey 3: \`${key3?.key}\`\nKey 4: \`${key4?.key}\``, 
  {
    parse_mode: 'Markdown'
  }
)
})
bot.onText(/\/race/, async (msg) => {
  console.log('race');
  if(!await getUserVerified(channelId, msg.chat.id)) return  
  const chatId = msg.chat.id;

const key1 = await KeysModel.findOneAndDelete({ type: 6 });
const key2 = await KeysModel.findOneAndDelete({ type: 6 });
const key3 = await KeysModel.findOneAndDelete({ type: 6 });
const key4 = await KeysModel.findOneAndDelete({ type: 6 });
bot.sendMessage(chatId, 
  `Key 1: \`${key1?.key}\`\nKey 2: \`${key2?.key}\`\nKey 3: \`${key3?.key}\`\nKey 4: \`${key4?.key}\``, 
  {
    parse_mode: 'Markdown'
  }

)
})
bot.on('callback_query', async (query) => {
    const chatId = query.message.chat.id;
    const buttonClicked = query.data.split('_')[0];
    const number = query.data.split('_')[1]
  
    if (!chatId) return
     if (buttonClicked == '3') {
  
      bot.sendMessage(chatId, 'Send /key to generate Key instantly.')
    } 
  });
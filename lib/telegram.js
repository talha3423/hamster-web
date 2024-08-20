const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '7222769243:AAG6OP0K46McTV2oBxewL3hh7HEv_dIAL7A';
const token1 = '7503354317:AAG6WKtz42cD8X-Tu8NlPap-UtuaZFKpnc0';
const bot = new TelegramBot(token, { polling: true });

const KeysModel = require('../mongo/models/key');
const { search ,Series, getEpisodes, finalData} = require('./search');
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
        await bot.sendMessage(chatId, 'Welcome To My Bot. \n\nFor Hamster Keys You can Visit Hamster Key Web\n\nFor Online Movies Streaming You can visit NetFlix.\n\n*For Downloading Movies* You can send the name of movie here. Like `spider`', {
          parse_mode: 'Markdown',
          reply_markup: {
                inline_keyboard: [
                    [{ text: 'Hamster Keys', web_app: { url: 'https://hamster-bot-3b752d549dd5.herokuapp.com' } },
                    { text: 'Free Netflix', web_app: { url: 'https://iosmirror.cc' } }
                    ]
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
// bot.onText(/\/image/, async (msg) => {
//   console.log('image');
//   if(!await getUserVerified(channelId, msg.chat.id)) return   
//   const chatId = msg.chat.id;
//   const text = msg.text.split(' ').slice(1).join(' ') 
  
//   FluxAi(text,bot,chatId)

// })
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  if(!msg.text) return;
  const text = msg.text.split(' ').join('%20')
  if(text.startsWith('/')) return
  const res =await search(text)
  if(res.err) return bot.sendMessage(chatId, 'No results found.')
  console.log(res)
    const movies = res?.data?.searchResult
  if(!movies) return bot.sendMessage(chatId, 'No movies found.')
  const arr = []
 
  movies.forEach((movie) => {
    arr.push([
      { text: movie.t, callback_data: `4_${movie.id}` }
    ])
  })
  const option = {
    reply_markup:{
     inline_keyboard:arr
    }
   }
   bot.sendMessage(chatId, '  Choose movie or series', option)
})
bot.onText(/\/details/, async (msg) => {
 const chatId = msg.chat.id;
 bot.sendMessage(chatId, 'For Android Users Download 1DM Downloader And Click the movie button and open in 1DM. Type The name of movie and download it. Or you can copy the link by holding the button and add in 1DM downloader.',{
  parse_mode:'Markdown',
  reply_markup:{
    inline_keyboard:[
      [{text: 'Download 1Dm', url: 'https://play.google.com/store/apps/details?id=idm.internet.download.manager'}]
    ]
  }
 })
})


bot.on('callback_query', async (query) => {
    const chatId = query.message.chat.id;
    const buttonClicked = query.data.split('_')[0];
    const id = query.data.split('_')[1]
    const seasonId = query.data.split('_')[2]
  
    if (!chatId) return
     if (buttonClicked == '3') {
  
      try {
        await bot.sendMessage(chatId, 'Welcome To My Bot. \n\nFor Hamster Keys You can Visit Hamster Key Web\n\nFor Online Movies Streaming You can visit Free Netlix.\n\n*For Downloading Movies* You can send the name of movie here. Like `spider`', {
          parse_mode: 'Markdown',
          reply_markup: {
                inline_keyboard: [
                    [{ text: 'Hamster Keys', web_app: { url: 'https://hamster-bot-3b752d549dd5.herokuapp.com' } },
                    { text: 'Free Netflix', web_app: { url: 'https://iosmirror.cc' } }
                    ]
                ]
            }
        });
    } catch (e) {
        console.log(e);
    }
    } else if (buttonClicked == '4') {
       const res = await Series(id);
       if(res?.data?.episodes[0] == null){
         bot.sendPhoto(chatId, `https://img.nfmirrorcdn.top/poster/h/${id}.jpg`,{parse_mode:'Markdown', caption:` **${res.data.title}**\nRelease:**${res.data.year}**\n\n For Details on How to download click /details`, reply_markup:{
          inline_keyboard:[
            [{text:'Download',url:`https://s06.nfmirrorcdn.top/files/${id}/720p/720p.m3u8`}]
          ]
         }})
       }
        else {
          const seasons = res?.data.season;
          const options = []
          seasons.forEach((season) => {
            options.push([{ text: `Season ${season.s}`, callback_data: `5_${id}_${season.id}` }])
          })
           bot.sendPhoto(chatId, `https://img.nfmirrorcdn.top/poster/h/${id}.jpg`,{parse_mode:'Markdown', caption:` **${res.data.title}**\nRelease:**${res.data.year}\n\n**Seasons:${res?.data?.runtime}\n\n `, reply_markup:{
          inline_keyboard:options
         }})
        }       
    } else if (buttonClicked == '5') {
     const res = await getEpisodes(seasonId,id)
    
     console.log(data)
     const options = [];
     res?.episodes.forEach((episode)=>{
       options.push([{ text: `${episode.t}`, callback_data: `6_${id}_${episode.id}` }])
     })
     bot.sendPhoto(chatId, `https://img.nfmirrorcdn.top/poster/h/${id}.jpg`,{parse_mode:'Markdown',caption:'Choose Episode',reply_markup:{
      inline_keyboard:options
     }})
    
    } else if(buttonClicked == '6'){
      const res = await finalData(seasonId,id);
      const data =await getEpisodes(seasonId,id);
      console.log(data)
     
      const options = [];
      res.audioTracks.forEach((movie) => {
        options.push([{ text: `${movie.name}`, url: movie.uri }])
      })
      if(res.audioTracks.length == 0){
        options.push([{ text: `${data.d_lang}`, url: res.videoStreamUrl }])

      }
      bot.sendPhoto(chatId, `https://img.nfmirrorcdn.top/epimg/150/${seasonId}.jpg`, {
        caption:'Choose Language',
        reply_markup: {
          inline_keyboard: options
        }
      })
    }
  });

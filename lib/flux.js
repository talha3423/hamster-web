const axios = require('axios');
const fs  = require('fs');
const path = require('path');
let i = 0;
const image = async (text,bot,id) => {
    console.log(text)
  try {
    const response = await axios.post(
      "https://api.segmind.com/v1/flux-realism-lora",
      {
        prompt: text,
        steps: 20,
        seed: 2532363609,
        scheduler: "simple",
        sampler_name: "euler",
        aspect_ratio: "2:3",
        upscale_value: 2,
        lora_strength: 0.8,
        upscale: false
      },
      {
        headers: {
          "accept": "application/json, text/plain, */*",
          "authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3MjQxNDkyMTYsIm5iZiI6MTcyNDE0OTIxNiwianRpIjoiNjllNzIzOGMtMjIyNi00YTYzLTk1MzgtMzdlOTc1NWI2M2ZjIiwiZXhwIjoxNzI0MjM1NjE2LCJpZGVudGl0eSI6InVzbnVtZXJiZXJAZ21haWwuY29tIiwiZnJlc2giOmZhbHNlLCJ0eXBlIjoiYWNjZXNzIn0.TthYtemCzCPyyVBa3D5jYSi0puVBkVLpINIA1edSS7J09P-8BI_5QuOdfa25MUHR3nZ_eW4jluPSPUFNEjBpnMGH_R6xKJgLblNQTsVJL-mpIdANvebfBWH50jdh5xLroHjDTsaYcA_U9CvqPnnSSOmbzeRthDgZgXHC5Xh5f-XlekzIfXiZoAC4YXmAlV5VvObmYl2yXbf89EzxUwy1g0YCSGT7gEWJnGvbF0k525CuZ3NLYRYNVsAluWVgGkAmAA5gLVeuXWchUDizaJge03yrhlTrtBocDLmKQQ8jfZM1Sl1zNxHNBVEcnkg76c43gJ36qaHevkPwxYzLqq8x8L6Mdwwqex_RsKZaXADXb3gRvISTkri-DIGRyCjtGkzXCD7ChQTQy3pfi4xqdZgy2qCbmgj_HI415Zi3piW1e2IqRvokR9KkH7xG2jt7qhn8ZGf5tcImsdKw8OPxubhjfW9vdlZuCjOE7xefbdWl7GZ5T8Sa5rsDiFKK4CC4SFO-xePqq2AJjJ5noGDQu-9UvdmeMvVFqswHPVDe39mDTshbkMoI3XPnogdVKe545EaGG7z4RcZl5eE7Rb6ANLK-E2Niycng6pfLGXqH79-8JGpJQ4KQKLEtCJwAORgjB0JKHiz4agL01crRLi-6_bEaF30492KylozwytxHbWtCSgI",
          "content-type": "application/json",
          "priority": "u=1, i",
          "sec-ch-ua": "\"Not)A;Brand\";v=\"99\", \"Microsoft Edge\";v=\"127\", \"Chromium\";v=\"127\"",
          "sec-ch-ua-mobile": "?1",
          "sec-ch-ua-platform": "\"Android\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site",
          "x-initiator": "WEBPROD",
          "Referer": "https://www.segmind.com/",
          "Referrer-Policy": "strict-origin-when-cross-origin"
        }
        ,responseType: 'arraybuffer'
      }
    );
    const imageBuffer = Buffer.from(response.data, 'binary');
    const filePath = path.join(__dirname, `${i}_image.png`);
    i++;

    // Save the image to the file system
    fs.writeFileSync(filePath, imageBuffer);
    await bot.sendPhoto(id,filePath, { caption: text }  )
    fs.unlinkSync(filePath);  // delete the file after sending it
    console.log(`Image saved to ${filePath}`);
    return filePath
    
  } catch (error) {
    console.error(error);
  }
};
module.exports = image;

const axios = require('axios');
const fs = require('fs');
const cheerio = require('cheerio')
const getData = async()=>{
 const {data} = await axios.get('https://iosmirror.cc/home')
 fs.writeFileSync('ios_apps.html', data);
 const $ = cheerio.load(data);
 const articles = [];
$('article.tray-slide').each((index, element) => {
    const postData = $(element).find('a.post-data').attr('data-post');
    const imgSrc = $(element).find('img.lazy').attr('data-src');
    
    articles.push({
        postData,
        imgSrc
    });
});

// Output the extracted data
console.log('Extracted Articles:', articles);
}
function generateTimestamp() {
    return Math.floor(Date.now() / 1000);
}
const search = async(text)=>{
try {
        const res = await  fetch(`https://iosmirror.cc/search.php?s=${text}&t=${generateTimestamp()}`, {
            "headers": {
              "accept": "*/*",
              "accept-language": "en-US,en;q=0.9",
              "priority": "u=1, i",
              "sec-ch-ua": "\"Not)A;Brand\";v=\"99\", \"Microsoft Edge\";v=\"127\", \"Chromium\";v=\"127\"",
              "sec-ch-ua-mobile": "?1",
              "sec-ch-ua-platform": "\"Android\"",
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "same-origin",
              "x-requested-with": "XMLHttpRequest",
              "cookie": "HstCfa1685644=1724127900738; HstCmu1685644=1724127900738; HstCnv1685644=1; HstCns1685644=1; __dtsu=51A01724127896F884668EBCEDF835E5; _cc_id=17adf8df586afe6a53c15dd7fcc2c889; panoramaId_expiry=1724732698628; panoramaId=8d252dcbdcfe9206625efa15035716d53938c9715a750cc0193552ce2b24811a; panoramaIdType=panoIndiv; HstCla1685644=1724127913302; HstPn1685644=2; HstPt1685644=2; HstCfa1188575=1724127920948; HstCla1188575=1724127920948; HstCmu1188575=1724127920948; HstPn1188575=1; HstPt1188575=1; HstCnv1188575=1; HstCns1188575=1; t_hash=aae3c78ad7dba82d820d0b71c0e4f1c4%3A%3A1724128455%3A%3Akp",
              "Referer": "https://iosmirror.cc/home",
              "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            "body": null,
            "method": "GET"
          })
          const data = await res.json();
          return {data,err:false,msg:'successfull'}
} catch (error) {
    return {data:null,err:true,msg:error.message}
}
}
// search('apple').then(res=>console.log(res.data.searchResult))
module.exports = {getData, search}
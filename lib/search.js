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
          
          return {data ,err:false,msg:'successfull'}
} catch (error) {
    return {data:null,err:true,msg:error.message}
}
}

const Series = async(id)=>{
  try {
    const res = await  fetch(`https://iosmirror.cc/post.php?id=${id}&t=${generateTimestamp()}`, {
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
            "cookie": "HstCfa1685644=1724127900738; HstCmu1685644=1724127900738; __dtsu=51A01724127896F884668EBCEDF835E5; _cc_id=17adf8df586afe6a53c15dd7fcc2c889; panoramaId=8d252dcbdcfe9206625efa15035716d53938c9715a750cc0193552ce2b24811a; panoramaIdType=panoIndiv; HstCfa1188575=1724127920948; HstCmu1188575=1724127920948; HstPn1188575=1; t_hash=9595bdb65ca13c6b6e58bf0e395b61be%3A%3A1724130256%3A%3Akp; HstCla1685644=1724140444416; HstPn1685644=1; HstPt1685644=3; HstCnv1685644=2; HstCns1685644=2; panoramaId_expiry=1724745242546; HstCla1188575=1724140454988; HstPt1188575=2; HstCnv1188575=2; HstCns1188575=2",
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

const getMoviesData = async(text)=>{
     let res = await search(text)
     console.log(res.data.searchResult)
     res = res.data.searchResult;
     console.log(res.length)
     const arr = []
     for(let i =0;i< res.length;i++){
      const {data} = await Series(res[i].id)
      if(data?.title){
       arr.push({t:res[i].t,id:res[i].id,series:true,data:data})
      }
       else{
        arr.push({t:res[i].t,id:res[i].id,series:false})
       }
    }
     
    return arr
}


const getEpisodes = async(id,seriesId)=>{
 try{
 const data = await fetch(`https://iosmirror.cc/episodes.php?s=${id}&series=${seriesId}&t=${generateTimestamp()}`, {
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
      "cookie": "HstCfa1685644=1724127900738; HstCmu1685644=1724127900738; __dtsu=51A01724127896F884668EBCEDF835E5; _cc_id=17adf8df586afe6a53c15dd7fcc2c889; panoramaId=8d252dcbdcfe9206625efa15035716d53938c9715a750cc0193552ce2b24811a; panoramaIdType=panoIndiv; HstCfa1188575=1724127920948; HstCmu1188575=1724127920948; HstPn1188575=1; HstPn1685644=1; panoramaId_expiry=1724745242546; HstCla1685644=1724154321662; HstPt1685644=4; HstCnv1685644=3; HstCns1685644=3; HstCla1188575=1724154327647; HstPt1188575=3; HstCnv1188575=3; HstCns1188575=3; t_hash=74c74372780f3178f0ae76d6e37a195d%3A%3A1724154330%3A%3Akp",
      "Referer": "https://iosmirror.cc/home",
      "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": null,
    "method": "GET"
  });
  const res = await data.json();
  return res
 }
 catch(er){

 }

}


const getPlaylist = ()=>{
  fetch("https://iosmirror.cc/playlist.php?id=80003008&t=Peaky%20Blinders&tm=1724154317", {
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
      "cookie": "HstCfa1685644=1724127900738; HstCmu1685644=1724127900738; __dtsu=51A01724127896F884668EBCEDF835E5; _cc_id=17adf8df586afe6a53c15dd7fcc2c889; panoramaId=8d252dcbdcfe9206625efa15035716d53938c9715a750cc0193552ce2b24811a; panoramaIdType=panoIndiv; HstCfa1188575=1724127920948; HstCmu1188575=1724127920948; HstPn1188575=1; HstPn1685644=1; HstCla1685644=1724154321662; HstPt1685644=4; HstCnv1685644=3; HstCns1685644=3; HstCla1188575=1724154327647; HstPt1188575=3; HstCnv1188575=3; HstCns1188575=3; panoramaId_expiry=1724759169355; t_hash=ae33fff112890849b09553964db7e663%3A%3A1724155042%3A%3Akp",
      "Referer": "https://iosmirror.cc/home",
      "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": null,
    "method": "GET"
  });
}

const finalData = async(id)=>{
  try {
    const res = await fetch(`https://iosmirror.cc/hls/${id}.m3u8`, {
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
        "cookie": "HstCfa1685644=1724127900738; HstCmu1685644=1724127900738; __dtsu=51A01724127896F884668EBCEDF835E5; _cc_id=17adf8df586afe6a53c15dd7fcc2c889; panoramaId=8d252dcbdcfe9206625efa15035716d53938c9715a750cc0193552ce2b24811a; panoramaIdType=panoIndiv; HstCfa1188575=1724127920948; HstCmu1188575=1724127920948; HstPn1188575=1; HstPn1685644=1; HstCla1685644=1724154321662; HstPt1685644=4; HstCnv1685644=3; HstCns1685644=3; HstCla1188575=1724154327647; HstPt1188575=3; HstCnv1188575=3; HstCns1188575=3; panoramaId_expiry=1724759169355; t_hash=ae33fff112890849b09553964db7e663%3A%3A1724155042%3A%3Akp",
        "Referer": "https://iosmirror.cc/home",
        "Referrer-Policy": "strict-origin-when-cross-origin"
      },
      "body": null,
      "method": "GET"
    });   
    const data = await res.text();
    console.log(data)
    return parseM3U8(data)
  } catch (error) {
    console.log('error')
  }
}
function parseM3U8(text) {
    const lines = text.split("\n");
    const audioTracks = lines
        .filter(line => line.startsWith("#EXT-X-MEDIA"))
        .map(line => {
            const language = line.match(/LANGUAGE="([^"]+)"/)[1];
            const name = line.match(/NAME="([^"]+)"/)[1];
            const uri = line.match(/URI="([^"]+)"/)[1];
            const isDefault = line.match(/DEFAULT=(YES|NO)/)[1] === "YES";
            return {
                language,
                name,
                uri,
                default: isDefault
            };
        });

    // Extract the final video stream URL
    const videoStreamUrl = lines.find(line => line.startsWith("https://"));

    return {
        audioTracks,
        videoStreamUrl
    };
}

// finalData('81252612').then(res=>console.log(res))
// getMoviesData('peaky blinders').then(res=>{
//   console.log(res[0].data)
// })
// Series('8000247').then(res=>console.log(res))

const SecondPage = async(id,seriedId,page)=>{
  try {
    const data = await fetch(`https://iosmirror.cc/episodes.php?s=${id}&series=${seriedId}&t=${generateTimestamp()}&page=${page}`, {
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
        "cookie": "HstCfa1685644=1724127900738; HstCmu1685644=1724127900738; __dtsu=51A01724127896F884668EBCEDF835E5; _cc_id=17adf8df586afe6a53c15dd7fcc2c889; panoramaId=8d252dcbdcfe9206625efa15035716d53938c9715a750cc0193552ce2b24811a; panoramaIdType=panoIndiv; HstCfa1188575=1724127920948; HstCmu1188575=1724127920948; HstPn1685644=1; SE80002479=80003008; recentplay=SE80002479; HstCla1685644=1724214096308; HstPt1685644=5; HstCnv1685644=4; HstCns1685644=4; panoramaId_expiry=1724818896553; HstCla1188575=1724214122860; HstPn1188575=1; HstPt1188575=5; HstCnv1188575=4; HstCns1188575=5; t_hash=ae010722b4819ba0eb9268f4aa9aec2b%3A%3A1724214302%3A%3Akp",
        "Referer": "https://iosmirror.cc/home",
        "Referrer-Policy": "strict-origin-when-cross-origin"
      },
      "body": null,
      "method": "GET"
    })
    const res = await data.json() ;
    return res
  } catch (error) {
    console.error(error)
  }
}


module.exports = {getData, search,Series,getEpisodes,finalData}
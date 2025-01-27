function generateRandomId() {
    const timestamp = Date.now(); // Current timestamp in milliseconds
    const randomPart = Array.from({ length: 19 }, () => Math.floor(Math.random() * 10)).join(''); // 19 random digits
    return `${timestamp}-${randomPart}`;
}

const genCode = async (n)=>{

 try{
    const clientId = generateRandomId()   
    let appToken ;
    let promoId ;
    if(n ==1){
       appToken  = '74ee0b5b-775e-4bee-974f-63e7f4d5bacb'
       promoId= 'fe693b26-b342-4159-8808-15e3ff7f8767'
    }
    else if(n == 2){
        appToken= 'd1690a07-3780-4068-810f-9b5bbf2931b2'
           promoId= 'b4170868-cef0-424f-8eb9-be0622e8e8e3'
    }
    else if(n==3){
        appToken= '82647f43-3f87-402d-88dd-09a90025313f'
        promoId= 'c4480ac7-e178-4973-8061-9ed5b2e17954'
    }
     else if (n==4){
         appToken= 'd28721be-fd2d-4b45-869e-9f253b554e50'
         promoId= '43e35910-c168-4634-ad4f-52fd764a843f'
     }
     else if(n==5){
        appToken= "8d1cc2ad-e097-4b86-90ef-7a27e19fb833"
        promoId= "dc128d28-c45b-411c-98ff-ac7726fbaea4"
     
     }else {
         appToken='61308365-9d16-4040-8bb0-2f4a4c69074c'
          promoId='61308365-9d16-4040-8bb0-2f4a4c69074c'
     }
    const res = await fetch("https://api.gamepromo.io/promo/login-client", {
       "headers": {
           "accept": "*/*",
           "accept-language": "en-US,en;q=0.9",
           "content-type": "application/json",
           "priority": "u=1, i",
           "sec-ch-ua": "\"Not)A;Brand\";v=\"99\", \"Microsoft Edge\";v=\"127\", \"Chromium\";v=\"127\"",
           "sec-ch-ua-mobile": "?1",
           "sec-ch-ua-platform": "\"Android\"",
           "sec-fetch-dest": "empty",
           "sec-fetch-mode": "cors",
           "sec-fetch-site": "cross-site",
           
           "Referrer-Policy": "strict-origin-when-cross-origin"
         },
       "body": `{\"appToken\":\"${appToken}\",\"clientId\":\"${clientId}\",\"clientOrigin\":\"deviceid\"}`,
       "method": "POST"
     })
   
     const {clientToken } = await res.json();
     if(!clientToken)return {error:'Error logging in'}
     
     let i = 0;
     try{
       const Id = await new Promise(async (resolve, reject)=>{
          
           try{
              const init=  setInterval(async ()=>{
                  i++
               try{
                  const res1 = await registerToken(clientToken,promoId);
                  console.log(res1);
                  console.log(i)
                  if(res1.error_code=='Unauthorized'){
                   clearInterval(init)  
                    reject('Unauthorized')  
                  }
                  const {hasCode} = res1
                  if(hasCode){
                      clearInterval(init)
                      resolve(hasCode)
                      
                  }
               }catch(e){
                  console.log(e)
                  console.log(i)
                  return null
               }
               },1000)
           }catch(e){
              clearInterval(init)
              reject(e)
              return null
           }
          })
          
           
          
          
     }catch(e){
         console.log(e)
         return null
     }
     const code =await createCode(clientToken,promoId)
     console.log(code)
     return code
     

}catch(err){
    console.log(err)
    return null
}
}
const registerToken = async (token,promoId)=>{
   const res = await fetch("https://api.gamepromo.io/promo/register-event", {
        "headers": {
          "accept": "*/*",
          "accept-language": "en-US,en;q=0.9",
          "authorization": `Bearer ${token}`,
          "content-type": "application/json",
          "priority": "u=1, i",
          "sec-ch-ua": "\"Not)A;Brand\";v=\"99\", \"Microsoft Edge\";v=\"127\", \"Chromium\";v=\"127\"",
          "sec-ch-ua-mobile": "?1",
          "sec-ch-ua-platform": "\"Android\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "cross-site",
          "Referer": "https://ialexx.github.io/",
          "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": `{\"promoId\":\"${promoId}\",\"eventId\":\"31a50b8f-5837-4ebb-bcbb-7ca2d3a8abb6\",\"eventOrigin\":\"undefined\"}`,
        "method": "POST"
      });
    const data= await res.json();
    return data
}
const createCode= async (token,promoId)=>{
  const res = await  fetch("https://api.gamepromo.io/promo/create-code", {
        "headers": {
          "accept": "*/*",
          "accept-language": "en-US,en;q=0.9",
          "authorization": `Bearer ${token}`,
          "content-type": "application/json",
          "priority": "u=1, i",
          "sec-ch-ua": "\"Not)A;Brand\";v=\"99\", \"Microsoft Edge\";v=\"127\", \"Chromium\";v=\"127\"",
          "sec-ch-ua-mobile": "?1",
          "sec-ch-ua-platform": "\"Android\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "cross-site",
          "Referer": "https://ialexx.github.io/",
          "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": `{\"promoId\":\"${promoId}\"}`,
        "method": "POST"
      });

      const data =await res.json();
      return data.promoCode
}
module.exports = genCode;
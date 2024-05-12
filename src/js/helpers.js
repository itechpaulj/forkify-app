import { API_URL } from './config.js';
import { TIMEOUT_SEC } from './config.js';

const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  };

export const AJAX = async function(url, uploadData = undefined){

    try{
      const fetchPro = uploadData ? fetch(`${url}`,{
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(uploadData),
      }) : fetch(`${API_URL}/${url}`);

    const res = await Promise.race([fetchPro,timeout(TIMEOUT_SEC)]);
    let data = await res.json();

    if(!res.ok) throw new Error(`${data.message} (${res.status})`)
    return data;
    }catch(err){
        throw err
    }

} 

/*
export const getJSON = async function (search){
    try{

    const res = await Promise.race([fetch(`${API_URL}/${search}`),timeout(TIMEOUT_SEC)]);
    let data = await res.json();

    if(!res.ok) throw new Error(`${data.message} (${res.status})`)
    return data;
    }catch(err){
        throw err
    }
}

export const sendJson = async function(url,uploadData){

    try{
    const fetchPro = fetch(`${url}`,{
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(uploadData),
    })
    const res = await Promise.race([fetchPro,timeout(TIMEOUT_SEC)]);

    let data = await res.json();
    console.log(data)
    if(!res.ok) throw new Error(`${data.message} (${res.status})`)
    return data;
    }catch(err){
        throw err
    }

}
*/
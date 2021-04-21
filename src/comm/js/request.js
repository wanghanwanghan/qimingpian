import axios from 'axios'

const headers = {
  'Authorization': 'K.',
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
};

const baseUrl = 'https://api.meirixindong.com/';

export default {
  post(url, data, auth) {
    headers.Authorization = auth
    return new Promise((resolve, reject) => {
      axios({
        url: baseUrl + url,
        method: 'post',
        headers: headers,
        params: data
      })
        // axios.post(baseUrl + url, data, {
        //   headers: headers
        // })//这里是json提交
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        });
    });
  }
}

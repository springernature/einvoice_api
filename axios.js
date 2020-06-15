const axios =  require('axios');
const axiosInstance = axios.create({
    baseURL: "https://einv-apisandbox.nic.in"
}) 

module.exports = axiosInstance;
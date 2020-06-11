const Joi = require('@hapi/joi');
var cors = require('cors');
const axios = require('./axios.js');
const express = require('express');
const app = express();
var random = require("random-key");
const { encryptStringWithRsaPublicKey } = require('./encrypt.js')
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000; //Setting environment port or taking 7300 if port not available

app.get('/api', (req, res) => {
    res.status(200).json({
        Status: "Success",
        Message: "APIs are running... ",
    });
})

app.post('/api/auth', async (req, res) => {
    debugger;
    try {
        let sPublicKeyPath = "./PublicKey/einv_sandbox.pem"
        let oData = req.body;
        let sEncryptedPwd = encryptStringWithRsaPublicKey(oData.Password, sPublicKeyPath);
        let sApiKey = "VVZB+6TCvG5lBKb04jYxHwvNnYij+S3WjUmP2bL0UyI=";
        let sEncryptedApiKey = encryptStringWithRsaPublicKey(sApiKey, sPublicKeyPath);
        let oHeaders = {
            "client_id": "AAFCM09TXPQMD20",
            "client_secret": "XLl2zF4Tsh8MBaPo5IiW"
            // "content-type": "application/json",
            // "x-requested-with":"XMLHttpRequest"
        }
        oData.Password = sEncryptedPwd;
        oData.AppKey = sEncryptedApiKey;
        oData.ForceRefreshAccessToken = false;
        let oPayload = {
            data: {
                "UserName": oData.UserName,
                "Password": oData.Password,
                "AppKey": oData.AppKey,
                "ForceRefreshAccessToken": oData.ForceRefreshAccessToken
            }
        }
        let oResponse = await axios.post("/gstvital/v1.02/auth", oPayload, { headers: oHeaders });
        debugger
    } catch (error) {
        debugger;
        res.status(400).json({
            Status: "Error",
            Message: error,
        })
    }
})

app.listen(port, () => {
    console.log(`server running on port ${port}`)
});
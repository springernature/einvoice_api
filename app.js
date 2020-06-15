const Joi = require('@hapi/joi');
var cors = require('cors');
const axios = require('./axios.js');
const express = require('express');
const app = express();
var random = require("random-key");
const { encryptStringWithRsaPublicKey, aesDecryption } = require('./encrypt.js')
const crypto = require('crypto');
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
    try {
        console.log(process.env.NODE_ENV);
        console.log(process.env.PUBLIC_KEY_PATH);
        let sPublicKeyPath = "./PublicKey/einv_sandbox.pem"
        let oData = req.body;
        let sEncryptedPwd = encryptStringWithRsaPublicKey(oData.Password, sPublicKeyPath);
        let sAppKey = crypto.randomBytes(32);
        let sEncryptedAppKey = encryptStringWithRsaPublicKey(sAppKey, sPublicKeyPath);
        let oHeaders = {
            "client_id": "AAFCM09TXPQMD20",
            "client_secret": "XLl2zF4Tsh8MBaPo5IiW"
        }
        oData.ForceRefreshAccessToken = false;
        let oPayload = {
            "data": {
                "UserName": oData.UserName,
                "Password": sEncryptedPwd,
                "AppKey": sEncryptedAppKey,
                "ForceRefreshAccessToken": false
            }
        }
        let {data} = await axios.post("/gstvital/v1.02/auth", oPayload, { headers: oHeaders });
        data.Data.Sek = aesDecryption(data.Data.Sek, sAppKey);        
        res.status(200).json({
            Message: data,
        })
    } catch (error) {
        res.status(400).json({
            Status: "Error",
            Message: error,
        })
    }
})

app.listen(port, () => {
    console.log(`server running on port ${port}`)
});
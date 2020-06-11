const Joi = require('@hapi/joi');
var cors = require('cors');
const axios = require('./axios.js');
const express = require('express');
const app = express();
var random = require("random-key");
const { encryptStringWithRsaPublicKey } = require('./encrypt.js')
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
    debugger;
    try {
        let sPublicKeyPath = "./PublicKey/einv_sandbox.pem"
        let oData = req.body;
        let sEncryptedPwd = encryptStringWithRsaPublicKey(oData.Password, sPublicKeyPath);
        let sApiKey = crypto.randomBytes(32).toString("base64");
        let sEncryptedApiKey = encryptStringWithRsaPublicKey(sApiKey, sPublicKeyPath);
        let oHeaders = {
            "client_id": "AAFCM09TXPQMD20",
            "client_secret": "XLl2zF4Tsh8MBaPo5IiW"
        }
        oData.ForceRefreshAccessToken = false;
        let oPayload = {
            "data": {
                "UserName": oData.UserName,
                "Password": sEncryptedPwd,
                "AppKey": sEncryptedApiKey,
                "ForceRefreshAccessToken": false
            }
        }
        let {data} = await axios.post("/gstvital/v1.02/auth", oPayload, { headers: oHeaders });
        res.status(200).json({
            Status: "Error",
            Message: data,
        })
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
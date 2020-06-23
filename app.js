const Joi = require('@hapi/joi');
var cors = require('cors');
const axios = require('./axios.js');
const express = require('express');
const app = express();
var random = require("random-key");
const encrypt = require('./encrypt.js')
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

app.post('/api/env/:var', (req, res) => {
    console.log(process.env[req.params.var]);
    const process_env = {
        "env_var": process.env[req.params.var]
    };
    res.status(200).json({
        Status: "Success",
        Response: process_env
    })
})

app.post('/api/auth', async (req, res) => {
    try {
        let oData = req.body;
        let sPublicKeyPath = !oData.public_key ? "./public_key_dev/einv_sandbox.pem" : null
        let sEncryptedPwd = encrypt.encryptStringWithRsaPublicKey(oData.Password, oData.public_key, sPublicKeyPath);
        let sAppKey = crypto.randomBytes(32);
        let sEncryptedAppKey = encrypt.encryptStringWithRsaPublicKey(sAppKey, oData.public_key, sPublicKeyPath);
        let oHeaders = {
            "client_id": oData.client_id,
            "client_secret": oData.client_secret
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
        let { data } = await axios.post("/gstvital/v1.02/auth", oPayload, { headers: oHeaders });
        data.Data.Sek = encrypt.aesDecryption(data.Data.Sek, sAppKey);
        res.status(200).json({
            Status: "Success",
            Response: data,
        })
    } catch (error) {
        res.status(400).json({
            Status: "Error",
            Message: error,
        })
    }
})

app.post('/api/irn/create', async (req, res) => {
    try {
        let oData = req.body,
            oHeader = req.headers,
            aResponse = [];
        for (let i = 0; i < oData.length; i++) {
            let oItem = oData[i];
            let oResponse = {};
            let sEncryptedData = encrypt.aesEncryption(oItem, oHeader.sek)
            oResponse.doc_no = oItem.DocDtls.No;
            let oHeaders = {
                "client_id": oHeader.client_id,
                "client_secret": oHeader.client_secret,
                "Gstin": oHeader.gstin,
                "user_name": oHeader.user_name,
                "AuthToken": oHeader.authtoken
            }
            var oPayload = {
                "Data": sEncryptedData
            }
            let { data } = await axios.post("/gstcore/v1.02/Invoice", oPayload, { headers: oHeaders });
            oResponse.res = data;
            if (!data.ErrorDetails) {
                oDecryptedData = encrypt.aesDataDecryption(data.Data, oHeader.sek);
                oResponse.res.Data = oDecryptedData;
            }
            aResponse.push(oResponse);
        }
        res.status(200).json({
            Message: aResponse,
        })
    } catch (error) {
        res.status(400).json({
            Status: "Error",
            Message: error,
        })
    }
})

app.post('/api/irn/fetch', async (req, res) => {
    try {
        let aData = req.body,
        oHeader = req.headers,
        aResponse = [],
        oHeaders = {
            "client_id": oHeader.client_id,
            "client_secret": oHeader.client_secret,
            "Gstin": oHeader.gstin,
            "user_name": oHeader.user_name,
            "AuthToken": oHeader.authtoken
        };
        
    for (let i = 0; i < aData.length; i++) {
        let oData = aData[i];
        let sIrn = oData.irn_no,
            oResponse = {};
        oResponse.doc_no = oData.doc_no;
        const { data } = await axios.get('gstcore/v1.02/Invoice/irn/' + sIrn, { headers: oHeaders });
        oResponse.res = data;
        if (!data.ErrorDetails) {
            oDecryptedData = encrypt.aesDataDecryption(data.Data, oHeader.sek);
            oResponse.res.Data = oDecryptedData;
        }
        aResponse.push(oResponse);
    }
        res.status(200).json({
            Message: aResponse,
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
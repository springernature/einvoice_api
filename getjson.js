const config = require('./dataconfig'); 

function formatData(oData) {
    let oDocSchema = config.documentSchema();
    let oMapping = config.fieldMapping();
    let sSubMapping, sMapping;
    let oItemListSchema ={};
    for (const key in oData) {
        console.log(key);
        if (oData.hasOwnProperty(key)) {
            let item = oData[key];
            sMapping = oMapping[key];
            if(Object.prototype.toString.call(item) ==="[object Object]"){
                console.log(key + " & " + sMapping);
                for (const itemKey in item) {
                    if (item.hasOwnProperty(itemKey)) {
                        sSubMapping = oMapping[itemKey]
                        console.log(itemKey + " & " + sSubMapping);
                        oDocSchema[sMapping][sSubMapping] = item[itemKey] ? item[itemKey] : oDocSchema[sMapping][sSubMapping];
                    }
                }
            }else if(Object.prototype.toString.call(item)==="[object Array]"){
                for (let i = 0; i < item.length; i++) {
                    let oRow = item[i];
                    oItemListSchema = config.itemListSchema()
                    for (const rowKey in oRow) {
                        if (oRow.hasOwnProperty(rowKey)) {
                            sSubMapping = oMapping[rowKey]
                            console.log(rowKey + " & " + sSubMapping);
                            oItemListSchema[sSubMapping] = oRow[rowKey] ? oRow[rowKey] : oItemListSchema[sSubMapping];
                            
                        }
                    }
                    oDocSchema[sMapping].push(oItemListSchema);
                }
            }
            else{
                oDocSchema[sMapping] = item ? item : oDocSchema[sMapping] ;
            }
        }
    }
    return oDocSchema;
}

module.exports = { formatData }
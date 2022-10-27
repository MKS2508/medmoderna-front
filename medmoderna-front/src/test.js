let str1 = '00001 DIESEL LIME 1G FCDL1G 1 3,41 7,50 1,00 81,77';
let strarr = "00001 DIESEL LIME 1G FCDL1G 1 3,41 7,50 1,00 81,77. 00001 DIESEL LIME 1G FCDL1G 1 3,41 7,50 1,00 81,77"
const fs = require('fs');
let lines = []
fs.readFile('./test.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    let line = data.split("\n");
    line.map(lineItem => {
        let object = {title: getTitle(lineItem), price: (getPrice(lineItem) !== undefined) ? getPrice(lineItem) : "00", brand: "", productId: "", description: "", imgSrc: "", category: "", originalStr: lineItem}
        // console.log({object})
        lines.push(object)

    })
    console.log({linesN: lines.length})
    //console.log({objects: JSON.stringify(lines)})
    let jsonContent = JSON.stringify(lines);
    //console.log(jsonContent);

    fs.writeFile("output3.json", jsonContent, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }

        console.log("JSON file has been saved.");
    });

});

function getTitle(str) {
    let id = str.split(" ")[0];
    let str2 = str.split(id)[1];
    let strarr = str2.split(" ");
    let delimiter = strarr[strarr.length -6];
    let title = str2.split(delimiter)[0];
    return title
}

function getPrice(str) {
    if (str === "") { return }
    let id = str.split(" ")[0];
    let str2 = str.split(id)[1];
    let strarr = str2.split(" ");
    let delimiter = (strarr.length === 10) ? strarr[strarr.length - 6] : strarr[strarr.length - 5];
    let str3 = str2.split(delimiter)[1];
    let price;
    if (str3) {
        let priceArr = str3.split(" ");
        price = (strarr.length === 10) ? priceArr[priceArr.length - 3] : priceArr[priceArr.length - 2]
        if (price) {
            price = price.replace(",", ".")
        }
        console.log({price})
    } else {
        price = "error"
    }
    return parseFloat(price)
}





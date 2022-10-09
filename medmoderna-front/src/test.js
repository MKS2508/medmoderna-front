let str1 = '00001 DIESEL LIME 1G FCDL1G 1 3,41 7,50 1,00 81,77';
let strarr = "00001 DIESEL LIME 1G FCDL1G 1 3,41 7,50 1,00 81,77. 00001 DIESEL LIME 1G FCDL1G 1 3,41 7,50 1,00 81,77"


function getTitle(str) {
    let id = str.split(" ")[0];
    let str2 = str.split(id)[1];
    let strarr = str2.split(" ");
    let delimiter = strarr[strarr.length -6];
    let title = str2.split(delimiter)[0];
    return title
}

function getPrice(str) {
    let id = str.split(" ")[0];
    let str2 = str.split(id)[1];
    let strarr = str2.split(" ");
    let delimiter = strarr[strarr.length -6];
    let str3 = str2.split(delimiter)[1];
    let priceArr = str3.split(" ");
    let price = priceArr[priceArr.length - 3]
    return price
}

let array = strarr.split(".")

for(let i = 0; i<array.length;i++){

    let str = array[i]
    getTitle(str)
}




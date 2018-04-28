export function formatDate(time) {
    let year = time.getFullYear();
    let month = time.getMonth() + 1;
    let day = time.getDate();
    if (month < 10) {
      month = '0' + month;
    }
    if (day < 10) {
      day = '0' + day;
    }
    time = year + '-' + month + '-' + day;
    return time;
}

export function getNameFile(str, tag) {
  let pos = str.lastIndexOf(tag);
  return str.substring(pos + 1)
}

export function twoDecimals(num) {
  if(!isNaN(num)) {
    num = num.toString();
    let pos_decimal = num.indexOf('.');
    if(pos_decimal < 0) {
      pos_decimal = num.length;
      num += '.';
    }
    while(num.length <= (pos_decimal + 2)) {
      num += '0';
    }
    console.log(num)
  }
  return num;
}
$(function () {
    $("nav ul li").click(function () {
        $("nav ul li").removeClass("active");
        $(this).addClass("active");
    });
});

/**
 * 保留2位小数
 * @param {*} e 被处理对象
 */
function format(e) {
  e.value = Number(e.value).toLocaleString("zh-CN", { maximumFractionDigits: 2 })
}

/**
 * 校验日期格式
 * @param {*} e 校验对象
 */
function checkDay(e) {
  // 清除"数字"以外的字符
  e.value = e.value.replace(/[^\d]/g, "");
  // 验证第一个字符是非零数字
  e.value = e.value.replace(/^([0.])/g, "");
}

/**
 * 校验金钱格式
 * @param {*} e 校验对象
 */
function checkMoney(e) {
  // 清除"数字"和"."以外的字符
  e.value = e.value.replace(/[^\d.]/g, "");
  // 清除多余的"."
  e.value = e.value.replace(/\.{2,}/g, ".");
  e.value = e.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
  // 只能输入两个小数
  e.value = e.value.replace(/^(\-)*(\d+)\.(\d{2}).*$/, "$1$2.$3");
  var isOk = true;
  do {
    isOk = true;
    // 不能以"."开头
    if (e.value.match(/^\./g)) {
      e.value = "0" + e.value;
      isOk = false;
    }
    // 大于1的数字不能以"0"开头
    if (e.value.match(/^0\d+/g)) {
      e.value = e.value.substring(1);
      isOk = false;
    }
  } while (!isOk);
}
/**
 * 校验金钱格式
 * @param {*} e 校验对象
 */
function checkMoney2(e) {
  e.value = Number(e.value).toLocaleString("zh-CN", { useGrouping: false });
  var principal_zh = document.getElementById('principal_zh');
  principal_zh.innerHTML = transformNumber2CN(e.value, false, false);
}

/**
 * 将小数点之后的数字全部转化为汉字
 * @param {number} number
 * @param {boolean} isBig
 * @param {boolean} isMoney
 * @return string
 *
 */
function littleNumber2CN(number, isBig, isMoney) {
  if (isBig === void 0) { isBig = false; }
  if (isMoney === void 0) { isMoney = false; }
  var chnNumChar = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  var chnBigChar = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  // 如果需要进行大写转换，或者需要转换金额时，采用第二套字体
  var stringArr = isBig || isMoney ? chnBigChar : chnNumChar;
  // 因为在金额中，小数点通常保留两位，那么小数点后的字符就可以辨识为x角x分
  var numberString = number.toString();
  var len = numberString.length;
  var flag = numberString.includes('.');
  if (flag && (numberString.indexOf('.') === 0 || numberString.indexOf('.') === len - 1)) {
    var error = '小数点不能在第一位或最后一位';
    console.error(error);
    return error;
  }
  // 需要转换为人民币大写金额时
  if (isMoney) {
    if (flag) {
      var index = numberString.indexOf('.');
      if (index <= numberString.length - 2) {
        // 说明其小数点后超过两位
        var numString = number.toFixed(2).toString();
        var str = numString.slice(index + 1);
        return Array.from(str).reduce(function (total, item, idx) {
          var strRmb = idx === 0 ? '角' : '分';
          var strs = stringArr[Number.parseInt(item)];
          total += idx <= 1 ? "" + strs + strRmb : '';
          return total;
        }, '');
      }
      else {
        // 说明小数点后只有一位
        var numString = number.toFixed(1).toString();
        var str = numString.slice(index + 1);
        var strs = stringArr[Number.parseInt(str)];
        return strs + "\u89D2";
      }
    }
    else { // 没有小数点时返回整
      return '整';
    }
  }
  // 当不是人民币的大写数字时，只需要转为普通简写汉字，并需要将小数点及以后得数字表示出来
  if (flag) {
    var index = numberString.indexOf('.');
    var str = numberString.slice(index);
    var a = '点';
    for (var i = 1; i < str.length; i++) {
      a += stringArr[parseInt(str[i])];
    }
    return a;
  }
  else { // 没有小数点时返回空字符串
    return '';
  }
}
/**
 * 定义在每个小节的内部进行转化的方法，其他部分则与小节内部转化方法相同
 * @param section
 * @param isBig
 * @param isMoney
 * @return string
 */
function sectionToChinese(section, isBig, isMoney) {
  if (isBig === void 0) { isBig = false; }
  if (isMoney === void 0) { isMoney = false; }
  var chnNumChar = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  var chnBigChar = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  var chnUnitChar = isMoney ? ['', '拾', '佰', '仟'] : ['', '十', '百', '千'];
  // 如果需要进行大写转换，或者需要转换金额时，采用第二套字体
  var stringArr = isBig || isMoney ? chnBigChar : chnNumChar;
  var str = '', chnstr = '', zero = false, count = 0; //zero为是否进行补零， 第一次进行取余由于为个位数，默认不补零
  while (section > 0) {
    var v = section % 10; //对数字取余10，得到的数即为个位数
    if (v == 0) { //如果数字为零，则对字符串进行补零
      if (zero) {
        zero = false; //如果遇到连续多次取余都是0，那么只需补一个零即可
        chnstr = stringArr[v] + chnstr;
      }
    }
    else {
      zero = true; //第一次取余之后，如果再次取余为零，则需要补零
      str = stringArr[v];
      str += chnUnitChar[count];
      chnstr = str + chnstr;
    }
    count++;
    section = Math.floor(section / 10);
  }
  return chnstr;
}
/**
 * 将数字格式的金额转化为汉字
 * @param number
 * @param isBig
 * @param isMoney
 * @return string
 */
function transformNumber2CN(number, isBig, isMoney) {
  if (isBig === void 0) { isBig = false; }
  if (isMoney === void 0) { isMoney = false; }
  var chnNumChar = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  var chnBigChar = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  var chnUnitSection = ['', '万', '亿', '万亿', '亿亿'];
  // 如果需要进行大写转换，或者需要转换金额时，采用第二套字体
  var stringArr = isBig ? chnBigChar : chnNumChar;
  var numbers;
  if (typeof number === 'string') {
    numbers = Number.parseFloat(number);
    if (Number.isNaN(numbers)) {
      var error = '请输入正确格式的数字字符串';
      console.error(error);
      return error;
    }
    if (number.length > 17) {
      var error = 'JS中超过17位的浮点数将会精度丢失，故参数含小数点不要超过17位';
      console.error(error);
      return error;
    }
  }
  else {
    numbers = number;
  }
  if (numbers > 9007199254740992) {
    var error = 'JS中超过2的53次方的数字会精度丢失，故参数不要超过9007199254740992';
    console.error(error);
    return error;
  }
  var littleNum = littleNumber2CN(numbers, isBig, isMoney);
  var num = Math.floor(numbers);
  var unitPos = 0;
  var strIns = '', chnStr = '';
  var needZero = false;
  if (num === 0) {
    return stringArr[0];
  }
  while (num > 0) {
    var section = num % 10000;
    if (needZero) {
      chnStr = stringArr[0] + chnStr;
    }
    strIns = sectionToChinese(section, isBig, isMoney);
    strIns += (section !== 0) ? chnUnitSection[unitPos] : chnUnitSection[0];
    chnStr = strIns + chnStr;
    needZero = (section < 1000) && (section > 0);
    num = Math.floor(num / 10000);
    unitPos++;
  }
  var s = isMoney ? '元' : '';
  return "" + chnStr + s + littleNum;
}

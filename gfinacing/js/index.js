/**
 * @author GaoJunru
 */

// 输入
var principal = document.getElementById('principal');
var days = document.getElementById('days');
var rate = document.getElementById('rate');
var income = document.getElementById('income');
// 输出
var interest = document.getElementById('interest');
var rate_actual = document.getElementById('rate_actual');
var loss = document.getElementById('loss');

/**
 * 保留2位小数
 * @param {*} e 被处理对象
 */
function format(e) {
  e.value = Math.round(e.value * 100, 10) / 100;
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
 * 校验数字格式
 * @param {*} e 校验对象
 */
function checkMoney(e) {
  // 清除"数字"和"."以外的字符
  e.value = e.value.replace(/[^\d.]/g, "");
  // 验证第一个字符是非零数字
  e.value = e.value.replace(/^([0.])/g, "");
  // 清除多余的"."
  e.value = e.value.replace(/\.{2,}/g, ".");
  e.value = e.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
  // 只能输入两个小数
  e.value = e.value.replace(/^(\-)*(\d+)\.(\d{2}).*$/, '$1$2.$3');
}

/**
 * 计算所有
 */
function calculateAll() {
  calculateInterest();
  calculateRateActual();
  calculateLoss();
}

/**
 * 计算预期收益
 */
function calculateInterest() {
  interest.value = principal.value * days.value * rate.value / 365 / 100;
  format(interest);
}

/**
 * 计算实际年化收益率
 */
function calculateRateActual() {
  if (principal.value == "" || days.value == "") {
    rate_actual.value = 0;
    return;
  }
  rate_actual.value = 100 * 365 * income.value / principal.value / days.value;
  format(rate_actual);
}

/**
 * 计算损失金额
 */
function calculateLoss() {
  loss.value = interest.value - income.value;
  format(loss);
}
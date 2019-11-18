// 输入&输出
var principal = document.getElementById('principal');
var time = document.getElementById('time');
var rate = document.getElementById('rate');
var interest = document.getElementById('interest');

/**
 * 计算利率
 */
function calculateRate() {
  if (!interest.value || !principal.value) {
    return;
  }
  rate.value = interest.value * 100 / principal.value / time.value;
  format(interest);
}
/**
 * 计算收益
 */
function calculateInterest() {
  if (!rate.value) {
    return;
  }
  interest.value = principal.value * time.value * rate.value / 100;
  format(interest);
}

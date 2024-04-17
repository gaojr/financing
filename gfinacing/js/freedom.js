// 输入
var principal = document.getElementById('principal');
var rate = document.getElementById('rate');
// 输出
var principal_zh = document.getElementById('principal_zh');
var interest_year = document.getElementById('interest_year');
var interest_month= document.getElementById('interest_month');
var interest_day = document.getElementById('interest_day');


/**
 * 计算所有
 */
function calculateAll() {
  calculateInterestYear();
  calculateInterestMonth();
  calculateInterestDay();
}

/**
 * 计算-年收入
 */
function calculateInterestYear() {
  interest_year.value = principal.value * rate.value / 100;
  format(interest_year);
}

/**
 * 计算-月收入
 */
function calculateInterestMonth() {
  interest_month.value = principal.value * rate.value / 12 / 100;
  format(interest_month);
}

/**
 * 计算-日收入
 */
function calculateInterestDay() {
  interest_day.value = principal.value * rate.value / 365 / 100;
  format(interest_day);
}

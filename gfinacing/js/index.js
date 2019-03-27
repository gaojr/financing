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
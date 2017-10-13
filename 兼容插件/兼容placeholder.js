/*$(function () {
	if (/MSIE\s(\d+)/.test(navigator.userAgent) && navigator.userAgent.match(/MSIE\s(\d+)/)[1] < 10) {
		$('[placeholder]').each(function () {
			var pla = $(this).attr('placeholder');
			$(this).focus(function () {
				if ($(this).val() == pla) {
					$(this).val('');
				}
			}).blur(function () {
				if ($(this).val() == '') {
					$(this).val(pla);
				}
			});
			$(this).trigger('blur');//此处利用blur事件,为了业务需求。防止页面上查询后，文本框需要保留搜索的关键被placeholder代替
		});
	}
});
*/
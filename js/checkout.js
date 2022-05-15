(function () {
	$(function () {
		$('.checkout-choose').on('click', function(e) {
			var self = $(e.currentTarget);
			var container = self.closest('.checkout-choose-group');
			var items = container.find('.checkout-choose');

			items.removeClass('active');
			self.addClass('active');
		})
	});
})();
delivery-countdown
==================

Delivery Countdown Timer - requires jQuery.

Usage
==================

Example:

<!-- Countdown timer for a product -->
<div class="product-item">
	<div class="countdown">
	    Order <span class="countdown_time countdown_time--time" style="display: none;">in the next <strong><span class="countdown__hours"></span> hrs <span class="countdown__minutes"></span> mins</strong></span><span class="countdown_time countdown_time--soon">soon</span><span class="countdown_time countdown_time--by" style="display: none;">by <span class="countdown__dispatch_date"></span><br /></span> to get it by <span class="countdown__delivery_day"></span>
	</div>
</div>

<!-- Required script -->
<script type="text/javascript">
	jQuery(document).ready(
		function () {
			var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
			var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
			var dispatch_days = [1, 2, 3, 4, 5, 6];
			var delivery_days = [1, 2, 3, 4, 5, 6];
			var exclusion_dispatch_dates = [
				new Date("12/25/2013 00:00:00"),
				new Date("12/26/2013 00:00:00"),
				new Date("01/01/2014 00:00:00"),
				new Date("04/18/2014 00:00:00")
			];
			var exclusion_delivery_dates = exclusion_dispatch_dates;

			var countdown_args = {
				"cutoff_hour": 17,
				"cutoff_minute": 30,
				"lead_time_days": 1,
				"dispatch_days": dispatch_days,
				"delivery_days": delivery_days,
				"exclusion_dispatch": exclusion_dispatch_dates,
				"exclusion_delivery": exclusion_delivery_dates,
				"actual_time": new Date('9/21/2013 1:28:36')
			}
			var countdown = new Delivery_Countdown(countdown_args);
			countdown.init();

			var countdown_element = $(".product-item").find('.countdown');

			if (countdown.countdown_hours >= 24) {
				countdown_element.find('.countdown_time--time').css('display', 'none');
				countdown_element.find('.countdown_time--soon').css('display', 'none');
				countdown_element.find('.countdown_time--by').css('display', 'inline');
			}
			else {
				countdown_element.find('.countdown_time--soon').css('display', 'none');
				countdown_element.find('.countdown_time--time').css('display', 'inline');
				countdown_element.find('.countdown_time--by').css('display', 'none');
			}

			countdown_element.find('.countdown__hours').text(countdown.countdown_hours);
			countdown_element.find('.countdown__minutes').text(countdown.countdown_minutes);
			countdown_element.find('.countdown__dispatch_date').text((countdown.dispatch.getHours() - 12) + "pm " + days[countdown.dispatch.getDay()]);
			countdown_element.find('.countdown__delivery_day').text(days[countdown.delivery.getDay()] + " " + countdown.delivery.getDate() + " " + months[countdown.delivery.getMonth()] + " " + countdown.delivery.getFullYear());

			setInterval(
				function ()
				{
					if (countdown.is_valid())
					{
						countdown.update();
					}
					else
					{
						countdown.init();
					}

					if (countdown.countdown_hours >= 24)
					{
						countdown_element.find('.countdown_time--time').css('display', 'none');
						countdown_element.find('.countdown_time--soon').css('display', 'none');
						countdown_element.find('.countdown_time--by').css('display', 'inline');
					}
					else
					{
						countdown_element.find('.countdown_time--soon').css('display', 'none');
						countdown_element.find('.countdown_time--time').css('display', 'inline');
						countdown_element.find('.countdown_time--by').css('display', 'none');
					}

					countdown_element.find('.countdown__hours').text(countdown.countdown_hours);
					countdown_element.find('.countdown__minutes').text(countdown.countdown_minutes);
					countdown_element.find('.countdown__dispatch_date').text((countdown.dispatch.getHours() - 12) + "pm " + days[countdown.dispatch.getDay()]);
					countdown_element.find('.countdown__delivery_day').text(days[countdown.delivery.getDay()] + " " + countdown.delivery.getDate() + " " + months[countdown.delivery.getMonth()] + " " + countdown.delivery.getFullYear());
				},
				(1000 * 60)
			);
		}
	);
</script>
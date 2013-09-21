/**
 * Countdown.js
 * @version 1.0
 *
 * @author James Mountford
 *
 */
function Delivery_Countdown(args) {

    this.dispatch = false;
    this.delivery = false;
    this.time_to_cutoff = false;
    this.countdown_hours = false;
    this.countdown_minutes = false;
    this.cutoff_hour = args.cutoff_hour;
    this.cutoff_minute = args.cutoff_minute;
    this.lead_time_days = args.lead_time_days;

    this.dispatch_days = args.dispatch_days;
    this.delivery_days = args.delivery_days;

    // exclusion dates
    this.exclusion_dispatch = args.exclusion_dispatch;
    this.exclusion_delivery = args.exclusion_delivery;

    // Provide start time in args, then keep own time!
    this.actual_time = args.actual_time || new Date();
    this.actual_time_tick = function () {
        this.actual_time = new Date(this.actual_time.getTime() + (1000 * 60));
    }

    this.get_next_available_dispatch = function () {
        this.dispatch = false;
        // Today at cut off time is next possible if ordering before cut off time
        //var this_day = new Date();
        var this_day = new Date(this.actual_time.getTime());
        this_day.setHours(this.cutoff_hour);
        this_day.setMinutes(this.cutoff_minute);
        this_day.setSeconds(0);
        this_day.setMilliseconds(0);

        // Loop through proposing times until find a valid one in the future.
        while (this.dispatch == false) {

            // Check if proposed dispatch time (this_day) is not a Sunday or a Saturday and that 4pm is in future.
            if (this.get_is_dispatch_day(this_day.getDay()) == true && this.get_time_to_cutoff(this_day) > 0 && this.get_is_exclusion_dispatch_date(this_day) == false) {
                this.dispatch = this_day;
            }

            // Increment proposed dispatch day for next loop, assuming necessary.
            this_day = new Date(this_day.getTime() + (1000 * 60 * 60 * 24));

        }

        return this.dispatch;
    }

    this.get_next_available_delivery = function () {
        this.delivery = false;

        var lead_time_reached = false;

        // start looking the day after
        var this_day = new Date(this.dispatch.getTime() + (1000 * 60 * 60 * 24));
        this_day.setHours(0);
        this_day.setMinutes(0);
        this_day.setSeconds(0);
        this_day.setMilliseconds(1);

        var lead_time_count = 0;

        while (this.delivery == false) {
            if (this.get_is_delivery_day(this_day.getDay()) == true && this.get_is_exclusion_delivery_date(this_day) == false) {
                lead_time_count++;
                if (lead_time_count == this.lead_time_days) {
                    this.delivery = this_day;
                }
            }
            // Increment proposed delivery day for next loop, assuming necessary.
            this_day = new Date(this_day.getTime() + (1000 * 60 * 60 * 24));
        }

        return this.delivery;
    }

    this.get_time_to_cutoff = function (cutoff_datetime) {
        //var today = new Date();
        var today = this.actual_time;
        return (cutoff_datetime.getTime() - today.getTime());
    }

    this.is_valid = function () {
        if (this.get_time_to_cutoff(this.dispatch) > 0) {
            return true;
        }
        return false;
    }

    this.get_is_dispatch_day = function (day_index) {
        if (this.dispatch_days.length > 0) {
            for (var i = 0; i < this.dispatch_days.length; i++) {
                if (this.dispatch_days[i] == day_index) {
                    return true;
                }
            }
        }
        return false;
    }

    this.get_is_delivery_day = function (day_index) {
        if (this.delivery_days.length > 0) {
            for (var i = 0; i < this.delivery_days.length; i++) {
                if (this.delivery_days[i] == day_index) {
                    return true;
                }
            }
        }
        return false;
    }

    this.get_is_exclusion_dispatch_date = function (proposed_date) {
        var check_date = new Date(proposed_date.getTime());
        check_date.setHours(0);
        check_date.setMinutes(0);
        check_date.setSeconds(0);
        check_date.setMilliseconds(0);

        if (this.exclusion_dispatch.length > 0) {
            for (var i = 0; i < this.exclusion_dispatch.length; i++) {
                if (this.exclusion_dispatch[i].getTime() == check_date.getTime()) {
                    return true;
                }
            }
        }
        return false;
    }

    this.get_is_exclusion_delivery_date = function (proposed_date) {
        var check_date = new Date(proposed_date.getTime());
        check_date.setHours(0);
        check_date.setMinutes(0);
        check_date.setSeconds(0);
        check_date.setMilliseconds(0);

        if (this.exclusion_delivery.length > 0) {
            for (var i = 0; i < this.exclusion_delivery.length; i++) {
                if (this.exclusion_delivery[i].getTime() == check_date.getTime()) {
                    return true;
                }
            }
        }
        return false;
    }

    this.update = function () {
        this.actual_time_tick();
        this.time_left_to_order = this.get_time_to_cutoff(this.dispatch);
        this.countdown_hours = parseInt(this.time_left_to_order / 1000 / 60 / 60);
        this.countdown_minutes = parseInt((this.time_left_to_order / 1000 / 60) - (this.countdown_hours * 60));
    }

    this.init = function () {
        this.dispatch = this.get_next_available_dispatch();
        this.delivery = this.get_next_available_delivery();
        this.time_left_to_order = this.get_time_to_cutoff(this.dispatch);
        this.countdown_hours = parseInt(this.time_left_to_order / 1000 / 60 / 60);
        this.countdown_minutes = parseInt((this.time_left_to_order / 1000 / 60) - (this.countdown_hours * 60));
    }

}
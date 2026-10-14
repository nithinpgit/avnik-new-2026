import moment from 'moment'
import { extendMoment } from 'moment-range';
import React from 'react';
const Moment = extendMoment(moment);
class FindDateTime {

    // Find Difference Numbers of Days 
    findDifferenceTwoDate(startDateVal, endDateVal) {
        let startDate = moment(moment(startDateVal).format('DD-MM-YYYY'), "DD-MM-YYYY");
        let endDate = moment(moment(endDateVal).format('DD-MM-YYYY'), "DD-MM-YYYY");
        let diff = endDate.diff(startDate, 'days');
        return diff;
    }

    // Find All Date between Two Dates
    findDaysBetweenTwoDates(startDate, endDate,format) {

        let start = moment(startDate, format|| 'YYYY-MM-DD');
        let end = moment(endDate, 'YYYY-MM-DD');
        var dates = [];
        var startNew = moment(start.format(format||'DD-MM-YYYY'), format||'DD-MM-YYYY');

        dates.push(startNew.format(format||'DD-MM-YYYY'));
        while (!startNew.isSame(end.format(format||'YYYY-MM-DD'))) {
            startNew = startNew.add(1, 'days');
            dates.push(startNew.format(format||'DD-MM-YYYY'));
        }
        return dates;
    }
    // Find All Date between Two Dates
    editFindDaysBetweenTwoDates(startDate, endDate,format) {
        var dates = [];
        var currDate = moment(startDate).startOf('day');
        var lastDate = moment(endDate).add(1, 'days').startOf('day');
        while(currDate.add(1, 'days').diff(lastDate) < 0) {
            dates.push(currDate.clone().format(format));
        }
        return dates;
    }
    // Find All  Date Number of Weeks
    findWeeksBetweenTwoDatesDays(startDate, numberOfWeeks,days,format) {
        let start = moment(startDate, 'YYYY-MM-DD');
        let end = moment(startDate, 'YYYY-MM-DD').add(parseInt(numberOfWeeks),'weeks');
        var dates = [];
        var i=0;
        var startNew = moment(start.format(format||'DD-MM-YYYY'), format||'DD-MM-YYYY');
        dates.push(startNew.format(format||'DD-MM-YYYY'));
        while (!startNew.isSame(end.format('YYYY-MM-DD'))) {
                startNew = startNew.add(1, 'days');
                console.log(i++);
                if(days.find((res)=>res==startNew.days())){
                    console.log(i++);
                    dates.push(startNew.format(format||'DD-MM-YYYY'));
                }
        }                
        return dates;
    }
    // Find Time After change duration and add new time ;
    findEndTimeAfterChange(startTime, duration) {
        let endTime = [];
        startTime.map((Start) => {
            let start = moment(Start, "h:mm A").add(moment.duration(duration)).format('HH:mm');
            endTime.push(start);
        })

        return endTime;
    }
    // findDateByDaysWeeks
    findDateByDaysWeeks(repeatNumber, eventRepeatBy, eventTillDate, eventSelectedDays) {
        if (parseInt(repeatNumber) > 0) {
            if (eventRepeatBy === "Weeks") {
                let StartDateByWeeks = moment().format('YYYY-MM-DD');
                let EndDateByWeeks = moment().add(parseInt(repeatNumber), 'weeks').add(-1, 'days').format('YYYY-MM-DD');
                let dates = this.editFindDaysBetweenTwoDates(StartDateByWeeks, EndDateByWeeks,'YYYY-MM-DD');
                let findDay = [];

                dates.map((res) => {
                    for (let i = 0; i <= eventSelectedDays?.length; i++) {
                        if (moment(res).format('dddd') == eventSelectedDays[i]) {
                            findDay.push(moment(res).format('YYYY-MM-DD'));
                        }
                    }

                });
                console.log(findDay);

                return findDay;
            }
        }
    }

    // Check upcoming date in array 

    checkUpcomingDate(dates) {
        let latestDate = new Date(Math.max.apply(null, dates));

        return latestDate;
    }
    checkUpcomingTime(time) {
        //    return new Date(Math.max(...time.map(e => new Date(e))));
        // return time;
    }
    // check startTime Duration

    startTimeValidation(startTime, duration) {



        if (startTime, duration) {

            console.log(startTime, duration);

        }

        return true;

    }


}

export default new FindDateTime();
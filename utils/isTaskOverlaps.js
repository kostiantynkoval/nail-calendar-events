const moment = require('moment')

module.exports = function isTaskOverlaps(startTime, endTime, tasks_array) {

    const startWorkTime = moment(startTime).startOf('date').hours(10)
    const endWorkTime = moment(startTime).startOf('date').hours(18)
    let isTaskOverlaps = false

    // if new event overlaps start and end working hours
    if (startTime.isBefore(startWorkTime) || endTime.isAfter(endWorkTime)) {
        return true
    }

    // if user tries to create event in the past
    if (startTime.isBefore(moment())) {
        return true
    }

    if (tasks_array.length > 0) {
        for (let i = 0; i < tasks_array.length; i++) {
            const prevStartTime = moment()
                .startOf('day')
                .year(Number(tasks_array[i].date.slice(0,4)))
                .month(Number(tasks_array[i].date.slice(5,7)) - 1)
                .date(Number(tasks_array[i].date.slice(8)))
                .hours(Number(tasks_array[i].startTime.slice(0,2)))
                .minutes(Number(tasks_array[i].startTime.slice(3)))
            const prevEndTime = prevStartTime.clone().add(+tasks_array[i].durationMinutes, 'minutes')

            // if end date of current task between start date and end date of the previous task
            if(endTime.isSameOrBefore(prevEndTime)) {
                if(endTime.isAfter(prevStartTime)) {
                    isTaskOverlaps = true
                    break;
                }
            }

            //
            if(startTime.isBefore(prevEndTime)) {
                // if start date of current task between start date and end date of the previous task
                if(startTime.isSameOrAfter(prevStartTime)) {
                    isTaskOverlaps = true
                    break;
                } else {
                    // if current task situated fully inside the prev task
                    if(endTime.isAfter(prevStartTime)) {
                        isTaskOverlaps = true
                        break;
                    }
                }
            }
        }
    }
    return isTaskOverlaps;
}

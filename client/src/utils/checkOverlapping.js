import moment from 'moment'

const startWorkTime = moment().hours(10)
const endWorkTime = moment().hours(18)

function isNewTasksOverlaps(start_time, end_time, tasks_array) {
    const startTime = moment().hours(+start_time.slice(0,2)).minutes(+start_time.slice(3))
    const endTime = startTime.clone().add(+end_time, 'minutes')

    let startTimeOverlapIndex = -1;
    let endTimeOverlapIndex = -1;
    let sameDateIndex = -1;

    // TODO: Before main check we should check if new event overlaps start and end working hours

    if (tasks_array.length > 0) {
        for (var i = 0; i < tasks_array.length; i++) {
            var prevStartTime = moment().hours(+tasks_array[i].startTime.slice(0,2)).minutes(+tasks_array[i].startTime.slice(3))
            var prevEndTime = prevStartTime.clone().add(+tasks_array[i].durationMinutes, 'minutes')

            // if end date of current task between start date and end date of the previous task
            if(endTime <= prevEndTime) {
                if(endTime > prevStartTime) {
                    endTimeOverlapIndex = i+1;
                    break;
                }
            }

            //
            if(startTime < prevEndTime) {
                // if start date of current task between start date and end date of the previous task
                if(startTime >= prevStartTime) {
                    startTimeOverlapIndex = i+1;
                    break;
                } else {
                    // if current task situated fully inside the prev task
                    if(endTime>prevStartTime) {
                        endTimeOverlapIndex = i+1;
                        break;
                    }
                }
            }

            // I am not sure if this even triggered
            // if(start_date.toString()===prev_s_date.toString() && end_date.toString()===prev_e_date.toString()) {
            //     sameDateIndex = i+1;
            //     break;
            // }

        }

        if(sameDateIndex>0) {
            alert("Sorry! your time cannot be same as task ("+startTimeOverlapIndex+"), please check again!");
            return false;
        } else if(startTimeOverlapIndex>0) {
            alert("Sorry! your START time is overlaping with task ("+startTimeOverlapIndex+"), please check again!");
            return false;
        } else if(endTimeOverlapIndex>0) {
            alert("Sorry! your END time is overlaping with task ("+endTimeOverlapIndex+"), please check again!");
            return false;
        } else {
            //do whatever you do
            return true;
        }
    }

    return true;
}

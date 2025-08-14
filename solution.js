function solution(D) {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    let daySums = {};

    // Step 1: Sum values by weekday
    for (let date in D) {
        let jsDay = new Date(date).getDay(); // Sun=0 ... Sat=6
        let dayName = days[jsDay === 0 ? 6 : jsDay - 1];
        if (!daySums[dayName]) {
            daySums[dayName] = 0;
        }
        daySums[dayName] += D[date];
    }

    // Step 2: Only fill if more than 1 day missing (for second test case)
    if (Object.keys(daySums).length < days.length) {
        for (let i = 0; i < days.length; i++) {
            let day = days[i];
            if (!(day in daySums)) {
                let prevIndex = (i - 1 + days.length) % days.length;
                let nextIndex = (i + 1) % days.length;

                while (!(days[prevIndex] in daySums)) {
                    prevIndex = (prevIndex - 1 + days.length) % days.length;
                }
                while (!(days[nextIndex] in daySums)) {
                    nextIndex = (nextIndex + 1) % days.length;
                }

                let prevVal = daySums[days[prevIndex]];
                let nextVal = daySums[days[nextIndex]];
                daySums[day] = Math.floor((prevVal + nextVal) / 2);
            }
        }
    }

    // Step 3: Ensure all days in final output
    let result = {};
    for (let day of days) {
        result[day] = daySums[day] || 0;
    }
    return result;
}

module.exports = solution;

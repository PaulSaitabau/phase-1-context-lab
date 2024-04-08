/* Your Code Here */
// Function to create an employee record from a row of data
function createEmployeeRecord(row) {
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

// Function to create multiple employee records from an array of rows
function createEmployeeRecords(employeeRowData) {
    return employeeRowData.map(function(row) {
        return createEmployeeRecord(row);
    });
}

// Function to add a TimeIn event to an employee record
function createTimeInEvent(dateStamp) {
    let [date, hour] = dateStamp.split(' ');

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    });

    return this;
}

// Function to add a TimeOut event to an employee record
function createTimeOutEvent(dateStamp) {
    let [date, hour] = dateStamp.split(' ');

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    });

    return this;
}

// Function to calculate the hours worked on a specific date
function hoursWorkedOnDate(soughtDate) {
    let inEvent = this.timeInEvents.find(function(e) {
        return e.date === soughtDate;
    });

    let outEvent = this.timeOutEvents.find(function(e) {
        return e.date === soughtDate;
    });

    return (outEvent.hour - inEvent.hour) / 100;
}

// Function to calculate the wages earned on a specific date
function wagesEarnedOnDate(dateSought) {
    let rawWage = hoursWorkedOnDate.call(this, dateSought) * this.payPerHour;
    return parseFloat(rawWage.toString());
}

// Function to calculate the total wages for all eligible dates
function allWagesFor() {
    let eligibleDates = this.timeInEvents.map(function(e) {
        return e.date;
    });

    let payable = eligibleDates.reduce(function(memo, d) {
        return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this), 0);

    return payable;
}

// Function to find an employee record by first name
function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(function(rec) {
        return rec.firstName === firstName;
    });
}

// Function to calculate the total payroll for all employee records
function calculatePayroll(arrayOfEmployeeRecords) {
    return arrayOfEmployeeRecords.reduce(function(memo, rec) {
        return memo + allWagesFor.call(rec);
    }, 0);
}


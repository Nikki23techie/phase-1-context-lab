/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesForOne = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

// 1. Create Employee Record
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
      firstName: firstName,
      familyName: familyName,
      title: title,
      payPerHour: payPerHour,
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  // 2. Create Employee Records (an array of employee records)
  function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map(createEmployeeRecord);
  }
  
  // 3. Create Time-In Event
  function createTimeInEvent(dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    this.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour),
      date: date
    });
    return this;
  }
  
  // 4. Create Time-Out Event
  function createTimeOutEvent(dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    this.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour),
      date: date
    });
    return this;
  }
  
  // 5. Calculate Hours Worked on a Date
  function hoursWorkedOnDate(date) {
    const timeInEvent = this.timeInEvents.find(event => event.date === date);
    const timeOutEvent = this.timeOutEvents.find(event => event.date === date);
    return (timeOutEvent.hour - timeInEvent.hour) / 100;
  }
  
  // 6. Calculate Wages Earned on a Date
  function wagesEarnedOnDate(date) {
    const hoursWorked = hoursWorkedOnDate.call(this, date);
    return hoursWorked * this.payPerHour;
  }
  
  // 7. Calculate All Wages for an Employee
  function allWagesFor() {
    const datesWorked = this.timeInEvents.map(event => event.date);
    return datesWorked.reduce((totalWages, date) => {
      return totalWages + wagesEarnedOnDate.call(this, date);
    }, 0);
  }
  
  // 8. Find Employee by First Name
  function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName);
  }
  
  // 9. Calculate Payroll (total wages for all employees)
  function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((totalPayroll, employee) => {
      return totalPayroll + allWagesFor.call(employee);
    }, 0);
  }
  
  // Example usage:
  
  // Creating employee records
  const employees = createEmployeeRecords([
    ["John", "Doe", "Manager", 50],
    ["Jane", "Smith", "Developer", 40],
  ]);
  
  // Adding time-in and time-out events
  employees[0].createTimeInEvent("2025-04-01 0900");
  employees[0].createTimeOutEvent("2025-04-01 1700");
  employees[1].createTimeInEvent("2025-04-01 1000");
  employees[1].createTimeOutEvent("2025-04-01 1800");
  
  // Calculating wages
  console.log(wagesEarnedOnDate.call(employees[0], "2025-04-01")); // John Doe's wages on a specific day
  console.log(allWagesFor.call(employees[0])); // Total wages for John Doe
  console.log(calculatePayroll(employees)); // Total payroll for all employees
  
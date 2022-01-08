function myFunction() {

  /*

    The lines below are just to initially created required
    variables to get the API for the Calendar and the Spreadsheet App[s] to run properly.

    All information under:
      > let thisSheet = ...
      > let thisCalendar = ...
    should be replaced with your own respective ID[s]

    Last updated: January 7, 2022 @ 12:03 AM EST (UTC-05:00)

    Information that needs to be changed will have an comment with "CHANGE THIS!" next to it.

    >> Created for Vyral Teq <<

    ╔╗─╔╗─────────╔══╗
    ║╚╦╝╠╦╦╦╦═╗╔╗─╚╗╔╩╦═╗
    ╚╗║╔╣║║╔╣╬╚╣╚╗─║║╩╣╬║
    ─╚═╝╠╗╠╝╚══╩═╝─╚╩═╩╗║
    ────╚═╝────────────╚╝

    !! IMPORTANT NOTICE !!
    DO NOT MAKE CHANGES UNLESS YOU KNOW WHAT YOU ARE DOING!

  */

  let thisSheet = SpreadsheetApp.openById("REDACTED FOR PRIVACY"); // CHANGE THIS!
  SpreadsheetApp.setActiveSpreadsheet(thisSheet);
  SpreadsheetApp.setActiveSheet(thisSheet.getSheets()[0]); // CHANGE THIS!

  let thisCalendar = CalendarApp.getCalendarById("REDACTED FOR PRIVACY"); // CHANGE THIS!

  let dates;
  let titles;

  let eventDates = thisSheet.getRange("A2:A"+thisSheet.getLastRow()).getValues(); // CHANGE THIS!
  let eventTitles = thisSheet.getRange("C2:C"+thisSheet.getLastRow()).getValues(); // CHANGE THIS!
  let descriptionField = thisSheet.getRange("E2:E"+thisSheet.getLastRow()).getValues(); // CHANGE THIS!

  console.log("EVENT DATES: " + eventDates); // ALSO INTENDED FOR DEBUGGING BUT CONTAINS CRUCIAL INFO
  console.log("EVENT TITLES: " + eventTitles); // ALSO INTENDED FOR DEBUGGING BUT CONTAINS CRUCIAL INFO

  let postedEvents = []

  /*

    The 'for' loop below will gather data from the 'EVENT DATES'
    column on the respective spreadsheet and will compare it with Data from
    other columns to later review for missing events in the Calendar itself.

  */

  for ( let i = 0; i < eventDates.length ; i++ ) {  
    let eventHistory;
    eventHistory = thisCalendar.getEventsForDay(new Date(eventDates[i]));
    // console.log(eventHistory.length) -- INTENDED FOR DEBUGGING, DO NOT USE

    if (eventHistory.length != 0) {
      for (let x = 0; x < eventHistory.length; x++) {
        console.log(eventHistory[x].getTitle());
        postedEvents.push(eventHistory[x].getTitle());
      }

    } 
  }

  console.log("POSTED-EVENTS: " + postedEvents) // ALSO INTENDED FOR DEBUGGING BUT CONTAINS CRUCIAL INFO

  /*

    The 'for' loop below
    will compare the current events that are scheduled and determine if they
    already exist in the calendar by utilizing the 'postedEvents'.

    Variable 'postedEvents' (line 33) [may vary depending on if other calls were made]
    will contain the titles that are currently already in the Calendar.

    If it does not exist, we will create the Event then make what is essentially known
    as a 'push.' However, if such event in question does already exist, then we will ignore
    it and go about our day.

  */

  for (let i = 0; i < eventTitles.length; i++) {
    if (postedEvents.includes(eventTitles[i].toString()) == true) {
      console.log("Skipping event creation for: " + eventTitles[i]); // ALSO INTENDED FOR DEBUGGING BUT CONTAINS CRUCIAL INFO
      
    } else if (postedEvents.includes(eventTitles[i].toString()) == false){
      thisCalendar.createEvent(eventTitles[i], new Date(eventDates[i]), new Date(eventDates[i]), {description:descriptionField[i].toString()});
      console.log("Event created for:  " + eventTitles[i]);// ALSO INTENDED FOR DEBUGGING BUT CONTAINS CRUCIAL INFO
    } else { } // Add other function calls on an as-need basiss
  }
  
}

// ! ! ! IGNORE BELOW ! ! ! \\

/*
  TypeError: Cannot read property 'includes' of undefined <-- THIS ERROR IS WHAT WE ARE AVOIDING
  myFunction	@ Code.gs:31
*/

/*
11:17:29 AM	Error	
Exception: Range not found <-- THIS ERROR IS WHAT WE ARE AVOIDING
myFunction	@ Code.gs:9
*/

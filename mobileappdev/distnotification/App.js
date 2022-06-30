import React from 'react'
import { View, StyleSheet, Text, TextInput, Button } from "react-native"
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { useState } from "react";
import email from 'react-native-email'



const App = () => {
  let [day, setDay] = useState('2022-06-23')
  let [mainscreen, setMainScreen] = useState(true)
  let [event, setEvent] = useState("");
  let [sender, setSender] = useState("");
  let [myevents, setMyEvents] = useState([]);

  const buttonPress = () => {
    let d = {
      "Event": event,
      "Date": day['dateString']
    }
    setMyEvents([...myevents, d])
    console.log(myevents)
    const to = sender // string or array of email addresses
    email(to, {
      // Optional additional arguments
      'cc': ['eronepius@gmail.com'], // string or array of email addresses
      'subject': `Invited for the event ${event}`,
      'body': `Here is a New Event ${event}`,
      'checkCanOpen': false // Call Linking.canOpenURL prior to Linking.openURL
    })
    setMainScreen(true)
  }

  const onChangeOfText = (e) => {
    setEvent(e)
  }

  const onChangeOfEmail = (e) => {
    setSender(e)
  }


  if (mainscreen === true) {
    return (
      <View>
        <View style={AppStylesheet.appview}>
          <Text style={AppStylesheet.apptext}> My Calendar</Text>
        </View>
        <View>

          <Calendar
            // Initially visible month. Default = now
            initialDate={day}
            // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
            minDate={undefined}
            // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
            maxDate={undefined}
            // Handler which gets executed on day press. Default = undefined
            onDayPress={day => {
              setDay(day)
              setMainScreen(false)
            }}
            // Handler which gets executed on day long press. Default = undefined
            onDayLongPress={day => {
              console.log('selected day', day);
            }}
            // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
            monthFormat={'yyyy MM'}
            // Handler which gets executed when visible month changes in calendar. Default = undefined
            onMonthChange={month => {
              console.log('month changed', month);
            }}
            // Hide month navigation arrows. Default = false
            hideArrows={true}
            // Replace default arrows with custom ones (direction can be 'left' or 'right')
            renderArrow={direction => <Arrow />}
            // Do not show days of other months in month page. Default = false
            hideExtraDays={true}
            // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
            // day from another month that is visible in calendar page. Default = false
            disableMonthChange={true}
            // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
            firstDay={1}
            // Hide day names. Default = false
            hideDayNames={false}
            // Show week numbers to the left. Default = false
            showWeekNumbers={true}
            // Handler which gets executed when press arrow icon left. It receive a callback can go back month
            onPressArrowLeft={subtractMonth => subtractMonth()}
            // Handler which gets executed when press arrow icon right. It receive a callback can go next month
            onPressArrowRight={addMonth => addMonth()}
            // Disable left arrow. Default = false
            disableArrowLeft={true}
            // Disable right arrow. Default = false
            disableArrowRight={true}
            // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
            disableAllTouchEventsForDisabledDays={true}
            // Replace default month and year title with custom one. the function receive a date as parameter
            renderHeader={date => {
              /*Return JSX*/
            }}
            // Enable the option to swipe between months. Default = false
            enableSwipeMonths={true}
          />
        </View>
        <View >
          {
            myevents.map((data, i) => {
              console.log(day)
              if (data["Date"] === day['dateString']) {
                return (
                  <View key={i} style={AppStylesheet.displayview}>
                    <Text style={AppStylesheet.dataview}>Date: {data['Date']}</Text>
                    <Text style={AppStylesheet.dataview}>Event: {data['Event']}</Text>
                  </View>
                )
              }
            })}
        </View>
      </View>
    );
  } else {
    return (
      <>
        <TextInput style={AppStylesheet.textinputstyle} onChangeText={e => onChangeOfText(e)} placeholder="Event Name" />
        <TextInput textContentType="emailAddress" style={AppStylesheet.textinputstyle} onChangeText={e => onChangeOfEmail(e)} placeholder="Email Address" />
        <Button title="Add to Calender" onPress={e => buttonPress(e)} />
      </>
    )
  }
}

const AppStylesheet = StyleSheet.create({
  appview: {
    marginTop: 5,
    marginLeft: 5,
    display: 'flex',
    flexDirection: 'row'
  },
  appview1: {
    display: 'flex',
    flexDirection: 'row-reverse',
  },
  apptext: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 25,
    alignSelf: 'stretch'
  },

  apptext1: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 25
  },
  displayview: {
    borderBottomColor: 'black',
    borderBottomWidth: 2,
  },

  dataview: {
    color: "#4f4c4a",
    fontSize: 20,
    fontWeight: 'bold'
  },

  textinputstyle: {
    color: '#000000',
    fontSize: 20,
  }
})


export default App;

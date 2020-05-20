import * as React from 'react';
import {View, Text} from 'react-native';
import {Calendar} from 'react-native-calendars';

export default function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',

        flexDirection: 'column',
      }}>
      <Text>Home!</Text>
      <Calendar current={new Date()}></Calendar>
    </View>
  );
}

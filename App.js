import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import HomeNavigator from './navigators/HomeNavigator';
import { Constants } from 'expo';

const UdaciCardStatusBar = ({ backgroundColor, ...props }) => (
  <View style={{backgroundColor, height: Constants.statusBarHeight}}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
  </View>
);

export default class App extends React.Component {
  
  render() {
    return (
      <View style={styles.container}>
        <UdaciCardStatusBar
          translucent
          backgroundColor="blue"
          barStyle="light-content"
        />
        <HomeNavigator/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Constants.statusBarHeight
  },
});

import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import HomeNavigator from './navigators/HomeNavigator';
import { Constants } from 'expo';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose} from 'redux';
import reducer from './reducers';
import {setLocalNotification} from './utils/helpers';

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk)
  )
);

const UdaciCardStatusBar = ({ backgroundColor, ...props }) => (
  <View style={{backgroundColor, height: Constants.statusBarHeight}}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
  </View>
);

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }
  
  render() {
    return (
      <View style={styles.container}>
          <UdaciCardStatusBar
            translucent
            backgroundColor="blue"
            barStyle="light-content"
          />
        <Provider store={store}>
        <HomeNavigator/>
        </Provider>
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

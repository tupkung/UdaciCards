import {FLASH_CARDS_NOTIFICATION_KEY} from './_flashcards';
import {Notifications, Permissions} from 'expo';
import {AsyncStorage} from 'react-native';

export function clearLocalNotification () {
    return AsyncStorage.removeItem(FLASH_CARDS_NOTIFICATION_KEY)
      .then(Notifications.cancelAllScheduledNotificationsAsync);
  }
  
  function createNotification () {
    return {
      title: 'Your flashcard scores!',
      body: "🃏 don't forget to do your flashcards to get scores!",
      ios: {
        sound: true,
      },
      android: {
        sound: true,
        priority: 'high',
        sticky: false,
        vibrate: true,
      }
    };
  }
  
  export function setLocalNotification () {
    AsyncStorage.getItem(FLASH_CARDS_NOTIFICATION_KEY)
      .then(JSON.parse)
      .then((data) => {
        if (data === null) {
          Permissions.askAsync(Permissions.NOTIFICATIONS)
            .then(({ status }) => {
              if (status === 'granted') {
                Notifications.cancelAllScheduledNotificationsAsync()
  
                let tomorrow = new Date()
                tomorrow.setDate(tomorrow.getDate() + 1)
                tomorrow.setHours(20);
                tomorrow.setMinutes(0);
                tomorrow.setSeconds(0);
  
                Notifications.scheduleLocalNotificationAsync(
                  createNotification(),
                  {
                    time: tomorrow,
                    repeat: 'day',
                  }
                )
  
                AsyncStorage.setItem(FLASH_CARDS_NOTIFICATION_KEY, JSON.stringify(true))
              }
            })
        }
      });
  }
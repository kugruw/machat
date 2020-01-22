import React, {useState, useEffect} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import initialState from './initial-state';
import Geolocation from 'react-native-geolocation-service';
import db, {firebase} from '../config/firebase';

const RootContext = React.createContext();
export const Provider = ({children}) => {
  const [user, setUser] = useState({uid: '', ...initialState.user});
  const [friends, setFriends] = useState(initialState.friends);
  const [chats, setChats] = useState(initialState.chats);
  const [location, setLocation] = useState(undefined);
  const [chatRoom, setChatRoom] = useState([]);

  const watchPosition = callback => {
    Geolocation.watchPosition(
      pos => {
        callback(pos);
      },
      err => {
        console.log(err);
      },
      {enableHighAccuracy: true},
    );
  };

  async function requestLocationPermission(callback) {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Access Required',
          message: 'This App needs to Access your location',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        watchPosition(callback);
      }
    } catch (err) {}
  }

  const dispatch = {
    location: payload => setLocation(payload),
    addChatRoom: payload => setChatRoom(payload),
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(usr => {
      if (usr) {
        const {displayName} = usr;

        // Profile
        db.ref(`users/${displayName}`).on('value', snapshot => {
          const val = snapshot.val();
          if (val !== null) {
            setUser({uid: displayName, data: val});
          }
        });

        // Friends
        db.ref(`friends/${displayName}`).on('value', snapshot => {
          const val = snapshot.val();
          if (val !== null) {
            const friend = {};
            for (const key in val) {
              // Friends profile
              db.ref(`users/${key}`).on('value', snapshot => {
                friend[key] = snapshot.val();
                setFriends(friend);
              });
            }
          }
        });

        // Chats
        db.ref(`chats/${displayName}`).on('value', snapshot => {
          const val = snapshot.val();
          if (val !== null) {
            const chat = {};
            for (const key in val) {
              db.ref(`messages/${key}`).on('value', snapshot => {
                chat[key] = snapshot.val();
                setChats(chat);
              });
            }
          }
        });
      }
    });
  }, []);

  useEffect(() => {
    const user = firebase.auth().currentUser;
    if (user) {
      const {displayName} = user;
      if (Platform.OS === 'ios') {
        watchPosition(({coords: {latitude, longitude}}) => {
          db.ref(`locations/${displayName}`).set({latitude, longitude});
        });
      } else {
        requestLocationPermission(({coords: {latitude, longitude}}) => {
          db.ref(`locations/${displayName}`).set({latitude, longitude});
        });
      }
    }
  }, [location]);

  return (
    <RootContext.Provider value={{user, friends, chats, chatRoom, dispatch}}>
      {children}
    </RootContext.Provider>
  );
};

export default RootContext;

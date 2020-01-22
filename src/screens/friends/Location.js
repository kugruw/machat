import React, {useContext, useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import db from '../../config/firebase';
import RootContext from '../../context';

const Maps = () => {
  const {user} = useContext(RootContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    const markers = [];
    db.ref('locations').on('value', snapshot => {
      const val = snapshot.val();
      if (val !== null) {
        Object.keys(val).forEach(key => {
          markers.push({
            key,
            latitude: val[key].latitude,
            longitude: val[key].longitude,
          });
        });
        setData(markers);
      }
    });
  }, []);

  return (
    <View style={{flex: 1}}>
      <MapView
        style={{flex: 1}}
        initialRegion={{
          latitude: -6.226241,
          longitude: 106.854276,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {data.map(elm => (
          <Marker
            key={elm.key}
            coordinate={{
              latitude: elm.latitude,
              longitude: elm.longitude,
            }}
            title={elm.key === user.uid ? "I'am" : elm.key}
            description={elm.key === user.uid ? 'My Location' : elm.key}
          />
        ))}
      </MapView>
    </View>
  );
};

const s = StyleSheet.create({
  image: {width: 50, height: 50},
});

Maps.navigationOptions = {
  title: 'User location',
};

export default Maps;

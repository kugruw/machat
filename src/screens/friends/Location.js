import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import db from '../../config/firebase';

const Maps = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    db.ref('locations').on('value', snapshot => {
      setData(snapshot.val());
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
        {data && Object.keys(data).map((key, i) => (
          <Marker
            key={i}
            coordinate={{
              latitude: data[key].latitude,
              longitude: data[key].longitude,
            }}
            title={key}
            description={key}
          />
        ))}
      </MapView>
    </View>
  );
};

Maps.navigationOptions = {
  title: 'Friends location',
};

export default Maps;

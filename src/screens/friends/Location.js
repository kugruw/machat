import React, {useContext, useState, useEffect} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import db from '../../config/firebase';
import RootContext from '../../context';

const Maps = () => {
  const {user} = useContext(RootContext);
  const [data, setData] = useState([]);
  const [myLocation, setMyLocation] = useState(undefined);

  useEffect(() => {
    db.ref('locations').on('value', snapshot => {
      const val = snapshot.val();
      if (val !== null) {
        Object.keys(val).forEach(key => {
          const {latitude, longitude} = val[key];
          if (key === user.uid) {
            setMyLocation({latitude, longitude});
          } else {
            db.ref(`users/${key}`).once('value', snapshot => {
              setData(markers => [
                ...markers,
                {key, latitude, longitude, snapshot: snapshot.val()},
              ]);
            });
          }
        });
      }
    });
  }, []);

  return (
    <View style={{flex: 1}}>
      {myLocation && (
        <MapView
          style={{flex: 1}}
          initialRegion={{
            latitude: myLocation.latitude,
            longitude: myLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker
            key={user.uid}
            coordinate={{
              latitude: myLocation.latitude,
              longitude: myLocation.longitude,
            }}
            title="I'am"
            description={user.data.status}>
            <ImageMarker avatar={user.data.avatar} />
          </Marker>
          {data.map(elm => (
            <Marker
              key={elm.key}
              coordinate={{
                latitude: elm.latitude,
                longitude: elm.longitude,
              }}
              title={elm.key}
              description={elm.snapshot.status}>
              <ImageMarker avatar={elm.snapshot.avatar} />
            </Marker>
          ))}
        </MapView>
      )}
    </View>
  );
};

const ImageMarker = props => {
  return (
    <Image
      source={
        props.avatar
          ? {uri: props.avatar}
          : require('../../public/images/user2.png')
      }
      style={s.image}
    />
  );
};

const s = StyleSheet.create({
  image: {width: 50, height: 50, borderRadius: 50 / 2},
});

Maps.navigationOptions = {
  title: 'User location',
};

export default Maps;

import React, {useState, useEffect} from 'react';
import {Clipboard, View, ImageBackground, Image} from 'react-native';
import {
  Container,
  Content,
  Text,
  Input,
  Button,
  Form,
  Item,
  Label,
  Icon,
} from 'native-base';
import sColor from '../../public/styles/color';
import sGlobal from '../../public/styles/';
import s from '../../public/styles/profile';
import color from '../../config/color';
import {ButtonPrimary} from '../../components/Button';
import Loader from '../../components/Loader';
import {toastr, showImagePicker} from '../../helpers/script';
import RootContext from '../../context';
import db, {firebase} from '../../config/firebase';

const Profile = () => {
  const {user, friends} = React.useContext(RootContext);
  const [data, setData] = useState(user.data);
  const [config, setConfig] = useState({error: false, loading: false});

  useEffect(() => {
    setData(user.data);
  }, [user]);

  const handleSubmit = () => {
    setConfig({loading: true, error: false});
    db.ref(`users/${user.uid}`).set(data, err => {
      if (err) {
        setConfig({loading: false, error: true});
        toastr('Failed to save profile.', 'danger');
      } else {
        setConfig({loading: false, error: false});
        toastr('Profile successfully updated.', 'success');
      }
    });
  };

  const pickImage = photo => {
    showImagePicker(async ({uri, fileName}) => {
      const ref = firebase.storage().ref();
      const blob = await (await fetch(uri)).blob();
      setConfig({loading: true, error: false});
      ref
        .child(`images/${photo}/${fileName + '_' + data.id}`)
        .put(blob)
        .then(({ref}) => {
          ref.getDownloadURL().then(value => {
            db.ref(`users/${user.uid}/${photo}`).set(value, err => {
              if (!err) {
                setConfig({loading: false, error: false});
                toastr('Profile successfully updated.', 'success');
              }
            });
          });
        })
        .catch(() => {
          setConfig({loading: false, error: true});
          toastr('Failed to save profile. Check your network.', 'danger');
        });
    });
  };

  return (
    <Container style={sGlobal.relative}>
      <Content>
        <ImageBackground
          source={{uri: data ? data.cover : ''}}
          style={[s.imgCover, sColor.secondaryBgColor]}>
          <Button
            transparent
            light
            style={s.editCover}
            onPress={() => pickImage('cover')}>
            <Text>Edit Cover</Text>
          </Button>
        </ImageBackground>
        <View style={sGlobal.center}>
          <ImageBackground
            source={{uri: data ? data.avatar : ''}}
            imageStyle={s.imgProfileStyle}
            style={[s.imgProfile, sGlobal.center, sColor.lightBgColor]}>
            <Button transparent onPress={() => pickImage('avatar')}>
              <Image
                source={require('../../public/images/user2.png')}
                style={[s.defaultImg, data && data.avatar && s.invisible]}
              />
            </Button>
          </ImageBackground>
        </View>
        <Form>
          <Item stackedLabel>
            <Label>Username</Label>
            <Input
              disabled={true}
              value={user.uid}
            />
            <Button transparent style={s.clipBoard} onPress={() => copy(user.uid)}>
              <Icon name="copy" style={s.copy} />
            </Button>
          </Item>
          <Item stackedLabel>
            <Label>Name</Label>
            <Input
              value={data.name}
              onChangeText={text => setData({...data, name: text})}
            />
          </Item>
          <Item stackedLabel>
            <Label>Status</Label>
            <Input
              multiline={true}
              value={data.status}
              onChangeText={text => setData({...data, status: text})}
            />
          </Item>
          <ButtonPrimary text="Save" handleSubmit={handleSubmit} />
        </Form>
      </Content>
      {config.loading && <Loader text="Updating profile" />}
    </Container>
  );
};

const copy = content => {
  Clipboard.setString(content);
  toastr('Copied text');
}

Profile.navigationOptions = {
  title: 'Profile',
};

// hapus cuy
export default Profile;

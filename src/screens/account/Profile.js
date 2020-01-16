import React, {useState, useEffect} from 'react';
import {View, ImageBackground, Image} from 'react-native';
import {
  Container,
  Content,
  Text,
  Input,
  Button,
  Form,
  Item,
  Label,
} from 'native-base';
import sColor from '../../public/styles/color';
import sGlobal from '../../public/styles/';
import s from '../../public/styles/profile';
import color from '../../config/color';
import {ButtonPrimary} from '../../components/Button';
import {toastr, showImagePicker} from '../../helpers/script';
// import FormData from 'form-data';
import RootContext from '../../context';

const Profile = () => {
  const {user} = React.useContext(RootContext);
  // Cek snapshot
  const [data, setData] = useState(JSON.parse(JSON.stringify(user)));
  const [config, setConfig] = useState({error: false, loading: false});
  const handleSubmit = () => {
    // setConfig({loading: true, error: false});
    // axios
    //   .patch(
    //     `${API_ENDPOINT}profile`,
    //     {
    //       ...data,
    //     },
    //   )
    //   .then(() => {
    //     setConfig({loading: false, error: false});
    //     toastr('Profile successfully updated.', 'success');
    //     navigation.navigate('Account', {update: Math.random()});
    //   })
    //   .catch(() => {
    //     setConfig({loading: false, error: true});
    //     toastr('Failed to save profile.', 'danger');
    //   });
  };
  const pickImage = photo => {
    showImagePicker(res => {
      const {fileName, type, uri} = res;
      // const form = new FormData();
      // form.append('user_id', data.user_id);
      // form.append('image', {uri, type, name: fileName});
      // setConfig({loading: true, error: false});
      // axios
      //   .patch(
      //     `${API_ENDPOINT}profile/upload-${photo}`,
      //     form,
      //   )
      //   .then(() => {
      //     setConfig({loading: false, error: false});
      //     toastr('Profile successfully updated.', 'success');
      //     navigation.navigate('Account', {update: Math.random()});
      //   })
      //   .catch(() => {
      //     setConfig({loading: false, error: true});
      //     toastr('Failed to save profile. Check your network.', 'danger');
      //   });
    });
  };
  return (
    <Container>
      <Content>
        <ImageBackground
          source={{uri: `${''}images/store/${'file.png'}`}}
          style={[s.imgCover, sColor.primaryBgColor]}>
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
            source={{uri: `${''}images/profile/${'pp.png'}`}}
            imageStyle={s.imgProfileStyle}
            style={[s.imgProfile, sGlobal.center, sColor.lightBgColor]}>
            <Button transparent onPress={() => pickImage('pp')}>
              <Image
                source={require('../../public/images/user2.png')}
                style={[s.defaultImg, undefined && s.invisible]}
              />
            </Button>
          </ImageBackground>
        </View>
        <Form>
          <Item stackedLabel>
            <Label>Username</Label>
            <Input value={data.username} onChangeText={text => setData({...data, username: text})} />
          </Item>
          <Item stackedLabel>
            <Label>Name</Label>
            <Input value={data.name} onChangeText={text => setData({...data, name: text})} />
          </Item>
          <Item stackedLabel>
            <Label>Status</Label>
            <Input
              multiline={true}
              value={data.status} onChangeText={text => setData({...data, status: text})}
            />
          </Item>
          <ButtonPrimary text="Save" handleSubmit={handleSubmit} />
        </Form>
      </Content>
    </Container>
  );
};

Profile.navigationOptions = {
  title: 'Profile',
  headerTransparent: true,
};

// hapus cuy
export default Profile;

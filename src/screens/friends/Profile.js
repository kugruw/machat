import React from 'react';
import {
  StyleSheet,
  View,
  Text as TextMedium,
  Image,
  ImageBackground,
} from 'react-native';
import {
  Container,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon,
  Text,
  H3,
} from 'native-base';
import ss from '../../public/styles';

const Profile = ({
  navigation: {
    state: {params},
  },
}) => {
  return (
    <Container>
      <Content contentContainerStyle={s.container}>
        <ImageBackground
          source={params.cover ? {uri: params.cover} : null}
          style={[s.cover, ss.darkestBgColor]}>
          <View>
            <Image
              source={
                params.avatar
                  ? {uri: params.avatar}
                  : require('../../public/images/user2.png')
              }
              style={s.avatar}
            />
            <View style={s.text}>
              <H3 style={[ss.textCenter, ss.lightColor]}>{params.name}</H3>
              <Text style={[ss.textCenter, ss.lightColor]}>
                {params.status}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </Content>
      <Footer style={s.footer}>
        <FooterTab style={ss.lightBgColor}>
          <Button vertical transparent>
            <View style={[s.end, s.footerTab, ss.center]}>
              <Icon name="trash" style={[ss.darkestColor, s.icon]} />
              <Text style={ss.darkestColor}>Trash</Text>
            </View>
          </Button>
          <Button vertical transparent>
            <View style={[s.start, s.footerTab, ss.center]}>
              <Icon name="ios-chatbubbles" style={[ss.darkestColor, s.icon]} />
              <Text style={ss.darkestColor}>Chat</Text>
            </View>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
};

const s = StyleSheet.create({
  icon: {fontSize: 32},
  container: {flexGrow: 1},
  footer: {height: 100},
  footerTab: {paddingHorizontal: 15},
  end: {alignSelf: 'flex-end'},
  start: {alignSelf: 'flex-start'},
  jcCenter: {justifyContent: 'center'},
  text: {marginTop: 15, marginBottom: 30},
  cover: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignSelf: 'center',
  },
});

Profile.navigationOptions = {
  headerShown: false,
};

export default Profile;

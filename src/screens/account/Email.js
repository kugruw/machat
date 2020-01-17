import React, {useState, useContext} from 'react';
import {StyleSheet, ActivityIndicator} from 'react-native';
import {
  Container,
  Content,
  Text,
  Form,
  Item,
  Input,
  Label,
  View,
} from 'native-base';
import {ButtonPrimary} from '../../components/Button';
import {toastr} from '../../helpers/script';
import color from '../../config/color';
import {BottomModal} from '../../components/Modal';
import db, {firebase} from '../../config/firebase';
import RootContext from '../../context';

const ChangeEmail = () => {
  const {
    user: {data},
  } = useContext(RootContext);
  const [password, setPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [config, setConfig] = useState({loading: false, error: false});
  const [modalVisible, setModalVisible] = useState(false);

  const handleSubmit = () => {
    if (config.loading) {
      return;
    }
    setConfig({loading: true, error: false});
    setModalVisible(false);
    setPassword('');
    firebase
      .auth()
      .signInWithEmailAndPassword(data.email, password)
      .then(() => {
        const user = firebase.auth().currentUser;
        user
          .updateEmail(newEmail)
          .then(() => {
            db.ref(`users/${user.uid}/email`).set(newEmail, err => {
              if (err) {
                setConfig({loading: false, error: true});
                toastr(err.message, 'danger');
              } else {
                setConfig({loading: false, error: false});
                toastr('Email successfully changed.', 'success');
                setNewEmail('');
              }
            });
          })
          .catch(err => {
            setConfig({loading: false, error: true});
            toastr(err.message, 'danger');
          });
      })
      .catch(() => {
        setConfig({loading: false, error: true});
        toastr('Invalid password.', 'danger');
      });
  };

  const showModal = () => {
    if (!newEmail) {
      toastr('Please fill out all of this field.');
    } else if (data.email === newEmail) {
      toastr('Your new email === current email');
    } else {
      setModalVisible(true);
    }
  };

  return (
    <Container>
      <BottomModal
        title="Verify"
        message="Please input your password to verify it's you."
        submitButtonText="Change"
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleSubmit}>
        <Input
          disabled={config.loading}
          style={[s.fontSize, s.modalInput]}
          secureTextEntry
          value={password}
          onChangeText={text => setPassword(text)}
        />
      </BottomModal>
      <Content padder>
        <Form style={s.mt}>
          <Item stackedLabel>
            <Label>Current Email</Label>
            <Input disabled={true} value={data.email} />
          </Item>
          <Item stackedLabel>
            <Label>New Email</Label>
            <Input
              disabled={config.loading}
              value={newEmail}
              onChangeText={text => setNewEmail(text)}
            />
          </Item>
          <ButtonPrimary disabled={config.loading} handleSubmit={showModal}>
            {config.loading ? (
              <ActivityIndicator size="large" color={color.light} />
            ) : (
              <Text>Change Email</Text>
            )}
          </ButtonPrimary>
        </Form>
      </Content>
    </Container>
  );
};

const s = StyleSheet.create({
  mt: {marginTop: 10},
  fontSize: {fontSize: 20},
  modalInput: {
    marginHorizontal: 15,
    borderColor: color.paleGray,
    borderWidth: 1,
    marginBottom: 20,
  },
});

ChangeEmail.navigationOptions = {
  title: 'Change Email',
};

export default ChangeEmail;

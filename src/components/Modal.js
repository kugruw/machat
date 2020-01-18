import React from 'react';
import {StyleSheet, Text as TextMedium, View, TextInput} from 'react-native';
import {Text, H3, Button} from 'native-base';
import Modal from 'react-native-modal';
import sGlobal from '../public/styles';
import sColor from '../public/styles/color';

const DangerModal = props => {
  return (
    <Modal
      onBackButtonPress={props.onClose}
      onBackdropPress={props.onClose}
      animationIn="pulse"
      animationOut="fadeOut"
      isVisible={props.visible}>
      <View style={[sColor.lightBgColor, s.modal]}>
        <View>
          <H3 style={[sColor.dangerColor, sGlobal.textCenter]}>
            {props.title || 'Alert'}
          </H3>
          <TextMedium style={[sGlobal.textCenter, s.modalMessage]}>
            {props.message || 'Ops'}
          </TextMedium>
          <View>
            <View style={sGlobal.flexRow}>
              <Button
                danger
                style={[sGlobal.w1_2, sGlobal.center, s.modalButton]}
                onPress={props.onSubmit}>
                <Text>{props.submitButtonText || 'Oke'}</Text>
              </Button>
              <Button
                light
                style={[sGlobal.w1_2, sGlobal.center, s.modalButton]}
                onPress={props.onClose}>
                <Text>{props.closeButtonText || 'Close'}</Text>
              </Button>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};


const BottomModal = props => {
  return (
    <Modal
      onBackButtonPress={props.onClose}
      onBackdropPress={props.onClose}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      isVisible={props.visible}
      style={s.bottomModalContainer}>
      <View style={[sColor.lightBgColor, s.bottomModal]}>
        <View>
          <H3 style={[sColor.secondaryColor, sGlobal.textCenter]}>
            {props.title || 'Alert'}
          </H3>
          <TextMedium style={[sGlobal.textCenter, s.modalMessage]}>
            {props.message || 'Ops'}
          </TextMedium>
          {props.children}
          <View>
            <View style={sGlobal.flexRow}>
              <Button
                light
                style={[sGlobal.w1_2, sGlobal.center, s.modalButton]}
                onPress={props.onClose}>
                <Text>{props.closeButtonText || 'Close'}</Text>
              </Button>
              <Button
                style={[sGlobal.w1_2, sGlobal.center, s.modalButton, sColor.primaryBgColor]}
                onPress={props.onSubmit}>
                <Text>{props.submitButtonText || 'Oke'}</Text>
              </Button>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const s = StyleSheet.create({
  modal: {
    paddingVertical: 24,
  },
  modalMessage: {
    paddingTop: 20,
    paddingBottom: 20 * 2,
  },
  modalButton: {
    borderRadius: 0,
  },
  bottomModal: {position: 'absolute', bottom: 0, paddingTop: 24},
  bottomModalContainer: {margin: 0, position: 'relative'},
});

export {DangerModal, BottomModal};

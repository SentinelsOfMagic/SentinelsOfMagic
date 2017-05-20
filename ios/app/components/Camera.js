import React, {Component} from 'react';
import Promise from 'bluebird';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  Image
} from 'react-native';
import axios from 'axios';
import Camera from 'react-native-camera';

class CameraScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '...',
      result: '',
      image: '',
      showCamera: true
    };
    this.barCodeRead = this.barCodeRead.bind(this);
  }

  barCodeRead(e) {
    this.setState({ showCamera: false });
    return this.props.screenProps.searchUPC(e.data)
    .then(() => {
      const { goBack } = this.props.navigation;
      goBack();
    });
  }

  render() {
    if (this.state.showCamera) {
      camera = <Camera ref={(cam) => {
        this.camera = cam;
      }} style={styles.preview} onBarCodeRead={this.barCodeRead} aspect={Camera.constants.Aspect.fit}></Camera>;
    } else {
      camera = null;
    }
    return (
      <View style={styles.container}>
        {camera}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  preview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: (Dimensions.get('window').height),
    width: (Dimensions.get('window').width)
  }
});

export default CameraScreen;

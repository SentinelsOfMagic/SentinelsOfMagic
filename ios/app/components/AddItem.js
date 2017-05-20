import React, { Component } from 'react';
import { Text, View, TextInput, Image, Button } from 'react-native';
import { Button as MDButton, Card } from 'react-native-material-design';
import { TextField } from 'react-native-material-textfield';
import Main from './Main';
import axios from 'axios';
import styles from '../style';

class AddItem extends Component {
  static navigationOptions = ({ navigation, screenProps }) => {

    const onPressScan = () => {
      const { navigate } = navigation;
      navigate('Camera', screenProps);
    }
    return {
      headerRight:
      (<Button
        onPress={onPressScan}
        title="Scan"
        style={styles.header}
      />),
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      notes: '',
      errorName: '',
      errorText: '',
      image: ''
    }
    this.onPressSubmit = this.onPressSubmit.bind(this);
    // this.onPressScan = this.onPressScan.bind(this);
    this.searchUPC = this.searchUPC.bind(this);
    this.props.screenProps.searchUPC = this.searchUPC;
  }

  onPressSubmit() {
    const { navigate, goBack } = this.props.navigation;
    const { houseId, userId } = this.props.screenProps;

    const params = {
      name: this.state.name,
      notes: this.state.notes,
      image: this.state.image,
      houseId: houseId,
      userId: userId
    };

    axios.post('https://fridgr-mobile.herokuapp.com/add', params)
    .then(res => {
      this.props.screenProps.getItems();
    })
    .then(() => {
      goBack();
    })
    .catch(err => {
      console.log('Bad POST request to /add: ', err.response.data);
      this.setState({
        errorName: err.response.data.name,
        errorNotes: err.response.data.notes
      });
    });
  }

  // onPressScan() {
  //   const { navigate } = this.props.navigation;
  //   this.props.screenProps.searchUPC = this.searchUPC;
  //   navigate('Camera', this.props.screenProps);
  // }

  searchUPC(upc) {
    console.log('from searchUPC', upc);
    return axios({
      method: 'get',
      url: 'https://api.nutritionix.com/v1_1/item',
      params: {
        upc: upc,
        appId: '3d831dc9',
        appKey: 'f3f39a4633abc4da66cf018f2c84c8f6'
      }
    }).then((foodObj) => {
      console.log('name: ', foodObj.data.item_name)
      axios({
        method: 'get',
        url: 'https://api.cognitive.microsoft.com/bing/v5.0/search',
        params: {
          q: foodObj.data.item_name,
          count: 1
        },
        headers: {
          'Ocp-Apim-Subscription-Key': '2030f380ae1448e08399595778111ed2'
        }
      }).then((imageObj) => {
        return this.setState({
          name: foodObj.data.item_name,
          image: imageObj.data.images.value[0].contentUrl,
          notes: 'Brand name: ' + foodObj.data.brand_name,
        });
      }).catch((err) => {
        console.log('ERROR: ', err);
      });
    }).catch((err) => {
      console.log('ERROR: ', err);
    });
  }

  render() {
    const image = (this.state.image !== '' ?
    (<Image style={{
      width: 200,
      height: 200,
      alignSelf: 'center'
    }} source={{
      uri: this.state.image
    }}/> )
    : ( <View></View> ));

    return (
      <View style={styles.container}>
        {image}
        <Text style={styles.welcome}>
          Add New Item
        </Text>
        <TextField
          label="New Item"
          textColor="#ffffff"
          tintColor="#ffffff"
          onChangeText={(name) => this.setState({name})}
          value={this.state.name}
          autoCorrect={false}
        />
        <TextField
          label="Notes"
          textColor="#ffffff"
          tintColor="#ffffff"
          multiline={true}
          onChangeText={(notes) => this.setState({notes})}
          value={this.state.notes}
        />
        <MDButton
          onPress={this.onPressSubmit}
          overrides={{textColor: '#ffffff', backgroundColor:'#f37735'}}
          text="Submit"
          raised={true}
        />
      </View>
    );
  }
}

export default AddItem;

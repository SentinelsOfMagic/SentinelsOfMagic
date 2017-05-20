import React, { Component } from 'react';
import { Text, View, TextInput, Button, Image } from 'react-native';
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
      title: 'Add Item',
      headerRight:
      (<Button
        onPress={onPressScan}
        title="Scan Bar Code"
        color="#841584"
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
    this.onPressScan = this.onPressScan.bind(this);
    this.searchUPC = this.searchUPC.bind(this);
  }

  onPressSubmit() {
    const { navigate, goBack } = this.props.navigation;
    const { houseId, userId } = this.props.screenProps;

    const params = {
      name: this.state.name,
      notes: this.state.notes,
      houseId: houseId,
      userId: userId
    };

    axios.post('http://127.0.0.1:8080/add', params)
    .then(res => {
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

  onPressScan() {
    const { navigate } = this.props.navigation;
    this.props.screenProps.searchUPC = this.searchUPC;
    navigate('Camera', this.props.screenProps);
  }

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
    return (
      <View style={styles.container}>
        <Image style={{
          width: 200,
          height: 200
        }} source={{
          uri: this.state.image
        }}/>
        <Button
          onPress={this.onPressScan}
          title="Scan Bar Code"
          color="#841584"
        />
        <Text style={styles.welcome}>
          Add New Item
        </Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(name) => this.setState({name})}
          value={this.state.name}
          placeholder="new food item"
          autoCorrect={false}
        />
        <TextInput
          style={{height: 100, borderColor: 'gray', borderWidth: 1}}
          multiline={true}
          onChangeText={(notes) => this.setState({notes})}
          value={this.state.notes}
          placeholder="notes"
        />
        <Button
          onPress={this.onPressSubmit}
          title="Submit"
          color="#841584"
        />
      </View>
    );
  }
}

export default AddItem;

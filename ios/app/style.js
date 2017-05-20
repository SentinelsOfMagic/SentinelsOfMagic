import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 60,
    paddingBottom: 60,
    justifyContent: 'center',
    backgroundColor: '#00aedb',
  },
  loading: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 35,
    fontWeight: '700',
    fontFamily: 'DamascusBold',
    textShadowColor: '#222222',
    marginVertical: 30,
  },
  createUser: {
    flex: 1,
    paddingHorizontal: 60,
    paddingTop: 60,
    backgroundColor: '#00aedb',
  },
  welcome: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: '700',
    fontFamily: 'DamascusBold',
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    textAlign: 'center',
    color: '#333333',
    paddingHorizontal: 40,
  },
  textStyle: {
    fontSize: 15,
    color: '#ffffff'
  },
  buttonStyle: {
    color: '#0000ff'
  },
  dropdown: {
    position: 'absolute',
    height: (33 + StyleSheet.hairlineWidth) * 5,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'lightgray',
    borderRadius: 2,
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  center: {
    alignSelf: 'center'
  },
  header: {
    fontSize: 10,
  },
  icon: {
    width: 26,
    height: 26,
  },
  btn: {
    width: 50,
    height: 50,
  },
  header: {
    fontSize: 10,
  }
});

export default styles;

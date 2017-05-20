import React from 'react';
import { TabNavigator } from 'react-navigation';
import HouseInventoryNavigator from './HouseInventoryNavigator';
import SettingNavigator from './SettingNavigator';
import UserShoppingListNavigator from './UserShoppingListNavigator';
import Settings from './Settings';

class Main extends React.Component {

  static navigationOptions = { header: null };

  constructor(props) {
    super(props);
  }

  nav(str, params) {
    const { navigate } = this.props.navigation;
    navigate(str, params);
  }

  forceRender() {
    console.log('****************** FORCE UPDATE **************')
    this.forceUpdate();
  }

  render() {
    const { state } = this.props.navigation;

    const screenProps = state.params;
    screenProps.navInMain = this.nav.bind(this);
    screenProps.forceRenderInMain = this.forceRender.bind(this);

    const TabNav = TabNavigator({
      HouseInventory: { screen: HouseInventoryNavigator },
      UserShoppingList: { screen: UserShoppingListNavigator },
      SettingNavigator: { screen: SettingNavigator },
    });
    console.log(state.routeName);
    return (
      <TabNav screenProps={screenProps} />
    );
  }
}

export default Main;

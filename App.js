import React from 'react';
import {
  Dimensions,
  View,
  Platform
} from "react-native";

// import global values
import styles from './src/Utils/Styles'
import Color from './src/Constants/Color'
import Size from './src/Constants/Size'
import API from './src/Utils/API'
import LocalStorage from './src/Utils/LocalStorage'
let width = Dimensions.get("window").width
let height = Dimensions.get("window").height

// import view
import Main from './src/Main'
import Loading from './src/Components/Loading'

export default class App extends React.Component {

  constructor(props) {
    super(props);

    // init global values
    global.Styles = styles
    global.Color = Color
    global.width =  Dimensions.get("window").width
    global.height = Dimensions.get("window").height
    global.isIphoneX = (global.height === 812 || global.width === 812)
    global.Size = Size
    global.statusBarHeight = Platform.OS === 'ios' ? global.isIphoneX ? 44 : 20 : 20

    // init global API instance
    API.init()

    // init global Storage instance
    LocalStorage.init()

    // init global App instance
    global.App = this
  }

  showLoading(){
    // a new thread to show loading view
    setTimeout(()=>{
      this.loading.show()
    },0)
  }

  hideLoading(){
    this.loading.hide()
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Main />
        <Loading 
        ref={ref=>this.loading=ref}
        />
      </View>
    );
  }
}


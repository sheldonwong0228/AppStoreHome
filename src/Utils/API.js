import {Alert} from 'react-native'
export default class API {

  constructor() {
    // a value to sum all asynchronous api call and only dismiss the loading view after last api call has been finished
    this.apiCounter = 0;
  }

  static instance = null;
  static init() {
    if (this.instance == null) {
      this.instance = new API();
      global.API = this.instance;
    }
  }

  callApi(link) {
    this.showLoading();
    return fetch(link)
      .then(function (response) {
        return response.json();
      }).then(json=>{
        // console.log(link, json);
        global.API.hideLoading();
        return json;
      })
      .catch(error => {
        console.log(link, error);
        global.API.hideLoading(true);
        return Promise.reject();
      });
  }

  showLoading() {
    // called one api and update api counter
    this.apiCounter = this.apiCounter + 1;
    global.App.showLoading()
  }

  hideLoading(showError=false) {
    // finished one api call and update api counter
    this.apiCounter = this.apiCounter == 0 ? 0 : this.apiCounter - 1;
    // dismiss loading view if all asynchronous api call has been finished
    if(this.apiCounter==0){
      // a delay time to show the loading view since api loading time is very fast and hard to see the loading view
      // no delay time should be added normally 
      setTimeout(()=>{
        global.App.hideLoading()
        if(showError){
          // show network connection fail alert to user if api call fail to get response
          Alert.alert(
            '',
            'Network Connection failure',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
          )
        }
      },500)
    }
  }
}
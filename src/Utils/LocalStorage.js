import { AsyncStorage } from 'react-native';

export default class LocalStorage {

  constructor() {}

  static instance = null;
  static init() {
    if (this.instance == null) {
      this.instance = new LocalStorage();
      global.LocalStorage = this.instance;
    }
  }

  save(key, data)
  {
    var json = data ? JSON.stringify(data) : null
    return new Promise((resolve, reject) => {
      AsyncStorage.setItem(key, json, (e, result) => {
        resolve();
      });
    });
  }
  load(key)
  {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(key, (e, result) => {
        var res = result ? JSON.parse(result) : null;
        resolve(res);
      });
    });
  }
  remove(key)
  {
    return new Promise((resolve, reject) => {
      AsyncStorage.removeItem(key, (e, result) => {
        resolve();
      });
    });
  }
}

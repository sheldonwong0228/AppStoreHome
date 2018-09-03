import React, { Component } from 'react';
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native';

//import view
import Search from './Components/Search'
import RecommendationListItem from './Components/RecommendationItem'
import AppListItem from './Components/AppListItem'
import RetryButton from './Components/RetryButton'

//import data model
import Application from './Models/Application'

export default class Main extends Component {
  constructor(props) {
    super(props);
    // app is on landscape if screen width is greater than height
    isLandscape = Dimensions.get("window").width > Dimensions.get("window").height
    this.state = {
      text: "",
      appListData: [],
      recommendationListData: [],
      statusBarHeight: isLandscape ? global.Size.containerMargin : global.statusBarHeight,
      containerPadding: isLandscape ? global.Size.landscapePadding : 0
    }
    // number of page currently showing 
    this.appListPager = 1
    // number of row per page
    this.appListSizePerPage = 10
    // maxium page
    this.maxAppListPager = 10
  }

  componentDidMount() {
    // Event Listener for orientation changes
    Dimensions.addEventListener('change', () => {
      isLandscape = Dimensions.get("window").width > Dimensions.get("window").height
      // update status bar height and padding if app change orientation
      if (isLandscape) {
        this.setState({
          statusBarHeight: global.Size.containerMargin,
          containerPadding: 50
        })
      } else {
        this.setState({
          statusBarHeight: global.statusBarHeight,
          containerPadding: 0
        })
      }
    })

    // get data from api
    this.getTop100FreeApp()
    this.getTop10Grossing()

  }

  getTop100FreeApp() {
    // get top 100 free application's json data from apple 
    global.API.callApi("https://itunes.apple.com/hk/rss/topfreeapplications/limit=100/json")
      .then(json => {

        // store top 100 free applications data to local storage
        global.LocalStorage.save("top-100-free-applications", json.feed.entry)

        // update 100 free applications list
        this.updateAppList(json.feed.entry)

      }).catch(() => {
        // try to get data from local storage if fail to get data from api
        global.LocalStorage.load("top-100-free-applications").then(json => {
          if (json != null) {
            // update 100 free applications list
            this.updateAppList(json)
          }
        })
      })
  }

  updateAppList(data) {
    // store original top 100 free applications for later filter
    this.appListData = data.map((item, index) => {
      return new Application(index, item["summary"].label, item["im:name"].label, item["im:artist"].label, item["category"].attributes.label, item["im:image"][0].label)
    })

    // show data with pagination (10 record per page)
    this.lazyAppListData = this.appListData.slice(0, this.appListSizePerPage * this.appListPager)

    // update app list 
    this.setState({
      appListData: this.lazyAppListData
    })
  }

  getTop10Grossing() {
    // get top 10 grossing application's json data from apple 
    global.API.callApi("https://itunes.apple.com/hk/rss/topgrossingapplications/limit=10/json")
      .then(json => {

        // store top 10 grossing applications data to local storage
        global.LocalStorage.save("top-10-grossing", json.feed.entry)

        // update top 10 grossing applications list
        this.updateRecommendationList(json.feed.entry)

      }).catch(() => {
        // try to get data from local storage if fail to get data from api
        global.LocalStorage.load("top-10-dasgrossing").then(json => {
          if (json != null) {
            // update top 10 grossing applications list
            this.updateRecommendationList(json)
          }
        })
      })

  }

  updateRecommendationList(data) {
    // store original top 10 grossing application for later filter
    this.recommendationListData = data.map((item, index) => {
      return new Application(index, item["summary"].label, item["im:name"].label, item["im:artist"].label, item["category"].attributes.label, item["im:image"][1].label)
    })
    // update recommendation list 
    this.setState({
      recommendationListData: this.recommendationListData
    })
  }

  filterList(searchingText) {
    // deep clone current list data
    cloneApplistData = JSON.parse(JSON.stringify(this.lazyAppListData))
    // filter top free application list 
    filteredAppListData = cloneApplistData.filter((item) => {
      return item.summary.indexOf(searchingText) !== -1 ||
        item.name.toLowerCase().indexOf(searchingText.toLowerCase()) !== -1 ||
        item.artist.toLowerCase().indexOf(searchingText.toLowerCase()) !== -1 ||
        item.category.toLowerCase().indexOf(searchingText.toLowerCase()) !== -1;
    });

    // deep clone current list data
    cloneRecommendationListData = JSON.parse(JSON.stringify(this.recommendationListData))
    // filter top 10 grossing application list 
    filteredRecommendationListData = cloneRecommendationListData.filter((item) => {
      return item.summary.indexOf(searchingText) !== -1 ||
        item.name.toLowerCase().indexOf(searchingText.toLowerCase()) !== -1 ||
        item.artist.toLowerCase().indexOf(searchingText.toLowerCase()) !== -1 ||
        item.category.toLowerCase().indexOf(searchingText.toLowerCase()) !== -1;
    });

    // update list
    this.setState({
      appListData: filteredAppListData,
      recommendationListData: filteredRecommendationListData,
    })

  }

  renderListHeader() {
    if (this.state.recommendationListData.length > 0) {
      return (
        <View style={{ height: global.Size.appListHeaderHeight }}>
          {/* recommmendation title */}
          <Text style={[global.Styles.textBlack20, { margin: global.Size.containerMargin }]}>
            推介
        </Text>
          {/* top 10 grossing application list */}
          <FlatList
            keyExtractor={item => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            horizontal
            contentContainerStyle={{ paddingRight: global.Size.containerMargin }}
            data={this.state.recommendationListData}
            renderItem={({ item, index }) => <RecommendationListItem data={item} index={index} />}
          />
          {/* seperator */}
          <View style={[{ position: "absolute", left: 0, right: 0, bottom: 0 }, global.Styles.seperator]} />
        </View>
      )
    } else {
      return null;
    }
  }

  // load more 10 data from original app list 
  lazyLoadAppList() {
    // get original list start from
    startPage = this.appListPager
    // get original list end to
    endPage = this.appListPager + 1
    // update counter
    this.appListPager = this.appListPager + 1

    if (this.appListPager <= this.maxAppListPager) {
      this.lazyAppListData = this.lazyAppListData.concat(this.appListData.slice(this.appListSizePerPage * startPage, this.appListSizePerPage * endPage))
      this.setState({
        appListData: this.lazyAppListData
      })
    }
  }

  appListOnScroll(event) {
    appListHeight = event.nativeEvent.layoutMeasurement.height - global.Size.appListHeaderHeight
    offSetY = event.nativeEvent.contentOffset.y + 50
    // current scrolling position
    position = Math.round((appListHeight + offSetY) / global.Size.appListItemHeight)
    // load more 10 data to the list if scrolled to middle of the list and current list's length is less than original list
    if (position + (this.appListSizePerPage / 2) >= this.state.appListData.length && this.state.appListData.length < this.appListData.length) {
      this.lazyLoadAppList()
    }
  }

  render() {
    return (
      <View style={[styles.container, { paddingTop: this.state.statusBarHeight, paddingLeft: this.state.containerPadding, paddingRight: this.state.containerPadding }]}>
        {/* show content only if data is not empty */}
        {this.state.appListData.length > 0 && this.state.recommendationListData.length > 0 && (
          <View>
            {/* status bar */}
            <StatusBar
              barStyle="dark-content"
            />

            {/* search */}
            <Search
              onChangeText={(value) => this.setState({ text: value }, this.filterList(value))}
              value={this.state.text}
            />

            {/* seperator */}
            <View style={global.Styles.seperator} />

            {/* top 100 free applications list */}
            <FlatList
              keyExtractor={item => item.id.toString()}
              ListHeaderComponent={() => this.renderListHeader()}
              onScroll={event => this.appListOnScroll(event)}
              data={this.state.appListData}
              renderItem={({ item, index }) => <AppListItem data={item} index={index + 1} />}
            />
          </View>
        )}

        {/* show retry button if no data to show */}
        {this.state.appListData.length == 0 && this.state.recommendationListData.length == 0 && (
          <RetryButton
            onPress={() => {
              // get data from api
              this.getTop100FreeApp()
              this.getTop10Grossing()
            }} />
        )}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})


import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet
} from 'react-native';
import { Icon } from 'react-native-elements';

export default class Search extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.centerContainer,
                { display: this.props.value != undefined && this.props.value.length > 0 ? "none" : "flex" }]}>
                    <Icon size={18} name='search' color="grey" />
                    <Text style={[styles.searchTitle, global.Styles.textGrey14]}>搜尋</Text>
                </View>
                <TextInput
                    underlineColorAndroid={"transparent"}
                    style={styles.textInput}
                    {...this.props}
                />
            </View>
        )
    }
}
let height = 30
const styles = StyleSheet.create({
    container: {
        height: height,
        margin: global.Size.containerMargin,
        padding: global.Size.containerPadding,
        borderRadius: 3,
        backgroundColor: global.Color.LightGrey
    },
    centerContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    textInput: {
        width: global.width - (global.Size.containerPadding * 2) - (global.Size.containerMargin * 2),
        height: height - (global.Size.containerPadding * 2),
        position: "absolute",
        top: global.Size.containerPadding,
        bottom: global.Size.containerPadding,
        left: global.Size.containerPadding,
        right: global.Size.containerPadding,
    },
    searchTitle: {
        paddingLeft: global.Size.containerPadding
    }
})


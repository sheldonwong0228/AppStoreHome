import React, { Component } from 'react';
import {
    View,
    ActivityIndicator,
    StyleSheet,
} from "react-native";

export default class Loading extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }

    show(){
        this.setState({
            visible: true
        })
    }

    hide(){
        this.setState({
            visible: false
        })
    }

    render() {
        return (
            this.state.visible && (<View style={styles.container}>
                <ActivityIndicator size="large" color={global.Color.Orange} />
            </View>)
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: global.Color.TransparentBlack,
        justifyContent: "center",
        alignItems: "center"
    },
})

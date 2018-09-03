import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

export default class RetryButton extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={this.props.onPress}
                >
                <Text>
                    重試
                </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonContainer: {
        borderWidth: 1,
        padding: global.Size.containerPadding
    }
})
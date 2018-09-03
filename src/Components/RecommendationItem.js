import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';

export default class RecommendationListItem extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>

                {/* image */}
                <Image resizeMode="contain" style={[styles.image,global.Styles.roundedImage]} source={{ uri: this.props.data.url }} />

                {/* title */}
                <Text
                numberOfLines={2}
                style={[styles.title, global.Styles.textBlack14]}>
                 {this.props.data.name}
                </Text>

                {/* category */}
                <Text
                numberOfLines={2}
                style={[styles.category, global.Styles.textGrey14]}>
                {this.props.data.category}
                </Text>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        width: global.Size.bigImage,
        marginLeft: global.Size.containerMargin,
        marginTop: global.Size.containerMargin,
        marginBottom: global.Size.containerMargin
    },
    image: {
        width: global.Size.bigImage,
        height: global.Size.bigImage,
        marginBottom: global.Size.itemMargin
    },
    title: {
        marginBottom: global.Size.itemMargin
    },
    category: {
        marginBottom: global.Size.itemMargin
    }
})
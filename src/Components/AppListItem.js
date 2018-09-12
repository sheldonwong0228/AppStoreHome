import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';

import { Rating } from 'react-native-elements';

export default class AppListVerticalItem extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>

                {/* index */}
                <Text style={[styles.index, global.Styles.textGrey18]}>
                    {this.props.index}
                </Text>

                {/* image */}
                {/* show rounded image if position is even , show cirle image if position is odd */}
                <Image resizeMode="contain" style={[styles.image, this.props.index % 2 == 0 ? global.Styles.roundedSmallImage : global.Styles.circleSmallImage]} source={{ uri: this.props.data.url }} />


                <View style={styles.contentContainer}>
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

                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        {/* rating star */}
                        <Rating
                            type="star"
                            fractions={1}
                            startingValue={this.props.data.ratingStar ? this.props.data.ratingStar : 0.0}
                            ratingColor={global.Color.Orange}
                            ratingBackgroundColor={global.Color.White}
                            type='custom'
                            readonly
                            imageSize={10}
                        />
                        {/* comment number */}
                        <Text style={global.Styles.textGrey14}> ({this.props.data.comment ? this.props.data.comment : 0})</Text>
                    </View>

                </View>

                {/* item seperator */}
                <View style={[{ position: "absolute", left: 0, right: 0, bottom: 0 }, global.Styles.seperator]} />

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: global.Size.appListItemHeight,
        marginLeft: global.Size.containerMargin,
        paddingTop: global.Size.containerPadding,
        paddingBottom: global.Size.containerPadding,
    },
    index: {
        marginRight: global.Size.containerMargin
    },
    image: {
        width: 70,
        height: 70,
        margin: global.Size.itemMargin
    },
    contentContainer: {
        flex: 1,
        flexDirection: "column",
    },
    title: {
        marginBottom: global.Size.itemMargin,
        marginRight: global.Size.itemMargin
    },
    category: {
        marginBottom: global.Size.itemMargin
    },
    rating: {

    }
})
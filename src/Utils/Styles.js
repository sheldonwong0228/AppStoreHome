import { StyleSheet, Platform } from 'react-native';

export default styles = StyleSheet.create({
    textGrey14: {
        fontSize: 14,
        color: "grey"
    },
    textBlack14: {
        fontSize: 14,
        color: "black"
    },
    textGrey18: {
        fontSize: 18,
        color: "grey"
    },
    textBlack20: {
        fontSize: 20,
        color: "black"
    },
    roundedImage: {
        borderRadius: Platform.OS === 'ios' ? 18 : 5,
    },
    roundedSmallImage:{
        borderRadius: Platform.OS === 'ios' ? 15 : 3,
    },
    circleSmallImage: {
        borderRadius: Platform.OS === "ios" ? 35 : 25
    },
    circleBigImage: {
        borderRadius: Platform.OS === "ios" ? 40 : 30
    },
    seperator: {
        height: 1,
        backgroundColor: "rgba(155, 155, 155, 0.5)"
    },
});
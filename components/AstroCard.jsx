import { Image, StyleSheet, TouchableHighlight, View } from "react-native";
import useOrientation from "../hooks/useOrientation";
import { useNavigation } from "@react-navigation/native";

export default function AstroCard({ data }) {

    const { isPortrait, isLandscape } = useOrientation();
    const navigation = useNavigation()

    function handleClick() {
        navigation.navigate('Detalhes', {
            id: data.data[0].nasa_id
        })
    }

    return (
        <TouchableHighlight onPress={handleClick} >
            <View style={[styles.container, isLandscape ? { maxHeight: 100,   height: 100 } : {maxHeight: 250,   height: 250}]}>
                <Image style={styles.avatar} source={{ uri: data?.links?.[0].href }} />
            </View>
        </TouchableHighlight>
    )

}

const styles = StyleSheet.create({
    container: {
        // paddingVertical: 10,
        marginVertical: 5,
        // paddingHorizontal: 10,
        borderWidth: 0.5,
        backgroundColor: '#e6e6e6',
        borderColor: '#32302e',
        flex: 0,
        flexDirection: 'column',
        gap: 10,
        maxWidth: '100%',
      
    },
    row: {
        flexDirection: 'row',
    },
    portrait: {
        flexDirection: 'column',
    },
    capitalize: {
        textTransform: 'capitalize',
    },
    rowGrid: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },
    textBold: {
        fontWeight: 'bold',
    },
    uppercase: {
        textTransform: 'uppercase'
    },
    displayNone: {
        display: 'none'
    },
    containerText: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        flex: 0,
        gap: 10,
        maxWidth: '70%',
        flex: 1
    },
    avatar: {
        width: '100%',
        height: '100%'
    },
    text: {
        fontSize: 16
    },
    justifyBetween: {
        justifyContent: 'space-between'
    },
    colorRed: {
        color: "#aa3939"
    },
    colorGreen: {
        color: "#1caa23"
    },
    textCenter: {
        textAlign: 'center'
    },
    fullWidth: {
        width: '100%'
    }

})

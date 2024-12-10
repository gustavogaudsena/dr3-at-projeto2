import { View, StyleSheet, Text, ScrollView, Image, Dimensions, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import useOrientation from '../hooks/useOrientation';

export default function DetalhesScreen({ route, database }) {
    const params = route.params
    const id = params?.id

    const [currentItem, setCurrentItem] = useState({})
    const { isLandscape, isPortrait } = useOrientation()
    useEffect(() => {
        const dados = database.find(item => item?.data?.[0].nasa_id === id)
        setCurrentItem(dados)
    }, [])
    return (
        <ScrollView>
            {
                !currentItem &&
                <ActivityIndicator size="large" color="#0000ff" />
            }
            {
                currentItem &&
                <View style={styles.container}>
                    {
                        isLandscape ?
                            (
                                <View style={[styles.row, styles.halfScreen]}>
                                    <Image
                                        style={[styles.image, styles.halfWidth]}
                                        source={{ uri: currentItem?.links?.[0]?.href }}
                                    />
                                    <View style={[styles.textContainer, styles.halfWidth, styles.halfWidth]}>
                                        <Text style={styles.title}>{currentItem.data?.[0]?.title}</Text>
                                        <Text style={styles.date}>
                                            {new Date(currentItem.data?.[0]?.date_created).toLocaleDateString('pt-BR')}
                                        </Text>
                                    </View>
                                </View>
                            ) : (
                                <View>
                                    <Image
                                        style={styles.imageFull}
                                        source={{ uri: currentItem?.links?.[0]?.href }}
                                    />
                                    <View style={styles.textRow}>
                                        <Text style={styles.title}>{currentItem.data?.[0]?.title}</Text>
                                        <Text style={styles.date}>
                                            {new Date(currentItem.data?.[0]?.date_created).toLocaleDateString('pt-BR')}
                                        </Text>
                                    </View>
                                </View>
                            )}
                    <ScrollView>
                        <Text style={[styles.text, styles.textJustify]}>
                            {currentItem.data?.[0]?.description}
                        </Text>
                    </ScrollView>
                </View>}
        </ScrollView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    row: {
        flexDirection: 'row',
    },
    textRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        flexWrap: 'wrap'
    },
    halfWidth: {
        width: '50%',
    },
    halfScreen: {
        flex: 1,
    },
    image: {
        height: Dimensions.get('window').height / 2,
        maxHeight: 200,
        resizeMode: 'cover',
    },
    imageFull: {
        width: '100%',
        height: Dimensions.get('window').height / 2,
        maxHeight: 300,
        resizeMode: 'cover',
    },
    textContainer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    date: {
        fontSize: 14,
        color: 'gray',
    },
    text: {
        fontSize: 16,
        padding: 10,
    },
    textJustify: {
        textAlign: 'justify',
    },
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        gap: 15,
        paddingHorizontal: 5,
        marginVertical: 15,
        flexDirection: 'column',
        width: '100%'

    },
    fullWidth: {
        flex: 1,
        maxWidth: '100%'
    },
    halfWidth: {
        flex: 1,
        width: '50%'

    },
    column: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    title: {
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 18
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    avatar: {
        width: '100%',
        height: 300
    },
    flatList: {
        width: '100%'
    },
    button: {
        backgroundColor: '#014f15',
        paddingVertical: 5,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    textJustify: {
        textAlign: 'justify'
    }
})
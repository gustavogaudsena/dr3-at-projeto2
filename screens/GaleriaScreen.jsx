import { View, StyleSheet, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import AstroCard from '../components/AstroCard.jsx';
import {  useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { apiHandler } from '../api/api.js';
import Progress from '../components/Progress.jsx';

export default function GaleriaScreen({ navigation, database, setDatabase }) {
    const [astro, setAstro] = useState("earth")
    const [page, setPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [totalItems, setTotalItems] = useState(0);
    const [progresso, setProgresso] = useState(0);
    const [refreshing, setRefreshing] = useState(false);


    const getAstros = (currentAstro = astro, currentPage = page, base = database) => {
        setIsLoading(true)
        apiHandler.get(currentAstro, currentPage).then(response => {
            const newDatabase = [...base, ...response.items]
            setDatabase(newDatabase)
            setProgresso(response.metadata.total_hits > 0 ? Math.min((newDatabase.length / response.metadata.total_hits) * 100, 100) : 0)
            setTotalItems(response.metadata.total_hits)
        }).finally(_ => { setIsLoading(false); setRefreshing(false); })
    }

    const loadNextPage = () => {
        if (database.length * page < totalItems) {
            setPage(prev => { getAstros(astro, prev + 1 ); return prev + 1 });
        }
    }

    function loadAstro(newAstro) {
        setPage(1)
        getAstros(newAstro, 1, [])
    }

    useEffect(() => {
        getAstros()
    }, [])

    const handleRefresh = async () => {
        setRefreshing(true);
        setPage(1);
        getAstros(astro, 1, []);
    };

    return (
        <View style={styles.container}>
            <Picker
                selectedValue={astro}
                onValueChange={(value) => {
                    setAstro((prev) => {
                        loadAstro(value)
                        return value
                    })
                }}
            >
                <Picker.Item label="Terra" value="earth" />
                <Picker.Item label="Sol" value="sun" />
                <Picker.Item label="Lua" value="moon" />
                <Picker.Item label="Marte" value="mars" />
                <Picker.Item label="Jupiter" value="jupiter" />
                <Picker.Item label="Netuno" value="neptune" />
            </Picker>
            <FlatList
                data={database}
                renderItem={({ item, index }) => <AstroCard data={item} />}
                keyExtractor={item => item.data?.[0].nasa_id}
                style={styles.flatList}
                onScrollToTop={loadAstro}
                onEndReached={loadNextPage}
                onEndReachedThreshold={2}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
                }
                ListHeaderComponent={isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
            />
            <Progress progresso={progresso}/>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        gap: 15,
        paddingHorizontal: 5,
        marginVertical: 15,
        flexDirection: 'column',
        width: '100%'

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
    // container: {
    //     flex: 1,
    //     backgroundColor: '#fff',
    // },
    picker: {
        margin: 10,
        height: 50,
    },
    flatList: {
        flex: 1,
    },
})
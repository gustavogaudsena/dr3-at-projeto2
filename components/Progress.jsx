import { View, StyleSheet, Text,  } from 'react-native';

export default function Progress({ progresso }) {

    return (
        <View style={styles.progressContainer}>
            <Text style={styles.progressText}>{`Progresso: ${progresso.toFixed(1)}%`}</Text>
            <View style={styles.progressBar}>
                <View style={[styles.progressIndicator, { width: `${progresso}%` }]} />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    progressContainer: {
        padding: 10,
        backgroundColor: '#f2f2f2',
    },
    progressText: {
        fontSize: 14,
        marginBottom: 5,
        textAlign: 'center',
    },
    progressBar: {
        height: 10,
        width: '100%',
        backgroundColor: '#ddd',
        borderRadius: 5,
        overflow: 'hidden',
    },
    progressIndicator: {
        height: '100%',
        backgroundColor: '#4caf50',
    }
})
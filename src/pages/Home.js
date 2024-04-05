import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

import logoPL from '../../assets/LogoPL_mobile.png';

const Home = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Image source={logoPL} style={styles.logo} />
            <View style={styles.buttonsRow}>
                <TouchableOpacity
                    style={[styles.button, styles.buttonLogin]}
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.buttonRegister]}
                    onPress={() => navigation.navigate('Register')}
                >
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f7f7f7',
    },
    logo: {
        width: 200,
        height: 200,
        marginBottom: 50,
    },
    title: {
        fontSize: 45,
        fontWeight: 'bold',
        color: '#fe6f14',
        marginBottom: 50,
    },
    buttonsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    button: {
        backgroundColor: '#fe6f14',
        borderRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginHorizontal: 10,
        width: '30%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
    buttonLogin: {},
    buttonRegister: {},
});

export default Home;

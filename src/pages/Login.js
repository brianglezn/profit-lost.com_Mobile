import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('https://profit-lost-backend.onrender.com/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                await AsyncStorage.setItem('token', data.token);
                navigation.navigate('Movements');
            } else {
                console.error('Failed to login');
                Alert.alert("Login error", "Incorrect email or password");
            }
        } catch (error) {
            console.error('There was an error logging in', error);
            Alert.alert("Error", "There was a problem trying to log in");
        }

        setIsLoading(false);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="E-mail"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
            />
            <TouchableOpacity style={styles.submitContainer} onPress={handleSubmit} disabled={isLoading}>
                {isLoading ? (
                    <ActivityIndicator size="small" color="#fe6f14" />
                ) : (
                    <Text style={styles.buttonText}>Let's go!</Text>
                )}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: '10%',
        paddingHorizontal: '5%',
    },
    input: {
        backgroundColor: '#fff',
        width: '70%',
        marginBottom: '6%',
        borderRadius: 10,
        padding: '3%',
        borderWidth: 0,
        elevation: 4,
        shadowColor: '#171A1F',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
    },
    submitContainer: {
        backgroundColor: '#fe6f14',
        color: '#f7f7f7',
        padding: '3%',
        width: '50%',
        borderRadius: 10,
        borderWidth: 0,
        textAlign: 'center',
        fontWeight: 'bold',
        elevation: 4,
        shadowColor: '#C84F03',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        opacity: 0.8,
        marginTop: 12,
    },
    buttonText: {
        color: '#f7f7f7',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default Login;

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const NavButton = ({ isActive, onPress, iconName, label }) => (
    <TouchableOpacity onPress={onPress} style={styles.navButton}>
        <MaterialIcons name={iconName} size={24} color={isActive ? styles.active.color : 'black'} />
        <Text style={[styles.navButtonText, isActive && styles.active]}>{label}</Text>
    </TouchableOpacity>
);

const BottomNavBar = ({ currentScreen, setCurrentScreen }) => {

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.navContainer}>
                <NavButton
                    isActive={currentScreen === 'Home'}
                    onPress={() => setCurrentScreen('Home')}
                    iconName="home"
                    label="Home"
                />
                <NavButton
                    isActive={currentScreen === 'AnnualReport'}
                    onPress={() => setCurrentScreen('AnnualReport')}
                    iconName="bar-chart"
                    label="AnnualReport"
                />
                <NavButton
                    isActive={currentScreen === 'Movements'}
                    onPress={() => setCurrentScreen('Movements')}
                    iconName="receipt-long"
                    label="Movements"
                />
                <NavButton
                    isActive={currentScreen === 'Accounts'}
                    onPress={() => setCurrentScreen('Accounts')}
                    iconName="credit-card"
                    label="Accounts"
                />
                <NavButton
                    isActive={currentScreen === 'Goals'}
                    onPress={() => setCurrentScreen('Goals')}
                    iconName="inventory"
                    label="Goals"
                />
            </View>
        </SafeAreaView>
    );
};

// Estilos para la barra de navegación y los botones
const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: '#fff',
        paddingBottom: 10,
    },
    navContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderTopColor: '#ddd',
        borderTopWidth: 1,
        paddingTop: 10,
    },
    navButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10,
    },
    navButtonText: {
        fontSize: 12,
        color: 'black',
    },
    active: {
        color: '#fe6f14',
        fontWeight: '600',
    },
});

export default BottomNavBar;

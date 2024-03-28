import React, { useState, useEffect } from 'react';
import { View, StyleSheet,ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../context/AuthContext';

import BottomNavBar from '../components/BottomNavBar';
import TopNavBar from '../components/TopNavBar';
import DashHome from './DashHome';
import AnnualReport from './AnnualReport';
import Movements from './Movements';
import Accounts from './Accounts';
import Goals from './Goals';

const Dashboard = () => {
    const [currentScreen, setCurrentScreen] = useState('Home');
    const navigation = useNavigation();

    const { isLoggedIn } = useAuth();

    useEffect(() => {
        if (!isLoggedIn) {
            navigation.navigate('Home');
        }
    }, [isLoggedIn]);

    if (!isLoggedIn) {
        return <ActivityIndicator size="large" color="#fe6f14" />;
    }

    const renderScreen = () => {
        switch (currentScreen) {
            case 'Home':
                return <DashHome />;
            case 'AnnualReport':
                return <AnnualReport />;
            case 'Movements':
                return <Movements />;
            case 'Accounts':
                return <Accounts />;
            case 'Goals':
                return <Goals />;
            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>
            <TopNavBar title={currentScreen} setCurrentScreen={setCurrentScreen} />

            {renderScreen()}

            <BottomNavBar currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
    },
});

export default Dashboard;

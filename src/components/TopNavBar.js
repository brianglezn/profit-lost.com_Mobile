import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const TopNavBar = ({ title }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.icons}>
                <TouchableOpacity style={styles.iconButton} onPress={() => { navigation.navigate('Settings'); }}>
                    <MaterialIcons name="settings" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton} onPress={() => { navigation.navigate('UserAccount'); }}>
                    <MaterialIcons name="person" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingTop: 60,
        paddingBottom: 20,
        backgroundColor: '#f7f7f7',
    },
    title: {
        fontSize: 20,
        paddingLeft: 10,
        fontWeight: 'bold',
    },
    icons: {
        flexDirection: 'row',
        paddingRight: 10,
    },
    iconButton: {
        marginLeft: 15,
    },
});

export default TopNavBar;

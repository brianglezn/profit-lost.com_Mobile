import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/MaterialIcons';

const screenWidth = Dimensions.get('window').width;

const getLast6MonthsLabels = () => {
    const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    const now = new Date();
    let months = [];

    for (let i = 5; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        months.push(monthNames[d.getMonth()]);
    }

    return months;
};

const DashHome = () => {

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.balanceContainer}>
                    <Text style={styles.balanceTitle}>Total Balance</Text>
                    <Text style={styles.balance}>€1,840</Text>
                </View>
                <View style={styles.chartContainer}>
                    <LineChart
                        data={{
                            labels: getLast6MonthsLabels(),
                            datasets: [
                                {
                                    data: [
                                        Math.random() * 10000,
                                        Math.random() * 10000,
                                        Math.random() * 10000,
                                        Math.random() * 10000,
                                        Math.random() * 10000,
                                        Math.random() * 10000
                                    ]
                                }
                            ]
                        }}
                        width={screenWidth * 0.95}
                        height={220}
                        yAxisLabel="€"
                        yAxisInterval={1}
                        chartConfig={{
                            backgroundGradientFrom: "#ff8e38",
                            backgroundGradientTo: "#ffb771",
                            decimalPlaces: 2,
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            style: {
                                borderRadius: 16,
                            },
                            propsForDots: {
                                r: "6",
                                strokeWidth: "2",
                                stroke: "#fff"
                            },
                        }}
                        bezier
                        style={styles.chartStyle}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <ActionButton icon="add" text="Add movement" />
                    <ActionButton icon="swap-horiz" text="Exchange" />
                    <ActionButton icon="description" text="Details" />
                    <ActionButton icon="more-horiz" text="More" />
                </View>

                <View style={styles.movementsContainer}>
                    <MovementItem name="Nomina" date="28/03/24 14:46" Value="2184.86" />
                    <MovementItem name="Supermarket" date="26/03/24 09:46" Value="-80.98" />
                    <MovementItem name="Gym" date="18/03/24 12:30" Value="-25" />
                    <MovementItem name="Work2" date="10/03/24 19:23" Value="300" />
                    <MovementItem name="Supermarket" date="05/03/24 08:50" Value="-30" />
                </View>

                <View style={styles.widgetContainer}>
                    <View style={styles.widget}>
                        <Text style={styles.balanceTitle}>Total Balance</Text>
                        <Text style={styles.balanceTitle}>Total Balance</Text>
                        <Text style={styles.balanceTitle}>Total Balance</Text>
                        <Text style={styles.balanceTitle}>Total Balance</Text>
                        <Text style={styles.balanceTitle}>Total Balance</Text>
                    </View>
                    <View style={styles.widget}>
                        <Text style={styles.balanceTitle}>Total Balance</Text>
                        <Text style={styles.balanceTitle}>Total Balance</Text>
                        <Text style={styles.balanceTitle}>Total Balance</Text>
                        <Text style={styles.balanceTitle}>Total Balance</Text>
                        <Text style={styles.balanceTitle}>Total Balance</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const ActionButton = ({ icon, text }) => (
    <View style={styles.actionButton}>
        <TouchableOpacity style={styles.buttonIcon} >
            <Icon name={icon} size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.buttonText}>{text}</Text>
    </View>
);

const MovementItem = ({ name, Value, date }) => {
    const isPositive = Value > 0;

    return (
        <View style={styles.movementItem}>
            <Icon
                name={isPositive ? "arrow-upward" : "arrow-downward"}
                size={24}
                color={isPositive ? "green" : "red"}
                style={styles.movementIcon}
            />
            <View style={styles.movementDetails}>
                <Text style={styles.movementName}>{name}</Text>
                <Text style={styles.movementDate}>{date}</Text>
            </View>
            <Text style={[styles.movementValue, { color: isPositive ? "green" : "red" }]}>
                {Value}€
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
    },
    scrollContainer: {
        flex: 1,
    },
    balanceContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    balanceTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: 'black',
    },
    balance: {
        fontSize: 36,
        fontWeight: 'bold',
        color: 'black',
        marginVertical: 5,
    },
    chartContainer: {
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: 16,
        overflow: 'hidden',
        width: screenWidth * 0.95,
    },
    chartStyle: {
        borderRadius: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        marginTop: 20,
        marginBottom: 20,
    },
    actionButton: {
        alignItems: 'center',
        flex: 1,
    },
    buttonIcon: {
        backgroundColor: '#fe6f14',
        padding: 15,
        color: '#ffffff',
        borderRadius: 100,
        marginTop: 5,
    },
    buttonText: {
        color: '#000',
        marginTop: 5,
    },
    movementsContainer: {
        backgroundColor: '#fff',
        margin: 10,
        padding: 10,
        borderRadius: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    movementItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
    },
    movementIcon: {
        marginRight: 10,
    },
    movementDetails: {
        flex: 1,
        justifyContent: 'center',
    },
    movementName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    movementDate: {
        fontSize: 14,
        color: '#666',
    },
    movementValue: {
        fontSize: 16,
        fontWeight: 'bold',
        width: 80,
        textAlign: 'right',
    },
    widgetContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    widget: {
        backgroundColor: '#fff',
        borderRadius: 16,
        margin: '2.5%',
        padding: 10,
        width: '45%',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
});

export default DashHome;

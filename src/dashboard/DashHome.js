import React, { useEffect, useState } from 'react';
import {
    View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, ActivityIndicator
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth = Dimensions.get('window').width;

const DashHome = () => {
    const [dataAccounts, setDataAccounts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllData = async () => {
            setLoading(true);
            const token = await AsyncStorage.getItem('token');
            try {
                const response = await fetch(`https://profit-lost-backend.onrender.com/accounts/all`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const allAccountsData = await response.json();
                setDataAccounts(allAccountsData);
            } catch (error) {
                console.error('Error fetching all accounts data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, []);

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const getLast6MonthsLabels = () => {
        return Array.from({ length: 6 }, (_, i) => {
            let date = new Date();
            date.setMonth(date.getMonth() - i);
            return monthNames[date.getMonth()];
        }).reverse();
    };

    const calculateSumLast6Months = () => {
        let sums = new Array(6).fill(0);
        let currentDate = new Date();

        dataAccounts.forEach(account => {
            account.records.forEach(record => {
                let recordDate = new Date(record.year, monthNames.indexOf(record.month), 1);
                let monthsDiff = currentDate.getMonth() - recordDate.getMonth() +
                    (12 * (currentDate.getFullYear() - recordDate.getFullYear()));

                if (monthsDiff >= 0 && monthsDiff < 6) {
                    sums[monthsDiff] += record.value;
                }
            });
        });

        return sums.reverse();
    };

    if (loading) {
        return <View style={styles.center}><ActivityIndicator size="large" color="#fe6f14" /></View>;
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.chartContainer}>
                    <LineChart
                        data={{
                            labels: getLast6MonthsLabels(),
                            datasets: [{ data: calculateSumLast6Months() }]
                        }}
                        width={screenWidth}
                        height={220}
                        yAxisLabel="€"
                        chartConfig={chartConfig}
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
                        <Text style={styles.widgetTitle}>Month Expenses</Text>
                        <View style={styles.contentCenter}>
                            <Text style={styles.widgetContent}>- 500€</Text>
                        </View>
                    </View>
                    <View style={styles.widget}>
                        <Text style={styles.widgetTitle}>Total Balance</Text>
                        <View style={styles.contentCenter}>
                            <Text style={styles.widgetContent}>8,840€</Text>
                        </View>
                    </View>
                </View>

            </ScrollView>
        </View>
    );
};

const chartConfig = {
    backgroundColor: '#e26a00',
    backgroundGradientFrom: '#fb8c00',
    backgroundGradientTo: '#ffa726',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: { borderRadius: 16 },
    propsForDots: { r: "6", strokeWidth: "2", stroke: "#ffa726" },
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
    chartContainer: {
        marginTop: 30,
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
        height: 170,
        width: '45%',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    contentCenter: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
    },
    widgetTitle: {
        fontSize: 15,
        fontWeight: '600',
    },
    widgetContent: {
        fontSize: 25,
        fontWeight: '800',
        textAlign: 'center',
    },
});

export default DashHome;

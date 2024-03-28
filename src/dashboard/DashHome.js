import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

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
                            labels: ["January", "February", "March", "April", "May", "June"],
                            datasets: [
                                {
                                    data: [
                                        Math.random() * 100,
                                        Math.random() * 100,
                                        Math.random() * 100,
                                        Math.random() * 100,
                                        Math.random() * 100,
                                        Math.random() * 100
                                    ]
                                }
                            ]
                        }}
                        width={screenWidth * 0.95}
                        height={220}
                        yAxisLabel="€"
                        yAxisSuffix="k"
                        yAxisInterval={1}
                        chartConfig={{
                            backgroundColor: "#e26a00",
                            backgroundGradientFrom: "#ff8e38",
                            backgroundGradientTo: "#ffb771",
                            decimalPlaces: 2,
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            style: {
                                borderRadius: 16
                            },
                            propsForDots: {
                                r: "6",
                                strokeWidth: "2",
                                stroke: "#ffa726"
                            }
                        }}
                        bezier
                        style={styles.chartStyle}
                    />
                </View>
            </ScrollView>
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
});

export default DashHome;

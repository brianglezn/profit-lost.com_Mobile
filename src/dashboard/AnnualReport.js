import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
  },
});

const AnnualReport = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const years = [2021, 2022, 2023, 2024];

  const data = {
    labels: ['Feb', 'Apr', 'Jun', 'Aug', 'Oct', 'Dec'],
    datasets: [
      {
        data: [2400, 2200, 2100, 2000, 1900, 2000],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        strokeWidth: 2
      },
      {
        data: [1800, 1700, 1600, 2000, 1400, 1300],
        color: (opacity = 1) => `rgba(244, 73, 65, ${opacity})`,
        strokeWidth: 2
      }
    ],
    legend: ["Income", "Expenses"]
  };

  const totalIncome = data.datasets[0].data.reduce((a, b) => a + b, 0);
  const totalExpenses = data.datasets[1].data.reduce((a, b) => a + b, 0);
  const netIncome = totalIncome - totalExpenses;

  return (
    <View style={styles.container}>
      <RNPickerSelect
        onValueChange={(value) => setSelectedYear(value)}
        items={years.map(year => ({ label: year.toString(), value: year }))}
        style={pickerSelectStyles}
        placeholder={{}}
        value={selectedYear}
      />

      <LineChart
        data={data}
        width={Dimensions.get('window').width - 16}
        height={220}
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726'
          }
        }}
        bezier
        style={styles.chart}
      />

      <View style={styles.totalsContainer}>
        <Text style={styles.totalText}>Ingresos totales: {totalIncome.toFixed(2)} €</Text>
        <Text style={styles.totalText}>Gastos totales: {totalExpenses.toFixed(2)} €</Text>
        <Text style={styles.totalText}>Resultado: {netIncome.toFixed(2)} €</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: '#f7f7f7',
  },
  picker: {
    height: 50,
    width: 100,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16
  },
  totalsContainer: {
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingTop: 25,
  },
  totalText: {
    fontSize: 16,
    paddingBottom: 25,
    textAlign: "center",
  }
});

export default AnnualReport;

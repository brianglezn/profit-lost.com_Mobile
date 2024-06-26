// Register.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Register = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>REGISTER</Text>
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
  title: {
    fontSize: 45,
    fontWeight: 'bold',
    color: '#fe6f14',
    marginBottom: 50,
  },
});

export default Register;

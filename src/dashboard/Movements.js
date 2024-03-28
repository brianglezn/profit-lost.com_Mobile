import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Movements = () => {
  return (
    <View style={styles.container}>
      <Text>Esta es la pantalla de Movements</Text>
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
});

export default Movements;

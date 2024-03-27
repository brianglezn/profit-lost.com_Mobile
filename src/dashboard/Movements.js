import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Movements = () => {
  return (
    <View style={styles.container}>
      <Text>Movements</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

export default Movements;

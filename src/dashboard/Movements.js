import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Movements = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        navigation.navigate('Login');
      } else {
        setIsLoading(false);
      }
    };

    checkAuthentication();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

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

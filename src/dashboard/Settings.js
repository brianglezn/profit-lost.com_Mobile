import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const Settings = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      <Text style={styles.header}>Ajustes</Text>
      <View style={styles.containerOptions}>
        <View style={styles.settingItem}>
          <Icon name="brightness-4" size={24} color="#fe6f14" />
          <Text style={styles.settingText}>Dark Mode</Text>
          <Switch value={false} onValueChange={() => { }} />
        </View>

        <View style={styles.settingItem}>
          <Icon name="notifications" size={24} color="#fe6f14" />
          <Text style={styles.settingText}>Notifications</Text>
          <Switch value={true} onValueChange={() => { }} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    paddingTop: 60,
  },
  backButton: {
    marginLeft: 20,
    marginTop: 10,
  },
  header: {
    paddingLeft: 15,
    fontSize: 22,
    marginVertical: 20,
    fontWeight: 'bold',
  },
  containerOptions: {
    marginVertical: 10,
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 15,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  settingText: {
    flex: 1,
    marginLeft: 15,
    fontSize: 18,
  },
});

export default Settings;

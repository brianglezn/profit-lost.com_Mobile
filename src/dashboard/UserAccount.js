import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { useAuth } from '../context/AuthContext';

const UserAccount = () => {
  const [user, setUser] = useState(null);

  const navigation = useNavigation();
  const { setIsLoggedIn } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem('token');
      try {
        const response = await fetch('https://profit-lost-backend.onrender.com/user/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    setIsLoggedIn(false);
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="close" size={24} color="#000" />
      </TouchableOpacity>

        {user && (
          <View style={styles.profileSection}>
            <View style={styles.profileImage}>
              <Text style={styles.profileImageText}>{user.name ? user.name[0] : ''}</Text>
            </View>
            <Text style={styles.userName}>{`${user.name} ${user.surname}`}</Text>
          </View>
        )}

        <View style={styles.menuSection}>
          <MenuItem icon="help-outline" title="Help" />
          <MenuItem icon="account-circle" title="Account" />
          <MenuItem icon="lock-outline" title="Security and Privacy" />
        </View>

        <View style={styles.menuSection}>
          <MenuItem icon="info-outline" title="About Us" />
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Icon name="exit-to-app" size={24} color="#fe6f14" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
};

const MenuItem = ({ icon, title }) => (
  <TouchableOpacity style={styles.menuItem}>
    <Icon name={icon} size={24} color="#000" />
    <Text style={styles.menuItemText}>{title}</Text>
  </TouchableOpacity>
);

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
  profileSection: {
    alignItems: 'center',
    margin: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fe6f14',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImageText: {
    fontSize: 36,
    color: '#fff',
  },
  userName: {
    fontSize: 20,
    marginTop: 10,
  },
  menuSection: {
    marginVertical: 10,
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 15,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  menuItemText: {
    fontSize: 16,
    marginLeft: 15,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  logoutText: {
    fontSize: 16,
    color: '#fe6f14',
    marginLeft: 15,
  },
});

export default UserAccount;

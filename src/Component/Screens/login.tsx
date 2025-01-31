import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ToastAndroid,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useLogin} from '../../api/Auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigation = useNavigation();
  const {mutate: login, isSuccess, data, error} = useLogin();

  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const token = AsyncStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
    if (isAuthenticated) {
      navigation.navigate('BottomTabs');
    }
  }, [isAuthenticated]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!email.trim() || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = 'Invalid email address';
    if (!password.trim() || password.length < 5)
      newErrors.password = 'Password must be at least 5 characters long';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      ToastAndroid.show('Please fix the errors', ToastAndroid.SHORT);
      return;
    }
    try {
      login({email: email, password: password});
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isSuccess && data) {
      AsyncStorage.setItem('userid', data?.user?.id);
      AsyncStorage.setItem('role', data?.user?.tags?.name);

      ToastAndroid.show('Login Successful', ToastAndroid.SHORT);
      navigation.navigate('BottomTabs');
    }
    if (error) {
      ToastAndroid.show('Login failed: ' + error.message, ToastAndroid.SHORT);
    }
  }, [isSuccess, data, error]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>

      {/* Username Input */}
      <View style={styles.inputContainer}>
        <Icon name="person" size={20} color="#FDC300" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setUsername}
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#FDC300" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Login</Text>
        <View style={styles.arrowButton}>
          <Icon name="arrow-forward" size={20} color="#fff" />
        </View>
      </TouchableOpacity>

      {/* Sign Up Link */}
      <Text style={styles.signupText}>
        Don't have an account?{' '}
        <Text
          style={styles.signupLink}
          onPress={() => navigation.navigate('SignUp')}>
          Sign up
        </Text>
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 30,
    textAlign: 'left',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    marginTop: 20,
  },
  loginText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  arrowButton: {
    backgroundColor: '#FDC300',
    borderRadius: 50,
    padding: 10,
  },
  signupText: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    marginTop: 20,
  },
  signupLink: {
    color: '#FDC300',
    fontWeight: 'bold',
  },
});

export default Login;

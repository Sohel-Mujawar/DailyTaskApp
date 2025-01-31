import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSignup} from '../../api/Auth';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigation = useNavigation();
  const [errors, setErrors] = useState({});
  const {mutate: signup, isSuccess, isPending} = useSignup();

  const handleInputChange = (key: string, value: string) => {
    setFormData(prevData => ({...prevData, [key]: value}));
    if (errors[key]) {
      setErrors(prevErrors => ({...prevErrors, [key]: ''}));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (formData.email && !formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = 'Invalid email address';
    if (!formData.password.trim()) newErrors.password = 'Password is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      ToastAndroid.show('Please fix the errors', ToastAndroid.SHORT);
      return;
    }
    signup({
      email: formData.email || 'example@gmail.com',
      name: formData.name || 'John Doe',
      password: formData.password || 'password',
    });
  };

  useEffect(() => {
    if (isSuccess) {
      ToastAndroid.show('User registered successfully', ToastAndroid.SHORT);
      navigation.navigate('Login');
    }
  }, [isSuccess]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Icon name="mail" size={20} color="#FDC300" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email address"
          value={formData.email}
          onChangeText={value => handleInputChange('email', value)}
          keyboardType="email-address"
        />
      </View>

      {/* Name Input */}
      <View style={styles.inputContainer}>
        <Icon name="person" size={20} color="#FDC300" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="User Name"
          value={formData.name}
          onChangeText={value => handleInputChange('name', value)}
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#FDC300" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value={formData.password}
          onChangeText={value => handleInputChange('password', value)}
        />
      </View>

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.signupButton} onPress={handleSubmit}>
        <Text style={styles.signupText}>Sign up</Text>
        <View style={styles.arrowButton}>
          <Icon name="arrow-forward" size={20} color="#fff" />
        </View>
      </TouchableOpacity>

      {/* Social Media Buttons */}
      <View style={styles.socialContainer}>
        {/* <TouchableOpacity>
          <Image
            source={require('../../assets/google.png')}
            style={styles.socialIcon}
          />
        </TouchableOpacity> */}
        {/* <TouchableOpacity>
          <Image
            source={require('../../assets/facebook.png')}
            style={styles.socialIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require('../../assets/apple.png')}
            style={styles.socialIcon}
          />
        </TouchableOpacity> */}
      </View>

      {/* Sign In Link */}
      <Text style={styles.signInText}>
        Already have an account?{' '}
        <Text
          style={styles.signInLink}
          onPress={() => navigation.navigate('Login')}>
          sign in
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
  signupButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    marginTop: 20,
  },
  signupText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  arrowButton: {
    backgroundColor: '#FDC300',
    borderRadius: 50,
    padding: 10,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  socialIcon: {
    width: 40,
    height: 40,
    marginHorizontal: 10,
  },
  signInText: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    marginTop: 20,
  },
  signInLink: {
    color: '#FDC300',
    fontWeight: 'bold',
  },
});

export default SignUp;

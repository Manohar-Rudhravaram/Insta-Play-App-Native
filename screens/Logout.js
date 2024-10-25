import { Alert, Button, StyleSheet, View } from 'react-native';
import React from 'react';

const Logout = ({ navigation }) => {
  function logoutHandler() {
    return (
      Alert.alert('Do You Want to Logout', '', [
        {
          text: 'Go Back',
          onPress: () => navigation.navigate('Home'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => navigation.navigate('SignIn') },
      ])
    );
  }
  return (
    <View style={Styles.container}>
      <Button title="Logout" onPress={logoutHandler} />
    </View>
  );
};

export default Logout;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'plum',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

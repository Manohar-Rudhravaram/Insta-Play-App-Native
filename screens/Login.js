/* eslint-disable react-native/no-inline-styles */
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, TouchableOpacity, ActivityIndicator, Pressable, StatusBar } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { themeContext } from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Login({ navigation }) {
    const [username, setusername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [Error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { theme, toggleHandler } = useContext(themeContext);
    useEffect(() => {
        async function getToken() {
            try {
                let response = await fetch('https://api.themoviedb.org/3/authentication/token/new?api_key=019085ae8fd360fcd800ae1d44592de2');
                let data = await response.json();
                if (data.success) {
                    setToken(data.request_token);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getToken();
    }, []);

    function validate() {
        let error = {};
        if (!username) {
            error.username = 'Username is required';
        } else if (username.length < 3) {
            error.username = 'Username must be 3 characters long';
        }
        if (!password) {
            error.password = 'Password is required';
        } else if (password.length < 3) {
            error.password = 'Password must be 3 characters long';
        }
        setError(error);
        return Object.keys(error).length === 0;
    }
    async function loginHandler() {
        try {
            if (validate()) {
                setLoading(true);
                const response = await fetch('https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=019085ae8fd360fcd800ae1d44592de2', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        username: username,
                        password: password,
                        request_token: token,
                    }),
                });
                const data = await response.json();
                if (data.success) {
                    setLoading(false);
                    setusername('');
                    setPassword('');
                    navigation.navigate('Main');
                }
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }
    function handleIcon() {
        toggleHandler();
    }
    return (
        <View style={[styles.container, { backgroundColor: theme === 'dark' ? '#0c111b' : '#FFF' }]}>
            <Pressable onPress={handleIcon} style={styles.btn}>
                {
                    theme === 'dark' ?
                        <Icon name="sun-o" size={30} color={'white'} />
                        :
                        <Icon name="moon-o" size={30} color={'black'} />
                }
            </Pressable>
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <View style={styles.formContainer}>
                    <Text style={[styles.text, { color: theme === 'dark' ? 'white' : 'black' }]}>Sign In</Text>
                    <Text style={styles.subtext}>Sign into your self service portal</Text>
                    <View style={styles.form}>
                        <TextInput
                            style={[styles.fields, { color: theme === 'dark' ? '#FFF' : 'black' }]}
                            placeholder="Enter username"
                            placeholderTextColor={theme === 'dark' ? '#FFF' : 'black'}
                            value={username}
                            onChangeText={setusername}
                        />
                        {
                            Error.username && <Text style={styles.error}>{Error.username}</Text>
                        }
                        <TextInput
                            style={[styles.fields, { color: theme === 'dark' ? '#FFF' : 'black' }]}
                            placeholder="Enter password"
                            placeholderTextColor={theme === 'dark' ? '#FFF' : 'black'}
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />
                        {
                            Error.password && <Text style={styles.error}>{Error.password}</Text>
                        }
                        <TouchableOpacity
                            style={styles.button}
                            onPress={loginHandler}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator size="small" color="#fff" />
                            ) : (
                                <Text style={styles.texts}>Log In</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
    },
    formContainer: {
        gap: 10,
    },
    text: {
        fontSize: 25,
        marginHorizontal: 10,
    },
    subtext: {
        fontSize: 20,
        color: '#546e7a',
        marginHorizontal: 10,
    },
    form: {
        padding: 20,
        width: 350,
        borderRadius: 20,
        justifyContent: 'space-evenly',
        gap: 15,
    },
    fields: {
        borderWidth: 1,
        padding: 10,
        height: 60,
        borderRadius: 10,
        borderColor: '#164AB2',
        fontSize: 20,
    },
    error: {
        fontSize: 15,
        color: 'red',
    },
    button: {
        backgroundColor: '#ff7d65',
        padding: 10,
        borderRadius: 20,
        alignItems: 'center',
    },
    texts: {
        color: '#fff',
        fontSize: 16,
    },
    btn: {
        position: 'relative',
        left: 150,
        marginTop: StatusBar.currentHeight,
        zIndex: 1,
    },
});

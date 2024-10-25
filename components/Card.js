import { View, Text, Image, Pressable } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Stars from '../stars';
import Styles from '../styles/CardStyles';
import { useNavigation } from '@react-navigation/native';

export default function Card({ item }) {
    const navigation = useNavigation();
    return (
        <View style={Styles.movieContainer}>
            <Image source={item.backdrop_path ? { uri: `https://image.tmdb.org/t/p/original/${item.backdrop_path}` } : require('../assets/moviealt.png')} style={Styles.movieposter} resizeMode="cover" />
            <LinearGradient colors={['#1a2b4a', '#2b507c']} style={Styles.moviefooter}>
                <View style={Styles.titlecontainer}>
                    <Text style={Styles.movieTitle}>{item.title.length > 26 ? item.title.slice(0, 26) + '...' : item.title}</Text>
                    <Stars rating={item.vote_average} />
                </View>
                <Pressable onPress={() => { navigation.navigate('Details', { id: item.id }); }}>
                    <Image source={require('../assets/play.png')} resizeMode="contain" style={Styles.play} />
                </Pressable>
            </LinearGradient>
        </View>
    );
}

import { View, Text, ActivityIndicator, StyleSheet, Image, Pressable, Linking } from 'react-native';
import React, { useEffect, useState } from 'react';

export default function Details({ route }) {
    const { id } = route.params;
    const [loader, setLoader] = useState(false);
    const [movie, setMovie] = useState({});
    const [video, setVideo] = useState('');

    useEffect(() => {
        async function getData() {
            try {
                setLoader(true);
                const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=d0605f7c77a7e9ffd22f6f77c12e0f8f&language=en-US`);
                const data = await response.json();
                setMovie(data);
                setLoader(false);
            } catch (error) {
                console.log(error);
                setLoader(false);
            }
        }
        getData();
    }, [id]);
    useEffect(() => {
        async function getMovieTrailer() {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=d0605f7c77a7e9ffd22f6f77c12e0f8f&language=en-US`).then(res => res.json());
            if (response) {
                setVideo(response.results[0].key);
            }
        }
        if (movie.id) {
            getMovieTrailer();
        }
    }, [movie, id]);
    const handlePress = () => {
        Linking.openURL(`https://www.youtube.com/embed/${video}?autoplay=1&mute=1`);
    };
    return (
        <View style={Styles.container}>
            {
                loader ? <ActivityIndicator size={'large'} color={'white'} /> :
                    <View style={Styles.movieDetails}>
                        <Image source={movie.backdrop_path ? { uri: `https://image.tmdb.org/t/p/original/${movie.backdrop_path}` } : require('../assets/moviealt.png')} style={Styles.movieposter} resizeMode="cover" />
                        <Pressable onPress={handlePress}>
                            <Image source={require('../assets/play.png')} resizeMode="contain" style={Styles.play} />
                        </Pressable>
                        <View>
                            <Text style={Styles.title}>{movie.title}</Text>
                            <Text style={Styles.rating}>Rating : {movie.vote_average}</Text>
                            <Text style={Styles.description}>{movie.overview}</Text>
                            <View>
                                <View style={Styles.flex}>
                                    <Text style={Styles.text}>Release Date</Text>
                                    <Text style={Styles.text}>{movie.release_date}</Text>
                                </View>
                                <View style={Styles.flex}>
                                    <Text style={Styles.text}>Original Languages</Text>
                                    {
                                        movie?.spoken_languages?.map((lang, i) => {
                                            return <Text key={i} style={Styles.text}>{lang.english_name}</Text>;
                                        })
                                    }
                                </View>
                                <View style={Styles.flex}>
                                    <Text style={Styles.text}>Budget</Text>
                                    <Text style={Styles.text}>{movie.budget}</Text></View>
                            </View>
                        </View>
                    </View>
            }
        </View >
    );
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0c111b',
        justifyContent: 'center',
        alignItems: 'center',
    },
    movieposter: {
        height: 200,
    },
    movieDetails: {
        flex: 1,
        backgroundColor: '#0c111b',
        width: '100%',
    },
    title: {
        color: '#fff',
        fontSize: 25,
        marginHorizontal: 15,
        marginVertical: 25,
    },
    rating: {
        color: '#FFF',
        marginHorizontal: 15,
        fontSize: 20,
    },
    description: {
        color: 'white',
        fontSize: 20,
        marginLeft: 15,
        marginVertical: 20,
        fontWeight: '400',
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
    flex: {
        flexDirection: 'row',
        gap: 20,
        marginHorizontal: 15,
        marginVertical: 15,
    },
    play: {
        backgroundColor: '#fff',
        borderRadius: 100,
        width: 38,
        height: 38,
        position: 'absolute',
        top: -120,
        left: 190,
    },
});




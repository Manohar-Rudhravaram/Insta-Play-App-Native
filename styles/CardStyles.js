import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
    movieContainer: {
        marginBottom: 20,
        marginHorizontal: 8,
        borderRadius: 5,
        overflow: 'hidden',
    },
    movieTitle: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: '400',
    },
    moviefooter: {
        height: 80,
        backgroundColor: '#2b507c',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    play: {
        backgroundColor: '#fff',
        borderRadius: 100,
        width: 38,
        height: 38,
    },
    titlecontainer: {
        width: '60%',
    },
    movieposter: {
        height: 200,
    },
});

export default Styles;

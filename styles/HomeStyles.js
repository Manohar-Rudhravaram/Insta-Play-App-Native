import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
    header: {
        height: 70,
        backgroundColor: '#263f61',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchInput: {
        borderWidth: 1,
        borderColor: 'rgba(225, 225, 225, .26)',
        width: '86%',
        borderRadius: 6,
        height: 50,
        fontSize: 20,
        paddingHorizontal: 15,
        color: 'white',
    },
    searchBtn: {
        height: 50,
        borderTopRightRadius: 6,
        borderBottomRightRadius: 6,
    },
    banner: {
        height: 150,
        width: '100%',
    },
    list: {
        padding: 10,
    },
    text: {
        fontSize: 25,
        backgroundColor: '#0c111b',
        color: '#FFF',
        paddingHorizontal: 25,
        paddingVertical: 8,
        fontWeight: '500',
        fontStyle: 'normal',
    },
    renderContainer: {
        flex: 1,
        backgroundColor: '#0c111b',
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginVertical: 5,
    },
    btn: {
        paddingVertical: 2,
        paddingHorizontal: 5,
    },
    btnText: {
        color: 'white',
        fontSize: 20,
    },
    footer: {
        padding: 10,
        alignItems: 'center',
    },
});


export default Styles;

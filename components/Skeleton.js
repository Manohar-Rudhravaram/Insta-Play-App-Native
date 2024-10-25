import { View, StyleSheet } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

export default function Skeleton() {
    return (
        <>
            {
                Array.from({ length: 4 }).map((_, i) => {
                    return <View style={Styles.movieContainer} key={i}>
                        <ShimmerPlaceholder style={Styles.movieposter} />
                        <View style={Styles.moviefooter}>
                            <View style={Styles.titlecontainer}>
                                <ShimmerPlaceholder width={150} height={20} style={{ borderRadius: 4 }} />
                                <ShimmerPlaceholder width={100} height={20} style={{ marginTop: 10, borderRadius: 4 }} />
                            </View>
                            <ShimmerPlaceholder style={Styles.play} />
                        </View>
                    </View>;
                })
            }
        </>
    );
}

const Styles = StyleSheet.create({
    movieContainer: {
        marginBottom: 20,
        marginHorizontal: 8,
        borderRadius: 5,
        overflow: 'hidden',
        flex: 1,
        backgroundColor: 'white',
    },
    movieTitle: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: '400',
    },
    moviefooter: {
        height: 80,
        backgroundColor: '#9e9e9e',
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
        width: '100%',
        height: 200,
    },
});

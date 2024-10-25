import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const Stars = ({ rating }) => {
    const [halfStar, setHalfStar] = useState(true);
    const vote = rating / 2;
    const rate = vote.toFixed(1);
    const roundRating = Math.floor(rate);
    const splitNumber = Math.floor((rate - roundRating) * 10);

    useEffect(() => {
        if (splitNumber === 0) {
            setHalfStar(false);
        } else {
            setHalfStar(true);
        }
    }, [splitNumber]);
    return (
        <View style={styles.container}>
            {Array.from({ length: roundRating })
                ?.map((_, index) => {
                    return <Icon name="star" size={22} color="yellow" key={index} />;
                })}
            {halfStar && <Icon name="star-half-empty" size={22} color="yellow" />}
        </View>
    );
};

export default Stars;


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 2,
    },
});

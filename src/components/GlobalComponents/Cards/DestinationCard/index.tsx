import React, { FC } from 'react';
import {StyleSheet, ImageBackground, Text, Alert, View} from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import {hp, wp} from 'utils/responsive';
import {TypeApartment} from 'types/Rooms/RoomResponses';
import TouchableWithScale from 'components/GlobalComponents/TouchableComponent/TouchableWithScale';
import {Divider} from 'react-native-elements';

interface IProps {
  item: TypeApartment,
}

const DestinationCard: FC<IProps> = (props) => {
  const { item } = props;

  const handleClick = () => {
    Alert.alert('OK','clicked')
  };
  // console.log(item);
  return (
    <TouchableWithScale
      _onPress={handleClick}
    >
      <ImageBackground
        style={styles.image}
        imageStyle={{ borderRadius: 5 }}
        resizeMode="cover"
        source={{ uri: item.image }}
      >
        <LinearGradient
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          colors={['rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.1)']}
          style={styles.linear}
        >
          <View style={styles.boxInfo}>
            <Text style={styles.name}>{item.value}</Text>
            <Divider style={styles.divider}/>
            <Text style={styles.price}>17$ /night</Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableWithScale>
  );
};

const styles = StyleSheet.create({
  linear: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },
  image: {
    position: 'relative',
    height: hp('30%'),
    width: wp('88%'),
    overflow:'hidden',
    borderRadius: 6
  },
  name: {
    fontSize: wp('6%'),
    fontWeight: '700',
    color: 'white'
  },
  price:{
    fontSize: wp('5%'),
    fontWeight: '500',
    color: 'white'
  },
  divider:{
    height: 2,
    backgroundColor:'white',
    width: wp('10%'),
    borderRadius: 8,
    marginVertical: hp('1%')
  },
  boxInfo:{
    width: wp('90%'),
    height:hp('15%'),
    position: 'absolute',
    bottom: 0,
    left: 0,
    padding: wp('4%'),
    justifyContent: 'flex-end',
  }
});

export default DestinationCard;

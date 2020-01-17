import TouchableWithScale from 'components/GlobalComponents/TouchableComponent/TouchableWithScale';
import React, { FC } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native';
import { Image, Rating } from 'react-native-elements';
import { COLOR_TITLE_HEADER, SEMI_BOLD, SIZE_TEXT_CONTENT, SIZE_TEXT_TITLE_MEDIUM } from 'styles/global.style';
import {TypeApartment, RoomIndexRes} from 'types/Rooms/RoomResponses';
import { hp, wp } from 'utils/responsive';
import {IMAGE_STORAGE_XS} from 'types/globalTypes';

interface IProps {
  item: RoomIndexRes
}

const ValuableCard: FC<IProps> = (props) => {
  const { item } = props;

  const handleClick = () => {
    Alert.alert('click', 'ban da click')
  };

  return (
    <TouchableWithScale
      style={styles.container}
      _onPress={handleClick}
    >
      <Image
        borderRadius={8}
        source={{ uri: `${IMAGE_STORAGE_XS + item.avatar_image}` }}
        style={styles.image}
        resizeMode="cover"
        progressiveRenderingEnabled
        PlaceholderContent={<ActivityIndicator />}
      />
      <View style={styles.boxInfo}>
        <View style={{ flex: 1 }}>
          <Text numberOfLines={1} style={styles.txtRoomName}>
            Ten cua ngoi nha co the rat la dai
          </Text>
          <Text numberOfLines={1} style={styles.txtAddress}>
            Hoang Mai district
            <Text style={{ fontWeight: '700' }}> &#8231; </Text>
            Ha noi
          </Text>
        </View>
        <View style={styles.boxPrice}>
          <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: "flex-start" }}>
            <Rating
              ratingCount={5}
              startingValue={4}
              imageSize={wp('3.5%')}
              readonly
              ratingColor='#41C9BC'
              ratingBackgroundColor={COLOR_TITLE_HEADER}
            />
          </View>
          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <Text style={{ textAlign: 'right', fontSize: SIZE_TEXT_CONTENT }}>$392</Text>
            <Text style={{ textAlign: 'right', fontSize: SIZE_TEXT_CONTENT }}>/month</Text>
          </View>
        </View>
      </View>
    </TouchableWithScale>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 2,
    backgroundColor: '#fff',
    width: wp('89%'),
    height: 110,
    marginBottom: hp('4%'),
    flexDirection: 'row',
    borderRadius: 8,
    overflow: 'hidden'
  },
  image: {
    width: wp('35%'),
    // height: 'auto'
  },
  boxInfo: {
    flex: 1,
    width: wp('55%'),
    paddingVertical: wp('1%'),
    paddingHorizontal: wp('2%'),
    // paddingHorizontal: wp('1%'),
    backgroundColor: '#fff',
    justifyContent: 'space-between'
  },
  txtRoomName: {
    fontWeight: SEMI_BOLD,
    fontSize: SIZE_TEXT_TITLE_MEDIUM
  },
  txtAddress: {
    // fontSize: wp('3%'),
    fontSize: 12,
    paddingTop: hp('0.5%')
  },
  boxPrice: {
    // paddingTop: hp('0.5%'),
    // marginTop: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

export default ValuableCard;

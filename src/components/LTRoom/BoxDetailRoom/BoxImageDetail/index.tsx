import React, { FC, useState, useMemo, useEffect } from 'react';
import { StyleSheet, View, Modal, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { Text } from 'react-native-elements';
// @ts-ignore
import ImageViewer from 'react-native-image-zoom-viewer';
import _ from 'lodash';
import { hp, wp } from 'utils/responsive';
import { COLOR_TEXT_DEFAULT } from 'styles/global.style';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import LeftSpacePaddingHorizontalScroll from 'components/GlobalComponents/LeftSpacePaddingHorizontalScroll';
import { IMAGE_STORAGE_LG } from 'types/globalTypes';
import { useSelector } from 'react-redux';
import { ReducersList } from 'store/redux/reducers';
interface IProps {
  initialProps?: any;
}

const BoxImageDetail: FC<IProps> = (props) => {
  const [isImageViewVisible, setIsImageViewVisible] = useState(false);
  const [indexImage, setIndexImage] = useState<number>(0);
  const [mediaToTal, setMediaToTal] = useState<any>([]);
  const listing = useSelector<ReducersList, any>((state) => state.ltRoomDetails.room);
  useEffect(() => {
    let arrayImg: any = [];
    if (listing.avatar.images.length) {
      arrayImg.push(...listing.avatar.images);
    }
    if (listing.cover_photo.images.length) {
      arrayImg.push(...listing.cover_photo.images);
    }
    if (listing.bedrooms.number_bedroom) {
      {
        _.times(listing.bedrooms.number_bedroom, (i) =>
          arrayImg.push(...listing.bedrooms[`bedroom_${i + 1}`].images),
        );
      }
    }
    if (listing.bathrooms.total_image) {
      {
        _.times(listing.bathrooms.number_bathroom, (i) =>
          arrayImg.push(...listing.bathrooms[`bathroom_${i + 1}`].images),
        );
      }
    }
    if (listing.outdoors.images.length) {
      arrayImg.push(...listing.outdoors.images);
    }
    if (listing.furnitures.images.length) {
      arrayImg.push(...listing.furnitures.images);
    }
    if (listing.kitchens.images.length) {
      arrayImg.push(...listing.kitchens.images);
    }
    if (listing.livingrooms.images.length) {
      arrayImg.push(...listing.livingrooms.images);
    }
    let images = arrayImg
      ? _.map(arrayImg, (o, i) => {
          return {
            url: `${IMAGE_STORAGE_LG + arrayImg[i].name}`,
            width: wp('100%'),
            height: hp('50%'),
          };
        })
      : [];
    setMediaToTal(images);
  }, []);
  const _renderItem = (item: any, index: number) => {
    return (
      <View style={{ paddingHorizontal: wp('1.2%') }} key={index}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setIsImageViewVisible(true);
            setIndexImage(index);
          }}>
          <Image
            borderRadius={8}
            style={styles.image}
            source={{ uri: item.url }}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>
    );
  };

  const footer = () => {
    return (
      <View
        style={{
          width: wp('100%'),
          justifyContent: 'center',
          marginBottom: hp('5%'),
          alignItems: 'center',
        }}>
        <EvilIcons onPress={closeModal} name="close-o" color="#ffffff" size={40} />
      </View>
    );
  };
  const closeModal = () => {
    setIsImageViewVisible(false);
    setIndexImage(0);
  };
  return (
    <View style={styles.boxImage}>
      <View style={styles.boxTitle}>
        <Text style={styles.txtTitle}>Take a tour</Text>
        <Text style={styles.explore} onPress={() => setIsImageViewVisible(true)}>
           +{mediaToTal.length -5} Photos
        </Text>
      </View>
      <View style={[styles.pdLeft, { marginTop: hp('1%'), marginLeft: -wp('5%') }]}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={mediaToTal.slice(0, 5)}
          ListHeaderComponent={<LeftSpacePaddingHorizontalScroll width={wp('5%')} />}
          horizontal
          renderItem={({ item, index }) => _renderItem(item, index)}
          extraData={mediaToTal.slice(0, 5)}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      {useMemo(
        () => (
          <Modal visible={isImageViewVisible} transparent={true}>
            <ImageViewer
              imageUrls={mediaToTal}
              index={indexImage}
              enableSwipeDown={true}
              onSwipeDown={closeModal}
              onCancel={closeModal}
              renderFooter={footer}
            />
          </Modal>
        ),
        [indexImage, isImageViewVisible],
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  boxImage: {
    backgroundColor: 'transparent',
  },
  boxTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  slider: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgAvatar: {
    width: '100%',
    height: '100%',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  featureImage: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    top: hp('2%'),
    width: wp('100%'),
    height: hp('8%'),
  },
  btnBack: {
    flex: 1,
    paddingLeft: 16,
    paddingTop: 10,
  },
  bgIcon: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    top: 0,
    right: 0,
  },
  boxBtn: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    bottom: hp('2%'),
    width: wp('100%'),
    height: hp('8%'),
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    right: hp('3%'),
  },
  btnMore: {
    backgroundColor: '#fff',
    padding: 6,
  },
  textBtnMore: {
    color: COLOR_TEXT_DEFAULT,
    fontSize: 12,
  },
  txtTitle: {
    fontSize: 24,
    marginBottom: hp('2%'),
    fontWeight: '700',
    color: '#484848'
  },
  pdLeft: {
    marginTop: 38,
  },
  image: {
    height: hp('15%'),
    width: wp('40%'),
    borderRadius: 5,
  },
  explore: {
    fontSize: 14,
    color: 'rgb(84, 211, 194)',
    fontWeight: '700',
  },
});
BoxImageDetail.defaultProps = {};
export default BoxImageDetail;
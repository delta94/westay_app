import React, { FC, useState, useMemo } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  Alert,
  TouchableOpacity,
  StatusBar,
  Modal,
} from 'react-native';
import { hp, wp } from 'utils/responsive';
import Swiper from 'react-native-swiper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { Button, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import { COLOR_TEXT_DEFAULT } from 'styles/global.style';
// @ts-ignore
import ImageView from 'react-native-image-view';
import ImageViewer from 'react-native-image-zoom-viewer';
import _ from 'lodash';
interface IProps {
  initialProps?: any;
}

const BoxImageRoom: FC<IProps> = (props) => {
  const [isImageViewVisible, setIsImageViewVisible] = useState(false);
  const [indexImage, setIndexImage] = useState<number>(0);

  const imgs = [
    {
      url: 'https://s3-ap-southeast-1.amazonaws.com/westay-img/lg/2019_02_27_809de67f37.jpg',
      width: wp('100%'),
      height: hp('50%'),
    },
    {
      url: 'https://s3-ap-southeast-1.amazonaws.com/westay-img/lg/2019_02_27_a77bf56162.jpg',
      width: wp('100%'),
      height: hp('50%'),
    },
    {
      url: 'https://s3-ap-southeast-1.amazonaws.com/westay-img/lg/2019_02_27_7e51a5ff28.jpg',
      width: wp('100%'),
      height: hp('50%'),
    },
  ];

  const media = [
    'https://s3-ap-southeast-1.amazonaws.com/westay-img/lg/2019_02_27_809de67f37.jpg',
    'https://s3-ap-southeast-1.amazonaws.com/westay-img/lg/2019_02_27_a77bf56162.jpg',
    'https://s3-ap-southeast-1.amazonaws.com/westay-img/lg/2019_02_27_7e51a5ff28.jpg',
  ];
  const images = media
    ? _.map(media, (o, i) => {
        return {
          source: {
            uri: `${media[i]}`,
          },
          width: wp('100%'),
          height: hp('100%'),
        };
      })
    : [];

  const footer = () => {
    return (
      <View
        style={{
          width: wp('100%'),
          justifyContent: 'center',
          marginBottom: hp('5%'),
          alignItems: 'center',
        }}>
        <EvilIcons onPress={closeModal} name="close-o" color='#ffffff' size={40} />
      </View>
    );
  };
  const closeModal = () => {
    setIsImageViewVisible(false);
    setIndexImage(0);
  };
  return (
    <View style={styles.boxImage}>
      {useMemo(
        () => (
          <Swiper autoplay showsPagination={false}>
            {media.map((o, i) => (
              <TouchableWithoutFeedback
                key={i}
                onPress={() => {
                  setIsImageViewVisible(true);
                  setIndexImage(i);
                }}>
                <View style={styles.slider}>
                  <Image
                    source={{
                      uri: `${media[i]}`,
                    }}
                    style={styles.imgAvatar}
                    resizeMode="cover"
                  />
                </View>
              </TouchableWithoutFeedback>
            ))}
          </Swiper>
        ),
        [],
      )}
      <View style={styles.featureImage}>
        <View style={styles.btnBack}>
          <TouchableOpacity style={styles.bgIcon} onPress={() => Alert.alert('Quay lại')}>
            <AntDesign name="arrowleft" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      {useMemo(
        () => (
          <View style={styles.boxBtn}>
            <Button
              buttonStyle={styles.btnMore}
              title=""
              icon={<Icon name="maximize" size={15} color={COLOR_TEXT_DEFAULT} />}
              titleStyle={styles.textBtnMore}
              onPress={() => setIsImageViewVisible(true)}
            />
          </View>
        ),
        [],
      )}
      {useMemo(
        () => (
          <Modal visible={isImageViewVisible} transparent={true}>
            <ImageViewer
              imageUrls={imgs}
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
    height: hp('35%'),
    backgroundColor: 'transparent',
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
});
BoxImageRoom.defaultProps = {};
export default BoxImageRoom;
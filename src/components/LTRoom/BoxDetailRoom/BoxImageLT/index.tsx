import React, {FC, useEffect} from 'react';
import {StyleSheet, View, ImageBackground, TouchableOpacity, StatusBar} from 'react-native';
import {wp, hp} from 'utils/responsive';
import BoxIntroRoom from './BoxIntroRoom';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {NavigationInjectedProps, withNavigation} from 'react-navigation';
import {useSelector, useDispatch} from 'react-redux';
import {ReducersList} from 'store/redux/reducers';
import {IMAGE_STORAGE_LG, IMAGE_NOT_FOUND} from 'types/globalTypes';
import {Dispatch} from 'redux';
import {handleShareSocial} from 'utils/mixins';
import {useTranslation} from 'react-i18next';

import {LTRoomReducerAction, getDataLTRoom} from 'store/redux/reducers/LTRoom/RoomDetails';

interface IProps extends NavigationInjectedProps {
}

const BoxImageLT: FC<IProps> = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch<Dispatch<LTRoomReducerAction>>();
  const listing = useSelector<ReducersList, any>((state) => state.ltRoomDetails.room);
  const idRoom = navigation.getParam('idRoom');
  const { t } = useTranslation();


  useEffect(() => {
    getDataLTRoom(idRoom, dispatch);
  }, [idRoom]);

  return (
    <View style={styles.container} collapsable={false}>
      <View style={styles.featureImage}>
        <View style={styles.btnBack}>
          <TouchableOpacity style={styles.bgIcon} onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={styles.bgIcon}>
            <AntDesign name="sharealt" size={24} color="#fff" onPress={()=>handleShareSocial('fb', `https://westay.vn/long-term-room/${idRoom}`, t)}/>
          </TouchableOpacity>
        </View>
      </View>
      <ImageBackground
        source={{
          uri: listing.avatar.images && listing.avatar.images.length
            ? `${IMAGE_STORAGE_LG + listing.avatar.images[0].name}`
            : IMAGE_NOT_FOUND,
        }}
        style={{ width: '100%', height: '100%' }}>
        <BoxIntroRoom />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('100%'),
  },
  featureImage: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    top: StatusBar.currentHeight,
    width: wp('100%'),
    height: hp('8%'),
    zIndex: 1,
    paddingHorizontal: wp('5%'),
  },
  btnBack: {
    flex: 1
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
});
BoxImageLT.defaultProps = {};
export default withNavigation(BoxImageLT);

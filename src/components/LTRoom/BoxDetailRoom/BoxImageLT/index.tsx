import React, {FC, useEffect, Fragment, useMemo, useState} from 'react';
import {StyleSheet, View, ImageBackground, TouchableOpacity, StatusBar, Alert, ActivityIndicator} from 'react-native';
import {wp, hp} from 'utils/responsive';
import BoxIntroRoom from './BoxIntroRoom';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {NavigationInjectedProps, withNavigation} from 'react-navigation';
import {useSelector, useDispatch} from 'react-redux';
import {ReducersList} from 'store/redux/reducers';
import {IMAGE_STORAGE_LG, IMAGE_NOT_FOUND, IMAGE_STORAGE_SM} from 'types/globalTypes';
import {Dispatch} from 'redux';
import {handleShareSocial} from 'utils/mixins';
import {useTranslation} from 'react-i18next';
import {LTRoomReducerAction, getDataLTRoom} from 'store/redux/reducers/LTRoom/RoomDetails';
import {LTRoomIndexRes} from 'types/LTR/LTRoom/LTRoom';
import Loadable from 'react-loadable';

const Loading = Loadable({
  loader: () => import('components/GlobalComponents/LoadingScreen'),
  loading: () => null,
});

interface IProps extends NavigationInjectedProps {
}

const BoxImageLT: FC<IProps> = (props) => {
  const {navigation}          = props;
  const dispatch              = useDispatch<Dispatch<LTRoomReducerAction>>();
  const listing               = useSelector<ReducersList, LTRoomIndexRes | null>((state) => state.ltRoomDetails.room);
  const idRoom                = navigation.getParam('idRoom');
  const {t}                   = useTranslation();
  const [loading, setLoading] = useState(false);

  const getResponse = async () => {
    setLoading(true);

    await getDataLTRoom(idRoom, dispatch).then(() => {
        setLoading(false);
      },
    ).catch(err => {
      setLoading(false);
      Alert.alert("Error", "" + err)
    })
  };

  useEffect(() => {
    getResponse();
  }, [idRoom]);

  return (
    <Fragment>
      {useMemo(
        () => (
          <Loading loading = {loading} />
        ),
        [loading],
      )}
      {useMemo(
        () =>
          listing && (
            <View style = {styles.container} collapsable = {false}>
              <View style = {styles.featureImage}>
                <View style = {styles.btnBack}>
                  <TouchableOpacity style = {styles.bgIcon} onPress = {() => navigation.goBack()}>
                    <AntDesign name = 'arrowleft' size = {24} color = '#fff' />
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity style = {styles.bgIcon}>
                    <AntDesign name = 'sharealt' size = {24} color = '#fff'
                               onPress = {() => handleShareSocial('fb', `https://westay.vn/long-term-room/${idRoom}`, t)} />
                  </TouchableOpacity>
                </View>
              </View>
              <ImageBackground
                source = {{
                  uri: listing.avatar.images && listing.avatar.images.length
                    ? `${IMAGE_STORAGE_SM + listing.avatar.images[0].name}`
                    : IMAGE_NOT_FOUND,
                }}
                style = {{width: '100%', height: '100%'}}
              >
                <BoxIntroRoom />
              </ImageBackground>
            </View>
          ), [listing, idRoom])}
    </Fragment>
  );
};

const styles            = StyleSheet.create({
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
    flex: 1,
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

import React, { FC } from 'react';
import { StyleSheet, View, Alert, Text } from 'react-native';
import ButtonOriginal from 'components/Utils/ButtonOriginal';
import { hp, wp } from 'utils/responsive';
import Icon from 'react-native-vector-icons/FontAwesome';
import EntypoIcon from 'react-native-vector-icons/Entypo';
interface IProps {
  initialProps?: any;
}

const Register: FC<IProps> = (props) => {
  const { initialProps } = props;
  return (
    <View style={styles.textContainerMiddle}>
      <Icon name="home" size={24} color="#555555" />
      <Text style={styles.titleSubText}>Book one of our unique hotel to escape the ordinary</Text>
      <ButtonOriginal
        title="Log in"
        handlePress={() => Alert.alert('thanh cong')}
        customStyle={styles.marginBottom}
      />
      <ButtonOriginal title="Create Acount" handlePress={() => Alert.alert('thanh cong')} />
    </View>
  );
};

const styles = StyleSheet.create({
  textContainerMiddle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  marginBottom: {
    marginBottom: hp('3%'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    height: hp('20%'),
    width: wp('75%'),
    borderRadius: 5,
    marginBottom: hp('7%'),
  },
  titleText: {
    marginBottom: hp('2%'),
    fontSize: wp('7%'),
    fontWeight: '600',
  },
  titleSubText: {
    marginBottom: hp('6%'),
    fontSize: wp('4%'),
    width: wp('60%'),
    textAlign: 'center',
    color: '#8A8A8F',
  },
});
Register.defaultProps = {};
export default Register;
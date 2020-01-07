import React, { FC } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { COLOR_LINEAR_DEFAULT } from './responsive.style';
import { wp, hp } from 'utils/responsive';
interface IProps {
  handlePress?: any;
  width?: any;
  title?: string;
  loading?: boolean;
  customStyle?: any;
}
const ButtonOriginal: FC<IProps> = (props) => {
  const { handlePress, width, title, loading, customStyle } = props;
  return (
    <Button
      loading={loading}
      onPress={handlePress}
      title={title}
      ViewComponent={LinearGradient}
      linearGradientProps={{
        colors: COLOR_LINEAR_DEFAULT,
        start: { x: 0.5, y: 1 },
        end: { x: 1, y: 1 },
      }}
      buttonStyle={[styles.buttonStyle, { width }, customStyle]}
      titleStyle={styles.titleStyle}
      {...props}
    />
  );
};

ButtonOriginal.defaultProps = {
  title: '',
  width: wp('90%'),
  loading: false,
};

const styles = StyleSheet.create({
  buttonStyle: {
    borderRadius: 25,
    backgroundColor: 'transparent',
    height: hp('6%'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  titleStyle: {
    fontSize: wp('4%'),
    color: 'white',
    fontWeight: '500',
  },
});

export default ButtonOriginal;
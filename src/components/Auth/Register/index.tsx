import React, { FC, useContext, useState, useRef } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Keyboard } from 'react-native';
import ButtonOriginal from 'components/Utils/ButtonOriginal';
import { hp, wp, COLOR_BUTTON_DEFAULT } from 'utils/responsive';
import HeaderWithBackTitle from 'components/CustomHeaderNavigation/HeaderWithBackTitle';
import { COLOR_TEXT_DEFAULT } from 'styles/global.style';
import * as Yup from 'yup';
import { Formik, FormikHelpers } from 'formik';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { axios, TOKEN } from 'utils/api';
import Toast from 'react-native-root-toast';
import storage from 'utils/storage';
import { AuthContext, getProfile } from 'store/context/auth';
import { Input } from 'react-native-elements';
import { inputContainerStyleGlobal } from 'utils/mixins';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {useTranslation} from 'react-i18next';

/**
 * @author DucNhatDMJ<phamducnhat1977@gmail.com>
 */

interface IProps extends NavigationInjectedProps {
  initialProps?: any;
}
interface RegisterValues {
  email: string;
  password: string;
  passwordConfirm: string;
}

const Register: FC<IProps> = (props) => {
  const emailRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);
  const rePasswordRef = useRef<any>(null);
  const { navigation } = props;
  const { dispatch, state } = useContext(AuthContext);
  const { languageStatus } = state;
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const FormValidationSchema = Yup.object().shape({
    email: Yup.string()
      .required(t('auth:login:emailRequired'))
      .email(t('auth:login:invalidEmail'))
      .min(6, t('auth:login:min6Character'))
      .max(255, t('auth:login:max255Character')),
    password: Yup.string()
      .required(t('auth:login:passwordRequired'))
      .min(6, t('auth:login:min6Character'))
      .max(255, t('auth:login:max255Character')),
    passwordConfirm: Yup.string()
      .required(t('auth:register:passwordConf'))
      .min(6, t('auth:register:min6Character'))
      .max(255, t('auth:register:max255Character'))
      .oneOf([Yup.ref('password')], t('auth:register:invalidPassConf')),
  });
  const handleClickSubmit = async (
    values: RegisterValues,
    actions: FormikHelpers<RegisterValues>,
  ) => {
    Keyboard.dismiss();
    const body = {
      email: values.email,
      password: values.password,
      password_confirmation: values.passwordConfirm,
      type: 0,
    };
    setLoading(true);

    await axios
      .post('register', body, {
        headers: { 'Accept-Language': languageStatus },
      })
      .then(async (res) => {
        const data = res.data;
        setLoading(false);
        storage.save({
          key: TOKEN,
          data: data.access_token,
          expires: data.expires_in,
        });
        Toast.show(t('auth:register:signUpSuccess'), {
          duration: Toast.durations.LONG,
          position: -60,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        });
        dispatch({ type: 'SET_TOKEN', payload: `Bearer ${data.access_token}` });
        getProfile(data.access_token, dispatch, languageStatus);
        navigation.navigate('Home');
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.data.data.errors.email) {
          Toast.show(err.response.data.data.errors.email[0], {
            duration: Toast.durations.LONG,
            position: -60,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
          });
        }
      });
  };
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        passwordConfirm: '',
      }}
      onSubmit={handleClickSubmit}
      validationSchema={FormValidationSchema}
      validateOnChange={false}>
      {({ handleChange, values, handleBlur, handleSubmit, errors }) => {
        return (
          <SafeAreaView style={styles.container}>
            <KeyboardAwareScrollView
              style={styles.scrollView}
              enableOnAndroid
              extraHeight={50}
              showsVerticalScrollIndicator={false}>
                <HeaderWithBackTitle handlePress={() => navigation.goBack()} />
                <Text style={styles.titleText}>{t('auth:register:name')}</Text>
              <View style={styles.boxWrapper} collapsable={false}>
                <Input
                  ref={emailRef}
                  placeholder={t('auth:login:labelEmail')}
                  keyboardType="email-address"
                  returnKeyType="next"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  errorMessage={errors.email}
                  onSubmitEditing={() => passwordRef.current.focus()}
                  autoCorrect={false}
                  inputContainerStyle={styles.inputContainerStyle}
                  containerStyle={styles.containerStyle}
                  errorStyle={{ color: 'red' }}
                />
                <Input
                  ref={passwordRef}
                  placeholder={t('auth:register:password')}
                  keyboardType="default"
                  returnKeyType="next"
                  secureTextEntry={true}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  errorMessage={errors.password}
                  onSubmitEditing={() => rePasswordRef.current.focus()}
                  errorStyle={{ color: 'red' }}
                  inputContainerStyle={styles.inputContainerStyle}
                  containerStyle={styles.containerStyle}
                />
                <Input
                  ref={rePasswordRef}
                  placeholder={t('auth:register:passwordConf')}
                  keyboardType="default"
                  returnKeyType="done"
                  secureTextEntry={true}
                  value={values.passwordConfirm}
                  onChangeText={handleChange('passwordConfirm')}
                  onBlur={handleBlur('passwordConfirm')}
                  errorMessage={errors.passwordConfirm}
                  errorStyle={{ color: 'red' }}
                  inputContainerStyle={styles.inputContainerStyle}
                  containerStyle={styles.containerStyle}
                />
                <ButtonOriginal
                  title={t('auth:register:name')}
                  customStyle={styles.signup}
                  handlePress={handleSubmit}
                  loading={loading}
                />
                <View style={styles.policy}>
                  <Text style={styles.text}>{t('auth:register:bySigningUp')}</Text>
                  <Text
                    style={styles.termConditions}
                    onPress={() => navigation.navigate('TermsAndConditions')}>
                    {t('account:settings:termsAndConditions')}
                    <Text style={styles.text}> {t('auth:register:forWestay')}</Text>
                  </Text>
                </View>
                <View style={styles.action}>
                  <Text style={styles.titleSubText} onPress={() => navigation.navigate('Login')}>
                    <Text>{t('auth:register:haveAccount')}</Text>
                    <Text style={styles.textSwitch} >
                      {t('auth:login:name')}
                    </Text>{' '}
                  </Text>
                </View>
              </View>
            </KeyboardAwareScrollView>
          </SafeAreaView>
        );
      }}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  boxWrapper: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: wp('3%'),
    width: wp('100%'),
    backgroundColor: '#ffffff'
  },
  scrollView: {
    width: wp('100%'),
  },
  titleText: {
    marginBottom: hp('6%'),
    fontWeight: 'bold',
    fontSize: wp('8%'),
    width: wp('100%'),
    paddingHorizontal: wp('5%'),
    color: COLOR_TEXT_DEFAULT,
  },
  titleSubText: {
    marginTop: hp('4%'),
    fontSize: wp('4%'),
    width: wp('80%'),
    textAlign: 'center',
    color: '#8A8A8F',
  },
  action: {
    position: 'relative',
    bottom: 0,
  },
  textSwitch: {
    fontSize: wp('4%'),
    color: COLOR_BUTTON_DEFAULT,
    paddingLeft: wp('14%'),
    fontWeight: 'bold',
  },
  policy: {
    marginTop: hp('4%'),
    marginBottom: hp('5%'),
  },
  termConditions: {
    fontSize: wp('4%'),
    color: '#0BBCF2',
    textAlign: 'center',
  },
  text: {
    fontSize: wp('4%'),
    width: wp('100%'),
    textAlign: 'center',
    color: '#8A8A8F',
  },
  signup: {
    marginTop: hp('3%'),
  },
  inputContainerStyle: inputContainerStyleGlobal,
  containerStyle: {
    marginBottom: hp('3%'),
  },
});
Register.defaultProps = {};
export default withNavigation(Register);

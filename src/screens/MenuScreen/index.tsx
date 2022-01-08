import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {Auth} from 'aws-amplify';
import Button from '../../components/Button';
import {StyleSheet} from 'react-native';

const MenuScreen = () => {
    const onLogout = () => {
        Auth.signOut();
    };
  return (
    <SafeAreaView>
      <View style={style.textview}>
        <Text style={style.title}>Thông tin</Text>
      </View>
      <Button text="Đăng xuất" onPress={onLogout} />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  title: {
    fontSize: 20,
    padding: 8,
    color: 'black',
    marginVertical: 2,
    marginLeft: 8,
    fontWeight: 'bold',
  },
  textview: {
    width: '100%',
    height: 55,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
});
export default MenuScreen;

import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useNavigation} from '@react-navigation/native';
import countryList from 'country-list';
import {Auth, DataStore} from 'aws-amplify';
import {Order, OrderProduct, CartProduct} from '../../models';

import Button from '../../components/Button';
import styles from './styles';

const countries = countryList.getData();

const AddressScreen = () => {
  const [country, setCountry] = useState(countries[0].code);
  const [fullname, setFullname] = useState('');
  const [phone, setPhone] = useState('');

  const [address, setAddress] = useState('');
  const [addressError, setAddressError] = useState('');

  const [city, setCity] = useState('');

  const navigation = useNavigation();

  const saveOrder = async () => {
    // get user details
    const userData = await Auth.currentAuthenticatedUser();
    // create a new order
    console.log(userData.attributes.sub);
    
    const newOrder = await DataStore.save(
      new Order({
        userSub: userData.attributes.sub,
        fullName: fullname,
        phoneNumber: phone,
        country,
        city,
        address,
      }),
    );

    // fetch all cart items
    const cartItems = await DataStore.query(CartProduct, cp =>
      cp.userSub('eq', userData.attributes.sub),
    );

    // attach all cart items to the order
    await Promise.all(
      cartItems.map(cartItem =>
        DataStore.save(
          new OrderProduct({
            quantity: cartItem.quantity,
            option: cartItem.option,
            productID: cartItem.productID,
            orderID: newOrder.id,
          }),
        ),
      ),
    );

    // delete all cart items
    await Promise.all(cartItems.map(cartItem => DataStore.delete(cartItem)));
    // redirect home
    navigation.navigate('home');
  };

  const onCheckout = () => {
    if (!!addressError) {
      Alert.alert('Fix all field error before submiting');
      return;
    }

    if (!fullname) {
      Alert.alert('L??m ??n ??i???n t???t c??? th??ng tin v??o ?? tr???ng');
      return;
    }

    if (!phone) {
      Alert.alert('H??y nh???p s??? ??i???n tho???i c???a b???n');
      return;
    }

    console.warn('Thanh to??n th??nh c??ng');
    saveOrder();
  };

  const validateAddress = () => {
    if (address.length < 7) {
      setAddressError('?????a ch??? qu?? ng???n');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={(Platform.OS === 'android', 'ios' ? 'padding' : 'height')}
      keyboardVerticalOffset={(Platform.OS === 'android', 'ios' ? 5 : 0)}>
      <ScrollView style={styles.root}>
        <Text style={styles.region}>Qu???c Gia</Text>
        <View style={styles.row}>
          <Picker selectedValue={country} onValueChange={setCountry}>
            {countries.map(country => (
              <Picker.Item value={country.code} label={country.name} />
            ))}
          </Picker>
        </View>

        {/* Full name */}
        <View style={styles.row}>
          <Text style={styles.label}>H??? v?? t??n</Text>
          <TextInput
            style={styles.input}
            placeholder="H??? v?? t??n"
            value={fullname}
            onChangeText={setFullname}
          />
        </View>

        {/* Phone number */}
        <View style={styles.row}>
          <Text style={styles.label}>S??? ??i???n tho???i</Text>
          <TextInput
            style={styles.input}
            placeholder="S??? ??i???n tho???i c???a b???n"
            value={phone}
            onChangeText={setPhone}
            keyboardType={'phone-pad'}
          />
        </View>

        {/* Address */}
        <View style={styles.row}>
          <Text style={styles.label}>?????a ch???</Text>
          <TextInput
            style={styles.input}
            placeholder="?????a ch???"
            value={address}
            onEndEditing={validateAddress}
            onChangeText={text => {
              setAddress(text);
              setAddressError('');
            }}
          />
          {!!addressError && (
            <Text style={styles.errorLabel}>{addressError}</Text>
          )}
        </View>

        {/* City */}
        <View style={styles.row}>
          <Text style={styles.label}>Th??nh ph???</Text>
          <TextInput
            style={styles.input}
            placeholder="Th??nh ph???"
            value={city}
            onChangeText={setCity}
          />
        </View>

        <Button text="Thanh to??n" onPress={onCheckout} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddressScreen;

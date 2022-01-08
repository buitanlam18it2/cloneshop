import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, ActivityIndicator, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useRoute, useNavigation} from '@react-navigation/native';
import {DataStore, Auth} from 'aws-amplify';
import {Product, CartProduct} from '../../models';

import styles from './styles';
import QuantitySelector from '../../components/QuantitySelector';
import Button from '../../components/Button';
import ImageCarousel from '../../components/ImageCarousel';

const ProductScreen = () => {
  const [product, setProduct] = useState<Product | undefined>(undefined);

  const [selectedOption, setSelectedOption] = useState<string | undefined>(undefined,);
  const [quantity, setQuantity] = useState(1);
  
  const navigation = useNavigation();
  const route = useRoute();
  
  useEffect(() => {
    if (!route.params?.id) {
      return;
    }
    DataStore.query(Product, route.params.id).then(setProduct);
  }, [route.params?.id]);

  useEffect(() => {
    if (product?.options) {
      setSelectedOption(product.options[0]);
    }
  }, [product]);

  const onAddToCart = async () => {
    const userData = await Auth.currentAuthenticatedUser();

    if (!product || !userData) {
      return;
    }

    const newCartProduct = new CartProduct({
      userSub: userData.attributes.sub,
      quantity,
      option: selectedOption,
      productID: product.id,
    });

    await DataStore.save(newCartProduct);
    navigation.navigate('shoppingCart');

    //Alert.alert("Đã thêm vào giỏ hàng");
  };

  if (!product) {
    return <ActivityIndicator />;
  }

  return (
    <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>
      {/* Image carousel */}
      <ImageCarousel images={product.images} />

      {/* Title */}
      <Text style={styles.title}>{product.title}</Text>

      {/* Option selector */}
      <View style={styles.picker}>
      <Picker
        selectedValue={selectedOption}
        onValueChange={itemValue => setSelectedOption(itemValue)}>
        {product.options.map(option => (
          <Picker.Item label={option} value={option} />
        ))}
      </Picker>
      </View>

      {/* Price */}
      <Text style={styles.price}>
      <Text>Giá bán: </Text>
        {product.price.toFixed(3)}đ
        {product.oldPrice && (
          <Text style={styles.oldprice}>{product.oldPrice.toFixed(3)}đ</Text>
        )}
      </Text>

      {/* Quantiti selector */}
      <QuantitySelector quantity={quantity} setQuantity={setQuantity} />

      {/* Button */}
      <Button
        text={'Thêm Giỏ Hàng'}
        onPress={onAddToCart}
        containerStyles={{backgroundColor: '#F5B041'}}
      />
      <Button
        text={'Mua Ngay'}
        onPress={() => {
          console.warn('Buy now');
        }}
      />
      
      {/* Description */}
      <Text style={styles.titleDes}>Mô Tả:</Text>
      <Text style={styles.description}> {product.description}</Text>
    </ScrollView>
  );
};

export default ProductScreen;

import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  root: {
    padding: 5,
    margin: 5,
    backgroundColor: 'white',
  },
  price: {
    flexDirection: 'row',
    fontSize: 25,
    fontWeight: 'bold',
    padding: 10,
    color: '#ff8e3c',
  },
  oldprice: {
    fontSize: 12,
    fontWeight: 'normal',
    textDecorationLine: 'line-through',
    padding: 2,
    color: '#0d0d0d',
  },
  title: {
    fontSize: 20,
    color: '#17202A',
    fontWeight: 'bold',
    padding: 10,
  },
  description: {
    marginVertical: 10,
    lineHeight: 20,
  },
  titleDes: {
    fontSize: 18,
    color: '#0d0d0d',
    fontWeight: 'bold',
  },
  picker: {
    borderWidth: 0.5,
    borderRadius: 20,
  },
});

export default styles;

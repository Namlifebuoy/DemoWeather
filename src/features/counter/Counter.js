import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  View,
  Dimensions,
  Text,
  Image,
  TextInput,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {pushData} from './counterSlice';
import axios from 'axios';

const {width, height} = Dimensions.get('window');
const Counter = () => {
  const data = useSelector(state => state.counter.listData);
  const dispatch = useDispatch();
  const key = 'bab80bb9c4ac3312bf008498a0d7f566';
  const [city, setCity] = useState();
  const celsius = (data.temp - 273.5).toFixed(0);
  const description =
    data.weather.description.charAt(0).toUpperCase() +
    data.weather.description.slice(1);
  // console.log('data: ', data);

  const callApi = async () => {
    const res = await axios({
      method: 'get',
      url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=vi&appid=${key}`,
    });
    dispatch(pushData(res.data));
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.boxInput}
        placeholder="Enter city name"
        value={city}
        onChangeText={setCity}
      />
      <TouchableOpacity onPress={callApi} style={styles.btn}>
        <Text>Search</Text>
      </TouchableOpacity>
      <View style={styles.main}>
        <Text style={{fontSize: 30, fontWeight: '500'}}>{data?.name}</Text>
        <Image
          style={{width: 150, height: 150}}
          source={{
            uri: `https://openweathermap.org/img/w/${data?.weather.icon}.png`,
          }}
        />
        <Text style={{fontSize: 40, fontWeight: 'bold'}}>
          {data.temp ? celsius : '-'}°C
        </Text>
        <Text style={{fontSize: 30}}>{description}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    alignItems: 'center',
    backgroundColor: '#ddd',
  },
  boxInput: {
    width: width * 0.9,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    backgroundColor: '#fff',
  },
  btn: {
    width: width * 0.9,
    height: 50,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: '#3ea6ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    width: width * 0.89,
    height: height,
    backgroundColor: '#fff',
    marginTop: 10,
    borderRadius: 10,
    alignItems: 'center',
    paddingTop: 10,
  },
});

export default Counter;

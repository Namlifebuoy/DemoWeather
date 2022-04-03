import React, {Component} from 'react';
import {View} from 'react-native';
import {store} from './src/app/store';
import {Provider} from 'react-redux';
import Counter from './src/features/counter/Counter';

const App = () => {
  return (
    <Provider store={store}>
      <View>
        <Counter />
      </View>
    </Provider>
  );
};
export default App;

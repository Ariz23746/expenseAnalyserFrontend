import React from 'react';

import {SafeAreaView, ScrollView, StatusBar, Text} from 'react-native';

function App(): React.JSX.Element {
  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Text>Ariz</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;

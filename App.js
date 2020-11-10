import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';

import sqliteDB from './sqliteDB';

import db from './assets/main.sqlite';

export default function App() {
  const [result, setResult] = React.useState('Result: ');

  React.useEffect(() => {
    (async () => {
      await sqliteDB.openDatabase(db);
    })();
  }, []);

  const loadAction = async () => {
    try {
      //const result = await sqliteDB.executeSql(`SELECT * FROM log_fields`);
      const result = await sqliteDB.executeSql(
        `SELECT * FROM log_fields WHERE log REGEXP '(^|,)(${16})(,)'`
      );
      setResult(JSON.stringify(result));
    } catch (e) {
      setResult(e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="load" onPress={loadAction} />
      <Text>{result}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});

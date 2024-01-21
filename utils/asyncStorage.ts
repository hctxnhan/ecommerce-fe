import AsyncStorage from '@react-native-async-storage/async-storage';

export async function storeData(key: string, value: string) {
  await AsyncStorage.setItem(key, value);
}

export async function getData(key: string) {
  return await AsyncStorage.getItem(key);
}

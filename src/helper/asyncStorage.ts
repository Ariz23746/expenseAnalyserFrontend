import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storage = new Storage({
  storageBackend: AsyncStorage, // for web: window.localStorage
  defaultExpires: null,
  enableCache: true,
  // sync: {},
});

interface getItemProps {
  keyName: string;
}

interface setItemProps extends getItemProps {
  value: string | object;
}
function asyncStorage() {
  const setItem = async ({keyName, value}: setItemProps) => {
    await storage.save({
      key: keyName,
      data: typeof value === 'string' ? value : JSON.stringify(value),
    });
  };

  const getItem = async ({keyName}: getItemProps) => {
    try {
      const retrivedData = await storage.load({
        key: keyName,
      });
      return typeof retrivedData === 'string'
        ? JSON.parse(retrivedData)
        : retrivedData;
    } catch (error) {
      return Promise.resolve(null);
    }
  };

  const removeItem = async ({keyName}: getItemProps) => {
    await storage.remove({
      key: keyName,
    });
  };

  const clearStore = () => {
    AsyncStorage.clear();
  };

  return {
    setItem,
    getItem,
    removeItem,
    clearStore,
  };
}

export default asyncStorage;

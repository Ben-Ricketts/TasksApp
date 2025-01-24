import AsyncStorage from '@react-native-async-storage/async-storage';

const DEVICE_ID_KEY = '@TaskApp:deviceId';

const generateDeviceId = () => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return `device_${timestamp}_${random}`;
};

export const getDeviceId = async () => {
  try {
    let deviceId = await AsyncStorage.getItem(DEVICE_ID_KEY);
    if (!deviceId) {
      deviceId = generateDeviceId();
      await AsyncStorage.setItem(DEVICE_ID_KEY, deviceId);
    }
    return deviceId;
  } catch (error) {
    console.error('Error managing device ID:', error);
    return null;
  }
};

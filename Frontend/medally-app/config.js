import { Platform } from 'react-native';

// Default mapping:
// - Android emulator: 10.0.2.2
// - Android physical hotspot (override): 192.168.43.1
// - iOS (simulator or device on same machine): localhost

// To force hotspot mode on Android, set `global.API_USE_HOTSPOT = true` before app initialization.

let apiUrl;

if (Platform.OS === 'android') {
  // Default to emulator address
  apiUrl = 'http://10.0.2.2:3000';
  try {
    if (global && global.API_USE_HOTSPOT) {
      apiUrl = 'http://192.168.43.1:3000';
    }
  } catch (e) {
    // ignore
  }
} else {
  apiUrl = 'http://localhost:3000';
}

const API_URL = "http://192.168.67.197:3000";
export default API_URL;

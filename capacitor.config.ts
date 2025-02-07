
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.2b671144109d4111bc32-5c5702dadfa1',
  appName: 'flashclass-nectar',
  webDir: 'dist',
  server: {
    url: 'https://2b671144-109d-4111-bc32-5c5702dadfa1.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  ios: {
    contentInset: 'always'
  },
  android: {
    captureInput: true
  }
};

export default config;

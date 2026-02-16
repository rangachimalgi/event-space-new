# Android Release Build Guide

## Building Release APK

### Prerequisites
- Android SDK installed
- Java JDK installed
- Gradle configured

### Build Steps

1. **Navigate to Android directory:**
   ```bash
   cd android
   ```

2. **Build Release APK:**
   ```bash
   ./gradlew assembleRelease
   ```

3. **Find your APK:**
   ```
   android/app/build/outputs/apk/release/app-release.apk
   ```

### Alternative: Build via Expo

```bash
# Build APK
npx expo build:android -t apk

# Or build AAB (for Play Store)
npx expo build:android -t app-bundle
```

## Production API Configuration

Your app is already configured to use the production API URL (`https://event-space-new.onrender.com/api`) when built as a release APK.

### How it works:
- **Development builds** (`__DEV__ = true`): Uses local development server
- **Release builds** (`__DEV__ = false`): Automatically uses production API URL

### Verify API URL in Release Build:

1. Build release APK
2. Install on device
3. Open app
4. Check browser console/logs - should show production API URL

## Testing Release Build

### Before Building:
- ✅ Production API URL is set: `https://event-space-new.onrender.com/api`
- ✅ Backend is deployed and accessible
- ✅ MongoDB is connected

### After Building:
1. Install APK on device
2. Test all features:
   - ✅ View events
   - ✅ Create event
   - ✅ Edit event
   - ✅ Delete event
   - ✅ Calendar view
   - ✅ Date filtering

## Network Permissions

Your `AndroidManifest.xml` already includes:
- ✅ `INTERNET` permission
- ✅ HTTPS support (no cleartext traffic issues)

## Troubleshooting

### APK won't install
- Check if device allows installation from unknown sources
- Verify APK signature

### API calls fail in release build
- Verify production API URL is correct
- Check backend is accessible: `https://event-space-new.onrender.com/health`
- Check device has internet connection
- Review logs: `adb logcat | grep -i "api\|error"`

### Build fails
- Clean build: `./gradlew clean`
- Check Java version compatibility
- Verify all dependencies installed

## Signing APK (for Play Store)

If you want to publish to Play Store, you need to sign the APK:

1. Generate keystore:
   ```bash
   keytool -genkeypair -v -storetype PKCS12 -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
   ```

2. Configure signing in `android/app/build.gradle`

3. Build signed APK:
   ```bash
   ./gradlew assembleRelease
   ```

## Your Production Setup

- **Backend:** https://event-space-new.onrender.com
- **API Endpoint:** https://event-space-new.onrender.com/api
- **Frontend (Web):** Your Netlify URL
- **Android APK:** Will use production API automatically

## Summary

✅ **Your release APK will work from anywhere** because:
1. It uses production API URL (`https://event-space-new.onrender.com/api`)
2. Backend is publicly accessible on Render
3. No local network dependencies
4. Works on any device with internet connection

Just build and distribute the APK - it will connect to your production backend automatically!

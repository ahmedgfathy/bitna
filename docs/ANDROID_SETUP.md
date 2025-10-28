# Android Setup Guide for Bitna Mobile App

## 📱 Current Android Configuration Status

### ✅ What's Already Configured

1. **Gradle Build Files**
   - ✅ Build tools version: 36.0.0
   - ✅ Min SDK: 24 (Android 7.0)
   - ✅ Target SDK: 36 (Android 14+)
   - ✅ Hermes enabled (faster JS engine)
   - ✅ New Architecture enabled
   - ✅ AndroidX enabled
   - ✅ Multi-architecture support (armeabi-v7a, arm64-v8a, x86, x86_64)

2. **Android Studio & SDK**
   - ✅ Android SDK installed at: `/Users/ahmedgomaa/Library/Android/sdk`
   - ✅ ADB (Android Debug Bridge) available
   - ✅ Command-line tools installed
   - ⚠️ Emulator needs to be installed/configured

### ❌ What Needs to Be Set Up

1. **Android Emulator** - Not installed or not configured
2. **Platform Tools** - May need to be installed
3. **System Images** - Android emulator images need to be downloaded

---

## 🛠️ Complete Android Setup Steps

### Step 1: Install Android Studio Components

You need to install Android Studio or use the command-line tools to set up emulators.

#### Option A: Using Android Studio (Recommended for Beginners)

1. **Download Android Studio** (if not already installed):
   - Visit: https://developer.android.com/studio
   - Download and install Android Studio

2. **Open Android Studio** and go to:
   - `Tools` → `SDK Manager`

3. **Install Required Components:**
   - ✅ Android SDK Platform 36 (or latest)
   - ✅ Android SDK Build-Tools
   - ✅ Android Emulator
   - ✅ Android SDK Platform-Tools
   - ✅ Intel x86 Emulator Accelerator (HAXM) - for Intel Macs
   - ✅ Google Play services (optional, but recommended)

4. **Create an Android Virtual Device (AVD):**
   - Open `Tools` → `Device Manager`
   - Click `Create Device`
   - Select a device (e.g., Pixel 5)
   - Download a system image (e.g., Android 14 - API 34)
   - Finish and create the AVD

#### Option B: Using Command Line (Advanced)

```bash
# Install SDK components using sdkmanager
$ANDROID_HOME/cmdline-tools/latest/bin/sdkmanager --install "platform-tools"
$ANDROID_HOME/cmdline-tools/latest/bin/sdkmanager --install "platforms;android-36"
$ANDROID_HOME/cmdline-tools/latest/bin/sdkmanager --install "build-tools;36.0.0"
$ANDROID_HOME/cmdline-tools/latest/bin/sdkmanager --install "emulator"
$ANDROID_HOME/cmdline-tools/latest/bin/sdkmanager --install "system-images;android-34;google_apis;arm64-v8a"

# Create an AVD
$ANDROID_HOME/cmdline-tools/latest/bin/avdmanager create avd \
  -n Pixel_5_API_34 \
  -k "system-images;android-34;google_apis;arm64-v8a" \
  -d "pixel_5"
```

---

### Step 2: Configure Environment Variables

Add these to your `~/.zshrc` or `~/.bash_profile`:

```bash
# Android SDK
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin
```

Then reload your shell:
```bash
source ~/.zshrc
```

---

### Step 3: Verify Installation

Run these commands to verify everything is set up:

```bash
# Check Android SDK location
echo $ANDROID_HOME

# Check ADB
adb --version

# List installed packages
sdkmanager --list_installed

# List available emulators
emulator -list-avds

# Check for connected devices
adb devices
```

---

## 🚀 Running the Bitna Mobile App on Android

### Method 1: Using an Emulator

1. **Start an Android Emulator:**
   ```bash
   # List available AVDs
   emulator -list-avds
   
   # Start an emulator (replace with your AVD name)
   emulator -avd Pixel_5_API_34
   ```

2. **In a new terminal, navigate to the mobile folder:**
   ```bash
   cd /Users/ahmedgomaa/bitna/mobile
   ```

3. **Start Metro bundler:**
   ```bash
   npm start
   ```

4. **In another terminal, run the app:**
   ```bash
   cd /Users/ahmedgomaa/bitna/mobile
   npx react-native run-android
   ```

### Method 2: Using a Physical Device

1. **Enable Developer Options on your Android device:**
   - Go to `Settings` → `About Phone`
   - Tap `Build Number` 7 times
   - Go back to `Settings` → `Developer Options`
   - Enable `USB Debugging`

2. **Connect your device via USB**

3. **Verify connection:**
   ```bash
   adb devices
   # Should show your device
   ```

4. **Run the app:**
   ```bash
   cd /Users/ahmedgomaa/bitna/mobile
   npm start
   # In another terminal:
   npx react-native run-android
   ```

---

## 🔧 Troubleshooting

### Error: "No connected devices"

**Solution:**
```bash
# Check devices
adb devices

# Restart ADB server
adb kill-server
adb start-server

# Start an emulator
emulator -list-avds
emulator -avd YOUR_AVD_NAME
```

### Error: "SDK location not found"

**Solution:**
Create `android/local.properties` file:
```properties
sdk.dir=/Users/ahmedgomaa/Library/Android/sdk
```

### Error: "Gradle build failed"

**Solution:**
```bash
cd android
./gradlew clean
cd ..
npx react-native run-android
```

### Error: "Unable to load script"

**Solution:**
```bash
# Clear Metro cache
npx react-native start --reset-cache

# In another terminal
npx react-native run-android
```

### Error: "INSTALL_FAILED_UPDATE_INCOMPATIBLE"

**Solution:**
```bash
# Uninstall the app
adb uninstall com.bitnamobile

# Reinstall
npx react-native run-android
```

---

## 📋 Quick Reference Commands

```bash
# Navigate to project
cd /Users/ahmedgomaa/bitna/mobile

# Start Metro bundler
npm start

# Run on Android (in another terminal)
npx react-native run-android

# List emulators
emulator -list-avds

# Start emulator
emulator -avd EMULATOR_NAME

# Check connected devices
adb devices

# View Android logs
npx react-native log-android

# Build release APK
cd android
./gradlew assembleRelease
cd ..

# Install specific APK
adb install android/app/build/outputs/apk/release/app-release.apk

# Clear cache and rebuild
cd android
./gradlew clean
cd ..
rm -rf node_modules
npm install
npx react-native run-android
```

---

## 🎯 Recommended Next Steps

1. **Install Android Studio** (easiest way to manage emulators)
2. **Create at least one AVD** (Android Virtual Device)
3. **Test the build:**
   ```bash
   cd /Users/ahmedgomaa/bitna/mobile/android
   ./gradlew assembleDebug
   ```
4. **Start the emulator and run the app**

---

## 📱 Emulator Recommendations

For optimal performance, create an emulator with:
- **Device**: Pixel 5 or Pixel 6
- **System Image**: Android 13 or 14 (API 33 or 34)
- **Architecture**: arm64-v8a (for Apple Silicon) or x86_64 (for Intel)
- **RAM**: 2048 MB or higher
- **Storage**: 2048 MB or higher

---

## ✅ Pre-Flight Checklist

Before running `npx react-native run-android`, ensure:

- [ ] Android SDK installed
- [ ] ANDROID_HOME environment variable set
- [ ] Platform tools in PATH
- [ ] At least one AVD created OR physical device connected
- [ ] Emulator running OR device detected by `adb devices`
- [ ] Metro bundler is running (`npm start`)
- [ ] No port conflicts (8081 for Metro)

---

## 🚨 Current Status

Based on the system check:
- ✅ Android SDK: Installed
- ✅ ANDROID_HOME: Set correctly
- ✅ ADB: Working
- ❌ Emulator: Not installed or not in PATH
- ❓ AVDs: Unknown (need to install emulator first)

**Next Action Required:**
Install the Android Emulator through Android Studio SDK Manager or command line tools.

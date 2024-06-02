# Create new app

- npx create-expo-app@latest BudgetGuardians --template

# Installing dependencies

- npx expo install react-native-web react-dom @expo/metro-runtime
- npx expo install @react-navigation/native

# Checking Expo SDK version

- npm show expo version

# Routing pages tutorials

https://docs.expo.dev/router/installation/

# To Build

- npx expo export --platform web

# To Host on netlify

- netlify deploy --dir dist
- pick dist as dir

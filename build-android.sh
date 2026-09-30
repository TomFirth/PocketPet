#!/bin/bash

# PocketPet Android Build Script
# Generates a Google Play App Bundle (.aab) with SemVer naming.

set -e

echo "🚀 Starting PocketPet Android Build..."

# 1. Extract version from package.json
VERSION=$(node -p "require('./package.json').version")

if [ -z "$VERSION" ]; then
  echo "❌ Error: Could not extract version from package.json"
  exit 1
fi

echo "📦 Target Version: $VERSION"

# 2. Navigate to android directory
cd android

# 3. Clean and Build Bundle
echo "🛠️  Running Gradle bundleRelease..."
./gradlew clean
./gradlew bundleRelease

# 4. Locate the generated bundle
# Default path: android/app/build/outputs/bundle/release/app-release.aab
SOURCE_AAB="app/build/outputs/bundle/release/app-release.aab"

if [ ! -f "$SOURCE_AAB" ]; then
  echo "❌ Error: Bundle file not found at $SOURCE_AAB"
  exit 1
fi

# 5. Rename and Copy to root
DEST_NAME="${VERSION}.aab"
echo "✅ Build successful! Renaming to $DEST_NAME and moving to project root..."

cp "$SOURCE_AAB" "../$DEST_NAME"

echo "🎉 Done! Your bundle is ready at: ./$DEST_NAME"

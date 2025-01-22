#!/bin/bash

# Navigate to the script's directory
cd "$(dirname "$0")"/..
echo "Cleanup started."
# Find and remove node_modules directories, dist directories.
find . -type d -name "node_modules" -exec rm -rf {} + \
    -o -type d -name "dist" -exec rm -rf {} + \
    -o -type d -name ".turbo" -exec rm -rf {} +

# Remove all package-lock.json files in the client directory
find ./client -type f -name "package-lock.json" -exec rm -f {} +

# Remove core cache
rm -rf ./packages/core/cache

# Remove pnpm lockfile
rm ./pnpm-lock.yaml

echo "Cleanup completed."

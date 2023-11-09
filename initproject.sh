#!/bin/bash

# Source and destination directories
SOURCE_DIR=~/project-templates
DEST_DIR="$PWD"

# Copy files
cp -R "$SOURCE_DIR/." "$DEST_DIR/"

echo "Files copied successfully!"


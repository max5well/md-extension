#!/bin/bash
# Copy as Markdown — Chrome Extension Installer
# Usage: paste this entire command into your terminal

set -e

DEST="$HOME/copy-as-markdown-extension"
REPO="https://github.com/YOUR_USERNAME/copy-as-markdown/archive/refs/heads/main.zip"

echo ""
echo "Installing Copy as Markdown..."
echo ""

# Download & unzip
curl -sL "$REPO" -o /tmp/copy-as-markdown.zip
unzip -q -o /tmp/copy-as-markdown.zip -d /tmp/copy-as-markdown-src
mkdir -p "$DEST"
cp -r /tmp/copy-as-markdown-src/copy-as-markdown-main/. "$DEST/"
rm -rf /tmp/copy-as-markdown.zip /tmp/copy-as-markdown-src

echo "Done! Extension saved to: $DEST"
echo ""
echo "To install in Chrome:"
echo "  1. Open chrome://extensions"
echo "  2. Enable Developer mode (top right)"
echo "  3. Click 'Load unpacked'"
echo "  4. Select: $DEST"
echo ""
open "$DEST" 2>/dev/null || true

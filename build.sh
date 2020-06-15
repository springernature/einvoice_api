#!/usr/bin/env bash
set -e

[ -d /var/halfpipe/cache ] && export npm_config_cache="/var/halfpipe/cache/.npm"

echo "Remove node modules"
rm -rf node_modules
echo "Install node modules"
npm install
echo "allow node modules"
chmod -R 700 node_modules

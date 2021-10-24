#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git remote add deploy https://github.com/xordesigns/xordesigns.github.io.git
git add -A
git commit -m 'deploy'

# 'deploy' is the remote name instead of 'origin' in this case
git push -f deploy master

# if you are deploying to https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -
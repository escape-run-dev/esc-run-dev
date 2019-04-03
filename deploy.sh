#!/bin/bash
rm -rf server/public/*
rm -rf client/build
cd client 
npm run build-prod
cd ..
mv client/build/* server/public
git add .
git commit -m "Deploying"
git subtree push --prefix=server heroku master
heroku logs --tail
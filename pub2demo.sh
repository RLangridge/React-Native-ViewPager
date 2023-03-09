#!/bin/bash

rm -rf ./demo/node_modules/@jeison.berdugo.glooko/rn-viewpager
packName=`npm pack`
cd ./demo
npm install ../$packName
cd ../

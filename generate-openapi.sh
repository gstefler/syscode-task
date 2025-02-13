#!/bin/bash

cd ./user-service || { echo "Directory not found"; exit 1; }

if ! command -v npm &> /dev/null
then
    echo "npm command could not be found"
    exit 1
fi

npm install

npm run tsoa:spec
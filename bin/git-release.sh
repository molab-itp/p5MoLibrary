#!/bin/bash
cd ${0%/*}

# Produce a release build
# - starting in next branch
# - increment build number
# - commit and push
# - switch to main
# - merge from next
# - commit and push
# - switch back to next
# - increment build number 
# - commit and push

cd ..

bin/build.sh --prod



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

# start in in next, even number build
# odd number build will be pushed to main with changes from next
bin/build.sh --prod
git add .
git commit -m "`cat src/gen/build_ver.txt`"
git push
# in main
git checkout main
git merge next
git push
# in next
git checkout next
bin/build.sh --prod
git add .
git commit -m "`cat src/gen/build_ver.txt`"
git push
echo
echo "build `cat src/gen/build_ver.txt`"
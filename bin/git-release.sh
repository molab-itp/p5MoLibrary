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

quiet=--quiet

# start in in next, even number build
# odd number build will be pushed to main with changes from next
bin/build.sh --prod $quiet
git add . 
git commit $quiet -m "`cat src/gen/build_ver.txt`"
git push $quiet
# in main
git checkout main $quiet
git merge next $quiet
git push $quiet
# in next
git checkout next $quiet
bin/build.sh --prod $quiet
git add . 
git commit -m "`cat src/gen/build_ver.txt`" $quiet
git push $quiet
echo
echo "build `cat src/gen/build_ver.txt`"
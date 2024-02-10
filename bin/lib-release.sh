#!/bin/bash
cd ${0%/*}

# Publish lib to p5moRelease/lib/n

excludes="--exclude-from to-public-exclude.txt"

quiet=--quiet
delete=--delete
test=
verbose=
# test=--dry-run
# verbose=v

buildnum=`cat ../src/gen/build_ver.txt`

rdest=../../p5moRelease/lib/$buildnum

mkdir -p $rdest

source=../src/lib/0
# echo $verbose $delete $test
# echo -razO$verbose $excludes $delete $test
# echo "rsync from $source"
# echo "        to $rdest"
rsync -razO$verbose $excludes $delete $test "$source/" "$rdest/"

echo
echo lib $buildnum

cd ../../p5moRelease

git add . 
git commit $quiet -m "$buildnum"
git push $quiet


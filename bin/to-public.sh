#!/bin/bash
cd ${0%/*}

# rsync folder to public 
destRepo=p5MoLibrary

delete=--delete
test=
verbose=
# test=--dry-run
# verbose=v

excludes="--exclude-from to-public-exclude.txt"

source=../

destRepo=p5MoLibrary-jht9629-nyu
rpath=../../$destRepo

echo $verbose $delete $test
echo "rsync from $source"
echo "        to $rpath"
rsync -razO$verbose $excludes $delete $test "$source/" "$rpath/"

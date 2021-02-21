#! /bin/bash
time=$(date "+%c")
JQ_EXEC=`which jq`
FILE_PATH="$1"
fans=$(cat $FILE_PATH | ${JQ_EXEC} ."$2" | sed 's/\"//g')
name=$(cat $FILE_PATH | ${JQ_EXEC} .data.card.name | sed 's/\"//g')
echo "当前时间:$time"
echo "昵称:$name"
echo "粉丝数:$fans"

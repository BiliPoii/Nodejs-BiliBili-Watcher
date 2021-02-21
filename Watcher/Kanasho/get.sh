#/bin/bash
bash Kanasho.sh
clear
bash json.sh Kanasho.json data.card.fans
save=$(bash json.sh Kanasho.json data.card.fans)
echo $save >> database.txt
#Sync

export $(grep -v '^#' .env | xargs)

while true; do
    rsync -avze ssh --include '/' --include '/db/' --include '/db/migrations/' --include '/db/migrations/**' --include "knexfile.ts" --include ".env" --include 'dist**' --include 'html**' --include 'public**' --include 'package.json' --include 'package-lock.json' --exclude '/db/db.ts' --exclude '/db/templogs.sqlite'  --exclude "*" --progress "$RSYNCLOCALDIR" $PIUSER@$PIADDRESS:"$RSYNCPIDIR"
    sleep 1;
done
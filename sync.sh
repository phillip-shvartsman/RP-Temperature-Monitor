#Sync

export $(grep -v '^#' .env | xargs)

while true; do
rsync -avze ssh --include ".env" --include 'dist**' --include 'html**' --include 'public**' --exclude "*" --progress "$RSYNCLOCALDIR" $PIUSER@$PIADDRESS:"$RSYNCPIDIR"
done
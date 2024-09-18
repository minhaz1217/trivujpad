LATEST_TAG=$(git describe --tags `git rev-list --tags --max-count=1`)

echo $LATEST_TAG
if [ -z $LATEST_TAG ]; then
  LATEST_TAG="0.0.0"
  echo "$LATEST_TAG"
fi

if [[ $LATEST_TAG =~ [0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    LATEST_VERSION=${BASH_REMATCH[0]} # get only the numeric part, so if last tag was v1.0.1 then LATEST_VERSION will be 1.0.1 only
else
    echo "Failed to extract current version" >&2
    exit 1
fi

echo "PREVIOUS_VERSION=$LATEST_VERSION"
echo "PREVIOUS_VERSION=$LATEST_VERSION" >> "$GITHUB_OUTPUT"

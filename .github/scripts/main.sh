OUTPUT=$(git show --name-only --numstat --format= | ./.github/scripts/changed-packages.sh)

for key in $OUTPUT
do
  echo ${key} | .github/scripts/create-bump-pr.sh
done

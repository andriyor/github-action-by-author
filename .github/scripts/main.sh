OUTPUT=$(git show --name-only --numstat --format= | ./.github/scripts/changed-packages.sh)

git show --name-only --numstat --format=

git diff-tree --no-commit-id --name-only -r HEAD

for key in $OUTPUT
do
  echo "make pr for ${key}"
#  echo ${key} | .github/scripts/create-bump-pr.sh
done

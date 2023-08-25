OUTPUT=$(git diff-tree --no-commit-id --name-only -r HEAD | ./.github/scripts/changed-packages.sh)

for key in $OUTPUT
do
  echo "make pr for ${key}"
  echo ${key} | .github/scripts/create-bump-pr.sh
done

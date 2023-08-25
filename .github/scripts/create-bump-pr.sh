read package_name
cd "packages/${package_name}"
BRANCH_NAME="chore/${package_name}-bump-golf"
git checkout -b "$BRANCH_NAME"
npm version patch
git config --global user.name 'Your Name'
git config --global user.email 'andriyorehov@gmail.com'
git add .
git commit -m 'bump version'
git push origin "$BRANCH_NAME"
gh pr create --title "Update ${package_name} package after sync" --body "Pull request body"

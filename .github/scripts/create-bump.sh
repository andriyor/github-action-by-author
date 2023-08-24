cd packages/qr
git checkout -b "bump"
npm version patch
git config --global user.name 'Your Name'
git config --global user.email 'andriyorehov@gmail.com'
git add .
git commit -m 'bump version'
git push origin bump
gh pr create --title "Pull request title" --body "Pull request body"

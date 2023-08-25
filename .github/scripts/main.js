const path = require('node:path');
const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);

module.exports = async ({github, context}) => {
    const {stdout} = await exec('git diff-tree --no-commit-id --name-only -r HEAD');
    const regex = new RegExp("packages/([^/]+)/locales");
    const packages = new Set();
    for (const file of stdout.split('\n')) {
        if (regex.test(file)) {
            const packageName = regex.exec(file)[1]
            packages.add(packageName);
        }
    }

    for (const packageName of [...packages]) {
        const branchName = `chore/${packageName}-bump-golf`
        await exec(`git checkout -b ${branchName}`);
        await exec(`npm version patch`, {cwd: path.join(process.cwd(), 'packages', packageName)});
        await exec("git config --global user.name 'Your Name'");
        await exec("git config --global user.email 'andriyorehov@gmail.com'");
        await exec("git add .");
        await exec("git commit -m 'bump version'");
        await exec(`git push origin ${branchName}`);

        const query = `{
    repository(owner: "andriyor", name: "github-action-by-author") {
      ref(qualifiedName: "main") {
        target {
          ... on Commit {
             history(first: 1, path: "packages/${packageName}/locales/en-US.json") {
          edges {
            node {
              author {
                user {
                  login
                }
              }
            }
          }
        }
      }
    }
  }
}
  }`;

        const result = await github.graphql(query);
        console.log(result);
        console.log(result.repository.ref.target.history.edges[0].node.author.user.login);
        const lastChangedBy = result.repository.ref.target.history.edges[0].node.author.user.login;

        await exec(`gh pr create --title "Update ${packageName} package after sync" --body "Pull request body" --assignee "${lastChangedBy}" --reviewer "${lastChangedBy}"`);
    }
};

const { exec, execSync } = require('node:child_process');

module.exports = async ({ github, context }) => {
  console.log(execSync('git diff-tree --no-commit-id --name-only -r HEAD'));
  const query = `{
    repository(owner: "andriyor", name: "github-action-by-author") {
      ref(qualifiedName: "main") {
        target {
          ... on Commit {
             history(first: 1, path: "packages/qr/locales/en-US.json") {
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
    return context.payload.client_payload;
};

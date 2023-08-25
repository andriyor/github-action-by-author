module.exports = async ({ github, context }) => {
  const query = `query() {
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

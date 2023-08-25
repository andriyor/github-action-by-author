const octokit = require("@octokit/graphql");

// const result = octokit.graphql(
//     `
//     {
//       repository(owner: "octokit", name: "graphql.js") {
//         issues(last: 3) {
//           edges {
//             node {
//               title
//             }
//           }
//         }
//       }
//     }
//   `,
//     {
//         headers: {
//             authorization: `token`,
//         },
//     },
// );

// result.then(res => {
//     console.log(res.repository);
// })

// const result = octokit.graphql(
//   `
//     {
//       repository(owner: "andriyor", name: "github-action-by-author") {
//         ref(qualifiedName: "main") {
//           target {
//             ... on Commit {
//                history(first: 1, path: "packages/qr/locales/en-US.json") {
//             edges {
//               node {
//                 author {
//                   user {
//                     login
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
//     }
//   `,
//   {
//     headers: {
//       authorization: `token`,
//     },
//   }
// );
//
// result.then((res) => {
//   console.log(res.repository);
// });



const result = octokit.graphql(
    `
    {
  repository(owner: "andriyor", name: "github-action-by-author") {
        ref(qualifiedName: "main") {
          target {
            ... on Commit {
               history(first: 1) {
            edges {
              node {
                tree {
                  id,
                  entries {
                    path
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
  `,
    {
      headers: {
        authorization: `token`,
      },
    }
);

result.then((res) => {
  console.log(res.repository);
});

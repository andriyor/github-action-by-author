const octokit = require("@octokit/graphql");
const {execSync} = require("node:child_process");
const util = require('node:util');
const path = require('node:path');
const exec = util.promisify(require('node:child_process').exec);

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



// const result = octokit.graphql(
//     `
//     {
//   repository(owner: "andriyor", name: "github-action-by-author") {
//         ref(qualifiedName: "main") {
//           target {
//             ... on Commit {
//                history(first: 1) {
//             edges {
//               node {
//                 tree {
//                   id,
//                   entries {
//                     path
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// }
//   `,
//     {
//       headers: {
//         authorization: `token`,
//       },
//     }
// );
//
// result.then((res) => {
//   console.log(res.repository);
// });




(async () => {
    const { stdout } = await exec('git diff-tree --no-commit-id --name-only -r HEAD');
    const regex = new RegExp("packages/([^/]+)/locales");
    const packages = new Set();
    for (const file of [...stdout.split('\n'), 'packages/qr/locales/en-US.json']) {
        if (regex.test(file)) {
            const packageName = regex.exec(file)[1]
            packages.add(packageName);
        }
    }

    for (const packageName of [...packages]) {
        const branchName = `chore/${packageName}-bump-golf`
        await exec(`git checkout -b ${branchName}`);
        await exec(`npm version patch`, {cwd: path.join(process.cwd(), 'packages', packageName) });
        await exec("git config --global user.name 'Your Name'");
        await exec("git config --global user.email 'andriyorehov@gmail.com'");
        await exec("git add .");
        await exec("git commit -m 'bump version'");
        await exec(`git push origin ${branchName}`);
    }
})()

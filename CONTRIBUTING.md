# Contributing

## Questions / Bugs / Feedback

If you have questions about the library, found a bug or want to suggest a feature, please create an issue.


## Setup

1. Clone the repository

   ```bash
   git clone https://github.com/remoteoss/remote-json-schema-form-kit.git
   ```

3. Install dependencies.

   ```bash
   npm install
   ```

### Node.js Version

This project requires Node.js LTS v18.14.0.


## Development workflow

### Creating a new branch

Submit your branch pointing to `main`.

1. Run `npm run dev` to upload the `dist`, is required to be able to install packages like `"@remoteoss/remote-json-schema-form-kit": "github:remoteoss/remote-json-schema-form-kit#update-types-kit#0.0.1"` 
2. Update the version in the `package.json` file and `package-lock.json` file.


### Testing the PR changes in your "consumer" project

- Use [npm link](https://docs.npmjs.com/cli/v9/commands/npm-link) or [yarn link](https://classic.yarnpkg.com/lang/en/docs/cli/link/):

```bash
# in remote-json-schema-form-kit repo:
$ npm link

# cd to your project
$ npm  link @remoteoss/json-schema-form

# Run npm unlink --no-save @remoteoss/json-schema-form to remove the local symlink
```

#### Public release


### Merging a PR

A PR needs to have a change in the `package.version` property, remember to follow **semver**

By default, prefer to "Squash and Merge" giving it a message that follows the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

```bash
- <type>[optional scope]: <description>
- feat(parser): add ability to parse arrays
```

### Publishing a stable release

1.  Generate a git tag `git tag v0.0.3`
2.  Push the tag to the remote  `git push origin --tags`
3.  Update the changelog


# ignore-sync

[![Greenkeeper badge](https://badges.greenkeeper.io/foray1010/ignore-sync.svg)](https://greenkeeper.io/)
a cli tool to build and sync *ignore files across files and repositories

## why
1. Github default `.gitignore` doesn't cover all our needs, we always need to compose and manage multiple `.gitignore` files from github, such as [Node.gitignore](https://github.com/github/gitignore/blob/master/Node.gitignore) + [macOS.gitignore](https://github.com/github/gitignore/blob/master/Global/macOS.gitignore), in order to remove all the noises in our development. It should be automated.

2. For library developer, we often need to compose a `.npmignore` from `.gitignore` and some extra ignore patterns that we do not wish to ignore by `.gitignore`, such as test files and `.*rc` files. If `.gitignore` is updated, you will need to update corresponding part of `.npmignore` manually. We should avoid this repetitive work.

a short example on how `ignore-sync` handle ignore files
```ini
[github/gitignore]
Node.gitignore
Global/macOS.gitignore

[inline]
*.test.js
yarn.lock
```

## prerequisite
`node >= 7.6`

## installation and setup
1. `npm install --save-dev ignore-sync`
2. update `package.json`
    ```diff json
    {
      "scripts": {
    +   "ignore-sync": "ignore-sync"
      }
    }
    ```
3. now follow [how to use](#how-to-use) to create `*ignore-sync` files, then `npm run ignore-sync`, all corresponding ignore files will be generated.

## how to use
1. `ignore-sync` works on any ignore file that name end with `ignore`, such as `.gitignore`, `.npmignore`, `.eslintignore`, etc. Simply creating a file that end with `ignore-sync`.

    example: `.gitignore-sync` -> `.gitignore`

2. create a source tag in your `*ignore-sync` file to identify the source of ignore patterns

    ```ini
    [put_source_tag_here]
    ```

    different source tag identifies different source of ignore patterns

    - `[inline]`
      - ignore patterns under this tag will be copied to generated ignore file directly
    - `[local]`
      - local file paths under this tag will be read and the content of these files will be copied to generated ignore file
      - file paths are relative to the location of the `ignore-sync` file
    - `[$username/$repo]`
      - github file paths under this tag will be read and the content of these files will be copied to generated ignore file
      - file paths are relative to the root of the github repository
      - recommend using ignore patterns from [[github/gitignore]](https://github.com/github/gitignore)

3. `npm run ignore-sync`

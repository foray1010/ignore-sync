# ignore-sync

a cli tool to build and sync \*ignore files across files and repositories

## why

1. Github default `.gitignore` doesn't cover all our needs, we always need to compose and manage multiple `.gitignore` files from github, such as [Node.gitignore](https://github.com/github/gitignore/blob/master/Node.gitignore) + [macOS.gitignore](https://github.com/github/gitignore/blob/master/Global/macOS.gitignore), in order to remove all the noises in our development. It should be automated.

1. For library developer, we often need to compose a `.npmignore` from `.gitignore` and some extra ignore patterns that we do not wish to ignore by `.gitignore`, such as test files and `.*rc` files. If `.gitignore` is updated, you will need to update corresponding part of `.npmignore` manually. We should avoid this repetitive work.

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
1. update `package.json`

   ```diff json
   {
     "scripts": {
   +   "ignore-sync": "ignore-sync ."
     }
   }
   ```

1. now follow [how to use](#how-to-use) to create `*ignore-sync` files, then `npm run ignore-sync`, all corresponding ignore files will be generated.

## how to use

1. `ignore-sync` works on any ignore file that name end with `ignore`, such as `.gitignore`, `.npmignore`, `.eslintignore`, etc. Simply creating a file that end with `ignore-sync`.

   example: `.gitignore-sync` -> `.gitignore`

1. create a source tag in your `*ignore-sync` file to identify the source of ignore patterns

   ```ini
   [put_source_tag_here]
   ```

   different source tag identifies different source of ignore patterns

   - `[inline]`
     - the ignore patterns will be copied directly to generated ignore file
   - `[local]`
     - the content of these local files will be copied directly to generated ignore file
     - support glob pattern, e.g. `packages/**/.gitignore`
   - `[relative]`

     - the content of these local files will be copied with **relative path prefix** to generated ignore file
     - support glob pattern, e.g. `packages/**/.gitignore`
     - example

       ```ini
       # input: /packages/a/.prettierignore
       ignored.md
       ```

       ```ini
       # input: /.prettierignore-sync
       [relative]
       packages/a/.prettierignore
       ```

       ```ini
       # output: /.prettierignore
       packages/a/ignored.md
       ```

   - `[$username/$repo]`
     - the content of these github files will be downloaded and appended to generated ignore file
     - recommend using ignore patterns from [[github/gitignore]](https://github.com/github/gitignore)

1. `npm run ignore-sync`

# xAlt

A fitness oriented application using React/Redux

## Tech stack:

- React
- Redux
- Redux Saga
- Babel
- Webpack
- ESLint
- Styled-components
- Styled-system
- Ant

## To install the project use the following code.

Make sure you have git and Node installed.

```shell
git clone https://github.com/xAlt-Fitness/xalt-backend.git
cd xalt-frontend
cp example.env .env
yarn install
```

To run the server use following command

```shell
yarn dev
```

Then open http://localhost:3000 in your browser

For more run-scripts check `./package.json`

## Code Segregation Principles

`src/containers` - each `container` is used for specific screen.

- Every screen has its own folder, `index.js` file, styles and some screen blocks.
- Screen block is a block with components that can be easily interpreted on the screen,
  e.g. `Profile(container) -> ProfileSidebar(block) -> Avatar(component)`
- Container knows how to organize/position `copmonents` and blocks inside itself.
- Container folder **SHOULD NOT** contain components. If it is completely independent - it should be placed inside `src/components`

---


`src/components` - contains independent components.

- Every component folder should contain all the necessary files to render that component.
- e.g. you have a modal window. It knows how to render itself, it knows where to render children, but it has to be `children`-agnostic.

---

`src/components/shared` - is a place for primitives.

- Those components that describes default system parts like typography, button, modal windows, sidebars

_In ideal world we build an Application from organized primitives._

## Github/Git WorkFlow

1. The naming of the branches should be as follows `XALT-123/ticket_name`
2. All comments must start with the prefix `[XALT-123]`, for automation you need to use a commit hook `prepare-commit-msg` which is oriented on the branch name! prepare-commit-msg file included in root of project, you need copy them in to `.git/hooks/` and make it executable
3. We rebase the development branch from the master, not make a merge commit!
4. The PR is named as follows:
   1. If development is still underway then `[WIP][xalt-213] What we do or ticket title'.
   2. If development in the PR is over, remove the prefix `[WIP]`, which means that the PR is ready for review
5. PRs are merged into the master branch by rebase (comments may be squashed beforehand)

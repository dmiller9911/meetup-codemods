# meetup-codemods

## [Slides](https://docs.google.com/presentation/d/1r02NDuK5dATzIZWkYPB3fp0XdZeyZ0tyLuWY6yS0t6w/edit?usp=sharing)

This repository is a collection of codemod examples. It is meant to be used for academic purposes only. Codemods in this repo are not feature complete and should be used with caution.


### Setup & Run

1. `yarn global add jscodeshift`
1. `git clone https://github.com/dmiller9911/meetup-codemods` or download a zip file from `https://github.com/dmiller9911/meetup-codemods/archive/master.zip`
1. Run `yarn install` in the react-codemod directory
1. `jscodeshift -t <codemod-script> <path>`
   * `codemod-script` - path to the transform file, see available scripts below;
   * `path` - files or directory to transform;
   * use the `-d` option for a dry-run and use `-p` to print the output for comparison;
   * use the `--extensions` option if your files have different extensions than `.js` (for example, `--extensions js,jsx`);
   * see all available [jscodeshift options](https://github.com/facebook/jscodeshift#usage-cli).

### Included Scripts

#### prop-rename

Transforms react-bootstrap buttons to material-ui buttons.

```bash
jscodeshift -t transforms/prop-rename.js src/prop-rename/** -d -p
```

#### reference-to-selectors

Transforms `state.users` references in mapStateToProps to use `usersSelectors.users(state)`

```bash
jscodeshift -t transforms/reference-to-selectors.js src/reference-to-selectors/** -d -p
```
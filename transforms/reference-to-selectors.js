const path = require('path');
const relative = require('relative');

const absPathToReduxModule = path.resolve(
  __dirname,
  '../src/reference-to-selectors/redux/users'
);

module.exports = (file, api) => {
  const j = api.jscodeshift;
  const root = j(file.source);

  // Get All Imports of connect from react-redux
  const connectImports = root
    .find(j.ImportDeclaration, { source: { value: 'react-redux' } })
    .find(j.ImportSpecifier, { imported: { name: 'connect' } });

  // Return Early if none are present
  if (!connectImports.size()) {
    return;
  }

  // gets name of imported connect function
  const importName = connectImports.get().value.local.name;

  // keep track if any modifications are made
  let hasModifications = false;

  root
    // find all connect calls with imported names
    .find(j.CallExpression, {
      callee: { name: importName },
    })
    // convert to collection of mapStateToProps Node Paths
    .map(callPath => j(callPath.value.arguments).get(0))
    .forEach(mapStateToPropsPath => {
      const mapStateToPropsNode = mapStateToPropsPath.node;
      // get name of first argument
      const stateParamName = mapStateToPropsNode.params[0].name;
      // convert to collection to search over
      j(mapStateToPropsNode)
        // find any state.users references
        .find(j.MemberExpression, {
          object: { name: stateParamName },
          property: { name: 'users' },
        })
        .forEach(nodePath => {
          // replace state.users with usersSelectors.users(state)
          j(nodePath).replaceWith(
            j.callExpression(
              j.memberExpression(
                j.identifier('usersSelectors'),
                j.identifier('selectUsers')
              ),
              [j.identifier(stateParamName)]
            )
          );
          hasModifications = true;
        });
    });

  if (hasModifications) {
    // Get import path to users redux module relative to file
    const relativePathToReduxModule = relative(
      path.resolve(process.cwd(), file.path),
      absPathToReduxModule
    );

    // Add users selectors import to file
    root
      .find(j.ImportDeclaration)
      .at(0)
      .insertBefore(
        j.importDeclaration(
          [j.importSpecifier(j.identifier('usersSelectors'))],
          j.literal(`./${relativePathToReduxModule}`)
        )
      );

    return root.toSource({ quote: 'single' });
  }
};

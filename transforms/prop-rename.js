module.exports = (file, api) => {
  const j = api.jscodeshift;
  const root = j(file.source);

  // track modifications
  let hasModifications = false;

  // get bootstrap import
  const reactBootstrapImport = root.find(j.ImportDeclaration, {
    source: { value: 'react-bootstrap' },
  });

  // get button import from bootstrap import(s)
  const buttonImport = reactBootstrapImport.find(j.ImportSpecifier, {
    imported: { name: 'Button' },
  });

  // Return Early if no button imports are present
  if (!buttonImport.size()) {
    return;
  }

  // get imported button name
  const importName = buttonImport.get().node.local.name;

  // get all rendered buttons
  const buttonElements = root.find(j.JSXOpeningElement, {
    name: { name: importName },
  });

  // get bsStyle props from rendered buttons
  const bsStyleProps = buttonElements.find(j.JSXAttribute, {
    name: { name: 'bsStyle' },
  });

  // replace bsStyle prop with variant prop
  bsStyleProps.replaceWith(propPath => {
    hasModifications = true;
    return j.jsxAttribute(j.jsxIdentifier('variant'), propPath.node.value);
  });

  if (hasModifications) {
    // replace bootstrap import with material-ui import
    reactBootstrapImport.replaceWith(
      j.importDeclaration(
        [j.importDefaultSpecifier(j.identifier('Button'))],
        j.literal('@material-ui/core/Button')
      )
    );

    return root.toSource();
  }
};

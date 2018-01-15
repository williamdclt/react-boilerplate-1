const config = require('../../config.js');
const basePath = `${config.appPath}/components`;

module.exports = {
  description: 'Add a component',
  prompts: [
    {
      type: 'directory',
      name: 'path',
      message: 'select the destination of the component',
      basePath,
    },
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'Button',
      validate: value => {
        if (!/.+/.test(value)) {
          return 'The name is required';
        }
        return true;
      },
    },
    {
      type: 'confirm',
      name: 'connected',
      default: false,
      message: 'Is it connected?',
    },
    {
      type: 'list',
      name: 'type',
      message: 'Select the type of component',
      default: 'Stateless Function',
      choices: () => [
        'Stateless Function',
        'React.Component',
        'React.PureComponent',
      ],
    },
  ],
  actions: data => {
    // Generate index.js and index.test.js
    let componentTemplate;

    switch (data.type) {
      case 'Stateless Function': {
        componentTemplate = './component/component_func.jsx.hbs';
        break;
      }
      default: {
        componentTemplate = './component/component_class.jsx.hbs';
      }
    }

    const actions = [
      {
        type: 'add',
        path: `${basePath}/{{path}}/{{name}}.jsx`,
        templateFile: componentTemplate,
        abortOnFail: true,
      },
      {
        type: 'add',
        path: `${basePath}/{{path}}/tests/{{name}}.test.jsx`,
        templateFile: './component/test.jsx.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: `${basePath}/{{path}}/tests/{{ name }}.story.jsx`,
        templateFile: './component/story.jsx.hbs',
        abortOnFail: true,
      },
    ];

    if (data.connected) {
      actions.push({
        type: 'add',
        path: `${basePath}/{{path}}/{{name}}Wrapper.jsx`,
        templateFile: './component/wrapper.jsx.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'add',
        path: `${basePath}/{{path}}/tests/{{name}}Wrapper.test.jsx`,
        templateFile: './component/wrapper.test.jsx.hbs',
        abortOnFail: true,
      });
    }
    return actions;
  },
};

const data = {};

const iconList = [
  'angularjs',
  'app-engine',
  'apple',
  'bootstrap',
  'bottle',
  'cordova',
  'csharp',
  'django',
  'dotnet',
  'electron',
  'elixir',
  'ember',
  'flask',
  'generic',
  'go',
  'HTML5',
  'java',
  'javascript',
  'laravel',
  'nodejs',
  'perl',
  'php',
  'python',
  'rails',
  'react',
  'redis',
  'redux',
  'ruby',
  'rust',
  'swift',
  'vue',
  'windows'
];

iconList.forEach(icon => {
  data[icon] = getIcon(icon);
});


function getIcon(name) {
  return require(`./svg/${name}.svg`);
}

module.exports = data;
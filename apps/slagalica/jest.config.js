module.exports = {
  name: 'slagalica',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/slagalica',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};

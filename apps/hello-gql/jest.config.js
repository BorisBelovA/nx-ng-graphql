module.exports = {
  name: 'hello-gql',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/hello-gql',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};

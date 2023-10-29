import _ from 'lodash';

export const objectKeysToCamelCase = (snakeCaseObject: object) => {
  const camelCaseObject: any = {};
  _.forEach(snakeCaseObject, (value: object, key: string) => {
    if (_.isObject(value) || _.isArray(value)) {
      value = objectKeysToCamelCase(value);
    }
    camelCaseObject[_.camelCase(key)] = value;
  });
  return camelCaseObject;
};

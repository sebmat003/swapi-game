import { Person } from '../models/person.models';

export const createPerson = (name = 'Anakin Skywalker'): Person => ({
  name,
  hairColor: 'gray',
  eyeColor: 'blue',
  birthYear: '2002',
  gender: 'male',
  height: '100',
  mass: '100',
  skinColor: 'white',
});

export const createRandomPeople = (): [Person, Person] => [
  createPerson('Darth Vader'),
  createPerson('Yoda'),
];

export const createTestObjects = () => ({
  person: createPerson(),
  randomPeople: createRandomPeople(),
  numberOfPeople: 62,
  error: 'Error occurred',
});

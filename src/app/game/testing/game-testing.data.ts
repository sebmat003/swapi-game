import { BasicPerson, Person } from "../models/person.models";

export const createPerson = (name = 'Anakin Skywalker'): Person => ({
  name,
  hair_color: 'gray',
  eye_color: 'blue',
  birth_year: '2002',
  gender: 'male',
  height: '100',
  mass: '100',
  url: 'test',
  skin_color: 'white'
});

export const createRandomPeople = (): [Person, Person] => [
  createPerson('Darth Vader'), createPerson('Yoda')
];

export const createAllPeople = (): BasicPerson[] => [
  {
    url: 'test/1',
    name: 'Yoda',
    uid: '1'
  },
  {
    url: 'test/2',
    name: 'Anakin Skywalker',
    uid: '2'
  },
  {
    url: 'test/3',
    name: 'Darth Vader',
    uid: '3'
  },
]

export const createTestObjects = () => ({
  person: createPerson(),
  randomPeople: createRandomPeople(),
  allPeople: createAllPeople(),
  error: 'Error occurred'
})

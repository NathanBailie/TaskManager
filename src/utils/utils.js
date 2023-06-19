import uuid from 'uuid';

export function createTask(name, descr) {
  return {
    name: name,
    descr: descr,
    id: uuid(),
    nameOnEdit: false,
    descrOnEdit: false,
    styles: {
      done: false,
    }
  };
};
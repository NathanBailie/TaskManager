import uuid from 'uuid';

export function createTask(name, descr) {
  return {
    name: name,
    descr: descr,
    id: uuid(),
    nameIsEdit: false,
    descrIsEdit: false,
    styles: {
      done: false,
    }
  };
};
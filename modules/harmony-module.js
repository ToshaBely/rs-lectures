export function test() {
  console.log('hello from harmony module');
}

export const MY_FIELD = 'Const Harmony value';

const NINJA = 'I am Ninja';

export { NINJA as NON_NINJA };

export let i = 0;
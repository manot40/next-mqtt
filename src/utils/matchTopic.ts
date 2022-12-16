export function matchTopic(test: string, against: string) {
  const result = [] as boolean[];
  const a = test.split('/');
  const b = against.split('/');

  let isWildcard = false;
  for (const i in a)
    if (b[i] === '#') {
      result.push(true);
      isWildcard = true;
      break;
    } else {
      result.push(a[i] === b[i]);
    }

  return (isWildcard || a.length == b.length) && result.every((value) => value);
}

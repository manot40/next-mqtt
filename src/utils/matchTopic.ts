export function matchTopic(test: string, against: string) {
  const result = [] as boolean[];
  const topicA = test.split('/');
  const topicB = against.split('/');

  for (const i in topicA)
    if (topicB[i] === '#') {
      result.push(true);
      break;
    } else {
      result.push(topicA[i] === topicB[i]);
    }

  return result.every((value) => value);
}

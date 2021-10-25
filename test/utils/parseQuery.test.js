import { parseQuery } from '../../src/utils/parseQuery';
import { queryMock } from '../mock';

describe('parseQuery.ts test', () => {
  test('parseQuery is return querystring', () => {
    expect(parseQuery(queryMock)).toBe(
      'draftKey=draftKey&limit=20&offset=20&orders=createdAt&fields=test&q=text&depth=1&ids=test&filters=test'
    );
  });
});

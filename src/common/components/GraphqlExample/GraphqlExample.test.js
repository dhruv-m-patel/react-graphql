import Tester from '../../../../tests/Tester';
import GraphqlExample from './GraphqlExample';

const tester = new Tester();

describe('GraphqlExample', () => {
  test('it should render', () => {
    const { component } = tester.getShallowInstance(GraphqlExample);
    expect(component).toBeDefined();
  });
});

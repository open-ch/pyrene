import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinonChai from 'sinon-chai';
import chai from 'chai';

Enzyme.configure({ adapter: new Adapter() });
chai.use(sinonChai);

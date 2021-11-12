import { render, screen } from '@testing-library/react';
import { shallow, sleep } from 'enzyme'
import App from './components/App';
import Restaurant from './components/restaurant/Restaurant';
import LinearProgress from "@mui/material/LinearProgress";

test('renders without crashing', () => {
  render(<App />);
  const linkElement = screen.getByText("Restaurant Finder");
  expect(linkElement).toBeInTheDocument();
});


it("first loading", async () => {
  const wrapper = shallow(<App />)
  const loading = wrapper.find(LinearProgress)
  expect(loading).toBeTruthy()
});

it("restaurants loaded", async () => {
  const wrapper = shallow(<App />)
  const restaurant = wrapper.find(Restaurant)
  expect(restaurant).toBeTruthy()
});
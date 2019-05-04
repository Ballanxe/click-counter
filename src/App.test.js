import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import ReactDOM from 'react-dom';
import App from './App';

Enzyme.configure({ adapter: new EnzymeAdapter() });
/**
	* Factory cuntion to create a ShallowWrapper for the App component
	* @function setup
	* @param {object} props - Component props specific to this setup.
	* @param {any} state - Initial state for setup
	* @returns {ShallowWrapper}
*/
const setup = (props={}, state=null) => {
	const wrapper = shallow(<App {...props}/>)

	if (state) {
		wrapper.setState(state);
		console.log("I am here ")
	}
	return wrapper;
}

/**
	* Return ShallowWrapper containinng nodes with the given data-test value.
	* @param {ShallowWrapper} wrapper = Enzyme shallow wrapper to search within
	* @param {string} val - Value of data-test attribute for search
	* @returns {ShallowWrapper}
**/

const findByTestAttr = (wrapper, val) => {
	return wrapper.find(`[data-test="${val}"]`);
}

test('render without error', () => {

	const wrapper = setup();
	const appComponent = findByTestAttr(wrapper, 'component-app')
	expect(appComponent.length).toBe(1);

});

test('renders increment button', () => {
	const wrapper = setup();
	const button = findByTestAttr(wrapper, 'increment-button')
	expect(button.length).toBe(1);
});

test('renders counter display', () => {
	const wrapper = setup();
	const counterDisplay = findByTestAttr(wrapper, 'counter-display')
	expect(counterDisplay.length).toBe(1);
});

test('counter starts at 0', () => {
	const wrapper = setup()
	const initialCounterState = wrapper.state('counter')
	expect(initialCounterState).toBe(0)
});

test('clocking button increments counter', () => {
	const counter = 7;
	const wrapper = setup(null, { counter });

	// find button and click
	const button = findByTestAttr(wrapper, 'increment-button');
	button.simulate('click');
	wrapper.update();

	// find display and test value
	const counterDisplay = findByTestAttr(wrapper, 'counter-display');
	expect(counterDisplay.text()).toContain(counter + 1);

});

test('button decrements counter', () => {
	const counter = 5;
	const wrapper = setup(null, {counter});

	const button = findByTestAttr(wrapper, 'decrement-button')
	button.simulate('click')
	wrapper.update()

	const counterDisplay = findByTestAttr(wrapper, 'counter-display')
	expect(counterDisplay.text()).toContain(counter - 1)
})


test('component renders without errors', () => {

	const wrapper = setup()
	const errorMessage = findByTestAttr(wrapper,'error-below-zero')

	expect(errorMessage.length).toBe(0)


})

test('component below zero error', () => {
	const counter = 0;
	const wrapper = setup(null, {counter});

	const button = findByTestAttr(wrapper, 'decrement-button')
	button.simulate('click')
	wrapper.update()

	const errorMessage = findByTestAttr(wrapper,'error-below-zero')
	expect(errorMessage.length).toBe(1);

})














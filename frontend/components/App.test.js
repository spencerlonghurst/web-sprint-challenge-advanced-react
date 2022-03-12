import React from 'react'
import AppClass from './AppClass'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
// import userEvent from '@testing-library/user-event';


// Write your tests here
test('sanity', () => {
  expect(false).toBe(false)
})

beforeEach(() => {
  render(<AppClass/>);
})

describe('AppClass Component', () => {

test('Renders the Up button', () => {
  const UP = screen.getByText(/Up/i);
  expect(UP).toBeInTheDocument()
})

test('Renders the Down button', () => {
  const DOWN = screen.getByText(/Down/i);
  expect(DOWN).toBeInTheDocument()
})

test('Renders the Left button', () => {
  const LEFT = screen.getByText(/Left/i);
  expect(LEFT).toBeInTheDocument()
})

test('Renders the Right button', () => {
  const RIGHT = screen.getByText(/Right/i);
  expect(RIGHT).toBeInTheDocument()
})

test('The letter B is in the grid', () => {
  const B = screen.getByText('B');
  expect(B).toBeInTheDocument();
  expect(B).toHaveTextContent('B');
})
})
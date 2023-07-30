/* eslint-disable */

import React from "react"
import { render } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import Home from "./Home"

// pay attention to write it at the top level of your file
const mockedUsedNavigate = jest.fn()

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate
}))

jest.mock("../../other/wave", () => () => {})

it("test_header_rendering", () => {
  const { getByText } = render(<Home />)
  const headerElement = getByText(/Welcome to Mock Draft Maker/i)
  expect(headerElement).toBeInTheDocument()
})

it("test_button_rendering", () => {
  const { getByText } = render(<Home />)
  const buttonElement = getByText(/Get Started/i)
  expect(buttonElement).toBeInTheDocument()
  expect(buttonElement).toHaveClass("btn btn-primary rounded-none z-50")
})

it("test_header_class_names", () => {
  const { getByText } = render(<Home />)
  const headerElement = getByText(/Welcome to Mock Draft Maker/i)
  expect(headerElement).toHaveClass(
    "text-3xl font-bold tracking-tight text-gray-900"
  )
})

it("test_button_class_names", () => {
  const { getByText } = render(<Home />)
  const buttonElement = getByText(/Get Started/i)
  expect(buttonElement).toHaveClass("btn btn-primary rounded-none z-50")
})

/* eslint-disable */

import React from "react"
import { render, fireEvent, cleanup } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import MdmMakerSettings from "../components/maker/MdmMakerSettings"

afterEach(cleanup)

it("Round select value is changed", () => {
  const { getByTestId } = render(<MdmMakerSettings />)

  const numRoundsElement = getByTestId("numRounds")

  expect(numRoundsElement.value).toBe("3")

  fireEvent.change(numRoundsElement, { target: { value: "2" } })

  expect(numRoundsElement.value).toBe("2")
})

it("Speed slider value is changed", () => {
  const { getByTestId } = render(<MdmMakerSettings />)

  const speedElement = getByTestId("speed")

  expect(speedElement.value).toBe("80")

  fireEvent.change(speedElement, { target: { value: "50" } })

  expect(speedElement.value).toBe("50")
})

it("Needs vs positional slider value is changed", () => {
  const { getByTestId } = render(<MdmMakerSettings />)

  const needsVsPositionalElement = getByTestId("needsVsPositional")

  expect(needsVsPositionalElement.value).toBe("50")

  fireEvent.change(needsVsPositionalElement, { target: { value: "10" } })

  expect(needsVsPositionalElement.value).toBe("10")
})

it("Randomness slider value is changed", () => {
  const { getByTestId } = render(<MdmMakerSettings />)

  const randomnessElement = getByTestId("randomness")

  expect(randomnessElement.value).toBe("10")

  fireEvent.change(randomnessElement, { target: { value: "20" } })

  expect(randomnessElement.value).toBe("20")
})

// Test DND with Cypress

/* eslint-disable */

import React from "react"
import { render, fireEvent, cleanup } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import MdmAnalysisTab from "../components/maker/maker_tabs/MdmAnalysisTab"

afterEach(cleanup)

it("should display passing data when passing tab is clicked", () => {
  const playerInAnalysis = {
    passing: {
      games_played: 10,
      completions: 100,
      attempts: 150,
      completion_percent: 66.7,
      yards: 1200,
      yards_per_attempt: 8.0,
      touchdowns: 10,
      interceptions: 5,
      rating: 95.0
    }
  }

  const { getByText } = render(
    <MdmAnalysisTab playerInAnalysis={playerInAnalysis} />
  )

  fireEvent.click(getByText("Passing"))

  expect(getByText("Games")).toBeInTheDocument()
  expect(getByText("Comp")).toBeInTheDocument()
  expect(getByText("Att")).toBeInTheDocument()
  expect(getByText("Comp %")).toBeInTheDocument()
  expect(getByText("Yards")).toBeInTheDocument()
  expect(getByText("Y/A")).toBeInTheDocument()
  expect(getByText("TDs")).toBeInTheDocument()
  expect(getByText("Ints")).toBeInTheDocument()
  expect(getByText("Rating")).toBeInTheDocument()
})

it("should display a message when playerInAnalysis does not have passing data", () => {
  const playerInAnalysis = {}
  const { getByText } = render(
    <MdmAnalysisTab playerInAnalysis={playerInAnalysis} />
  )

  fireEvent.click(getByText("Passing"))

  expect(getByText("No passing data for this player")).toBeInTheDocument()
  expect(
    getByText(
      "(If you think this player should have data, they may have been injured)"
    )
  ).toBeInTheDocument()
})

it("should display a message when playerInAnalysis is null", () => {
  const playerInAnalysis = null
  const { getByText } = render(
    <MdmAnalysisTab playerInAnalysis={playerInAnalysis} />
  )

  expect(getByText("No passing data for this player")).toBeInTheDocument()
  expect(
    getByText(
      "(If you think this player should have data, they may have been injured)"
    )
  ).toBeInTheDocument()
})

it("should display available passing data when playerInAnalysis has incomplete passing data", () => {
  const playerInAnalysis = {
    passing: {
      games_played: 10,
      completions: 100,
      attempts: 150,
      completion_percent: 66.7,
      yards: 1200,
      touchdowns: 10,
      interceptions: 5,
      rating: 95.0
    }
  }

  const { getByText } = render(
    <MdmAnalysisTab playerInAnalysis={playerInAnalysis} />
  )

  fireEvent.click(getByText("Passing"))

  expect(getByText("Games")).toBeInTheDocument()
  expect(getByText("Comp")).toBeInTheDocument()
  expect(getByText("Att")).toBeInTheDocument()
  expect(getByText("Comp %")).toBeInTheDocument()
  expect(getByText("Yards")).toBeInTheDocument()
  expect(getByText("TDs")).toBeInTheDocument()
  expect(getByText("Ints")).toBeInTheDocument()
  expect(getByText("Rating")).toBeInTheDocument()
})

it("should highlight the passing tab when clicked", () => {
  const playerInAnalysis = {}
  const { getByText } = render(
    <MdmAnalysisTab playerInAnalysis={playerInAnalysis} />
  )

  fireEvent.click(getByText("Passing"))

  expect(getByText("Passing")).toHaveClass(
    "bg-gray-600 border-box text-primary-content"
  )
})

it("should highlight the rushing tab when clicked", () => {
  const playerInAnalysis = {}
  const { getByText } = render(
    <MdmAnalysisTab playerInAnalysis={playerInAnalysis} />
  )

  fireEvent.click(getByText("Rushing"))

  expect(getByText("Rushing")).toHaveClass(
    "bg-gray-600 border-box text-primary-content"
  )
})

it("should highlight the receiving tab when clicked", () => {
  const playerInAnalysis = {}
  const { getByText } = render(
    <MdmAnalysisTab playerInAnalysis={playerInAnalysis} />
  )

  fireEvent.click(getByText("Receiving"))

  expect(getByText("Receiving")).toHaveClass(
    "bg-gray-600 border-box text-primary-content"
  )
})

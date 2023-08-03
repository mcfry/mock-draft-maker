/* eslint-disable */

import React from "react"
import { render, screen, cleanup } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import MdmYourPicksTab from "../components/maker/maker_tabs/MdmYourPicksTab"

afterEach(cleanup)

it("should render a table with player data when yourPicks object is not empty", () => {
  const yourPicks = {
    team1: [
      {
        id: 1,
        projected: 10,
        pickedAt: 1,
        full_name: "John Doe",
        position: "QB",
        college: "ABC"
      }
    ]
  }
  render(<MdmYourPicksTab yourPicks={yourPicks} />)
  const table = screen.getByRole("table")
  expect(table).toBeInTheDocument()
})

it("should render a message when yourPicks object is empty", () => {
  const yourPicks = {}
  render(<MdmYourPicksTab yourPicks={yourPicks} />)
  const message = screen.getByText("You haven't picked any players yet.")
  expect(message).toBeInTheDocument()
})

it("should render a message when yourPicks object is undefined", () => {
  render(<MdmYourPicksTab />)
  const message = screen.getByText("You haven't picked any players yet.")
  expect(message).toBeInTheDocument()
})

it("should render a message when yourPicks object is null", () => {
  const yourPicks = null
  render(<MdmYourPicksTab yourPicks={yourPicks} />)
  const message = screen.getByText("You haven't picked any players yet.")
  expect(message).toBeInTheDocument()
})

it("should render a table with correct player data when yourPicks object has multiple teams and players", () => {
  const yourPicks = {
    team1: [
      {
        id: 1,
        projected: 10,
        pickedAt: 1,
        full_name: "John Doe",
        position: "QB",
        college: "ABC"
      }
    ],
    team2: [
      {
        id: 2,
        projected: 20,
        pickedAt: 2,
        full_name: "Jane Doe",
        position: "RB",
        college: "DEF"
      }
    ]
  }
  render(<MdmYourPicksTab yourPicks={yourPicks} />)
  const table = screen.getByRole("table")
  expect(table).toBeInTheDocument()
  const team1 = screen.getByText("team1")
  expect(team1).toBeInTheDocument()
  const team2 = screen.getByText("team2")
  expect(team2).toBeInTheDocument()
  const johnDoe = screen.getByText("John Doe")
  expect(johnDoe).toBeInTheDocument()
  const janeDoe = screen.getByText("Jane Doe")
  expect(janeDoe).toBeInTheDocument()
})

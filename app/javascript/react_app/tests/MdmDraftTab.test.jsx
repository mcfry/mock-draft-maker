/* eslint-disable */

import React from "react"
import { render, fireEvent, screen, cleanup } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import MdmDraftTab from "../components/maker/maker_tabs/MdmDraftTab"
import useStore from "../store/store"

jest.mock("../store/store")

afterEach(cleanup)

it("should render the table of local players", () => {
  render(
    <MdmDraftTab
      localPlayers={[
        {
          id: 1,
          projected: 10,
          full_name: "John Doe",
          position: "QB",
          college: "Some College"
        }
      ]}
    />
  )
  const table = screen.getByRole("table")
  expect(table).toBeInTheDocument()
})

it("should select a player when clicked", () => {
  const setPreselectedPick = jest.fn()
  render(
    <MdmDraftTab
      localPlayers={[
        {
          id: 1,
          projected: 10,
          full_name: "John Doe",
          position: "QB",
          college: "Some College"
        }
      ]}
      setPreselectedPick={setPreselectedPick}
      userPicking={true}
    />
  )
  const playerRow = screen.getByText("John Doe").closest("tr")
  fireEvent.click(playerRow)
  expect(setPreselectedPick).toHaveBeenCalledWith({
    id: 1,
    projected: 10,
    full_name: "John Doe",
    position: "QB",
    college: "Some College"
  })
})

it("should open player analysis modal when Analyze button is clicked", () => {
  const handleAnalyzeClick = jest.fn()
  useStore.mockReturnValueOnce(jest.fn()) // mock addAlert

  render(
    <MdmDraftTab
      localPlayers={[
        {
          id: 1,
          projected: 10,
          full_name: "John Doe",
          position: "QB",
          college: "Some College"
        }
      ]}
      handleAnalyzeClick={handleAnalyzeClick}
    />
  )
  const analyzeButton = screen.getByText("Analyze")
  fireEvent.click(analyzeButton)
  expect(handleAnalyzeClick).toHaveBeenCalled()
})

// Mock the store
it("should add an alert when userPicking is false", () => {
  const setPreselectedPick = jest.fn()
  const addAlert = useStore.mockReturnValueOnce(jest.fn()) // mock addAlert

  render(
    <MdmDraftTab
      localPlayers={[
        {
          id: 1,
          projected: 10,
          full_name: "John Doe",
          position: "QB",
          college: "Some College"
        }
      ]}
      setPreselectedPick={setPreselectedPick}
      userPicking={false}
    />
  )
  const playerRow = screen.getByText("John Doe").closest("tr")
  fireEvent.click(playerRow)
  expect(setPreselectedPick).not.toHaveBeenCalled()
  expect(addAlert).toHaveBeenCalled()
})

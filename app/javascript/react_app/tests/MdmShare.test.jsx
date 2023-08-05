/* eslint-disable */

import React from "react"
import axios from "axios"
import { render, screen, cleanup, act, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import MdmShare from "../components/maker/MdmShare"

jest.mock("axios")
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    draft_uuid: "test"
  })
}))

beforeEach(() => {
  axios.mockImplementation(() => Promise.resolve({}))
})

afterEach(() => {
  jest.resetAllMocks()
  cleanup()
})

it("should render the header with title", async () => {
  axios.mockResolvedValueOnce({ data: { draft_picks: {} } })
  render(<MdmShare />)

  // wait for state to update
  await act(async () => {})

  const header = screen.getByText("Your Mock Draft")
  expect(header).toBeInTheDocument()
})

it("should render the share link with data", async () => {
  const mockData = {
    data: {
      draft_picks: {
        "Team 1": [
          {
            id: 1,
            pickedAt: 1,
            projected: 1,
            full_name: "Player 1",
            position: "QB",
            college: "College 1"
          }
        ]
      }
    }
  }
  axios.mockResolvedValueOnce(mockData)
  render(<MdmShare />)

  // wait for axios request to finish
  await waitFor(() => {})

  expect(screen.getByText(window.location.href)).toBeInTheDocument()
})

it("should render the draft table with correct data", async () => {
  const mockData = {
    data: {
      draft_picks: {
        "Team 1": [
          {
            id: 1,
            pickedAt: 1,
            projected: 1,
            full_name: "Player 1",
            position: "QB",
            college: "College 1"
          }
        ]
      }
    }
  }
  axios.mockResolvedValueOnce(mockData)
  render(<MdmShare />)

  // wait for axios request to finish
  await waitFor(() => {})

  expect(screen.getByText("Team 1")).toBeInTheDocument()
  expect(screen.getByText("Player 1")).toBeInTheDocument()
  expect(screen.getByText("QB")).toBeInTheDocument()
  expect(screen.getByText("College 1")).toBeInTheDocument()
})

it("should handle error when fetching draft record", async () => {
  axios.mockRejectedValueOnce(new Error("Failed to fetch draft record"))
  render(<MdmShare />)

  await act(async () => {})

  expect(
    screen.getByText("Error: Failed to fetch draft record")
  ).toBeInTheDocument()
})

it("should handle empty draft record", async () => {
  axios.mockResolvedValueOnce({ data: { draft_picks: {} } })
  render(<MdmShare />)

  // wait for axios request to finish
  await waitFor(() => {})

  expect(screen.getByText("No draft record found.")).toBeInTheDocument()
})

it("should display loading animation while draft record is being fetched", async () => {
  axios.mockResolvedValueOnce({ data: { draft_picks: {} } })
  render(<MdmShare />)
  expect(screen.getByRole("status")).toBeInTheDocument()

  // wait for axios request to finish
  await waitFor(() => {})
})

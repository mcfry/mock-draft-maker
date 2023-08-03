/* eslint-disable */

import React from "react"
import axios from "axios"
import { render, fireEvent, act, cleanup } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"

import MdmMakerShare from "../components/maker/MdmMakerShare"
import * as getCsrfToken from "../other/getCsrfToken"
import useStore from "../store/store"

jest.mock("axios")
jest.mock("../store/store")

const mockNavigate = jest.fn()
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate
}))

let mockGetToken = null
beforeEach(() => {
  axios.mockImplementation(() => Promise.resolve({}))
  mockGetToken = jest.spyOn(getCsrfToken, "default").mockReturnValue(null)
})

afterEach(() => {
  jest.resetAllMocks()
  cleanup()
})

it("should submit form with valid data and navigate to share_draft page", async () => {
  const mockYourPicks = {
    team1: [
      {
        id: 1,
        projected: 100,
        pickedAt: 1,
        full_name: "John Doe",
        position: "QB",
        college: "ABC"
      }
    ]
  }
  // What zustand would return to the variable yourPicks
  useStore.mockReturnValueOnce(mockYourPicks)

  const { getByRole } = render(<MdmMakerShare />)
  const saveButton = getByRole("button", { name: /save and share!/i })
  axios.mockResolvedValueOnce({ data: { uuid: "123" } })

  await act(async () => {
    fireEvent.click(saveButton)
  })

  expect(axios).toHaveBeenCalledWith(
    expect.objectContaining({
      data: {
        draft_picks: {
          team1: [
            {
              college: "ABC",
              full_name: "John Doe",
              id: 1,
              pickedAt: 1,
              position: "QB",
              projected: 100
            }
          ]
        }
      },
      url: "/api/v1/draft_records/create"
    })
  )
  expect(mockGetToken).toHaveBeenCalled()
  expect(mockNavigate).toHaveBeenCalledWith("/share_draft/123")
})

it("should not submit form with empty data and not trigger API call", async () => {
  useStore.mockReturnValueOnce({}) // mock yourPicks
  useStore.mockReturnValueOnce(jest.fn()) // mock addAlert

  const { getByRole } = render(<MdmMakerShare />)
  const saveButton = getByRole("button", { name: /save and share!/i })
  axios.mockResolvedValueOnce({ data: { uuid: "123" } })

  await act(async () => {
    fireEvent.click(saveButton)
  })

  expect(axios).not.toHaveBeenCalled()
})

/* eslint-disable */

import React from "react"
import { render, fireEvent, cleanup } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import MdmTradeTab from "../components/maker/maker_tabs/MdmTradeTab"

import data from "../components/maker/maker_static_data/picks_2024.json"

afterEach(cleanup)

it("should update the trade partner state when a new trade partner is selected", () => {
  const { getByTestId } = render(
    <MdmTradeTab
      teams={[
        {
          id: 1,
          full_name: "Washington Commanders"
        },
        {
          id: 2,
          full_name: "New York Giants"
        }
      ]}
      selectedTeams={[
        {
          id: 3,
          full_name: "Pittsburgh Steelers"
        },
        {
          id: 4,
          full_name: "New York Jets"
        }
      ]}
      selected={[3]}
      pickData={data}
      setSelectedTeams={() => null}
      setLocalTeams={() => null}
    />
  )
  const select = getByTestId("tradePartner")
  fireEvent.change(select, { target: { value: "New York Giants" } })
  expect(select.value).toBe("New York Giants")
})

it("should update the current team state when a new current team is selected", () => {
  const { getByTestId, debug } = render(
    <MdmTradeTab
      teams={[
        {
          id: 1,
          full_name: "Washington Commanders"
        },
        {
          id: 2,
          full_name: "New York Giants"
        }
      ]}
      selectedTeams={[
        {
          id: 3,
          full_name: "Pittsburgh Steelers"
        },
        {
          id: 4,
          full_name: "New York Jets"
        }
      ]}
      selected={[3]}
      pickData={data}
      setSelectedTeams={() => null}
      setLocalTeams={() => null}
    />
  )
  const select = getByTestId("currentTeam")
  fireEvent.change(select, { target: { value: "New York Jets" } })
  expect(select.value).toBe("New York Jets")
})

it("should add or remove a pick from active trades when a pick button is clicked", async () => {
  const { getByTestId } = render(
    <MdmTradeTab
      teams={[
        {
          id: 1,
          full_name: "Washington Commanders"
        },
        {
          id: 2,
          full_name: "New York Giants"
        }
      ]}
      selectedTeams={[
        {
          id: 3,
          full_name: "Pittsburgh Steelers"
        },
        {
          id: 4,
          full_name: "New York Jets"
        }
      ]}
      selected={[3]}
      pickData={data}
      setSelectedTeams={() => null}
      setLocalTeams={() => null}
    />
  )
  const pickButton = getByTestId("currentTeam_pick_0")
  expect(pickButton).not.toHaveClass(
    "bg-primary border-base-300 text-primary-content"
  )
  fireEvent.click(pickButton)
  expect(pickButton).toHaveClass(
    "bg-primary border-base-300 text-primary-content"
  )
})

/* eslint-disable */

import React from "react"
import axios from "axios"
import { render, act } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import MdmMaker from "./MdmMaker"

// pay attention to write it at the top level of your file
const mockedUsedNavigate = jest.fn()

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate
}))

// jest.mock("axios")
// axios.get.mockResolvedValue({
//   data: [
//     { full_name: "Arizona Cardinals" },
//     { full_name: "Atlanta Falcons" },
//     { full_name: "Baltimore Ravens" },
//     { full_name: "Buffalo Bills" },
//     { full_name: "Carolina Panthers" },
//     { full_name: "Chicago Bears" },
//     { full_name: "Cincinnati Bengals" },
//     { full_name: "Cleveland Browns" },
//     { full_name: "Dallas Cowboys" },
//     { full_name: "Denver Broncos" },
//     { full_name: "Detroit Lions" },
//     { full_name: "Green Bay Packers" },
//     { full_name: "Houston Texans" },
//     { full_name: "Indianapolis Colts" },
//     { full_name: "Jacksonville Jaguars" },
//     { full_name: "Kansas City Chiefs" },
//     { full_name: "Miami Dolphins" },
//     { full_name: "Minnesota Vikings" },
//     { full_name: "New England Patriots" },
//     { full_name: "New Orleans Saints" },
//     { full_name: "New York Giants" },
//     { full_name: "New York Jets" },
//     { full_name: "Las Vegas Raiders" },
//     { full_name: "Philadelphia Eagles" },
//     { full_name: "Pittsburgh Steelers" },
//     { full_name: "Los Angeles Chargers" },
//     { full_name: "San Francisco 49ers" },
//     { full_name: "Seattle Seahawks" },
//     { full_name: "Los Angeles Rams" },
//     { full_name: "Tampa Bay Buccaneers" },
//     { full_name: "Tennessee Titans" },
//     { full_name: "Washington Commanders" }
//   ]
// })

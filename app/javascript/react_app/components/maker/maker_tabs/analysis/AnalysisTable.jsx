import React from "react"

function AnalysisTable({ tab, playerInAnalysis }) {
  return (
    <table className="table rounded-none">
      {/* head */}
      <thead>
        <tr className="font-bold">
          {playerInAnalysis?.passing && (
            <>
              {tab === "passing" && (
                <>
                  <th>Comp</th>
                  <th>Att</th>
                  <th>Comp %</th>
                  <th>Yards</th>
                  <th>Y/A</th>
                  <th>Lng</th>
                  <th>TDs</th>
                  <th>Ints</th>
                  <th>Sacked</th>
                  <th>Rtg</th>
                </>
              )}
            </>
          )}
          {playerInAnalysis?.rushing && (
            <>
              {tab === "rushing" && (
                <>
                  <th>Att</th>
                  <th>Yards</th>
                  <th>Avg</th>
                  <th>Lng</th>
                  <th>TDs</th>
                </>
              )}
            </>
          )}
          {playerInAnalysis?.receiving && (
            <>
              {tab === "receiving" && (
                <>
                  <th>Receptions</th>
                  <th>Yards</th>
                  <th>Avg</th>
                  <th>Lng</th>
                  <th>TDs</th>
                </>
              )}
            </>
          )}
          {playerInAnalysis?.defense && (
            <>
              {tab === "defense" && (
                <>
                  <td>Solo</td>
                  <td>Ast</td>
                  <td>Total</td>
                  <td>Sacks</td>
                  <td>Sk Yds</td>
                  <td>PD</td>
                  <td>Int</td>
                  <td>Int Yds</td>
                  <td>Int Lng</td>
                  <td>TDs</td>
                  <td>FFs</td>
                </>
              )}
            </>
          )}
        </tr>
      </thead>
      <tbody>
        <tr>
          {playerInAnalysis?.passing && (
            <>
              {tab === "passing" && (
                <>
                  <td>{playerInAnalysis.passing?.completions}</td>
                  <td>{playerInAnalysis.passing?.attempts}</td>
                  <td>{playerInAnalysis.passing?.completion_percent}</td>
                  <td>{playerInAnalysis.passing?.yards}</td>
                  <td>{playerInAnalysis.passing?.yards_per_attempt}</td>
                  <td>{playerInAnalysis.passing?.long}</td>
                  <td>{playerInAnalysis.passing?.touchdowns}</td>
                  <td>{playerInAnalysis.passing?.interceptions}</td>
                  <td>{playerInAnalysis.passing?.sacked}</td>
                  <td>{playerInAnalysis.passing?.rating}</td>
                </>
              )}
            </>
          )}
          {playerInAnalysis?.rushing && (
            <>
              {tab === "rushing" && (
                <>
                  <td>{playerInAnalysis.rushing?.attempts}</td>
                  <td>{playerInAnalysis.rushing?.yards}</td>
                  <td>{playerInAnalysis.rushing?.average}</td>
                  <td>{playerInAnalysis.rushing?.long}</td>
                  <td>{playerInAnalysis.rushing?.touchdowns}</td>
                </>
              )}
            </>
          )}
          {playerInAnalysis?.receiving && (
            <>
              {tab === "receiving" && (
                <>
                  <td>{playerInAnalysis.receiving?.receptions}</td>
                  <td>{playerInAnalysis.receiving?.yards}</td>
                  <td>{playerInAnalysis.receiving?.average}</td>
                  <td>{playerInAnalysis.receiving?.long}</td>
                  <td>{playerInAnalysis.receiving?.touchdowns}</td>
                </>
              )}
            </>
          )}
          {playerInAnalysis?.defense && (
            <>
              {tab === "defense" && (
                <>
                  <td>{playerInAnalysis.defense?.solo}</td>
                  <td>{playerInAnalysis.defense?.assisted}</td>
                  <td>{playerInAnalysis.defense?.total}</td>
                  <td>{playerInAnalysis.defense?.sacks}</td>
                  <td>{playerInAnalysis.defense?.sack_yards}</td>
                  <td>{playerInAnalysis.defense?.passes_deflected}</td>
                  <td>{playerInAnalysis.defense?.interceptions}</td>
                  <td>{playerInAnalysis.defense?.int_yards}</td>
                  <td>{playerInAnalysis.defense?.int_long}</td>
                  <td>{playerInAnalysis.defense?.touchdowns}</td>
                  <td>{playerInAnalysis.defense?.forced_fumbles}</td>
                </>
              )}
            </>
          )}
        </tr>
      </tbody>
    </table>
  )
}

export default AnalysisTable

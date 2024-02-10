export default {
  showProgress: true,
  steps: [
    {
      element: "#teamlist__draggables",
      popover: {
        title: "Team Selection",
        description:
          "Click on each team you wish to control in the draft.<br/><br/>You can also drag teams around to rearrange their first-round draft order.",
        side: "left",
        align: "start"
      }
    },
    {
      element: "#settings__number-of-rounds",
      popover: {
        title: "Number of Rounds",
        description: "Choose the number of rounds in the mock draft.",
        side: "top",
        align: "start"
      }
    },
    {
      element: "#settings__speed",
      popover: {
        title: "Speed",
        description: "Choose how fast the AI will select players.",
        side: "top",
        align: "start"
      }
    },
    {
      element: "#settings__needs-vs-value",
      popover: {
        title: "Needs vs Value",
        description:
          "Choose whether the AI should put emphasis on teams drafting for current needs or positional value.<br/><br/>For example, QBs are more <b>valuable</b> than other positions, but a team may not <b>need</b> a QB.",
        side: "top",
        align: "start"
      }
    },
    {
      element: "#settings__value-priority",
      popover: {
        title: "Player Value Type",
        description:
          "Choose the value the AI should put on players.<br/><br/>For example, the option <b>Offense</b> will result in the AI selecting offensive players over defensive players at a higher rate than normal.",
        side: "top",
        align: "start"
      }
    },
    {
      element: "#settings__randomness",
      popover: {
        title: "Randomness",
        description:
          "Choose how much randomness the AI should invoke in its draft. Increase to add chaos.<br/><br/>No draft goes as expected.",
        side: "top",
        align: "start"
      }
    },
    {
      element: "#settings__start",
      popover: {
        title: "Start Draft",
        description:
          "Lastly, start the draft once you've picked your team(s) and your settings.",
        side: "top",
        align: "start"
      }
    }
  ]
}
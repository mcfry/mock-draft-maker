export default {
  showProgress: true,
  steps: [
    {
      element: "#main-draft-nav__draft-info",
      popover: {
        title: "Main Draft Controls",
        description:
          "Here you can start and pause the draft, as well as obtain information on the current round and pick number.",
        side: "left",
        align: "start"
      }
    },
    {
      element: "#main-draft-nav__draft-filters",
      popover: {
        title: "Draft Filters",
        description:
          "Here you can filter players by their positions and conduct searches by their names.",
        side: "left",
        align: "start"
      }
    },
    {
      element: "#draft-tabs",
      popover: {
        title: "Draft Management",
        description:
          "Use these tabs to trade and draft players, analyze their stats, and analyze common team picks.",
        side: "left",
        align: "start"
      }
    },
    {
      element: "#picks-menu",
      popover: {
        title: "Picks menu",
        description:
          "Here you'll find a comprehensive, clickable list of every team and their associated draft picks.",
        side: "left",
        align: "start"
      }
    },
    {
      element: "#picks-menu__round-select",
      popover: {
        title: "Round select",
        description:
          "To reveal upcoming rounds, simply click here, or click back to view players chosen in previous rounds.<br/><br/>Rest assured, this feature will seamlessly update as the draft unfolds.",
        side: "left",
        align: "start"
      }
    }
  ]
}

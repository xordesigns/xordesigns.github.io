const cardData = {
  meta: {
    types: [
      {
        daemon: {
          reminder:
            "When one of your installed Daemon Interrupts is trashed, you may install it as a Function.",
        },
      },
    ],
  },
  cards: [
    {
      id: 1,
      name: "gr1m01.re",
      cleanNames: ["grimoire"],
      type: "Function",
      subtype: "Daemon",
      effects: {
        function: {
          slots: [2, 3],
          text: "Draw the top card of your trash, then draw the top card of your deck.",
        },
        interrupt: {
          text: "End the run if the intruder has no other installed Interrupts.",
        },
      },
      rulings: [
        {
          text: "Even if you have no cards in your trash, you will still draw the top card of your deck.",
        },
      ],
    },
    {
      id: 2,
      name: "Decompile",
      cleanNames: ["decompile"],
      type: "Lambda",
      subtype: null,
      effects: {
        primary: {
          slots: [1, 2, 3],
          text: "Trash 1 installed Function...",
        },
        secondary: {
          slots: [2, 3],
          text: "...or 1 installed Interrupt. (It doesn’t need to be unlocked.)",
        },
      },
      rulings: [
        {
          text: "The effect will resolve if either part of it has a valid target, provided the slot requirements are met.",
        },
      ],
    },
    {
      id: 3,
      name: "__reapeR",
      cleanNames: ["reaper"],
      type: "Function",
      subtype: null,
      effects: {
        function: {
          slots: [3],
          text: "Trash 1 installed Function or Interrupt. You may repeat this once.",
        },
        interrupt: {
          text: "The runner trashes the Function installed in this slot.",
        },
      },
    },
  ],
};

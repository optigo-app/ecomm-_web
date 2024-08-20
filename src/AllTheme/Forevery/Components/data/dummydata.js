export const faqList = [
  {
    question:
      "What's the difference between a wedding ring and a wedding band?",
    answer:
      "A wedding ring and a wedding band are synonymous phrases for the piece of jewelry exchanged between two individuals during a wedding ceremony. Both men and women wear wedding rings, which can be a basic but exquisite solid metal band or one set with diamonds and other precious gemstones.",
  },
  {
    question: "What is a three-band wedding ring?",
    answer:
      "A three-band wedding ring is a collection of bands that includes the wedding band and the engagement ring, as well as a third band that is frequently given as an anniversary gift or a push present to commemorate the birth of a child. The engagement ring is normally placed in the center of the set, with the other two rings on either side.",
  },
  {
    question: "How much do wedding rings and bands cost?",
    answer:
      "The cost of wedding rings and bands can vary widely depending on the material, style, and size of the ring. Simple bands can be purchased for a few hundred dollars, while more elaborate rings with gemstones can cost several thousand dollars.",
  },
  {
    question: "What does a wedding ring symbolize?",
    answer:
      "A wedding ring is both a private and public sign. It's a symbol of your love and faithfulness to your partner, as well as a signal to the rest of the world that you're in a serious relationship. Your lovely wedding band commemorates the vows you exchange on your wedding day, as well as your wish to be with your partner for all eternity. While your engagement ring represents the promise of marriage, it is the wedding band that seals the deal. Many of our customers are unsure if a wedding ring should contain diamonds. While we do offer several diamond-set wedding ring types, many of our most popular wedding rings for women and wedding rings for men do not.",
  },
  {
    question: "Can you combine your engagement ring and wedding ring?",
    answer:
      "Yes, you can combine your engagement ring and wedding ring. Some couples choose to wear their two rings on the same finger, while others wear them on different fingers. You can also choose to have your engagement ring and wedding band soldered together to form a single ring.",
  },
  {
    question: "What are wedding ring sets?",
    answer:
      "Wedding ring sets are two or more rings that are designed to be worn together. The rings in a set may be made of the same metal or different metals, and they may have the same or different styles. Wedding ring sets are often popular because they create a coordinated look.",
  },
  {
    question:
      "What is the difference between an engagement ring and a wedding ring?",
    answer:
      "Engagement rings are typically given as a proposal of marriage, while wedding rings are exchanged during the wedding ceremony. Engagement rings often have a large center stone, while wedding rings are typically simpler in design. However, there are no hard and fast rules, and some couples choose to use the same ring for both their engagement and wedding.",
  },
  {
    question: "Can wedding sets be soldered together?",
    answer:
      "A large number of wedding sets can be soldered together. If you intend to permanently join your wedding set, make certain that you will always wish to wear the parts together in that order. Many people appreciate the freedom to change up their wedding stack, add eternity rings, or even upgrade the rings over time, which can be difficult if they are glued together.",
  },
  {
    question: "What metals do wedding bands come in?",
    answer:
      "We provide wedding rings for men and women in popular metals that are made to last. Wedding bands are available in a variety of metals, including platinum, white gold, rose gold, yellow gold, cobalt, tantalum, titanium, and tungsten.",
  },
  {
    question: "How much money should you spend on a wedding ring?",
    answer:
      "There is no right or wrong answer to the question of how much money to spend on a wedding ring. The most important thing is to choose a ring that you love and that you can afford. Some couples choose to spend a significant amount of money on their wedding rings, while others choose to spend a more modest amount.",
  },
  {
    question: "How can I style my engagement ring and wedding band together?",
    answer:
      "There are almost unlimited ways to style a wedding set with so many wedding ring designs and combinations. Some people prefer to mix metals to create a mismatched set of stacked wedding bands. Others like distinctive ring styles, such as twisted wedding bands or milgrain wedding bands.",
  },
  {
    question: "Are there wedding rings with gemstones?",
    answer:
      "Yes, there are wedding rings with gemstones. Wedding rings with gemstones can be a beautiful way to add a touch of personality and style to your wedding ring. Some popular gemstones for wedding rings include diamonds, sapphires, rubies, and emeralds. There are almost unlimited ways to style a wedding set with so many wedding ring designs and combinations. Some people prefer to mix metals to create a mismatched set of stacked wedding bands. Others like distinctive ring styles, such as twisted wedding bands or milgrain wedding bands.",
  },
  {
    question: "Which wedding band looks are popular?",
    answer:
      "Popular wedding sets feature classic metals and aesthetics. Many couples opt for gold wedding ring sets for a classic appeal, but other metals such as tungsten and platinum can provide outstanding style. With so many different wedding ring designs to pick from, the most popular types nowadays are those that best complement the wearer's personality.",
  },
];


export const AdvancesfiltersOption = {
  polish: {
    label: "Polish",
    type: "multi-select",
    options: [
      { value: "EXCELLENT", label: "Excellent" },
      { value: "VERY_GOOD", label: "Very Good" },
      { value: "GOOD", label: "Good" },
      { value: "NONE", label: "None" },
    ]
  },
  symmetry: {
    label: "Symmetry",
    type: "multi-select",
    options: [
      { value: "EXCELLENT", label: "Excellent" },
      { value: "VERY_GOOD", label: "Very Good" },
      { value: "GOOD", label: "Good" },
      { value: "FAIR", label: "Fair" },
      { value: "NONE", label: "None" },
    ]
  },
  lab: {
    label: "Lab",
    type: "multi-select",
    options: [
      { value: "GIA", label: "GIA" },
      { value: "HRD", label: "HRD" },
      { value: "IGI", label: "IGI" },
    ]
  },
  depth: {
    label: "Depth",
    type: "range",
    min: 0.0,
    max: 8.51,
    default: [0.0, 8.51]
  },
  table: {
    label: "Table",
    type: "range",
    min: 0.0,
    max: 76.0,
    default: [0.0, 76.0]
  },
  fluorescence: {
    label: "Fluorescence",
    type: "multi-select",
    options: [
      { value: "NONE", label: "None" },
      { value: "VERY_SLIGHT", label: "Very Slight" },
      { value: "SLIGHT", label: "Slight" },
      { value: "FAINT", label: "Faint" },
      { value: "MEDIUM", label: "Medium" },
      { value: "STRONG", label: "Strong" },
      { value: "VERY_STRONG", label: "Very Strong" },
    ]
  }
};

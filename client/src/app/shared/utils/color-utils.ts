export function getColorTags() {
  const colors = [
    "#702963",
    "#46ABDF",
    "#FFEA33",
    "#33FFD4",
    "#33BCFF",
    "#26BF47",
    "#FFAC1C",
    "#FF0000",
    "#FF5733",
  ];

  const hoverColors = [
    "#59234f",
    "#3484ad",
    "#d6c636",
    "#3de3c0",
    "#35a5db",
    "#26ad43",
    "#c98f2a",
    "#d41313",
    "#d9563b",
  ];

  const colorIndex = Math.floor(Math.random() * colors.length);
  return {
    hoverColor: hoverColors[colorIndex],
    color: colors[colorIndex],
  };
}

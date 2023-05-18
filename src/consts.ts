export const generateItems = (count: number) => {
  const items = [];
  for (let i = 0; i < count; i++) {
    items.push({
      label: `Item ${i + 1}`,
      id: `item-${i + 1}`,
      value: i + 1,
    });
  }
  return items;
}

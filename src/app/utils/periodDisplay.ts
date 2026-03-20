function formatShortDate(dateValue: string) {
  const parsedDate = new Date(`${dateValue}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return dateValue;
  }

  return parsedDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

export function formatPeriodRange(periodName: string) {
  const [startDate, endDate] = periodName.split(' to ');

  if (!startDate || !endDate) {
    return periodName;
  }

  return `${formatShortDate(startDate)} → ${formatShortDate(endDate)}`;
}

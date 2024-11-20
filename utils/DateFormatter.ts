enum DateType {
  TODAY = 0,
  FIVE_DAYS = 1,
  ONE_MONTH = 2,
  SIX_MONTHS = 3,
  ONE_YEAR = 4,
  FIVE_YEARS = 5
}

export default function DateFormatter(date: string | Date, formatOptions?: number): string {
  if (typeof date === 'string') {
    date = new Date(date);
  }

  if (formatOptions == DateType.TODAY) {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      hour12: true,
      timeZone: 'UTC'
    }).format(date);
  }

  if (formatOptions == DateType.FIVE_DAYS || formatOptions == DateType.ONE_MONTH) {
    const formatter = new Intl.DateTimeFormat('en-US', {
      month: '2-digit',
      day: '2-digit'
    });
    return formatter.format(date);
  }

  if (formatOptions == DateType.SIX_MONTHS || formatOptions == DateType.ONE_YEAR){
    const formatter = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short'
    });

    return formatter.format(date);
  }

  const options: Intl.DateTimeFormatOptions = { year: 'numeric' };
  const formatter = new Intl.DateTimeFormat('en-US', options);

  return formatter.format(date);
}
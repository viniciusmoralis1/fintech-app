enum DateType {
  TODAY = 0,
  FIVE_DAYS = 1,
  ONE_MONTH = 2,
  SIX_MONTHS = 3,
  ONE_YEAR = 4
}

export function DateFormatter(date: string | Date, formatOptions?: number): string {
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
};

export function GenerateDate(activeIndex: number){
  const today = new Date();
  const resultDate = new Date(today);

  switch (activeIndex) {
    case DateType.FIVE_DAYS:
      resultDate.setDate(today.getDate() - 5);
      break;
    case DateType.ONE_MONTH:
      resultDate.setMonth(today.getMonth() - 1);
      break;
    case DateType.SIX_MONTHS:
      resultDate.setMonth(today.getMonth() - 6);
      break;
    case DateType.ONE_YEAR:
      resultDate.setMonth(today.getMonth() - 11);
      resultDate.setDate(today.getDate() - 25);
      break;
    case DateType.TODAY:
    default:
      break;
  }

  return resultDate;
}

export function GenerateInterval(activeIndex: number){
  if(activeIndex == DateType.TODAY)
    return "1h";
  if(activeIndex == DateType.FIVE_DAYS || activeIndex == DateType.ONE_MONTH)
    return "1d";
  if(activeIndex == DateType.SIX_MONTHS)
    return "7d";
  else
    return "14d";
}
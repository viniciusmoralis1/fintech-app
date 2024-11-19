export default function DateFormatter(date?: string | Date) {
  if(typeof date == 'string'){
    date = new Date(date);
  }

  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit' };
  const formatter = new Intl.DateTimeFormat('en-US', options);

  if(!date) {
    const today = new Date();

    return formatter.format(today);
  }

  return formatter.format(date);
}
export const parseRelativeDate = (
  dateString: string,
  timeString: string
): Date | null => {
  try {
    // Define a map of month names to month numbers
    const months: { [key: string]: number } = {
      January: 0,
      February: 1,
      March: 2,
      April: 3,
      May: 4,
      June: 5,
      July: 6,
      August: 7,
      September: 8,
      October: 9,
      November: 10,
      December: 11,
    };

    // Remove day of the week and any comma
    const cleanedDateString = dateString.replace(/(\w+),?/, '').trim(); // Remove day name and comma
    const dateParts = cleanedDateString.split(' ');

    if (dateParts.length < 3) {
      console.error('Invalid date format:', dateString);
      return null;
    }

    const [dayPart, , monthName] = dateParts;
    const day = parseInt(dayPart.replace(/\D/g, ''), 10); // Remove any non-digit characters (e.g., "22nd" -> "22")
    const month = months[monthName];
    const year = new Date().getFullYear(); // Assume the current year

    if (month === undefined || isNaN(day)) {
      console.error('Invalid date format:', dateString);
      return null;
    }

    // Manually create the Date object using year, month, and day
    const targetDate = new Date(year, month, day);

    // Parse the time in 24-hour format (e.g., "11:00")
    const [hours, minutes] = timeString.split(':').map(Number);
    targetDate.setHours(hours, minutes, 0, 0);

    console.log('Parsed date:', targetDate);
    return targetDate;
  } catch (error) {
    console.error('Error parsing date:', error);
    return null;
  }
};

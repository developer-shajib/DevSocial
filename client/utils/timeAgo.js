// <!-- Time ago calculate function -->

export const timeAgo = (date) => {
  const secondsPerMinute = 60;
  const secondsPerHour = 3600;
  const secondsPerDay = 86400;
  const secondsPerMonth = 2592000;
  const secondsPerYear = 31536000;

  const currentDate = new Date();
  const timestamp = new Date(date).getTime();
  const currentTimestamp = currentDate.getTime();

  const secondsAgo = Math.floor((currentTimestamp - timestamp) / 1000);

  if (secondsAgo < secondsPerMinute) {
    return secondsAgo === 1 ? `${secondsAgo} second ago` : `${secondsAgo} seconds ago`;
  } else if (secondsAgo < secondsPerHour) {
    const minutesAgo = Math.floor(secondsAgo / secondsPerMinute);
    return minutesAgo === 1 ? `${minutesAgo} minute ago` : `${minutesAgo} minutes ago`;
  } else if (secondsAgo < secondsPerDay) {
    const hoursAgo = Math.floor(secondsAgo / secondsPerHour);
    return hoursAgo === 1 ? `${hoursAgo} hour ago` : `${hoursAgo} hours ago`;
  } else if (secondsAgo < secondsPerMonth) {
    const daysAgo = Math.floor(secondsAgo / secondsPerDay);
    return daysAgo === 1 ? `${daysAgo} day ago` : `${daysAgo} days ago`;
  } else if (secondsAgo < secondsPerYear) {
    const monthsAgo = Math.floor(secondsAgo / secondsPerMonth);
    return monthsAgo === 1 ? `${monthsAgo} month ago` : `${monthsAgo} months ago`;
  } else {
    const yearsAgo = Math.floor(secondsAgo / secondsPerYear);
    return yearsAgo === 1 ? `${yearsAgo} year ago` : `${yearsAgo} years ago`;
  }
};

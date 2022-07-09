import dayjs from 'dayjs';
import 'dayjs/locale/id';

dayjs.locale('id');

export function FormatDate(date) {
  if (typeof date === 'string') {
    return dayjs(date).format('D MMM YY, hh:mm A');
  }
}

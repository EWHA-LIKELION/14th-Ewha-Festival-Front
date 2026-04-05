import { HOST } from '@/constants/host';
import { BOOTH_CATEGORY, SHOW_CATEGORY, ETC_CATEGORY } from '@/constants/category';
import { BOOTH_LOCATION, SHOW_LOCATION } from '@/constants/building';
import { BOOTH_SORT, SHOW_SORT } from '@/constants/sort';
import { FESTIVAL_DAYS } from '@/constants/day';

export const filterConfig = {
  booth: {
    host: HOST,
    category: BOOTH_CATEGORY,
    day: FESTIVAL_DAYS,
    location: BOOTH_LOCATION,
    sort: BOOTH_SORT,
  },
  show: {
    category: SHOW_CATEGORY,
    day: FESTIVAL_DAYS,
    location: SHOW_LOCATION,
    sort: SHOW_SORT,
  },
  etc: {
    category: ETC_CATEGORY,
    location: BOOTH_LOCATION,
  },
};

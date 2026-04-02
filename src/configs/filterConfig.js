import { HOST } from '@/constants/host';
import { BOOTH_CATEGORY, SHOW_CATEGORY, ETC_CATEGORY } from '@/constants/category';
import { BOOTH_LOCATION, SHOW_LOCATION } from '@/constants/building';
import { BOOTH_SORT, SHOW_SORT } from '@/constants/sort';
import { FESTIVAL_DAYS } from '@/constants/day';

export const filterConfig = {
  booth: {
    hosts: HOST,
    categories: BOOTH_CATEGORY,
    days: FESTIVAL_DAYS,
    locations: BOOTH_LOCATION,
    sorts: BOOTH_SORT,
  },
  show: {
    categories: SHOW_CATEGORY,
    days: FESTIVAL_DAYS,
    locations: SHOW_LOCATION,
    sorts: SHOW_SORT,
  },
  etc: {
    categories: ETC_CATEGORY,
    locations: BOOTH_LOCATION,
  },
};

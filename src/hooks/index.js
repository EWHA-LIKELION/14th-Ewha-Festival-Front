//export { default as useIsMobile } from "./useIsMobile";
//사용하는 쪽에서 import { useIsMobile } from "@/hooks"; 이렇게 불러와서 사용

export { default as useImageUploader } from './useImageUploader.js';
export { useInfiniteList, buildQueryParams } from './useInfiniteList.js';
export { useInfiniteScroll } from './useInfiniteScroll.js';
export { default as useScrollToTop } from './useScrollToTop.js';

// booth
export { useBooths } from './booth/useBooths.js';
export { useBoothDetail, useBoothNotices, useUpdateBooth } from './booth/useBoothDetail.js';

// show
export { useShows } from './show/useShows.js';
export { useShowDetail, useShowNotices, useUpdateShow } from './show/useShowDetail.js';

// my
export { useMyProfile } from './my/useMyProfile.js';
export { useMyScrapBooths, useMyScrapShows } from './my/useMyScrap.js';

// search
export { usePopularKeywords } from './search/usePopularKeywords.js';
export { useSearch } from './search/useSearch.js';
export { useSearchResults } from './search/useSearchResults.js';

// map
export { default as useMapActiveSync } from './map/useMapActiveSync.js';
export { default as useMapAssets } from './map/useMapAssets.js';
export { default as useMapFilterSync } from './map/useMapFilterSync.js';
export { default as useMapFocus } from './map/useMapFocus.js';

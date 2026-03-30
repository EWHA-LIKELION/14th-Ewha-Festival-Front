// 공통 axios 인스턴스
export { default as api } from './api';

export * as AuthAPI from './accounts/auth';
export * as AdminAPI from './accounts/admin';
export * as MeAPI from './accounts/me';
export * as ScrapAPI from './accounts/scraps';

export * as SearchAPI from './searches/search';
export * as BoothAPI from './booths/booth';
export * as ShowAPI from './shows/show';

//사용하는 쪽에서 import { AuthAPI } from "@/apis"; 이렇게 불러와서 사용

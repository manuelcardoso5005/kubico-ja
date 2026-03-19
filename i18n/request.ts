import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';

export default getRequestConfig(async ({requestLocale}) => {
  let locale = await requestLocale;
 
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  // Esta parte faz a "mágica" de juntar os arquivos
  // Se você tiver home.json e common.json, as chaves serão {home: {...}, common: {...}}
  return {
    locale,
    messages: {
      common: (await import(`../messages/${locale}/common.json`)).default,
      header: (await import(`../messages/${locale}/header.json`)).default,
      authorization: (await import(`../messages/${locale}/authorization.json`)).default,
      //home: (await import(`../messages/${locale}/home.json`)).default,
    }
  };
});
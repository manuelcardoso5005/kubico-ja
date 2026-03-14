import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
 
export default createMiddleware(routing);
 
export const config = {
  // Captura todas as rotas, menos arquivos do sistema (como favicon)
  matcher: ['/', '/(pt|en)/:path*']
};
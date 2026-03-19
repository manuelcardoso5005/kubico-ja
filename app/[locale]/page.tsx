import {useTranslations} from 'next-intl';


 
export default function HomePage() {
  const t = useTranslations('common');
  return <button>{t('botao_entrar')}</button>;
}
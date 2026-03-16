import {useTranslations} from 'next-intl';


 
export default function HomePage() {
  const t = useTranslations('common');
  return <div className=''>{t('botao_entrar')}</div>;
}
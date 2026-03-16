import {useTranslations} from 'next-intl';


 
export default function HomePage() {
  const t = useTranslations('common');
  return <div className='w-full h-[1000px] bg-slate-600'>{t('botao_entrar')}</div>;
}
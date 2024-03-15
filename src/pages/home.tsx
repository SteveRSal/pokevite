import { useTranslation } from 'react-i18next';

import { HOME_NS } from '@/constants/i18n';

export function Component() {
  const { t } = useTranslation([HOME_NS]);

  return (
    <main role="main">
      <h1>{t('title')}</h1>
    </main>
  );
}

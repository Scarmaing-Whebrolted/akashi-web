import { FC } from 'react';

import PageLayout from '@/components/common/layout/page-layout';
import LoginPage from '@/components/pages/login-page';

const Login: FC = () => {
  return (
    <PageLayout
      hasHeader={false}
      hasFooter={false}
      title="Authorization in Akashi"
      robots="noindex"
    >
      <LoginPage />
    </PageLayout>
  );
};

export default Login;

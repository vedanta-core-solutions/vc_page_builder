import ConfigProviderClient from '@/context/ConfigProviderClient';
import { loadConfig } from '../../lib/config';
import Header from '../../components/Header';
import Footer from '../../components/Footer.jsx';

export default async function BizPage({ params }) {
  const { bizType } = await params;
  const config = await loadConfig(bizType);
  if (!config) {
    // simple 404 / fallback
    return <div className="p-8 text-center">Business type “{bizType}” not found</div>;
  }

  // const { theme = {}, content = {} } = config;

  return (
 
    <ConfigProviderClient config={config}>
      <Header/>
      <Footer/>
    </ConfigProviderClient>
  );
}

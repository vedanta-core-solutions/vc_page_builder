import ConfigProviderClient from '@/context/ConfigProviderClient';
import { loadConfig } from '../../lib/config';
import Header from '../../components/Header';
import Hero from '../../components/Hero';


export default async function BizPage({ params }) {
  const { bizType } = await params;
  const config = await loadConfig(bizType);
  if (!config) {
    // simple 404 / fallback
    return <div className="p-8 text-center">Business type “{bizType}” not found</div>;
  }

  // const { theme = {}, content = {} } = config;

  return (
    // <div style={{
    //   backgroundColor: theme.bgColor || '#fff',
    //   color: theme.textColor || '#000',
    //   fontFamily: theme.fontFamily || 'sans-serif'
    // }}>
    //   {/* Example rendering: adjust based on your config keys */}
    //   <header className="p-4">
    //     {theme.logo && <img src={theme.logo} alt="Logo" className="h-12" />}
    //   </header>

    //   <main className="p-6">
    //     {content.hero && (
    //       <section className="mb-8">
    //         <h1 className="text-4xl font-bold">{content.hero.title}</h1>
    //         {content.hero.subtitle && <p className="mt-2 text-xl">{content.hero.subtitle}</p>}
    //       </section>
    //     )}

    //     {content.menu && (
    //       <section className="mb-8">
    //         <h2 className="text-2xl font-semibold">Menu</h2>
    //         <ul className="list-disc pl-5 mt-2">
    //           {content.menu.map((m, i) => (
    //             <li key={i}>{m.name} — ₹{m.price}</li>
    //           ))}
    //         </ul>
    //       </section>
    //     )}

    //     {content.products && (
    //       <section className="mb-8">
    //         <h2 className="text-2xl font-semibold">Products</h2>
    //         <ul className="list-disc pl-5 mt-2">
    //           {content.products.map((p, i) => (
    //             <li key={i}>{p.name} — ₹{p.price}</li>
    //           ))}
    //         </ul>
    //       </section>
    //     )}

    //     {content.about && (
    //       <section className="mb-8">
    //         <h2 className="text-2xl font-semibold">About</h2>
    //         <p className="mt-2">{content.about}</p>
    //       </section>
    //     )}

    //     {content.contact && (
    //       <footer className="pt-8 border-t">
    //         <h3 className="text-lg font-medium">Contact Us</h3>
    //         <p>{content.contact.phone}</p>
    //         <p>{content.contact.address}</p>
    //       </footer>
    //     )}
    //   </main>
    // </div>
    <ConfigProviderClient config={config}>
      <Header/>
      <Hero />
    </ConfigProviderClient>
  );
}

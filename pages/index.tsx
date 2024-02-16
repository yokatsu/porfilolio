import Head from 'next/head';
import { GetStaticProps } from 'next';
import HeroSection from '../components/home/HeroSection';
import AboutSection from '../components/home/AboutSection';
import PortfolioSection from '../components/home/PortfolioSection';
import BlogSection from '../components/home/BlogSection';
import ContactSection from '../components/home/ContactSection';
import Script from 'next/script';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const response = await import(`../locales/${locale}.json`);

  return {
    props: {
      content: response.default,
    },
  };
};

export default function Index({
  content,
}: {
  content: typeof import('../locales/en.json');
}) {
  const {
    defaultSeo,
    heroData,
    aboutData,
    portfolioData,
    blogData,
    contactData,
  } = content;

  const { title, description, url, previewImage } = defaultSeo;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={description} name="description" />
        <meta
          content="portfolio, personal website, web developer, desenvolvedor fullstack"
          name="keywords"
        />
        <meta content="English" name="language" />
        <meta content="Yuri Oliveira" name="author" />
        <link href="/favicon.ico" rel="icon" />

        {/* Open Graph */}
        <meta key="ogtitle" content={title} property="og:title" />
        <meta key="ogdesc" content={description} property="og:description" />
        <meta content="website" property="og:type" />
        <meta key="ogurl" content={url} property="og:url" />
        <meta key="ogimage" content={previewImage} property="og:image" />
      </Head>

      {/* Google Analytics */}
      <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-KJGJKYN5P7" />
      <Script
        id='google-analytics'
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments)};
            gtag('js', new Date());
            gtag('config', 'G-KJGJKYN5P7', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />

      <HeroSection heroData={heroData} />
      <AboutSection aboutData={aboutData} />
      <PortfolioSection portfolioData={portfolioData} />
      <BlogSection blogData={blogData} />
      <ContactSection contactData={contactData} />
    </>
  );
}

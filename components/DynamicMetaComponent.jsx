import Head from 'next/head';

const DynamicMetaComponent = ({ title, description, keywords }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>

      <main>
        <h1>{title}</h1>
        <p>{description}</p>
      </main>
    </>
  );
};


export default DynamicMetaComponent;

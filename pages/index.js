import { Layout } from "../views/Layout";
import {
  ResourceHighlite,
  NewsLetter,
  ResourceList,
  Footer,
} from "../comonents";

export default function Home({ resources }) {
  return (
    <Layout>
      <ResourceHighlite resources={resources.slice(0, 2)} />
      <NewsLetter />
      <ResourceList resources={resources.slice(2)} />
      <Footer />
    </Layout>
  );
}

export async function getServerSideProps() {
  const response = await fetch(`${process.env.API_URL}/resources`);
  const data = await response.json();

  return {
    props: { resources: data },
  };
}

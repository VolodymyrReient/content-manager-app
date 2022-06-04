import axios from "axios";
import { Layout } from "../../../views/Layout";
import { ResourceForm } from "../../../comonents";

const ResourceEdit = ({ resource }) => {
  const updateResource = (form) => {
    axios
      .patch("/api/resources", form)
      .then(() => alert("data has been updated"))
      .catch((err) => alert(err?.response?.data));
  };

  return (
    <Layout>
      <div className="container">
        <div className="columns">
          <div className="column is-8 is-offset-2">
            <ResourceForm
              onFormSubmit={updateResource}
              initialData={resource}
              pageTitle="Edit Resource"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  const { id } = params;

  const dataRes = await fetch(`${process.env.API_URL}/resources/${id}`);
  const data = await dataRes.json();

  return {
    props: {
      resource: data,
    },
  };
}

export default ResourceEdit;

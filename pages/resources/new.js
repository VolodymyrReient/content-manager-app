import axios from "axios";
import { useRouter } from "next/router";
import { ResourceForm } from "../../comonents";
import { Layout } from "../../views/Layout";

const RecourceCreate = () => {
  const router = useRouter();

  const createRecource = (form) => {
    axios
      .post("/api/resources", form)
      .then(() => router.push("/"))
      .catch((err) => console.error(err?.response?.data));
  };

  return (
    <Layout>
      <div className="container">
        <div className="columns">
          <div className="column is-8 is-offset-2">
            <ResourceForm
              onFormSubmit={createRecource}
              pageTitle="Add New Resource"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RecourceCreate;

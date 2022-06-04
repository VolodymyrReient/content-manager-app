import Link from "next/link";
import axios from "axios";
import moment from "moment";
import { Layout } from "./../../../views/Layout/Layout";
import { ResourceLabel } from "./../../../comonents/ResourceLabel";

const ResourceDetail = ({ resource }) => {
  const activeResource = () => {
    axios
      .patch("/api/resources", { ...resource, status: "active" })
      .then(() => location.reload())
      .catch(() => alert("Cannot activate the resource"));
  };

  return (
    <Layout>
      <section className="hero ">
        <div className="hero-body">
          <div className="container">
            <section className="section">
              <div className="columns is-multiline is-variable is-8">
                <div className="column is-5 is-offset-1">
                  <div className="content is-medium">
                    <h2 className="subtitle is-5 has-text-grey">
                      {moment(resource.createAt).format("LLL")}
                      <ResourceLabel status={resource.status} />
                    </h2>
                    <h1 className="title has-text-black is-3">
                      {resource.title}
                    </h1>
                    <p className="has-text-dark">{resource.description}</p>
                    <p className="has-text-dark">
                      Time to finish: {resource.timeToFinish} minutes
                    </p>

                    {resource.status === "inactive" && (
                      <>
                        <Link href={`/resources/${resource.id}/edit`}>
                          <a className="button is-warning">Update</a>
                        </Link>
                        <button
                          className="button is-success ml-1"
                          onClick={activeResource}
                        >
                          Activate
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
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

export default ResourceDetail;

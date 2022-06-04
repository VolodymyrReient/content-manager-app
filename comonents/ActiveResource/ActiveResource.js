import Link from "next/link";
import axios from "axios";
import moment from "moment";
import { useState, useEffect } from "react";

export const ActiveResource = () => {
  const [resource, setResource] = useState({});
  const [seconds, setSeconds] = useState();

  async function fetchResource() {
    const res = await axios.get("/api/activeResource");
    const resourceData = res.data;
    const timeToFinish = parseInt(resourceData.timeToFinish, 10);
    const elapsedTime = moment().diff(
      moment(resourceData.activationTime),
      "seconds"
    );

    const updatedTimeToFinish = timeToFinish * 60 - elapsedTime;

    setResource(resourceData);

    if (updatedTimeToFinish >= 0) {
      setSeconds(updatedTimeToFinish);
      setResource((prev) => ({ ...prev, timeToFinish: updatedTimeToFinish }));
    }
  }

  useEffect(() => {
    fetchResource();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds - 1);
    }, 1000);

    if (seconds < 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [seconds]);

  const hasResource = resource && resource.id;

  const completeResource = () => {
    axios
      .patch("/api/resources", { ...resource, status: "complete" })
      .then(() => location.reload())
      .catch(() => alert("Cannot complete the resource"));
  };

  return (
    <div className="active-resource">
      <h1 className="resource-name">
        {hasResource ? resource.title : "No Resource Active"}
      </h1>

      <div className="time-wrapper">
        {hasResource &&
          (seconds > 0 ? (
            <h2 className="elapsed-time">{seconds}</h2>
          ) : (
            <h2 className="elapsed-time">
              <button className="button is-success" onClick={completeResource}>
                Click and Done!
              </button>
            </h2>
          ))}
      </div>

      {hasResource ? (
        <Link href={`/resources/${resource.id}`}>
          <a className="button">Go to a resource</a>
        </Link>
      ) : (
        <Link href="/">
          <a className="button">Go to a resources</a>
        </Link>
      )}
    </div>
  );
};

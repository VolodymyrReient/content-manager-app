import { useState } from "react";

const DEFAULT_DATA = {
  title: "",
  description: "",
  link: "",
  priority: "2",
  timeToFinish: 60,
};

export const ResourceForm = ({ onFormSubmit, initialData, pageTitle }) => {
  const [form, setForm] = useState(initialData || DEFAULT_DATA);

  const handleChahge = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const resetForm = (e) => {
    e.preventDefault();
    setForm(DEFAULT_DATA);
  };

  const submitForm = (e) => {
    e.preventDefault();
    onFormSubmit(form);
  };

  return (
    <div className="resource-form">
      <h1 className="title">{pageTitle}</h1>
      <form>
        <div className="field">
          <label className="label">Title</label>
          <div className="control">
            <input
              value={form.title}
              name="title"
              onChange={handleChahge}
              className="input"
              type="text"
              placeholder="Learn Next JS and Sanity IO"
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Description</label>
          <div className="control">
            <textarea
              onChange={handleChahge}
              value={form.description}
              name="description"
              className="textarea"
              placeholder="Learn these techologies because they are wery popular and enable better SEO"
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Link</label>
          <div className="control">
            <input
              value={form.link}
              onChange={handleChahge}
              name="link"
              className="input"
              type="text"
              placeholder="link to support materials"
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Priority</label>
          <div className="control">
            <div className="select">
              <select
                value={form.priority}
                name="priority"
                onChange={handleChahge}
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
            </div>
          </div>
        </div>

        <div className="field">
          <label className="label">Time to finish</label>
          <div className="control">
            <input
              value={form.timeToFinish}
              onChange={handleChahge}
              name="timeToFinish"
              className="input"
              type="number"
            />
          </div>
          <p className="help">Time in minutes</p>
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link" onClick={submitForm}>
              Submit
            </button>
          </div>
          <div className="control">
            <button className="button is-link is-light" onClick={resetForm}>
              Reset Form
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

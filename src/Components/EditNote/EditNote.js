import React, { Component } from "react";
import PropTypes from "prop-types";
import NotefulContext from "../NotefulContext/NotefulContext";
import config from "../../config";

const Required = () => <span className="EditNote__required">*</span>;

export default class EditNote extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.object,
    }),
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
  };

  static contextType = NotefulContext;

  state = {
    error: null,
    id: "",
    name: "",
    date_modified: "",
    folder_id: "",
    content: "",
  };

  componentDidMount() {
    const noteId = this.props.match.params.noteId;
    fetch(`${config.API_ENDPOINT}/notes/${noteId}`)
      .then((res) => {
        if (!res.ok) return res.json().then((error) => Promise.reject(error));

        return res.json();
      })
      .then((responseData) => {
        this.setState({
          id: responseData.id,
          name: responseData.name,
          date_modified: responseData.date_modified,
          folder_id: responseData.folder_id,
          content: responseData.content,
        });
      })
      .catch((error) => {
        console.error(error);
        this.setState({ error });
      });
  }

  handleChangeName = (e) => {
    this.setState({ name: e.target.value });
  };

  handleChangeContent = (e) => {
    this.setState({ content: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { noteId } = this.props.match.params;
    const { id, name, content } = this.state;
    const newNote = { id, name, content };
    fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
      method: "PATCH",
      body: JSON.stringify(newNote),
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${config.API_KEY}`,
      },
    })
      .then((res) => {
        if (!res.ok) return res.json().then((error) => Promise.reject(error));
      })
      .then(() => {
        this.resetFields(newNote);
        this.context.updateNote(newNote);
        this.props.history.push("/");
      })
      .catch((error) => {
        console.error(error);
        this.setState({ error });
      });
  };

  resetFields = (newFields) => {
    this.setState({
      id: newFields.id || "",
      name: newFields.name || "",
      date_modified: newFields.date_modified || "",
      folder_id: newFields.folder_id || "",
      content: newFields.content || "",
    });
  };

  render() {
    const { error, name, content } = this.state;

    return (
      <section className="EditNote">
        <h2>Edit note</h2>
        <form className="editNote" onSubmit={this.handleSubmit}>
          <div className="editNote_error" role="alert">
            {error && <p>{error.message}</p>}
          </div>
          <input type="hidden" name="id" />
          <div>
            <label htmlFor="title">
              Name <Required />
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Great name!"
              required
              value={name}
              onChange={this.handleChangeName}
            />
          </div>

          <div>
            <label htmlFor="content">
              Content <Required />
            </label>
            <input
              type="content"
              name="content"
              id="content"
              placeholder="Great content"
              required
              value={content}
              onChange={this.handleChangeContent}
            />
          </div>
          <button type="submit">Save</button>
        </form>
      </section>
    );
  }
}

import React, { Component } from "react";
import config from "./config";
import FolderNav from "./FolderNav";
import Context from "./NotefulContext";

export default class AddFolder extends Component {
  static contextType = Context;
  state = {
    name: {
      value: " ",
      touched: false,
    },
  };

  updateName(name) {
    this.setState({ name: { value: name, touched: true } });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { name } = this.state;
    this.setState({ error: null });

    fetch(`${config.API_ENDPOINT}/folders`, {
      method: "POST",

      headers: {
        "content-type": "application/json",
        authorization: `bearer ${config.API_KEY}`,
      },
      body: JSON.stringify({ name: name.value }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((error) => {
            throw error;
          });
        }
        return res.json();
      })
      .then((data) => {
        console.log("added folder");
        this.context.addFolder(data);
        this.props.history.push("/");
      })
      .catch((error) => {
        this.setState({ error });
      });
  };

  render() {
    return (
      <>
        <FolderNav />
        <form className="addFolder" onSubmit={this.handleSubmit}>
          <div className="addFolder_form">
            <label htmlFor="foldername"> Folder Name</label>
            <input
              type="text"
              className="addFolder_text"
              name="name"
              id="name"
              onChange={(e) => this.updateName(e.target.value)}
            />
          </div>
          <button type="submit" className="addFolder_button">
            Add Folder
          </button>
        </form>
      </>
    );
  }
}

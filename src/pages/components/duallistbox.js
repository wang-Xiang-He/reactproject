import React from "react";
import DualListBox from "react-dual-listbox";
import "react-dual-listbox/lib/react-dual-listbox.css";

const options = [
  { value: "one", label: "Option One" },
  { value: "two", label: "Option Two" },
];

class Duallist extends React.Component {
  state = {
    selected: [{ value: "one" }],
  };

  onChange = (selected) => {
    this.setState({ selected });
  };

  render() {
    const { selected } = this.state;

    return (
      <DualListBox
        canFilter
        options={options}
        simpleValue={false}
        selected={selected}
        onChange={this.onChange}
        preserveSelectOrder
        showOrderButtons
      />
    );
  }
}

export default Duallist;

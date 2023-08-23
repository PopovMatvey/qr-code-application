import React, { Component } from "react";
import DropdownTreeSelect from "react-dropdown-tree-select";
// Это тот, который мне нужен!
export default class HOC extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      // mode: "showPartiallySelected",
      // mode: "hierarchical",
      mode: props.mode,
      // mode: "radioSelect",
      // mode: "simpleSelect",
      // showPartiallySelected: true,
      texts: {
        // placeholder: "Поиск доп. работ",              // optional: The text to display as placeholder on the search box. Defaults to `Choose...`
        placeholder: props.placeholder,              // optional: The text to display as placeholder on the search box. Defaults to `Choose...`
        inlineSearchPlaceholder: "Поиск...",          // optional: The text to display as placeholder on the inline search box. Only applicable with the `inlineSearchInput` setting. Defaults to `Search...`
        noMatches: "Совпадений не найдено",           // optional: The text to display when the search does not find results in the content list. Defaults to `No matches found`
        label: "label",                               // optional: Adds `aria-labelledby` to search input when input starts with `#`, adds `aria-label` to search input when label has value (not containing '#')
        labelRemove: "labelRemove",                   // optional: The text to display for `aria-label` on tag delete buttons which is combined with `aria-labelledby` pointing to the node label. Defaults to `Remove`
    }, 
    //showDropdown: "always",
    //showDropdown: "initial ",
    };
    //this.onChange = this.onChange.bind(this);
  }

  // prepareData = data => {
  //   // optional: you can skip cloning if you don't mind mutating original data
  //   var cloned = data.slice(0);

  //      // insert special select all node
  //   // Это добавление галочки "Выбрать все"
  //   // cloned.splice(0, 0, {
  //   //   label: "Выбрать все",
  //   //   value: "selectAll",
  //   //   className: "select-all",
  //   // });

  //   return cloned;
  // };

  // toggleAll = checked => {
  //   const { data } = this.state;
  //   for (var i = 1; i < data.length; i++) {
  //     data[i].checked = checked;
  //   }
  //   this.setState({ data });
  // };

  // handleChange = ({ value, checked }) => {
  //   if (value === "selectAll") this.toggleAll(checked);
  // };

  
  // onChange = (currentNode, selectedNodes) => {
  //   console.log('onChange::', currentNode, selectedNodes)
  // }
  // onAction = (node, action) => {
  //   console.log('onAction::', action, node)
  // }
  // onNodeToggle = currentNode => {
  //   console.log('onNodeToggle::', currentNode)
  // }
  // onFocus = e => {
  //   console.log("Зашли по Focus!");
  // }
  // onBlur = e => {
  //   console.log("Зашли по Blur!");
  // }
 
  render() {
    this.state.data = this.props.data;
    return (
      <div className="Myddiiivvv">
        <DropdownTreeSelect
          id={this.props.idFull}
          data={this.state.data}
          texts={this.state.texts}
          mode={this.state.mode}
          // showPartiallySelected={this.state.showPartiallySelected}
          // keepTreeOnSearch={true}
          // keepChildrenOnSearch={false}
          // disablePoppingOnBackspace={true}
          // radioSelect={this.state.radioSelect}
          //onChange={this.onChange}
          onChange={this.props.getSelectedData}
          onAction={this.onAction} 
          onNodeToggle={this.onNodeToggle}
          onFocus={this.props.onFocus}
          onBlur={this.props.onBlur}
          //showDropdown = {this.state.showDropdown}
        />
      </div>
    );
  }
}

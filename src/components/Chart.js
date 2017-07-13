import React from 'react';
import Actions from './Actions';
import ForceGraph from './ForceGraph';
import Tooltip from './Tooltip';

export default class Chart extends React.Component {
  state = {
    nodes: [],
    links: [],
    tooltip_visible: false,
    tooltip_text: [],
    tooltip_pos: {}
  };
  componentDidMount = () => {
    Actions.getData()
    .then( (response) => {
      this.setState( { nodes: response.nodes, links: response.links});
    });
  };
  handleMouseEnter = (node) => {
    this.setState( { tooltip_text: [ node.country],
      tooltip_visible:true,
      tooltip_pos: {x: node.x, y: node.y}
    });
  };
  handleMouseLeave = () => {
    this.setState( { tooltip_text: [], tooltip_visible: false});
  };
  render = () => {
    const tooltip = {display: (this.state.tooltip_visible)?"block":"none",
      left: this.state.tooltip_pos.x,
      top: this.state.tooltip_pos.y,
      padding: "10px"
    };
    return (
      <div>{ this.state.nodes.length ?
        <div>
          <ForceGraph width={600} height={600}
            nodes={this.state.nodes} links={this.state.links}
            handleMouseEnter={this.handleMouseEnter} handleMouseLeave={this.handleMouseLeave} />
          <Tooltip tip_text={this.state.tooltip_text} pos={tooltip} />
        </div>
        : <div></div>
      }
      </div>
    );
  };
}

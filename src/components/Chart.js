import React from 'react';
import Actions from './Actions';
import ForceGraph from './ForceGraph';

export default class Chart extends React.Component {
  state = {
    nodes: [],
    links: []
  };
  componentDidMount = () => {
    Actions.getData()
    .then( (response) => {
      this.setState( { nodes: response.nodes, links: response.links});
    });
  };
  render = () => {
    return (
      <div>{ this.state.nodes.length ?
      <ForceGraph width={600} height={600}
        nodes={this.state.nodes} links={this.state.links} />
      : <div></div>
      }
      </div>
    );
  };
}

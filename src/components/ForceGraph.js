import React from 'react';
import * as d3 from 'd3';

export default class ForceGraph extends React.Component {
  componentDidMount = () => {
    const {width, height, nodes, links} = this.props;

    const ticked = () => {
      node
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
    };
    
    const force = d3.forceSimulation();
    force.force("charge", d3.forceManyBody());
    force.force("link", d3.forceLink().id(function(d) { return d.index }));
    force.force("center", d3.forceCenter(width / 2, height / 2));
    force.nodes( nodes).on("tick", ticked);
    force.force("link").links(links);

    const svg = d3.select( this.refs.force_graph)
      .append( "svg")
      .attr( "width", width)
      .attr( "height", height);

    const node = svg.selectAll( 'circle')
      .data( nodes)
      .enter( )
      .append( 'circle')
      .attr( 'r', 5)
      .style( 'stroke', '#999')
      .style( 'stoke-width', 1.5)
      .style( 'fill', '#555');
  };
  render = () => {
    const {width,height} = this.props;
    const style = {
      width, height,
      border: "1px solid #333"
    };
    return (
      <div style={style} ref="force_graph" />
    );
  };
};

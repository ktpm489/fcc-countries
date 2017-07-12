import React from 'react';
import * as d3 from 'd3';

export default class ForceGraph extends React.Component {
  componentDidMount = () => {
    const {width, height, nodes, links} = this.props;

    const ticked = () => {
      link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });
        
      node
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
    };

    const force = d3.forceSimulation();
    force.force("charge", d3.forceManyBody());
    force.force("link", d3.forceLink().id(function(d) { return d.index }));
    force.force("center", d3.forceCenter(width / 2, height / 2));
    // force.force("collide",d3.forceCollide( function(d){return d.r + 8 }).iterations(16) );
    force.force("y", d3.forceY(0))
    .force("x", d3.forceX(0));
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

    const link = svg.selectAll( 'line')
      .data( links)
      .enter()
      .append( 'line')
      .attr( 'stroke', 'black')
      .attr( 'stroke-width', 1);
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

import React from 'react';
import * as d3 from 'd3';
import './flags.css';
// pack the image in the bundle
// eslint-disable-next-line
import flag_sprite from './flags.png';

export default class ForceGraph extends React.Component {
  componentDidMount = () => {
    this.link = this.node = this.force = null;
    this.init();
  };
  ticked = () => {
    this.link
      .attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

    this.node
      .style( 'left', d => `${d.x-8}px`)
      .style( 'top', d=> `${d.y-5}px`);
  };

  dragstarted = (d) => {
    this.props.enableTooltip( false);
    if (!d3.event.active) this.force.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  };
  dragged = (d) => {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  };
  dragended = (d) => {
    this.props.enableTooltip( true);
    if (!d3.event.active) this.force.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  };
  init = () => {
    const {width, height, nodes, links} = this.props;
    this.force = d3.forceSimulation();
    this.force.force("charge", d3.forceManyBody());
    this.force.force("link", d3.forceLink().id(function(d) { return d.index }));
    this.force.force("center", d3.forceCenter(width / 2, height / 2));
    // force.force("collide",d3.forceCollide( function(d){return d.r + 8 }).iterations(16) );
    this.force.force("y", d3.forceY(0))
      .force("x", d3.forceX(0));
    this.force.nodes( nodes).on("tick", this.ticked);
    this.force.force("link").links(links);

    const svg = d3.select( this.refs.graph_links);

    this.node = d3.select( this.refs.flags_div).selectAll( '.node')
      .data( nodes)
      .enter( )
      .append( 'img')
      .attr( 'class', d => "flag flag-"+d.code)
      .call( d3.drag()
        .on("start", this.dragstarted)
        .on("drag", this.dragged)
        .on("end", this.dragended))
      .on( "mouseenter", this.props.handleMouseEnter)
      .on( "mouseleave", this.props.handleMouseLeave);

    this.link = svg.selectAll( 'line')
      .data( links)
      .enter()
      .append( 'line')
      .attr( 'stroke', 'black')
      .attr( 'stroke-width', 1)
      .attr( 'stroke-opacity', 0.6);
  };
  render = () => {
    const {width,height} = this.props;
    const style = {
      width, height,
      border: "1px solid #333"
    };
    return (
      <div style={style} >
        <div ref="flags_div" />
        <svg ref="graph_links" style={style} />
      </div>
    );
  };
};

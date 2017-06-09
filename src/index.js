import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { URL } from 'whatwg-url';

export class HashLink extends React.Component {
  static propTypes = {
    children : PropTypes.node.isRequired,
    onClick  : PropTypes.func,
    behavior : PropTypes.string,
    to       : PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        hash : PropTypes.string
      })
    ]).isRequired
  };

  static defaultProps = {
    onClick  : () => {},
    behavior : 'auto'
  };

  constructor(props) {
    super(props);

    this.scroll = this.scroll.bind(this);
    this.dispose = this.dispose.bind(this);
    this.onClick = this.onClick.bind(this);

    this.hash = '#';
    if (typeof this.props.to === 'string') {
      this.hash = new URL(this.props.to).hash;
    } else if (typeof this.props.to === 'object') {
      this.hash = this.props.to.hash;
    }

    this.observer = null;
    this.observeTimerId = null;
    this.isDisposed = false;

    this.scrollOptions = {
      behavior : this.props.behavior
    };

    delete this.props.behavior;
  }

  scroll() {
    const element = document.querySelector(this.hash);

    if (!element) {
      return;
    }

    element.scrollIntoView(this.scrollOptions);

    // if scrolled, dispose timer and observer
    this.dispose();
  }

  dispose() {
    this.isDisposed = true;

    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }

    if (this.observeTimerId) {
      clearTimeout(this.observeTimerId);
      this.observeTimerId = null;
    }
  }

  onClick(e) {
    this.props.onClick(e);

    if (this.hash === '#') {
      return;
    }

    this.scroll();

    if (this.isDisposed) {
      return;
    }

    this.observer = new MutationObserver(this.scroll);
    this.observer.observe(document, {
      attributes : true,
      childList  : true,
      subtree    : true
    });

    this.observeTimerId = setTimeout(this.dispose, 5000);
  }

  render() {
    return (
      <Link {...this.props} onClick={this.onClick}>
        {this.props.children}
      </Link>
    );
  }
}
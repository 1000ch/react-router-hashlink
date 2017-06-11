import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export class HashLink extends React.Component {
  static propTypes = {
    children : PropTypes.node.isRequired,
    onClick  : PropTypes.func,
    behavior : PropTypes.string,
    delay    : PropTypes.number,
    to       : PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        hash : PropTypes.string
      })
    ]).isRequired
  };

  static defaultProps = {
    onClick  : () => {},
    behavior : 'auto',
    delay    : 0
  };

  constructor(props) {
    super(props);

    this.scroll = this.scroll.bind(this);
    this.dispose = this.dispose.bind(this);
    this.onClick = this.onClick.bind(this);

    this.hashValue = '';
    if (typeof this.props.to === 'string' && this.props.to.indexOf('#') !== -1) {
      this.hashValue = this.props.to.split('#')[1];
    } else if (typeof this.props.to === 'object') {
      this.hashValue = this.props.to.hash.replace('#', '');
    }

    this.observer = null;
    this.observeTimerId = null;
    this.isDisposed = false;

    this.scrollOptions = {
      behavior : this.props.behavior
    };
  }

  scroll() {
    const element = document.getElementById(this.hashValue);

    if (!element) {
      return;
    }

    setTimeout(() => {
      element.scrollIntoView(this.scrollOptions);
    }, this.props.delay);

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

    if (this.hashValue.length === 0) {
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
    const props = { ...this.props };
    delete props.behavior;
    delete props.delay;

    return (
      <Link {...props} onClick={this.onClick}>
        {this.props.children}
      </Link>
    );
  }
}

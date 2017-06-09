# react-router-hashlink

[![Build Status](https://travis-ci.org/1000ch/react-router-hashlink.svg?branch=master)](https://travis-ci.org/1000ch/react-router-hashlink)
[![devDependency Status](https://david-dm.org/1000ch/react-router-hashlink/dev-status.svg)](https://david-dm.org/1000ch/react-router-hashlink?type=dev)
[![peerDependency Status](https://david-dm.org/1000ch/react-router-hashlink/peer-status.svg)](https://david-dm.org/1000ch/react-router-hashlink?type=peer)

> [`react-router-dom/Link`](https://reacttraining.com/react-router/web/api/Link) wrapper to handle hash value

## Install

```bash
$ npm install --save react-router-hashlink
```

## Usage

```jsx
import { HashLink } from 'react-router-hashlink';

...

<HashLink to="https://github.com/1000ch/react-router-hashlink#install">
  Hello
</HashLink>
```

## Config

|  Property   | Type       | Default Value |
| ----------- | ---------- | ------------- |
| to | `String` or `Object` | - |
| behavior | `String` | [`auto`](https://drafts.csswg.org/cssom-view/#extensions-to-the-window-interface) |
| onClick | `Function` | `() => {}` |

You can config [`ScrollBehavior`](https://drafts.csswg.org/cssom-view/#extensions-to-the-window-interface)  option for [`scrollIntoView()`](https://drafts.csswg.org/cssom-view/#dom-element-scrollintoview) via `behavior` property with [smooth scroll polyfill](http://iamdustan.com/smoothscroll/).

## License

[MIT](https://1000ch.mit-license.org) © [Shogo Sensui](https://github.com/1000ch)

# `generate-cns` User Guide

[![npm version](https://badge.fury.io/js/%40tibfib%2Fcs.svg)](https://badge.fury.io/js/%40tibfib%2Fcs)
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)

`generate-cns` is a lightweight (~.3kb) generator of a CSS utility function similar to [Classnames](https://github.com/JedWatson/classnames) but with a very important distinction: **`cns` allows you to mix custom styles with class names**. This is great for working with utility classes (e.g. [tailwindcss](https://tailwindcss.com), [basscss](https://basscss.com/)) but still allowing the flexibility of custom styles.

For these style declarations, **bring your own CSS-in-JS lib**: [emotion](https://emotion.sh/docs/@emotion/css), [otion](https://github.com/kripod/otion), etc..

## The Problem

Even with CSS utility classes, there is always a need to reach for custom style properties. This is fine in many cases, but what about when you want to conditionally apply both a className _and_ some custom styles? Generally, you would do this:

```jsx
function Component() {
	const [isEnabled, setIsEnabled] = React.useState();

	return (
		<div
			className={isEnabled ? 'bold' : ''}
			style={isEnabled ? { color: 'green' } : { opacity: 0.7 }}
			/* I am now defining the styles related to the `isEnabled` flag in multiple spots. */
			/* What happens if I want to add a single `style` property that always applies? Messy. */
		>
			Is Enabled?
		</div>
	);
}
```

## The Solution

Instead, use `cns` to combine both classNames and style properties, like so:

```jsx
// using `cns`

function Component() {
	const [isEnabled, setIsEnabled] = React.useState();

	return (
		<div
			className={cns(
				isEnabled ? ['bold', { color: 'green' }] : { opacity: 0.7 }
			)}
		>
			Is Enabled?
		</div>
	);
}
```

## Installation

```bash
npm install generate-cns
# or
yarn add generate-cns
```

## Usage

**IMPORTANT: `generate-cns` exports a _generator_ for you to create your _own_ `cns` function**

```jsx
// in some sort of utils.js file
import { generate } from 'generate-cns';
import { css } from '@emotion/css';
export const cns = generate(css);

// in usage
import { cns } from '../utils';

function Component() {
	return (
		<div classname={cns('bold', { color: 'yellow' })}>Bold Yellow Text</div>
	);
}
```

For the `cns` function, you can pass in:

- `string`s, which will be added as classes.
- `falsy` values, which will be ignored: `null`, `undefined`, `false` (this is to help with conditional logic)
- an `object` which will be forwarded along to the `css` function you pass in to the generator
- nested arrays of any of the above.

### Examples

```jsx
return (
	<div className={cns('mb0', isEnabled ? 'bold' : { opacity: 0.5 })}>...</div>
);
```

```jsx
return (
	<div className={cns(isEnabled ? ['underline', { opacity: 0.1 }] : null)}>
		...
	</div>
);
```

## FAQ

### How this is Different from `classnames`?

`cns` allows you to use custom css in your classNames array. With `classnames`, when you use an object, it will apply the keys of the object as classes based on the truthiness of the value.

`cns` allows you to nest arrays of values, making it easy to conditionally apply both css classNames and custom styles together.

### What `css` functions do you recommend?

1. [otion](https://github.com/kripod/otion)

```jsx
import { css } from 'otion';
import { generate } from '@tibfib/cs';
export const cs = generate(css);
```

2. [@emotion/css](https://emotion.sh/docs/@emotion/css)

```jsx
import { css } from '@emotion/css';
import { generate } from '@tibfib/cs';
export const cs = generate(css);
```

### Can you use this outside of react?

Yes, as long as your `css` function supports it. Both `otion` and `@emotion/css` do.

### Browser support?

For older browsers, you will need to polyfill `Array.prototype.flat`. (see [`core-js`](https://github.com/zloirock/core-js#core-js))

### What about `styled-components` and their tagged template literal?

Great question. Investigating support...

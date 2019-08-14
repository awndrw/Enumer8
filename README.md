# Enumer8 
> A Simple Node.js Enumeration Library

[![npm version](https://badge.fury.io/js/enumer8.svg)](https://npmjs.org/package/enumer8) [![Dependency Status](https://david-dm.org/azwiggin/enumer8.svg)](https://www.npmjs.com/package/enumer8?activeTab=dependencies) [![Build Status](https://travis-ci.org/azwiggin/enumer8.svg?branch=master)](https://travis-ci.org/azwiggin/enumer8)

#### Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [Configuration](#configuration)
	* [Options](#configuration/options)
* [API](#api)
	* [case](#api/case)


<a name='installation' />

## Installation
```sh
$ npm i enumer8
```

<a name='usage' />

## Usage
```js
import Enum from 'enumer8'

let Pets = new Enum()
Pets.case('Dog', 'Cat', 'Fish')

console.log(Pets.Dog) // { id:'Dog' , rawValue:'Dog' }

Pets.case('Lizard')
console.log(Pets.Lizard) // { id:'Lizard' , rawValue:'Lizard' }
console.log(Pets.Cat) // { id:'Cat' , rawValue:'Cat' }
```


<a name='configuration' />

## Configuration
Each enumeration can be configured on instantiation:
```js
new Enum({ /* ... */ })
```
Alternatively, the config parameter can be used to initialize an enumeration of a set type ([see `type` configuration](#configuration/options/type)):
```js
new Enum('string')
```

<a name='configuration/options' />

#### Options (`{option: default}`)

###### `{ type: 'string' }`
The `type` option can be set to a string type (`'string'`, `'number'`, ...) or `false`. If raw values are not provided, they will be created according to the specified type.  
Example:
```js
let PetNames = new Enum('string')

PetNames.case({
	Dog: 'Bolt',
	Cat: 'Simba',
	Mouse: 'Mickey'
})

PetNames.case({ Snake: true }) // Throws TypeError
```

<a name='api' />

## API

<a name='api/case' />

`.case()`
* The main method for enumerations. 
* The case(s) provided must be strings, an array of strings, or an object

<a name='api/freeze' />

`.freeze()`
* Freezes the current enumeration, preventing the modification of values.





---
## License
MIT © [Andrew Wiggin](https://github.com/azwiggin)

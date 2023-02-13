# Fastify

## What is Fastify?
* Web framework for Node.js
* Build to be performant & secure
* Inspired by Express & Hapi

## Why use Fastify?
* Full async/await support
* Helpful and flexibly TypeScript support
* Rich and high-quality [ecosystem](https://www.fastify.io/ecosystem/)
* Secure
* It's fast

Note: Will be using TypeScript, ESM & async/await
Fastify does support JS, CJS and callbacks

## What are we covering?
### The basics
* Build an instance of Fastify
* Start the server
* Register a route
* Request & reply
* Graceful shutdown

### Plugins & register
https://www.fastify.io/docs/latest/Reference/Plugins/
* Register routes as plugins
* Register external plugins
* Register with options
* Call order

### Decorators
https://www.fastify.io/docs/latest/Reference/Decorators/
* Modify the request object - addHook
* Add functionality to the Fastify instance - decorate

## Request hooks
https://www.fastify.io/docs/latest/Reference/Hooks
* Lifecycle hooks

## Validation
* Validate requests
* Validate responses

## Bonus
# GraphQL Basic #

## Setup Project ##

    $ npm init
    $ npm install express --save
    $ npm install graphql --save
    $ npm install express-graphql --save
    $ npm install mongoose --save
    $ npm install nodemon --save-dev

## Use Babel for ES6 ##

    $ npm install  babel-cli babel-preset-env --save-dev
    $ echo '''{
    >     "presets": ["env"]
    > }
    > ''' > .babelrc

## Test with Mocha ##

    $ nmp install mocha --save-dev
    $ npm install node-fetch --save-dev
    $ npm install chai --save-dev

## Mongo ##

Use a free MongoDB in mlab.com.

## Run ##

    $ npm install
    $ npm run build
    $ npm start

## Test ##

    $ npm test  // In another terminal

~~~
  Graphql Demo
{ data: { addUser: { uid: '5b59d3617dca1b2dcecfcc5b' } } }
    ✓ Insert User John@google (335ms)
{ data: { addUser: { uid: '5b59d3617dca1b2dcecfcc5c' } } }
    ✓ Insert User Mike@goole (291ms)
{ data: { addUser: { uid: '5b59d3627dca1b2dcecfcc5d' } } }
    ✓ Insert User Jay@microsoft (279ms)
{ data: { addCompany: { cid: '5b59d3627dca1b2dcecfcc5e' } } }
    ✓ Insert Company Google (264ms)
{ data: { addCompany: { cid: '5b59d3627dca1b2dcecfcc5f' } } }
    ✓ Insert Company Microsoft (278ms)
{ data: 
   { user: { name: 'Mike', company: [Object], email: 'mike@google.com' } } }
    ✓ Query Mike (661ms)
{ data: 
   { user: { name: 'Jay', company: [Object], email: 'jay@microsoft.com' } } }
    ✓ Query Jay (556ms)
{ data: { company: { users: [Array] } } }
    ✓ Query Users of Google (643ms)
{ data: { updateUser: { company: [Object] } } }
    ✓ Update Mike (643ms)
{ data: 
   { user: { name: 'Mike', company: [Object], email: 'mike@microsoft.com' } } }
    ✓ Query Mike (615ms)


  10 passing (7s)
~~~
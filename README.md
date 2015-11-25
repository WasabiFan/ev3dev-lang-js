Node.js Language Binding for ev3dev 
=============

This is a Node.js module that exposes the features of the [ev3dev](http://github.com/ev3dev/ev3dev) API in an easy-to-use structure. It is part of the "unified" bindings project for ev3dev, which means it follows our abstract API specification. This specification is implemented in multiple languages so that one can easily carry the same code concepts from one language to another.

## Getting the Module

### Installing the latest release from npm

**NOTE:** The npm module is currently outdated. We recommend that you build from source until we have published updates to npm.

The easiest way to get the module is to install it through `npm`:

```
$ npm install ev3dev
```

And then `require()` it for use in your code.

### Downloading the source code and compiling yourself
You can also download the source from GitHub directly, either from the releases page or via git. If you do it this way, you will need to follow the building instructions below to make it usable from Node.

This module is written in TypeScript, which means it cannot be directly used from JavaScript or Node.js. If you would like to make changes to the module or use a copy of the module from GitHub, you will need to follow these steps to build the module from source. The below steps should work on any modern OS, including Linux, OSX and Windows.

First, you will need to install some tools. Both building and running the module will require Node.js and `npm`, so make sure that you have both installed. Then install grunt, the task runner that we use to build the library:
```
$ npm install -g grunt-cli
```

Once you have done this, run `grunt --version` to make sure that everything was installed correctly (you may have to restart your terminal window first). Next you'll need to get the source code. You can `git clone` it to get the most recent changes, or download a release from the releases page. The following commands will need to be executed from the root directory of the source tree so `cd` in to that directory before continuing.

Now we will install the last few tools that we need. The list of dependencies for the module is pre-defined in the `package.json` file, so all we need to do is to tell `npm` to install them for us:
```
$ npm install
```

The final step is to run the build job. We can invoke the task runner that we installed earlier to do this:
```
$ grunt tsc
```

The build job should have put the generated JavaScript in the `bin` folder.

## Getting started with the API
We recommend that you start by running the files in the `examples/` subdirectory of the repo so that you can make sure that your system is set up correctly. Assuming you don't get any errors, you can create your own `js` file and `require` the ev3dev module to start writing your own code. For reference, you can take a look at the example scripts or check out the [online documentation](http://wasabifan.github.io/ev3dev-lang-js/).

## Executing your Node.js scripts
The simplest way is to run your code from the command line with the `node` command. This can be done over an SSH session or directly on the brick. To run a `.js` file, execute:
```bash
$ node path/to/file.js
```

If you want to be able to execute your scripts from brickman's file browser, you can add a [shebang](https://en.wikipedia.org/wiki/Shebang_(Unix)) and make it executable. You first must add the following code to the top of your `.js` file:
```
#!/usr/bin/env node
```

You can then make it executable from the command line:
```bash
$ chmod +x path/to/file.js
```

You should now be able to execute it directly from brickman.

## Use cases for JavaScript on the EV3
JavaScript is asynchronous by nature. There is practically no way to "sleep" your code for a certain amount of time, or wait for the operation to finish. This is by design, and both restricts the use cases for Node and JS as well as opens up new scenarios to explore.

Situations to use JavaScript:
- Servers
  - Programming a web interface, where you need to serve files
  - Responding to commands sent by an external controller (maybe a PC and browser)
- Continuously taking input
  - Running a job on a timer
- Running any code that only occasionally "wakes up"


Situations in which you should use other languages:
- Sequential actions that run linearly
- Precise timing and delay

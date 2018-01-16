# Containers as Functions (aka "Functainers")

These tutorials walk through the creation and deployment of
Docker containers as Fn functions.  

In [Functions vs. Containers](https://medium.com/oracledevs/containers-vs-functions-51c879216b97),
[Chad Arimura](https://medium.com/@carimura) describes the
relationship between functions and containers and argues that 
packaging functions in containers brings a number of awesome 
benefits.  I won't reiterate Chad's points but instead focus on 
showing how containers can be used to implement functions with [Fn](http://fnproject.io).

We'll start with a simple Node.js function that takes a string and
returns a string and then move on to a more sophisticated hot function example that consumes and produces JSON.

* [Functainers 101](functainers101/README.md)--your first container as function
* [Functainers 102](functainers102/README.md)--containers as hot functions 


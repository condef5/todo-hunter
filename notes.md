# Notes

In every React/Redux project, you need to create and test at least four things: reducer, actions, component, container. In this project, we will take a look at the first three.
 
* I use [redux-mock-store](https://github.com/arnaudbenard/redux-mock-store) for your testing your redux async action creators and middleware
* I use [axios-mock-adapter](https://github.com/ctimmerm/axios-mock-adapter) that allows to easily mock requests( if you use `fetch` instead of `axios` you can try [fetch-mock](https://github.com/wheresrhys/fetch-mock))

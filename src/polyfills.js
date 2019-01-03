import "isomorphic-fetch";
import Promise from "promise-polyfill";

if (!window.Promise) {
  window.Promise = Promise;
}

import PouchDB from "pouchdb-browser";
import memoryAdapter from "pouchdb-adapter-memory";
import "urlpattern-polyfill";

PouchDB.plugin(memoryAdapter);

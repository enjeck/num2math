// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (
  modules,
  entry,
  mainEntry,
  parcelRequireName,
  externals,
  distDir,
  publicUrl,
  devServer
) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var importMap = previousRequire.i || {};
  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        if (externals[name]) {
          return externals[name];
        }
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        globalObject
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      if (res === false) {
        return {};
      }
      // Synthesize a module to follow re-exports.
      if (Array.isArray(res)) {
        var m = {__esModule: true};
        res.forEach(function (v) {
          var key = v[0];
          var id = v[1];
          var exp = v[2] || v[0];
          var x = newRequire(id);
          if (key === '*') {
            Object.keys(x).forEach(function (key) {
              if (
                key === 'default' ||
                key === '__esModule' ||
                Object.prototype.hasOwnProperty.call(m, key)
              ) {
                return;
              }

              Object.defineProperty(m, key, {
                enumerable: true,
                get: function () {
                  return x[key];
                },
              });
            });
          } else if (exp === '*') {
            Object.defineProperty(m, key, {
              enumerable: true,
              value: x,
            });
          } else {
            Object.defineProperty(m, key, {
              enumerable: true,
              get: function () {
                if (exp === 'default') {
                  return x.__esModule ? x.default : x;
                }
                return x[exp];
              },
            });
          }
        });
        return m;
      }
      return newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.require = nodeRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.distDir = distDir;
  newRequire.publicUrl = publicUrl;
  newRequire.devServer = devServer;
  newRequire.i = importMap;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  // Only insert newRequire.load when it is actually used.
  // The code in this file is linted against ES5, so dynamic import is not allowed.
  // INSERT_LOAD_HERE

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });
    }
  }
})({"7SvX3":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SERVER_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "439701173a9199ea";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "ae5be248d29bb997";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_SERVER_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_SERVER_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , disposedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ , bundleNotFound = false;
function getHostname() {
    return HMR_HOST || (typeof location !== 'undefined' && location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || (typeof location !== 'undefined' ? location.port : HMR_SERVER_PORT);
}
// eslint-disable-next-line no-redeclare
let WebSocket = globalThis.WebSocket;
if (!WebSocket && typeof module.bundle.root === 'function') try {
    // eslint-disable-next-line no-global-assign
    WebSocket = module.bundle.root('ws');
} catch  {
// ignore.
}
var hostname = getHostname();
var port = getPort();
var protocol = HMR_SECURE || typeof location !== 'undefined' && location.protocol === 'https:' && ![
    'localhost',
    '127.0.0.1',
    '0.0.0.0'
].includes(hostname) ? 'wss' : 'ws';
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if (!parent || !parent.isParcelRequire) {
    // Web extension context
    var extCtx = typeof browser === 'undefined' ? typeof chrome === 'undefined' ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes('test.js');
    }
    var ws;
    if (HMR_USE_SSE) ws = new EventSource('/__parcel_hmr');
    else try {
        // If we're running in the dev server's node runner, listen for messages on the parent port.
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) {
            parentPort.on('message', async (message)=>{
                try {
                    await handleMessage(message);
                    parentPort.postMessage('updated');
                } catch  {
                    parentPort.postMessage('restart');
                }
            });
            // After the bundle has finished running, notify the dev server that the HMR update is complete.
            queueMicrotask(()=>parentPort.postMessage('ready'));
        }
    } catch  {
        if (typeof WebSocket !== 'undefined') try {
            ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
        } catch (err) {
            // Ignore cloudflare workers error.
            if (err.message && !err.message.includes('Disallowed operation called within global scope')) console.error(err.message);
        }
    }
    if (ws) {
        // $FlowFixMe
        ws.onmessage = async function(event /*: {data: string, ...} */ ) {
            var data /*: HMRMessage */  = JSON.parse(event.data);
            await handleMessage(data);
        };
        if (ws instanceof WebSocket) {
            ws.onerror = function(e) {
                if (e.message) console.error(e.message);
            };
            ws.onclose = function() {
                console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
            };
        }
    }
}
async function handleMessage(data /*: HMRMessage */ ) {
    checkedAssets = {} /*: {|[string]: boolean|} */ ;
    disposedAssets = {} /*: {|[string]: boolean|} */ ;
    assetsToAccept = [];
    assetsToDispose = [];
    bundleNotFound = false;
    if (data.type === 'reload') fullReload();
    else if (data.type === 'update') {
        // Remove error overlay if there is one
        if (typeof document !== 'undefined') removeErrorOverlay();
        let assets = data.assets;
        // Handle HMR Update
        let handled = assets.every((asset)=>{
            return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        });
        // Dispatch a custom event in case a bundle was not found. This might mean
        // an asset on the server changed and we should reload the page. This event
        // gives the client an opportunity to refresh without losing state
        // (e.g. via React Server Components). If e.preventDefault() is not called,
        // we will trigger a full page reload.
        if (handled && bundleNotFound && assets.some((a)=>a.envHash !== HMR_ENV_HASH) && typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') handled = !window.dispatchEvent(new CustomEvent('parcelhmrreload', {
            cancelable: true
        }));
        if (handled) {
            console.clear();
            // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
            if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') window.dispatchEvent(new CustomEvent('parcelhmraccept'));
            await hmrApplyUpdates(assets);
            hmrDisposeQueue();
            // Run accept callbacks. This will also re-execute other disposed assets in topological order.
            let processedAssets = {};
            for(let i = 0; i < assetsToAccept.length; i++){
                let id = assetsToAccept[i][1];
                if (!processedAssets[id]) {
                    hmrAccept(assetsToAccept[i][0], id);
                    processedAssets[id] = true;
                }
            }
        } else fullReload();
    }
    if (data.type === 'error') {
        // Log parcel errors to console
        for (let ansiDiagnostic of data.diagnostics.ansi){
            let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
            console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
        }
        if (typeof document !== 'undefined') {
            // Render the fancy html overlay
            removeErrorOverlay();
            var overlay = createErrorOverlay(data.diagnostics.html);
            // $FlowFixMe
            document.body.appendChild(overlay);
        }
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="${protocol === 'wss' ? 'https' : 'http'}://${hostname}:${port}/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, '') : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + '</div>').join('')}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ''}
      </div>
    `;
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if (typeof location !== 'undefined' && 'reload' in location) location.reload();
    else if (typeof extCtx !== 'undefined' && extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
    else try {
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) parentPort.postMessage('restart');
    } catch (err) {
        console.error("[parcel] \u26A0\uFE0F An HMR update was not accepted. Please restart the process.");
    }
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute('href');
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', // $FlowFixMe
    href.split('?')[0] + '?' + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout || typeof document === 'undefined') return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === 'js') {
        if (typeof document !== 'undefined') {
            let script = document.createElement('script');
            script.src = asset.url + '?t=' + Date.now();
            if (asset.outputFormat === 'esmodule') script.type = 'module';
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === 'function') {
            // Worker scripts
            if (asset.outputFormat === 'esmodule') return import(asset.url + '?t=' + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + '?t=' + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != 'undefined' && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        }
        // Always traverse to the parent bundle, even if we already replaced the asset in this bundle.
        // This is required in case modules are duplicated. We need to ensure all instances have the updated code.
        if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    checkedAssets = {};
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else if (a !== null) {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) {
            bundleNotFound = true;
            return true;
        }
        return hmrAcceptCheckOne(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return null;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    if (!cached) return true;
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
    return false;
}
function hmrDisposeQueue() {
    // Dispose all old assets.
    for(let i = 0; i < assetsToDispose.length; i++){
        let id = assetsToDispose[i][1];
        if (!disposedAssets[id]) {
            hmrDispose(assetsToDispose[i][0], id);
            disposedAssets[id] = true;
        }
    }
    assetsToDispose = [];
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        let assetsToAlsoAccept = [];
        cached.hot._acceptCallbacks.forEach(function(cb) {
            let additionalAssets = cb(function() {
                return getParents(module.bundle.root, id);
            });
            if (Array.isArray(additionalAssets) && additionalAssets.length) assetsToAlsoAccept.push(...additionalAssets);
        });
        if (assetsToAlsoAccept.length) {
            let handled = assetsToAlsoAccept.every(function(a) {
                return hmrAcceptCheck(a[0], a[1]);
            });
            if (!handled) return fullReload();
            hmrDisposeQueue();
        }
    }
}

},{}],"kyksZ":[function(require,module,exports,__globalThis) {
/**
 * Main application script - handles UI interactions and MathJax rendering
 */ var _equationServiceJs = require("./services/equationService.js");
var _urlSharingJs = require("./utils/urlSharing.js");
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');
    const displayCheckbox = document.getElementById('display');
    const closeButton = document.querySelector('.close');
    const inputField = document.getElementById('input');
    const outputDiv = document.getElementById('output');
    const renderButton = document.getElementById('render');
    const downloadBtn = document.getElementById('download-img');
    const shareBtn = document.getElementById('share-btn');
    form.addEventListener('submit', handleFormSubmit);
    displayCheckbox.addEventListener('change', convert);
    closeButton.addEventListener('click', ()=>{
        document.getElementById('mobile-notice').style.display = 'none';
    });
    shareBtn.addEventListener('click', handleShare);
    loadStateFromURL();
    function loadStateFromURL() {
        const state = (0, _urlSharingJs.getStateFromURL)();
        if (state) {
            inputField.value = state.number;
            document.getElementById('gamma-function').checked = state.config.gammaFunction;
            document.getElementById('eulers-identity').checked = state.config.eulersIdentity;
            document.getElementById('limits-exponential').checked = state.config.limitExponential;
            document.getElementById('limits-polynomial').checked = state.config.limitPolynomial;
            document.getElementById('trig').checked = state.config.trig;
            document.getElementById('geometric-series').checked = state.config.geometricSeries;
            if (window.MathJax && window.MathJax.startup) MathJax.startup.promise.then(()=>{
                convert();
            });
            else window.addEventListener('load', ()=>{
                if (window.MathJax && window.MathJax.startup) MathJax.startup.promise.then(()=>{
                    convert();
                });
            });
        }
    }
    function handleFormSubmit(event) {
        event.preventDefault();
        convert();
    }
    function convert() {
        const number = inputField.value;
        const validation = (0, _equationServiceJs.validateInput)(number);
        if (!validation.valid) {
            showError(validation.error);
            return;
        }
        const config = {
            gammaFunction: document.getElementById('gamma-function').checked,
            eulersIdentity: document.getElementById('eulers-identity').checked,
            limitExponential: document.getElementById('limits-exponential').checked,
            limitPolynomial: document.getElementById('limits-polynomial').checked,
            trig: document.getElementById('trig').checked,
            geometricSeries: document.getElementById('geometric-series').checked
        };
        const input = (0, _equationServiceJs.generateEquation)(Number(number), config);
        renderEquation(input);
        (0, _urlSharingJs.updateURL)(Number(number), config);
    }
    function handleShare() {
        const number = inputField.value;
        const validation = (0, _equationServiceJs.validateInput)(number);
        if (!validation.valid) {
            showError('Please generate an equation first before sharing!');
            return;
        }
        const config = {
            gammaFunction: document.getElementById('gamma-function').checked,
            eulersIdentity: document.getElementById('eulers-identity').checked,
            limitExponential: document.getElementById('limits-exponential').checked,
            limitPolynomial: document.getElementById('limits-polynomial').checked,
            trig: document.getElementById('trig').checked,
            geometricSeries: document.getElementById('geometric-series').checked
        };
        const shareableURL = (0, _urlSharingJs.generateShareableURL)(Number(number), config);
        // Try to use native share API if available (mobile devices)
        if (navigator.share) navigator.share({
            title: `num2math - Equation for ${number}`,
            text: `Check out this complicated math equation that equals ${number}!`,
            url: shareableURL
        }).catch((error)=>{
            if (error.name !== 'AbortError') copyToClipboard(shareableURL);
        });
        else copyToClipboard(shareableURL);
    }
    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(()=>{
            const originalText = shareBtn.textContent;
            shareBtn.textContent = "\u2713 Link copied!";
            shareBtn.style.backgroundColor = '#28a745';
            setTimeout(()=>{
                shareBtn.textContent = originalText;
                shareBtn.style.backgroundColor = '';
            }, 2000);
        }).catch(()=>{
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            const originalText = shareBtn.textContent;
            shareBtn.textContent = "\u2713 Link copied!";
            setTimeout(()=>{
                shareBtn.textContent = originalText;
            }, 2000);
        });
    }
    function showError(message) {
        outputDiv.innerHTML = `<p style="color: red; padding: 10px;">${message}</p>`;
    }
    function renderEquation(latexExpression) {
        renderButton.disabled = displayCheckbox.disabled = true;
        outputDiv.innerHTML = '';
        MathJax.texReset();
        const options = MathJax.getMetricsFor(outputDiv);
        options.display = displayCheckbox.checked;
        MathJax.tex2svgPromise(latexExpression, options).then((node)=>{
            outputDiv.appendChild(node);
            MathJax.startup.document.clear();
            MathJax.startup.document.updateDocument();
            downloadBtn.style.display = 'block';
            shareBtn.style.display = 'inline-block';
        }).catch((err)=>{
            const pre = document.createElement('pre');
            pre.textContent = err.message;
            outputDiv.appendChild(pre);
        }).finally(()=>{
            renderButton.disabled = displayCheckbox.disabled = false;
        });
    }
});

},{"./services/equationService.js":"aTJWc","./utils/urlSharing.js":"6kGod"}],"aTJWc":[function(require,module,exports,__globalThis) {
/**
 * Main equation generation service
 * Coordinates generator functions to create complex mathematical expressions
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Configuration for equation generation
 * @typedef {Object} EquationConfig
 * @property {boolean} gammaFunction - Use Gamma function for factorials
 * @property {boolean} eulersIdentity - Use Euler's identity
 * @property {boolean} limitExponential - Use exponential limits
 * @property {boolean} limitPolynomial - Use polynomial limits
 * @property {boolean} trig - Use trigonometric identities
 * @property {boolean} geometricSeries - Use geometric series
 */ /**
 * Generate a complex mathematical expression that equals the target number
 * @param {number} number - Target number (0-1000)
 * @param {EquationConfig} config - Configuration options
 * @returns {string} LaTeX expression
 */ parcelHelpers.export(exports, "generateEquation", ()=>generateEquation);
/**
 * Validate input number
 * @param {*} value - Input value to validate
 * @returns {{valid: boolean, error?: string}} Validation result
 */ parcelHelpers.export(exports, "validateInput", ()=>validateInput);
var _latexGeneratorsJs = require("../generators/latexGenerators.js");
var _decompositionServiceJs = require("./decompositionService.js");
var _mathHelpersJs = require("../utils/mathHelpers.js");
function generateEquation(number, config) {
    // Build list of available generator functions based on config
    const possibleOptions = [];
    if (config.eulersIdentity) possibleOptions.push((n)=>(0, _latexGeneratorsJs.eulersIdentity)(n, config.gammaFunction));
    if (config.limitExponential) {
        possibleOptions.push((0, _latexGeneratorsJs.limitNaturalLog));
        possibleOptions.push((0, _latexGeneratorsJs.limitExponential));
    }
    if (config.limitPolynomial) {
        possibleOptions.push((n)=>(0, _latexGeneratorsJs.limDiffTwoSquares)(n, config.gammaFunction));
        possibleOptions.push((n)=>(0, _latexGeneratorsJs.limitPolynomial)(n, config.gammaFunction));
    }
    if (config.geometricSeries) possibleOptions.push((n)=>(0, _latexGeneratorsJs.infiniteGeometricSeries)(n, config.gammaFunction));
    // Special handling for trig identity - needs to wrap other generators
    if (config.trig) {
        const originalOptions = [
            ...possibleOptions
        ];
        // Create trig-wrapped generator
        const trigGenerator = (n)=>{
            // Filter out some options for trig wrapping
            const optionsForTrig = originalOptions.filter((opt)=>opt !== (0, _latexGeneratorsJs.limitNaturalLog) && opt !== trigGenerator);
            let randOption;
            if (optionsForTrig.length > 0) randOption = (num)=>(0, _mathHelpersJs.randomChoice)(optionsForTrig)(num);
            else randOption = sameNumber;
            return (0, _latexGeneratorsJs.trigIdentity)(n, randOption);
        };
        possibleOptions.push(trigGenerator);
    }
    // Fallback function if all options are disabled
    const sameNumber = (n)=>n;
    // Generate the expression
    return (0, _decompositionServiceJs.decompose)(number, possibleOptions, sameNumber);
}
function validateInput(value) {
    const number = Number(value);
    if (isNaN(number)) return {
        valid: false,
        error: 'Please enter a valid number'
    };
    if (value === '' || value === null || value === undefined) return {
        valid: false,
        error: 'Please enter a number'
    };
    if (number < 0 || number > 1000) return {
        valid: false,
        error: 'Number must be between 0 and 1000'
    };
    if (!Number.isInteger(number)) return {
        valid: false,
        error: 'Please enter an integer'
    };
    return {
        valid: true
    };
}

},{"../generators/latexGenerators.js":"aahYA","./decompositionService.js":"5dhar","../utils/mathHelpers.js":"b4fw5","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"aahYA":[function(require,module,exports,__globalThis) {
/**
 * LaTeX expression generators for various mathematical concepts
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Generate factorial notation using Gamma function or Pi product
 * @param {number} n - The factorial base
 * @param {boolean} useGammaFunction - Whether to use Gamma function
 * @returns {string} LaTeX string
 */ parcelHelpers.export(exports, "factorial", ()=>factorial);
/**
 * Generate limit using difference of two squares
 * @param {number} n - Target number
 * @param {boolean} useGammaFunction - Whether gamma function is enabled
 * @returns {string} LaTeX string
 */ parcelHelpers.export(exports, "limDiffTwoSquares", ()=>limDiffTwoSquares);
/**
 * Generate natural logarithm limit
 * @param {number} n - Target number
 * @returns {string} LaTeX string
 */ parcelHelpers.export(exports, "limitNaturalLog", ()=>limitNaturalLog);
/**
 * Generate exponential limit
 * @param {number} n - Target number
 * @returns {string} LaTeX string
 */ parcelHelpers.export(exports, "limitExponential", ()=>limitExponential);
/**
 * Generate polynomial limit
 * @param {number} n - Target number
 * @param {boolean} useGammaFunction - Whether gamma function is enabled
 * @returns {string} LaTeX string
 */ parcelHelpers.export(exports, "limitPolynomial", ()=>limitPolynomial);
/**
 * Generate Euler's identity expression
 * @param {number} n - Target number
 * @param {boolean} useGammaFunction - Whether gamma function is enabled
 * @returns {string} LaTeX string
 */ parcelHelpers.export(exports, "eulersIdentity", ()=>eulersIdentity);
/**
 * Generate infinite geometric series
 * @param {number} n - Target number
 * @param {boolean} useGammaFunction - Whether gamma function is enabled
 * @returns {string} LaTeX string
 */ parcelHelpers.export(exports, "infiniteGeometricSeries", ()=>infiniteGeometricSeries);
/**
 * Generate trigonometric identity expression
 * @param {number} n - Target number
 * @param {Function} randOption - Random generator function
 * @returns {string} LaTeX string
 */ parcelHelpers.export(exports, "trigIdentity", ()=>trigIdentity);
var _mathHelpersJs = require("../utils/mathHelpers.js");
var _constantsJs = require("../utils/constants.js");
function factorial(n, useGammaFunction) {
    if (Math.random() < 0.5 && useGammaFunction) return `{\\Gamma (${n + 1})}`;
    return `{\\prod_{k=1}^{${n}} k}`;
}
function limDiffTwoSquares(n, useGammaFunction) {
    const fac = (0, _mathHelpersJs.isFactorial)(n);
    if (fac && Math.random() < 0.5) return factorial(fac, useGammaFunction);
    const r = (0, _mathHelpersJs.randomInt)(1, 10);
    if (Math.random() < 0.5) return `{\\lim_{x \\to ${n - r}} {{x^2 - ${r ** 2}} \\over {x - ${r}}}}`;
    return `{\\lim_{x \\to ${n + r}} {{x^2 - ${r ** 2}} \\over {x + ${r}}}}`;
}
function limitNaturalLog(n) {
    if (n === 0) return `{\\lim_{x \\to \\infty}{ \\ln(x) \\over {x} }}`;
    if (n === 1) return `{\\lim_{x \\to 1}  { {\\ln(x)} \\over {x - 1} }}`;
    return `{\\lim_{x \\to 0}{ {-\\ln(1 + ${n}(e^{-x} - 1))} \\over {x} }}`;
}
function limitExponential(n) {
    if (n === 0) return `{\\lim_{x \\to \\infty}{xe^{-x}}}`;
    if (n === 1) return `{\\lim_{x \\to 0}{ {e^x - 1} \\over {x} }}`;
    return `{\\lim_{x \\to 0}{ {e^{${n}x} - 1} \\over {x} }}`;
}
function limitPolynomial(n, useGammaFunction) {
    const fac = (0, _mathHelpersJs.isFactorial)(n);
    if (fac && Math.random() < 0.5) return factorial(fac, useGammaFunction);
    if (n === 0) {
        const r = (0, _mathHelpersJs.randomInt)(0, 19);
        return `{\\lim_{x \\to \\infty}{${r}x^{-1}}}`;
    }
    if (n === 1) return `{\\lim_{x \\to \\infty}{x^{1/x}}}`;
    const m = (0, _mathHelpersJs.randomInt)(1, 5);
    const highestPower = (0, _mathHelpersJs.randomInt)(2, 4);
    const numeratorLength = (0, _mathHelpersJs.randomInt)(1, highestPower - 1);
    const denominatorLength = (0, _mathHelpersJs.randomInt)(1, highestPower - 1);
    let numerator = `${m * n}x^{${highestPower}} `;
    let denominator = `${m}x^{${highestPower}} `;
    for(let i = numeratorLength; i > 0; i--){
        const coef = (0, _mathHelpersJs.randomInt)(2, 11);
        const power = i < 2 ? '' : `^{${i}}`;
        numerator += `${(0, _constantsJs.SIGNS)[Math.floor(Math.random() * 2)]} ${coef}x${power} `;
    }
    for(let i = denominatorLength; i > 0; i--){
        const coef = (0, _mathHelpersJs.randomInt)(2, 11);
        const power = i < 2 ? '' : `^{${i}}`;
        denominator += `${(0, _constantsJs.SIGNS)[Math.floor(Math.random() * 2)]} ${coef}x${power} `;
    }
    return `{\\lim_{x \\to \\infty}{{ ${numerator} } \\over {{ ${denominator} }}}}`;
}
function eulersIdentity(n, useGammaFunction) {
    const fac = (0, _mathHelpersJs.isFactorial)(n);
    if (fac && Math.random() < 0.5) return factorial(fac, useGammaFunction);
    if (n !== 0) return `{-${n}e^{\\pi i}}`;
    return `{(e^{\\pi i} + 1)}`;
}
function infiniteGeometricSeries(n, useGammaFunction) {
    const fac = (0, _mathHelpersJs.isFactorial)(n);
    if (fac && Math.random() < 0.5) return factorial(fac, useGammaFunction);
    if (n === 0) {
        const r = (0, _mathHelpersJs.randomInt)(3, 12);
        return `{\\sum\\limits_{k=0}^{${r - 1}} {\\sin \\left({ {2 \\pi k} \\over {${r}} } \\right)}}`;
    }
    if (n === 1) return `{\\lim_{\\epsilon \\to 0}{ \\epsilon \\zeta(1 + \\epsilon) }}`;
    return `{\\sum\\limits_{k=0}^\\infty {\\left({${n - 1} \\over {${n}}}\\right)^{k}}}`;
}
function trigIdentity(n, randOption) {
    if (n > 0) {
        const randomValue = Math.random();
        if (randomValue < 0.25) return `\\left({${randOption(n)} \\over {(\\cos^2x + \\sin^2x)}}\\right)`;
        if (randomValue < 0.5) return `\\left({${randOption(n)} \\times (\\cos^2x + \\sin^2x)}\\right)`;
        return `\\left({${randOption(n + 1)} - (\\cos^2x + \\sin^2x)}\\right)`;
    }
    return `\\left({${randOption(n + 1)} - (\\cos^2x + \\sin^2x)}\\right)`;
}

},{"../utils/mathHelpers.js":"b4fw5","../utils/constants.js":"dIVBf","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"b4fw5":[function(require,module,exports,__globalThis) {
/**
 * Mathematical utility functions
 */ /**
 * Check if a number is odd
 * @param {number} n - The number to check
 * @returns {boolean} True if odd, false otherwise
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "isOdd", ()=>isOdd);
/**
 * Check if a number is a perfect square
 * @param {number} n - The number to check
 * @returns {boolean} True if perfect square, false otherwise
 */ parcelHelpers.export(exports, "isSquare", ()=>isSquare);
/**
 * Check if a number is prime
 * @param {number} n - The number to check
 * @returns {boolean} True if prime, false otherwise
 */ parcelHelpers.export(exports, "isPrime", ()=>isPrime);
/**
 * Get all factors of a number
 * @param {number} n - The number to factorize
 * @returns {number[]} Array of factors
 */ parcelHelpers.export(exports, "getFactors", ()=>getFactors);
/**
 * Check if a number can be formed using factorial
 * @param {number} n - The number to check
 * @returns {number|false} The factorial base or false
 */ parcelHelpers.export(exports, "isFactorial", ()=>isFactorial);
/**
 * Generate a random integer between min and max (inclusive)
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Random integer
 */ parcelHelpers.export(exports, "randomInt", ()=>randomInt);
/**
 * Select a random item from an array
 * @param {Array} arr - The array to select from
 * @returns {*} Random item from array
 */ parcelHelpers.export(exports, "randomChoice", ()=>randomChoice);
function isOdd(n) {
    return n % 2 !== 0;
}
function isSquare(n) {
    return Number.isInteger(Math.sqrt(n));
}
function isPrime(n) {
    if (n <= 1) return false;
    if (n % 2 === 0 && n > 2) return false;
    const s = Math.sqrt(n);
    for(let i = 3; i <= s; i += 2){
        if (n % i === 0) return false;
    }
    return true;
}
function getFactors(n) {
    return [
        ...Array(n + 1).keys()
    ].filter((i)=>n % i === 0);
}
function isFactorial(n) {
    const factorialMap = {
        2: 2,
        6: 3,
        24: 4,
        120: 5,
        720: 6
    };
    return factorialMap[n] || false;
}
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"jnFvT":[function(require,module,exports,__globalThis) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"dIVBf":[function(require,module,exports,__globalThis) {
/**
 * Application constants
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "INPUT_LIMITS", ()=>INPUT_LIMITS);
parcelHelpers.export(exports, "RANDOM_MULTIPLIER_MAX", ()=>RANDOM_MULTIPLIER_MAX);
parcelHelpers.export(exports, "RANDOM_COEFFICIENT_MAX", ()=>RANDOM_COEFFICIENT_MAX);
parcelHelpers.export(exports, "RANDOM_OFFSET_MAX", ()=>RANDOM_OFFSET_MAX);
parcelHelpers.export(exports, "LARGE_NUMBER_THRESHOLD", ()=>LARGE_NUMBER_THRESHOLD);
parcelHelpers.export(exports, "SMALL_NUMBER_THRESHOLD", ()=>SMALL_NUMBER_THRESHOLD);
parcelHelpers.export(exports, "MEDIUM_NUMBER_THRESHOLD", ()=>MEDIUM_NUMBER_THRESHOLD);
parcelHelpers.export(exports, "SIGNS", ()=>SIGNS);
const INPUT_LIMITS = {
    MIN: 0,
    MAX: 1000
};
const RANDOM_MULTIPLIER_MAX = 5;
const RANDOM_COEFFICIENT_MAX = 10;
const RANDOM_OFFSET_MAX = 30;
const LARGE_NUMBER_THRESHOLD = 70;
const SMALL_NUMBER_THRESHOLD = 10;
const MEDIUM_NUMBER_THRESHOLD = 100;
const SIGNS = [
    '-',
    '+'
];

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"5dhar":[function(require,module,exports,__globalThis) {
/**
 * Number decomposition strategies for generating complex expressions
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Decompose a number into a complex mathematical expression
 * @param {number} n - Target number
 * @param {Function[]} possibleOptions - Array of generator functions
 * @param {Function} sameNumber - Fallback function
 * @returns {string} LaTeX expression
 */ parcelHelpers.export(exports, "decompose", ()=>decompose);
var _mathHelpersJs = require("../utils/mathHelpers.js");
var _constantsJs = require("../utils/constants.js");
/**
 * Decompose a number using exponential representation
 * @param {number} n - Target number
 * @param {Function} randomOption1 - First random generator
 * @param {Function} randomOption2 - Second random generator
 * @returns {string} LaTeX string
 */ function decompose2(n, randomOption1, randomOption2) {
    const randNum = (0, _mathHelpersJs.randomInt)(6, 8);
    const logValue = Math.log(n) / Math.log(randNum);
    const floorLog = Math.floor(logValue);
    const ceilLog = Math.ceil(logValue);
    const exp1 = randNum ** floorLog;
    const exp2 = randNum ** ceilLog;
    const diff1 = Math.abs(n - exp1);
    const diff2 = Math.abs(n - exp2);
    if (diff1 < diff2) {
        const power = floorLog < 2 ? '' : `^{${floorLog}}`;
        return `{ \\left({${randomOption1(randNum)}}\\right)${power} + {${randomOption2(diff1)}}}`;
    }
    const power = ceilLog < 2 ? '' : `^{${ceilLog}}`;
    return `{ \\left({${randomOption1(randNum)}}\\right) ${power} - {${randomOption2(diff2)}}}`;
}
/**
 * Find minimal exponential representation for large numbers
 * @param {number} n - Target number
 * @param {Function} randomOption3 - Random generator function
 * @returns {string} LaTeX string
 */ function minExp(n, randomOption3, decompose2Fn) {
    let oldDiff, newDiff, exp, exponent;
    const valObj = {};
    // Start with base 3
    let logValue = Math.log(n) / Math.log(3);
    let floorLog = Math.floor(logValue);
    let ceilLog = Math.ceil(logValue);
    let exp1 = 3 ** floorLog;
    let exp2 = 3 ** ceilLog;
    let diff1 = Math.abs(n - exp1);
    let diff2 = Math.abs(n - exp2);
    if (diff1 < diff2) {
        oldDiff = diff1;
        exp = [
            exp1,
            `\\left({${randomOption3(3)}}\\right)^{${floorLog}}`
        ];
        valObj[oldDiff] = exp;
    } else {
        oldDiff = diff2;
        exp = [
            exp2,
            `\\left({${randomOption3(3)}}\\right)^{${ceilLog}}`
        ];
        valObj[oldDiff] = exp;
    }
    // Try bases 4-8
    for(let i = 4; i < 9; i++){
        logValue = Math.log(n) / Math.log(i);
        floorLog = Math.floor(logValue);
        ceilLog = Math.ceil(logValue);
        exp1 = i ** floorLog;
        exp2 = i ** ceilLog;
        diff1 = Math.abs(n - exp1);
        diff2 = Math.abs(n - exp2);
        if (diff1 < diff2) {
            exp = [
                exp1,
                `\\left({${randomOption3(i)}}\\right)^{${floorLog}}`
            ];
            newDiff = diff1;
            valObj[newDiff] = exp;
        } else {
            exp = [
                exp2,
                `\\left({${randomOption3(i)}}\\right)^{${ceilLog}}`
            ];
            newDiff = diff2;
            valObj[newDiff] = exp;
        }
        newDiff = Math.min(newDiff, oldDiff);
        oldDiff = newDiff;
        exponent = valObj[newDiff];
    }
    if (exponent[0] < n) return `${exponent[1]} + \\left({${decompose2Fn(newDiff)}}\\right)`;
    return `${exponent[1]} - \\left({${decompose2Fn(newDiff)}}\\right)`;
}
function decompose(n, possibleOptions, sameNumber) {
    // Select random generator functions
    function moreRandomOptions(num) {
        return (0, _mathHelpersJs.randomChoice)(possibleOptions)(num);
    }
    let randomOption1 = moreRandomOptions;
    let randomOption2 = moreRandomOptions;
    let randomOption3 = moreRandomOptions;
    if (possibleOptions.length < 1) {
        randomOption1 = sameNumber;
        randomOption2 = sameNumber;
        randomOption3 = sameNumber;
    } else if (possibleOptions.length >= 3) {
        // Select three different options
        const options1 = [
            ...possibleOptions
        ];
        const randIndex1 = (0, _mathHelpersJs.randomInt)(0, options1.length - 1);
        randomOption1 = options1[randIndex1];
        const options2 = [
            ...options1
        ];
        options2.splice(randIndex1, 1);
        const randIndex2 = (0, _mathHelpersJs.randomInt)(0, options2.length - 1);
        randomOption2 = options2[randIndex2];
        const options3 = [
            ...options2
        ];
        options3.splice(randIndex2, 1);
        const randIndex3 = (0, _mathHelpersJs.randomInt)(0, options3.length - 1);
        randomOption3 = options3[randIndex3];
    }
    // Wrapper for decompose2 with bound functions
    const decompose2Fn = (num)=>decompose2(num, randomOption1, randomOption2);
    // Handle large numbers with exponential representation
    if (n > (0, _constantsJs.LARGE_NUMBER_THRESHOLD)) return minExp(n, randomOption3, decompose2Fn);
    const randomValue = Math.random();
    // Strategy 1: Factor decomposition - ab = (a - c)(b + c) + c(b - a + c)
    if (n < (0, _constantsJs.MEDIUM_NUMBER_THRESHOLD) && (n === 2 || !(0, _mathHelpersJs.isPrime)(n)) && randomValue < 0.25) {
        const factors = (0, _mathHelpersJs.getFactors)(parseInt(n));
        const randomIndex = (0, _mathHelpersJs.randomInt)(0, factors.length - 1);
        const a = factors[randomIndex];
        const b = n / a;
        const c = (0, _mathHelpersJs.randomInt)(1, (0, _constantsJs.RANDOM_OFFSET_MAX));
        if (Math.random() < 0.2) return `{{\\left({${randomOption1(a)}}\\right)}{\\left({${randomOption2(b)}}\\right)}}`;
        return `{ \\left({${randomOption1(a)} - ${randomOption2(c)}}\\right) \\left({${randomOption3(b)} + ${moreRandomOptions(c)}}\\right) + {${moreRandomOptions(c)}}{\\left({${moreRandomOptions(b)} - ${moreRandomOptions(a)} + ${moreRandomOptions(c)}} \\right)} }`;
    }
    // Strategy 2: Consecutive squares - n = (d + 1)^2 - d^2 = 2d + 1
    if (n > 2 && (0, _mathHelpersJs.isOdd)(n) && randomValue < 0.40) {
        const d = Math.floor(n / 2);
        if (Math.random() < 0.5) return `{${randomOption1(2)} \\left({${randomOption2(d)}}\\right) + ${randomOption3(1)}}`;
        return `{\\left({${randomOption1(d)} + ${randomOption2(1)}}\\right)^2 - \\left({${randomOption3(d)}}\\right)^2}`;
    }
    // Strategy 3: Square root for small numbers
    if (randomValue < 0.55 && n < (0, _constantsJs.SMALL_NUMBER_THRESHOLD)) {
        const square = n ** 2;
        return `{\\sqrt{${randomOption1(square)}}}`;
    }
    // Strategy 4: Sum of odd numbers = n^2
    if (n > 1 && (0, _mathHelpersJs.isSquare)(n) && randomValue < 0.6) {
        const squareroot = Math.sqrt(n);
        if (Math.random() < 0.2) {
            let sum = `${randomOption1(1)}`;
            let oddVal = 1;
            for(let i = 0; i < squareroot - 1; i++){
                const randomOption = (0, _mathHelpersJs.randomChoice)(possibleOptions);
                oddVal += 2;
                sum += `+ ${randomOption(oddVal)}`;
            }
            return `{ ${sum} }`;
        }
        // (a + b)^2 expansion
        const a = (0, _mathHelpersJs.randomInt)(1, squareroot - 1);
        const b = squareroot - a;
        if (Math.random() < 0.5) return `{ {\\left(${randomOption1(a)} + ${randomOption2(b)}\\right)}^2}`;
        return `{ {\\left(${randomOption1(a)}\\right)}^2 + {${moreRandomOptions(2)}}{\\left(${randomOption2(a)}\\right)}{\\left(${randomOption3(b)}\\right)} + {\\left(${moreRandomOptions(b)}\\right)}^2}`;
    }
    // Strategy 5: Difference of consecutive squares
    if ((0, _mathHelpersJs.isOdd)(n) && randomValue < 0.7) {
        const a = Math.floor(n / 2);
        const b = n - a;
        if (n < 22) return `{${randomOption1(b ** 2)} - ${randomOption2(a ** 2)}}`;
        return `{ \\left({${randomOption1(b)}}\\right)^2 -  \\left({${randomOption2(a)}}\\right)^2}`;
    }
    // Strategy 6: Pythagorean triples using Fibonacci's method
    if (randomValue < 0.8 && (0, _mathHelpersJs.isOdd)(n) && n < (0, _constantsJs.SMALL_NUMBER_THRESHOLD)) {
        const a = n;
        const aSquare = a ** 2;
        const position = (aSquare + 1) / 2;
        let bSquare = 0;
        let odd = -1;
        for(let i = 1; i < position; i++){
            odd += 2;
            bSquare += odd;
        }
        const b = Math.sqrt(bSquare);
        const cSquare = odd + 2 + bSquare;
        const c = Math.sqrt(cSquare);
        return `{\\sqrt{\\left({${randomOption1(c)}}\\right)^2 - \\left({${randomOption2(b)}}\\right)^2}}`;
    }
    // Strategy 7: Multiplication and addition
    if (randomValue < 0.90) {
        const randNum = (0, _mathHelpersJs.randomInt)(1, n + 1);
        const r = n % randNum;
        const a = Math.floor(n / randNum);
        return `${randomOption1(a)} \\times {${randomOption2(randNum)}} + ${randomOption3(r)}`;
    }
    // Strategy 8: Multiply and divide
    const r = (0, _mathHelpersJs.randomInt)(1, 5);
    return `${randomOption1(n * r)} \\over {${randomOption2(r)}}`;
}

},{"../utils/mathHelpers.js":"b4fw5","../utils/constants.js":"dIVBf","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"6kGod":[function(require,module,exports,__globalThis) {
/**
 * URL Sharing utilities - encode/decode application state for sharing
 */ /**
 * Encodes the current state (number and config) into a URL-safe string
 * @param {number} number - The input number
 * @param {Object} config - The checkbox configuration
 * @returns {string} Base64-encoded state
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "encodeState", ()=>encodeState);
/**
 * Decodes a URL-safe string back into state
 * @param {string} encoded - The encoded state string
 * @returns {Object|null} The decoded state or null if invalid
 */ parcelHelpers.export(exports, "decodeState", ()=>decodeState);
/**
 * Gets the current state from URL parameters
 * @returns {Object|null} The decoded state or null if no valid state in URL
 */ parcelHelpers.export(exports, "getStateFromURL", ()=>getStateFromURL);
/**
 * Generates a shareable URL with the current state
 * @param {number} number - The input number
 * @param {Object} config - The checkbox configuration
 * @returns {string} The full shareable URL
 */ parcelHelpers.export(exports, "generateShareableURL", ()=>generateShareableURL);
/**
 * Updates the current URL with the state (without page reload)
 * @param {number} number - The input number
 * @param {Object} config - The checkbox configuration
 */ parcelHelpers.export(exports, "updateURL", ()=>updateURL);
function encodeState(number, config) {
    const state = {
        n: number,
        g: config.gammaFunction,
        e: config.eulersIdentity,
        le: config.limitExponential,
        lp: config.limitPolynomial,
        t: config.trig,
        gs: config.geometricSeries
    };
    const json = JSON.stringify(state);
    // Convert to base64 and make URL-safe
    return btoa(json).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); // Remove padding
}
function decodeState(encoded) {
    try {
        // Restore base64 format
        let base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
        // Add padding if needed
        while(base64.length % 4)base64 += '=';
        const json = atob(base64);
        const state = JSON.parse(json);
        // Expand to full config object
        return {
            number: state.n,
            config: {
                gammaFunction: state.g ?? true,
                eulersIdentity: state.e ?? true,
                limitExponential: state.le ?? true,
                limitPolynomial: state.lp ?? true,
                trig: state.t ?? true,
                geometricSeries: state.gs ?? true
            }
        };
    } catch (error) {
        console.error('Failed to decode state:', error);
        return null;
    }
}
function getStateFromURL() {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get('s');
    if (!encoded) return null;
    return decodeState(encoded);
}
function generateShareableURL(number, config) {
    const encoded = encodeState(number, config);
    const url = new URL(window.location.href);
    url.search = `?s=${encoded}`;
    return url.toString();
}
function updateURL(number, config) {
    const encoded = encodeState(number, config);
    const url = new URL(window.location.href);
    url.search = `?s=${encoded}`;
    window.history.replaceState({}, '', url);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}]},["7SvX3","kyksZ"], "kyksZ", "parcelRequire091c", {})

//# sourceMappingURL=num2math.d29bb997.js.map

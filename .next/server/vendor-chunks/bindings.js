/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/bindings";
exports.ids = ["vendor-chunks/bindings"];
exports.modules = {

/***/ "(rsc)/./node_modules/bindings/bindings.js":
/*!*******************************************!*\
  !*** ./node_modules/bindings/bindings.js ***!
  \*******************************************/
/***/ ((module, exports, __webpack_require__) => {

eval("/**\n * Module dependencies.\n */ var fs = __webpack_require__(/*! fs */ \"fs\"), path = __webpack_require__(/*! path */ \"path\"), fileURLToPath = __webpack_require__(/*! file-uri-to-path */ \"(rsc)/./node_modules/file-uri-to-path/index.js\"), join = path.join, dirname = path.dirname, exists = fs.accessSync && function(path) {\n    try {\n        fs.accessSync(path);\n    } catch (e) {\n        return false;\n    }\n    return true;\n} || fs.existsSync || path.existsSync, defaults = {\n    arrow: process.env.NODE_BINDINGS_ARROW || \" → \",\n    compiled: process.env.NODE_BINDINGS_COMPILED_DIR || \"compiled\",\n    platform: process.platform,\n    arch: process.arch,\n    nodePreGyp: \"node-v\" + process.versions.modules + \"-\" + process.platform + \"-\" + process.arch,\n    version: process.versions.node,\n    bindings: \"bindings.node\",\n    try: [\n        // node-gyp's linked version in the \"build\" dir\n        [\n            \"module_root\",\n            \"build\",\n            \"bindings\"\n        ],\n        // node-waf and gyp_addon (a.k.a node-gyp)\n        [\n            \"module_root\",\n            \"build\",\n            \"Debug\",\n            \"bindings\"\n        ],\n        [\n            \"module_root\",\n            \"build\",\n            \"Release\",\n            \"bindings\"\n        ],\n        // Debug files, for development (legacy behavior, remove for node v0.9)\n        [\n            \"module_root\",\n            \"out\",\n            \"Debug\",\n            \"bindings\"\n        ],\n        [\n            \"module_root\",\n            \"Debug\",\n            \"bindings\"\n        ],\n        // Release files, but manually compiled (legacy behavior, remove for node v0.9)\n        [\n            \"module_root\",\n            \"out\",\n            \"Release\",\n            \"bindings\"\n        ],\n        [\n            \"module_root\",\n            \"Release\",\n            \"bindings\"\n        ],\n        // Legacy from node-waf, node <= 0.4.x\n        [\n            \"module_root\",\n            \"build\",\n            \"default\",\n            \"bindings\"\n        ],\n        // Production \"Release\" buildtype binary (meh...)\n        [\n            \"module_root\",\n            \"compiled\",\n            \"version\",\n            \"platform\",\n            \"arch\",\n            \"bindings\"\n        ],\n        // node-qbs builds\n        [\n            \"module_root\",\n            \"addon-build\",\n            \"release\",\n            \"install-root\",\n            \"bindings\"\n        ],\n        [\n            \"module_root\",\n            \"addon-build\",\n            \"debug\",\n            \"install-root\",\n            \"bindings\"\n        ],\n        [\n            \"module_root\",\n            \"addon-build\",\n            \"default\",\n            \"install-root\",\n            \"bindings\"\n        ],\n        // node-pre-gyp path ./lib/binding/{node_abi}-{platform}-{arch}\n        [\n            \"module_root\",\n            \"lib\",\n            \"binding\",\n            \"nodePreGyp\",\n            \"bindings\"\n        ]\n    ]\n};\n/**\n * The main `bindings()` function loads the compiled bindings for a given module.\n * It uses V8's Error API to determine the parent filename that this function is\n * being invoked from, which is then used to find the root directory.\n */ function bindings(opts) {\n    // Argument surgery\n    if (typeof opts == \"string\") {\n        opts = {\n            bindings: opts\n        };\n    } else if (!opts) {\n        opts = {};\n    }\n    // maps `defaults` onto `opts` object\n    Object.keys(defaults).map(function(i) {\n        if (!(i in opts)) opts[i] = defaults[i];\n    });\n    // Get the module root\n    if (!opts.module_root) {\n        opts.module_root = exports.getRoot(exports.getFileName());\n    }\n    // Ensure the given bindings name ends with .node\n    if (path.extname(opts.bindings) != \".node\") {\n        opts.bindings += \".node\";\n    }\n    // https://github.com/webpack/webpack/issues/4175#issuecomment-342931035\n    var requireFunc =  true ? require : 0;\n    var tries = [], i = 0, l = opts.try.length, n, b, err;\n    for(; i < l; i++){\n        n = join.apply(null, opts.try[i].map(function(p) {\n            return opts[p] || p;\n        }));\n        tries.push(n);\n        try {\n            b = opts.path ? requireFunc.resolve(n) : requireFunc(n);\n            if (!opts.path) {\n                b.path = n;\n            }\n            return b;\n        } catch (e) {\n            if (e.code !== \"MODULE_NOT_FOUND\" && e.code !== \"QUALIFIED_PATH_RESOLUTION_FAILED\" && !/not find/i.test(e.message)) {\n                throw e;\n            }\n        }\n    }\n    err = new Error(\"Could not locate the bindings file. Tried:\\n\" + tries.map(function(a) {\n        return opts.arrow + a;\n    }).join(\"\\n\"));\n    err.tries = tries;\n    throw err;\n}\nmodule.exports = exports = bindings;\n/**\n * Gets the filename of the JavaScript file that invokes this function.\n * Used to help find the root directory of a module.\n * Optionally accepts an filename argument to skip when searching for the invoking filename\n */ exports.getFileName = function getFileName(calling_file) {\n    var origPST = Error.prepareStackTrace, origSTL = Error.stackTraceLimit, dummy = {}, fileName;\n    Error.stackTraceLimit = 10;\n    Error.prepareStackTrace = function(e, st) {\n        for(var i = 0, l = st.length; i < l; i++){\n            fileName = st[i].getFileName();\n            if (fileName !== __filename) {\n                if (calling_file) {\n                    if (fileName !== calling_file) {\n                        return;\n                    }\n                } else {\n                    return;\n                }\n            }\n        }\n    };\n    // run the 'prepareStackTrace' function above\n    Error.captureStackTrace(dummy);\n    dummy.stack;\n    // cleanup\n    Error.prepareStackTrace = origPST;\n    Error.stackTraceLimit = origSTL;\n    // handle filename that starts with \"file://\"\n    var fileSchema = \"file://\";\n    if (fileName.indexOf(fileSchema) === 0) {\n        fileName = fileURLToPath(fileName);\n    }\n    return fileName;\n};\n/**\n * Gets the root directory of a module, given an arbitrary filename\n * somewhere in the module tree. The \"root directory\" is the directory\n * containing the `package.json` file.\n *\n *   In:  /home/nate/node-native-module/lib/index.js\n *   Out: /home/nate/node-native-module\n */ exports.getRoot = function getRoot(file) {\n    var dir = dirname(file), prev;\n    while(true){\n        if (dir === \".\") {\n            // Avoids an infinite loop in rare cases, like the REPL\n            dir = process.cwd();\n        }\n        if (exists(join(dir, \"package.json\")) || exists(join(dir, \"node_modules\"))) {\n            // Found the 'package.json' file or 'node_modules' dir; we're done\n            return dir;\n        }\n        if (prev === dir) {\n            // Got to the top\n            throw new Error('Could not find module root given file: \"' + file + '\". Do you have a `package.json` file? ');\n        }\n        // Try the parent dir next\n        prev = dir;\n        dir = join(dir, \"..\");\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvYmluZGluZ3MvYmluZGluZ3MuanMiLCJtYXBwaW5ncyI6IkFBQUE7O0NBRUMsR0FFRCxJQUFJQSxLQUFLQyxtQkFBT0EsQ0FBQyxpQkFDZkMsT0FBT0QsbUJBQU9BLENBQUMscUJBQ2ZFLGdCQUFnQkYsbUJBQU9BLENBQUMsMkVBQ3hCRyxPQUFPRixLQUFLRSxJQUFJLEVBQ2hCQyxVQUFVSCxLQUFLRyxPQUFPLEVBQ3RCQyxTQUNFLEdBQUlDLFVBQVUsSUFDWixTQUFTTCxJQUFJO0lBQ1gsSUFBSTtRQUNGRixHQUFHTyxVQUFVLENBQUNMO0lBQ2hCLEVBQUUsT0FBT00sR0FBRztRQUNWLE9BQU87SUFDVDtJQUNBLE9BQU87QUFDVCxLQUNGUixHQUFHUyxVQUFVLElBQ2JQLEtBQUtPLFVBQVUsRUFDakJDLFdBQVc7SUFDVEMsT0FBT0MsUUFBUUMsR0FBRyxDQUFDQyxtQkFBbUIsSUFBSTtJQUMxQ0MsVUFBVUgsUUFBUUMsR0FBRyxDQUFDRywwQkFBMEIsSUFBSTtJQUNwREMsVUFBVUwsUUFBUUssUUFBUTtJQUMxQkMsTUFBTU4sUUFBUU0sSUFBSTtJQUNsQkMsWUFDRSxXQUNBUCxRQUFRUSxRQUFRLENBQUNDLE9BQU8sR0FDeEIsTUFDQVQsUUFBUUssUUFBUSxHQUNoQixNQUNBTCxRQUFRTSxJQUFJO0lBQ2RJLFNBQVNWLFFBQVFRLFFBQVEsQ0FBQ0csSUFBSTtJQUM5QkMsVUFBVTtJQUNWQyxLQUFLO1FBQ0gsK0NBQStDO1FBQy9DO1lBQUM7WUFBZTtZQUFTO1NBQVc7UUFDcEMsMENBQTBDO1FBQzFDO1lBQUM7WUFBZTtZQUFTO1lBQVM7U0FBVztRQUM3QztZQUFDO1lBQWU7WUFBUztZQUFXO1NBQVc7UUFDL0MsdUVBQXVFO1FBQ3ZFO1lBQUM7WUFBZTtZQUFPO1lBQVM7U0FBVztRQUMzQztZQUFDO1lBQWU7WUFBUztTQUFXO1FBQ3BDLCtFQUErRTtRQUMvRTtZQUFDO1lBQWU7WUFBTztZQUFXO1NBQVc7UUFDN0M7WUFBQztZ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ZGVfbW9kdWxlcy9iaW5kaW5ncy9iaW5kaW5ncy5qcz82MGVmIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG52YXIgZnMgPSByZXF1aXJlKCdmcycpLFxuICBwYXRoID0gcmVxdWlyZSgncGF0aCcpLFxuICBmaWxlVVJMVG9QYXRoID0gcmVxdWlyZSgnZmlsZS11cmktdG8tcGF0aCcpLFxuICBqb2luID0gcGF0aC5qb2luLFxuICBkaXJuYW1lID0gcGF0aC5kaXJuYW1lLFxuICBleGlzdHMgPVxuICAgIChmcy5hY2Nlc3NTeW5jICYmXG4gICAgICBmdW5jdGlvbihwYXRoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgZnMuYWNjZXNzU3luYyhwYXRoKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0pIHx8XG4gICAgZnMuZXhpc3RzU3luYyB8fFxuICAgIHBhdGguZXhpc3RzU3luYyxcbiAgZGVmYXVsdHMgPSB7XG4gICAgYXJyb3c6IHByb2Nlc3MuZW52Lk5PREVfQklORElOR1NfQVJST1cgfHwgJyDihpIgJyxcbiAgICBjb21waWxlZDogcHJvY2Vzcy5lbnYuTk9ERV9CSU5ESU5HU19DT01QSUxFRF9ESVIgfHwgJ2NvbXBpbGVkJyxcbiAgICBwbGF0Zm9ybTogcHJvY2Vzcy5wbGF0Zm9ybSxcbiAgICBhcmNoOiBwcm9jZXNzLmFyY2gsXG4gICAgbm9kZVByZUd5cDpcbiAgICAgICdub2RlLXYnICtcbiAgICAgIHByb2Nlc3MudmVyc2lvbnMubW9kdWxlcyArXG4gICAgICAnLScgK1xuICAgICAgcHJvY2Vzcy5wbGF0Zm9ybSArXG4gICAgICAnLScgK1xuICAgICAgcHJvY2Vzcy5hcmNoLFxuICAgIHZlcnNpb246IHByb2Nlc3MudmVyc2lvbnMubm9kZSxcbiAgICBiaW5kaW5nczogJ2JpbmRpbmdzLm5vZGUnLFxuICAgIHRyeTogW1xuICAgICAgLy8gbm9kZS1neXAncyBsaW5rZWQgdmVyc2lvbiBpbiB0aGUgXCJidWlsZFwiIGRpclxuICAgICAgWydtb2R1bGVfcm9vdCcsICdidWlsZCcsICdiaW5kaW5ncyddLFxuICAgICAgLy8gbm9kZS13YWYgYW5kIGd5cF9hZGRvbiAoYS5rLmEgbm9kZS1neXApXG4gICAgICBbJ21vZHVsZV9yb290JywgJ2J1aWxkJywgJ0RlYnVnJywgJ2JpbmRpbmdzJ10sXG4gICAgICBbJ21vZHVsZV9yb290JywgJ2J1aWxkJywgJ1JlbGVhc2UnLCAnYmluZGluZ3MnXSxcbiAgICAgIC8vIERlYnVnIGZpbGVzLCBmb3IgZGV2ZWxvcG1lbnQgKGxlZ2FjeSBiZWhhdmlvciwgcmVtb3ZlIGZvciBub2RlIHYwLjkpXG4gICAgICBbJ21vZHVsZV9yb290JywgJ291dCcsICdEZWJ1ZycsICdiaW5kaW5ncyddLFxuICAgICAgWydtb2R1bGVfcm9vdCcsICdEZWJ1ZycsICdiaW5kaW5ncyddLFxuICAgICAgLy8gUmVsZWFzZSBmaWxlcywgYnV0IG1hbnVhbGx5IGNvbXBpbGVkIChsZWdhY3kgYmVoYXZpb3IsIHJlbW92ZSBmb3Igbm9kZSB2MC45KVxuICAgICAgWydtb2R1bGVfcm9vdCcsICdvdXQnLCAnUmVsZWFzZScsICdiaW5kaW5ncyddLFxuICAgICAgWydtb2R1bGVfcm9vdCcsICdSZWxlYXNlJywgJ2JpbmRpbmdzJ10sXG4gICAgICAvLyBMZWdhY3kgZnJvbSBub2RlLXdhZiwgbm9kZSA8PSAwLjQueFxuICAgICAgWydtb2R1bGVfcm9vdCcsICdidWlsZCcsICdkZWZhdWx0JywgJ2JpbmRpbmdzJ10sXG4gICAgICAvLyBQcm9kdWN0aW9uIFwiUmVsZWFzZVwiIGJ1aWxkdHlwZSBiaW5hcnkgKG1laC4uLilcbiAgICAgIFsnbW9kdWxlX3Jvb3QnLCAnY29tcGlsZWQnLCAndmVyc2lvbicsICdwbGF0Zm9ybScsICdhcmNoJywgJ2JpbmRpbmdzJ10sXG4gICAgICAvLyBub2RlLXFicyBidWlsZHNcbiAgICAgIFsnbW9kdWxlX3Jvb3QnLCAnYWRkb24tYnVpbGQnLCAncmVsZWFzZScsICdpbnN0YWxsLXJvb3QnLCAnYmluZGluZ3MnXSxcbiAgICAgIFsnbW9kdWxlX3Jvb3QnLCAnYWRkb24tYnVpbGQnLCAnZGVidWcnLCAnaW5zdGFsbC1yb290JywgJ2JpbmRpbmdzJ10sXG4gICAgICBbJ21vZHVsZV9yb290JywgJ2FkZG9uLWJ1aWxkJywgJ2RlZmF1bHQnLCAnaW5zdGFsbC1yb290JywgJ2JpbmRpbmdzJ10sXG4gICAgICAvLyBub2RlLXByZS1neXAgcGF0aCAuL2xpYi9iaW5kaW5nL3tub2RlX2FiaX0te3BsYXRmb3JtfS17YXJjaH1cbiAgICAgIFsnbW9kdWxlX3Jvb3QnLCAnbGliJywgJ2JpbmRpbmcnLCAnbm9kZVByZUd5cCcsICdiaW5kaW5ncyddXG4gICAgXVxuICB9O1xuXG4vKipcbiAqIFRoZSBtYWluIGBiaW5kaW5ncygpYCBmdW5jdGlvbiBsb2FkcyB0aGUgY29tcGlsZWQgYmluZGluZ3MgZm9yIGEgZ2l2ZW4gbW9kdWxlLlxuICogSXQgdXNlcyBWOCdzIEVycm9yIEFQSSB0byBkZXRlcm1pbmUgdGhlIHBhcmVudCBmaWxlbmFtZSB0aGF0IHRoaXMgZnVuY3Rpb24gaXNcbiAqIGJlaW5nIGludm9rZWQgZnJvbSwgd2hpY2ggaXMgdGhlbiB1c2VkIHRvIGZpbmQgdGhlIHJvb3QgZGlyZWN0b3J5LlxuICovXG5cbmZ1bmN0aW9uIGJpbmRpbmdzKG9wdHMpIHtcbiAgLy8gQXJndW1lbnQgc3VyZ2VyeVxuICBpZiAodHlwZW9mIG9wdHMgPT0gJ3N0cmluZycpIHtcbiAgICBvcHRzID0geyBiaW5kaW5nczogb3B0cyB9O1xuICB9IGVsc2UgaWYgKCFvcHRzKSB7XG4gICAgb3B0cyA9IHt9O1xuICB9XG5cbiAgLy8gbWFwcyBgZGVmYXVsdHNgIG9udG8gYG9wdHNgIG9iamVjdFxuICBPYmplY3Qua2V5cyhkZWZhdWx0cykubWFwKGZ1bmN0aW9uKGkpIHtcbiAgICBpZiAoIShpIGluIG9wdHMpKSBvcHRzW2ldID0gZGVmYXVsdHNbaV07XG4gIH0pO1xuXG4gIC8vIEdldCB0aGUgbW9kdWxlIHJvb3RcbiAgaWYgKCFvcHRzLm1vZHVsZV9yb290KSB7XG4gICAgb3B0cy5tb2R1bGVfcm9vdCA9IGV4cG9ydHMuZ2V0Um9vdChleHBvcnRzLmdldEZpbGVOYW1lKCkpO1xuICB9XG5cbiAgLy8gRW5zdXJlIHRoZSBnaXZlbiBiaW5kaW5ncyBuYW1lIGVuZHMgd2l0aCAubm9kZVxuICBpZiAocGF0aC5leHRuYW1lKG9wdHMuYmluZGluZ3MpICE9ICcubm9kZScpIHtcbiAgICBvcHRzLmJpbmRpbmdzICs9ICcubm9kZSc7XG4gIH1cblxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay93ZWJwYWNrL2lzc3Vlcy80MTc1I2lzc3VlY29tbWVudC0zNDI5MzEwMzVcbiAgdmFyIHJlcXVpcmVGdW5jID1cbiAgICB0eXBlb2YgX193ZWJwYWNrX3JlcXVpcmVfXyA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgPyBfX25vbl93ZWJwYWNrX3JlcXVpcmVfX1xuICAgICAgOiByZXF1aXJlO1xuXG4gIHZhciB0cmllcyA9IFtdLFxuICAgIGkgPSAwLFxuICAgIGwgPSBvcHRzLnRyeS5sZW5ndGgsXG4gICAgbixcbiAgICBiLFxuICAgIGVycjtcblxuICBmb3IgKDsgaSA8IGw7IGkrKykge1xuICAgIG4gPSBqb2luLmFwcGx5KFxuICAgICAgbnVsbCxcbiAgICAgIG9wdHMudHJ5W2ldLm1hcChmdW5jdGlvbihwKSB7XG4gICAgICAgIHJldHVybiBvcHRzW3BdIHx8IHA7XG4gICAgICB9KVxuICAgICk7XG4gICAgdHJpZXMucHVzaChuKTtcbiAgICB0cnkge1xuICAgICAgYiA9IG9wdHMucGF0aCA/IHJlcXVpcmVGdW5jLnJlc29sdmUobikgOiByZXF1aXJlRnVuYyhuKTtcbiAgICAgIGlmICghb3B0cy5wYXRoKSB7XG4gICAgICAgIGIucGF0aCA9IG47XG4gICAgICB9XG4gICAgICByZXR1cm4gYjtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpZiAoZS5jb2RlICE9PSAnTU9EVUxFX05PVF9GT1VORCcgJiZcbiAgICAgICAgICBlLmNvZGUgIT09ICdRVUFMSUZJRURfUEFUSF9SRVNPTFVUSU9OX0ZBSUxFRCcgJiZcbiAgICAgICAgICAhL25vdCBmaW5kL2kudGVzdChlLm1lc3NhZ2UpKSB7XG4gICAgICAgIHRocm93IGU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZXJyID0gbmV3IEVycm9yKFxuICAgICdDb3VsZCBub3QgbG9jYXRlIHRoZSBiaW5kaW5ncyBmaWxlLiBUcmllZDpcXG4nICtcbiAgICAgIHRyaWVzXG4gICAgICAgIC5tYXAoZnVuY3Rpb24oYSkge1xuICAgICAgICAgIHJldHVybiBvcHRzLmFycm93ICsgYTtcbiAgICAgICAgfSlcbiAgICAgICAgLmpvaW4oJ1xcbicpXG4gICk7XG4gIGVyci50cmllcyA9IHRyaWVzO1xuICB0aHJvdyBlcnI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBiaW5kaW5ncztcblxuLyoqXG4gKiBHZXRzIHRoZSBmaWxlbmFtZSBvZiB0aGUgSmF2YVNjcmlwdCBmaWxlIHRoYXQgaW52b2tlcyB0aGlzIGZ1bmN0aW9uLlxuICogVXNlZCB0byBoZWxwIGZpbmQgdGhlIHJvb3QgZGlyZWN0b3J5IG9mIGEgbW9kdWxlLlxuICogT3B0aW9uYWxseSBhY2NlcHRzIGFuIGZpbGVuYW1lIGFyZ3VtZW50IHRvIHNraXAgd2hlbiBzZWFyY2hpbmcgZm9yIHRoZSBpbnZva2luZyBmaWxlbmFtZVxuICovXG5cbmV4cG9ydHMuZ2V0RmlsZU5hbWUgPSBmdW5jdGlvbiBnZXRGaWxlTmFtZShjYWxsaW5nX2ZpbGUpIHtcbiAgdmFyIG9yaWdQU1QgPSBFcnJvci5wcmVwYXJlU3RhY2tUcmFjZSxcbiAgICBvcmlnU1RMID0gRXJyb3Iuc3RhY2tUcmFjZUxpbWl0LFxuICAgIGR1bW15ID0ge30sXG4gICAgZmlsZU5hbWU7XG5cbiAgRXJyb3Iuc3RhY2tUcmFjZUxpbWl0ID0gMTA7XG5cbiAgRXJyb3IucHJlcGFyZVN0YWNrVHJhY2UgPSBmdW5jdGlvbihlLCBzdCkge1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gc3QubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBmaWxlTmFtZSA9IHN0W2ldLmdldEZpbGVOYW1lKCk7XG4gICAgICBpZiAoZmlsZU5hbWUgIT09IF9fZmlsZW5hbWUpIHtcbiAgICAgICAgaWYgKGNhbGxpbmdfZmlsZSkge1xuICAgICAgICAgIGlmIChmaWxlTmFtZSAhPT0gY2FsbGluZ19maWxlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAvLyBydW4gdGhlICdwcmVwYXJlU3RhY2tUcmFjZScgZnVuY3Rpb24gYWJvdmVcbiAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UoZHVtbXkpO1xuICBkdW1teS5zdGFjaztcblxuICAvLyBjbGVhbnVwXG4gIEVycm9yLnByZXBhcmVTdGFja1RyYWNlID0gb3JpZ1BTVDtcbiAgRXJyb3Iuc3RhY2tUcmFjZUxpbWl0ID0gb3JpZ1NUTDtcblxuICAvLyBoYW5kbGUgZmlsZW5hbWUgdGhhdCBzdGFydHMgd2l0aCBcImZpbGU6Ly9cIlxuICB2YXIgZmlsZVNjaGVtYSA9ICdmaWxlOi8vJztcbiAgaWYgKGZpbGVOYW1lLmluZGV4T2YoZmlsZVNjaGVtYSkgPT09IDApIHtcbiAgICBmaWxlTmFtZSA9IGZpbGVVUkxUb1BhdGgoZmlsZU5hbWUpO1xuICB9XG5cbiAgcmV0dXJuIGZpbGVOYW1lO1xufTtcblxuLyoqXG4gKiBHZXRzIHRoZSByb290IGRpcmVjdG9yeSBvZiBhIG1vZHVsZSwgZ2l2ZW4gYW4gYXJiaXRyYXJ5IGZpbGVuYW1lXG4gKiBzb21ld2hlcmUgaW4gdGhlIG1vZHVsZSB0cmVlLiBUaGUgXCJyb290IGRpcmVjdG9yeVwiIGlzIHRoZSBkaXJlY3RvcnlcbiAqIGNvbnRhaW5pbmcgdGhlIGBwYWNrYWdlLmpzb25gIGZpbGUuXG4gKlxuICogICBJbjogIC9ob21lL25hdGUvbm9kZS1uYXRpdmUtbW9kdWxlL2xpYi9pbmRleC5qc1xuICogICBPdXQ6IC9ob21lL25hdGUvbm9kZS1uYXRpdmUtbW9kdWxlXG4gKi9cblxuZXhwb3J0cy5nZXRSb290ID0gZnVuY3Rpb24gZ2V0Um9vdChmaWxlKSB7XG4gIHZhciBkaXIgPSBkaXJuYW1lKGZpbGUpLFxuICAgIHByZXY7XG4gIHdoaWxlICh0cnVlKSB7XG4gICAgaWYgKGRpciA9PT0gJy4nKSB7XG4gICAgICAvLyBBdm9pZHMgYW4gaW5maW5pdGUgbG9vcCBpbiByYXJlIGNhc2VzLCBsaWtlIHRoZSBSRVBMXG4gICAgICBkaXIgPSBwcm9jZXNzLmN3ZCgpO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICBleGlzdHMoam9pbihkaXIsICdwYWNrYWdlLmpzb24nKSkgfHxcbiAgICAgIGV4aXN0cyhqb2luKGRpciwgJ25vZGVfbW9kdWxlcycpKVxuICAgICkge1xuICAgICAgLy8gRm91bmQgdGhlICdwYWNrYWdlLmpzb24nIGZpbGUgb3IgJ25vZGVfbW9kdWxlcycgZGlyOyB3ZSdyZSBkb25lXG4gICAgICByZXR1cm4gZGlyO1xuICAgIH1cbiAgICBpZiAocHJldiA9PT0gZGlyKSB7XG4gICAgICAvLyBHb3QgdG8gdGhlIHRvcFxuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnQ291bGQgbm90IGZpbmQgbW9kdWxlIHJvb3QgZ2l2ZW4gZmlsZTogXCInICtcbiAgICAgICAgICBmaWxlICtcbiAgICAgICAgICAnXCIuIERvIHlvdSBoYXZlIGEgYHBhY2thZ2UuanNvbmAgZmlsZT8gJ1xuICAgICAgKTtcbiAgICB9XG4gICAgLy8gVHJ5IHRoZSBwYXJlbnQgZGlyIG5leHRcbiAgICBwcmV2ID0gZGlyO1xuICAgIGRpciA9IGpvaW4oZGlyLCAnLi4nKTtcbiAgfVxufTtcbiJdLCJuYW1lcyI6WyJmcyIsInJlcXVpcmUiLCJwYXRoIiwiZmlsZVVSTFRvUGF0aCIsImpvaW4iLCJkaXJuYW1lIiwiZXhpc3RzIiwiYWNjZXNzU3luYyIsImUiLCJleGlzdHNTeW5jIiwiZGVmYXVsdHMiLCJhcnJvdyIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0JJTkRJTkdTX0FSUk9XIiwiY29tcGlsZWQiLCJOT0RFX0JJTkRJTkdTX0NPTVBJTEVEX0RJUiIsInBsYXRmb3JtIiwiYXJjaCIsIm5vZGVQcmVHeXAiLCJ2ZXJzaW9ucyIsIm1vZHVsZXMiLCJ2ZXJzaW9uIiwibm9kZSIsImJpbmRpbmdzIiwidHJ5Iiwib3B0cyIsIk9iamVjdCIsImtleXMiLCJtYXAiLCJpIiwibW9kdWxlX3Jvb3QiLCJleHBvcnRzIiwiZ2V0Um9vdCIsImdldEZpbGVOYW1lIiwiZXh0bmFtZSIsInJlcXVpcmVGdW5jIiwiX193ZWJwYWNrX3JlcXVpcmVfXyIsIl9fbm9uX3dlYnBhY2tfcmVxdWlyZV9fIiwidHJpZXMiLCJsIiwibGVuZ3RoIiwibiIsImIiLCJlcnIiLCJhcHBseSIsInAiLCJwdXNoIiwicmVzb2x2ZSIsImNvZGUiLCJ0ZXN0IiwibWVzc2FnZSIsIkVycm9yIiwiYSIsIm1vZHVsZSIsImNhbGxpbmdfZmlsZSIsIm9yaWdQU1QiLCJwcmVwYXJlU3RhY2tUcmFjZSIsIm9yaWdTVEwiLCJzdGFja1RyYWNlTGltaXQiLCJkdW1teSIsImZpbGVOYW1lIiwic3QiLCJfX2ZpbGVuYW1lIiwiY2FwdHVyZVN0YWNrVHJhY2UiLCJzdGFjayIsImZpbGVTY2hlbWEiLCJpbmRleE9mIiwiZmlsZSIsImRpciIsInByZXYiLCJjd2QiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/bindings/bindings.js\n");

/***/ })

};
;
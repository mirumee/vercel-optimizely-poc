import * as __WEBPACK_EXTERNAL_MODULE_cookies__ from "cookies";
import * as __WEBPACK_EXTERNAL_MODULE_http_request_b4b0d76d__ from "http-request";
import * as __WEBPACK_EXTERNAL_MODULE_log__ from "log";
/******/ var __webpack_modules__ = ({

/***/ "./node_modules/.pnpm/@optimizely+js-sdk-logging@0.3.1/node_modules/@optimizely/js-sdk-logging/lib/errorHandler.js":
/*!*************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@optimizely+js-sdk-logging@0.3.1/node_modules/@optimizely/js-sdk-logging/lib/errorHandler.js ***!
  \*************************************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
 * @export
 * @class NoopErrorHandler
 * @implements {ErrorHandler}
 */
var NoopErrorHandler = /** @class */ (function () {
    function NoopErrorHandler() {
    }
    /**
     * @param {Error} exception
     * @memberof NoopErrorHandler
     */
    NoopErrorHandler.prototype.handleError = function (exception) {
        // no-op
        return;
    };
    return NoopErrorHandler;
}());
exports.NoopErrorHandler = NoopErrorHandler;
var globalErrorHandler = new NoopErrorHandler();
/**
 * @export
 * @param {ErrorHandler} handler
 */
function setErrorHandler(handler) {
    globalErrorHandler = handler;
}
exports.setErrorHandler = setErrorHandler;
/**
 * @export
 * @returns {ErrorHandler}
 */
function getErrorHandler() {
    return globalErrorHandler;
}
exports.getErrorHandler = getErrorHandler;
/**
 * @export
 */
function resetErrorHandler() {
    globalErrorHandler = new NoopErrorHandler();
}
exports.resetErrorHandler = resetErrorHandler;


/***/ }),

/***/ "./node_modules/.pnpm/@optimizely+js-sdk-logging@0.3.1/node_modules/@optimizely/js-sdk-logging/lib/index.js":
/*!******************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@optimizely+js-sdk-logging@0.3.1/node_modules/@optimizely/js-sdk-logging/lib/index.js ***!
  \******************************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
 * Copyright 2019, Optimizely
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
__export(__webpack_require__(/*! ./errorHandler */ "./node_modules/.pnpm/@optimizely+js-sdk-logging@0.3.1/node_modules/@optimizely/js-sdk-logging/lib/errorHandler.js"));
__export(__webpack_require__(/*! ./models */ "./node_modules/.pnpm/@optimizely+js-sdk-logging@0.3.1/node_modules/@optimizely/js-sdk-logging/lib/models.js"));
__export(__webpack_require__(/*! ./logger */ "./node_modules/.pnpm/@optimizely+js-sdk-logging@0.3.1/node_modules/@optimizely/js-sdk-logging/lib/logger.js"));


/***/ }),

/***/ "./node_modules/.pnpm/@optimizely+js-sdk-logging@0.3.1/node_modules/@optimizely/js-sdk-logging/lib/logger.js":
/*!*******************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@optimizely+js-sdk-logging@0.3.1/node_modules/@optimizely/js-sdk-logging/lib/logger.js ***!
  \*******************************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
 * Copyright 2019, Optimizely
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var errorHandler_1 = __webpack_require__(/*! ./errorHandler */ "./node_modules/.pnpm/@optimizely+js-sdk-logging@0.3.1/node_modules/@optimizely/js-sdk-logging/lib/errorHandler.js");
var js_sdk_utils_1 = __webpack_require__(/*! @optimizely/js-sdk-utils */ "./node_modules/.pnpm/@optimizely+js-sdk-utils@0.4.0/node_modules/@optimizely/js-sdk-utils/lib/index.js");
var models_1 = __webpack_require__(/*! ./models */ "./node_modules/.pnpm/@optimizely+js-sdk-logging@0.3.1/node_modules/@optimizely/js-sdk-logging/lib/models.js");
var stringToLogLevel = {
    NOTSET: 0,
    DEBUG: 1,
    INFO: 2,
    WARNING: 3,
    ERROR: 4,
};
function coerceLogLevel(level) {
    if (typeof level !== 'string') {
        return level;
    }
    level = level.toUpperCase();
    if (level === 'WARN') {
        level = 'WARNING';
    }
    if (!stringToLogLevel[level]) {
        return level;
    }
    return stringToLogLevel[level];
}
var DefaultLogManager = /** @class */ (function () {
    function DefaultLogManager() {
        this.defaultLoggerFacade = new OptimizelyLogger();
        this.loggers = {};
    }
    DefaultLogManager.prototype.getLogger = function (name) {
        if (!name) {
            return this.defaultLoggerFacade;
        }
        if (!this.loggers[name]) {
            this.loggers[name] = new OptimizelyLogger({ messagePrefix: name });
        }
        return this.loggers[name];
    };
    return DefaultLogManager;
}());
var ConsoleLogHandler = /** @class */ (function () {
    /**
     * Creates an instance of ConsoleLogger.
     * @param {ConsoleLogHandlerConfig} config
     * @memberof ConsoleLogger
     */
    function ConsoleLogHandler(config) {
        if (config === void 0) { config = {}; }
        this.logLevel = models_1.LogLevel.NOTSET;
        if (config.logLevel !== undefined && js_sdk_utils_1.isValidEnum(models_1.LogLevel, config.logLevel)) {
            this.setLogLevel(config.logLevel);
        }
        this.logToConsole = config.logToConsole !== undefined ? !!config.logToConsole : true;
        this.prefix = config.prefix !== undefined ? config.prefix : '[OPTIMIZELY]';
    }
    /**
     * @param {LogLevel} level
     * @param {string} message
     * @memberof ConsoleLogger
     */
    ConsoleLogHandler.prototype.log = function (level, message) {
        if (!this.shouldLog(level) || !this.logToConsole) {
            return;
        }
        var logMessage = this.prefix + " - " + this.getLogLevelName(level) + " " + this.getTime() + " " + message;
        this.consoleLog(level, [logMessage]);
    };
    /**
     * @param {LogLevel} level
     * @memberof ConsoleLogger
     */
    ConsoleLogHandler.prototype.setLogLevel = function (level) {
        level = coerceLogLevel(level);
        if (!js_sdk_utils_1.isValidEnum(models_1.LogLevel, level) || level === undefined) {
            this.logLevel = models_1.LogLevel.ERROR;
        }
        else {
            this.logLevel = level;
        }
    };
    /**
     * @returns {string}
     * @memberof ConsoleLogger
     */
    ConsoleLogHandler.prototype.getTime = function () {
        return new Date().toISOString();
    };
    /**
     * @private
     * @param {LogLevel} targetLogLevel
     * @returns {boolean}
     * @memberof ConsoleLogger
     */
    ConsoleLogHandler.prototype.shouldLog = function (targetLogLevel) {
        return targetLogLevel >= this.logLevel;
    };
    /**
     * @private
     * @param {LogLevel} logLevel
     * @returns {string}
     * @memberof ConsoleLogger
     */
    ConsoleLogHandler.prototype.getLogLevelName = function (logLevel) {
        switch (logLevel) {
            case models_1.LogLevel.DEBUG:
                return 'DEBUG';
            case models_1.LogLevel.INFO:
                return 'INFO ';
            case models_1.LogLevel.WARNING:
                return 'WARN ';
            case models_1.LogLevel.ERROR:
                return 'ERROR';
            default:
                return 'NOTSET';
        }
    };
    /**
     * @private
     * @param {LogLevel} logLevel
     * @param {string[]} logArguments
     * @memberof ConsoleLogger
     */
    ConsoleLogHandler.prototype.consoleLog = function (logLevel, logArguments) {
        switch (logLevel) {
            case models_1.LogLevel.DEBUG:
                console.log.apply(console, logArguments);
                break;
            case models_1.LogLevel.INFO:
                console.info.apply(console, logArguments);
                break;
            case models_1.LogLevel.WARNING:
                console.warn.apply(console, logArguments);
                break;
            case models_1.LogLevel.ERROR:
                console.error.apply(console, logArguments);
                break;
            default:
                console.log.apply(console, logArguments);
        }
    };
    return ConsoleLogHandler;
}());
exports.ConsoleLogHandler = ConsoleLogHandler;
var globalLogLevel = models_1.LogLevel.NOTSET;
var globalLogHandler = null;
var OptimizelyLogger = /** @class */ (function () {
    function OptimizelyLogger(opts) {
        if (opts === void 0) { opts = {}; }
        this.messagePrefix = '';
        if (opts.messagePrefix) {
            this.messagePrefix = opts.messagePrefix;
        }
    }
    /**
     * @param {(LogLevel | LogInputObject)} levelOrObj
     * @param {string} [message]
     * @memberof OptimizelyLogger
     */
    OptimizelyLogger.prototype.log = function (level, message) {
        var splat = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            splat[_i - 2] = arguments[_i];
        }
        this.internalLog(coerceLogLevel(level), {
            message: message,
            splat: splat,
        });
    };
    OptimizelyLogger.prototype.info = function (message) {
        var splat = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            splat[_i - 1] = arguments[_i];
        }
        this.namedLog(models_1.LogLevel.INFO, message, splat);
    };
    OptimizelyLogger.prototype.debug = function (message) {
        var splat = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            splat[_i - 1] = arguments[_i];
        }
        this.namedLog(models_1.LogLevel.DEBUG, message, splat);
    };
    OptimizelyLogger.prototype.warn = function (message) {
        var splat = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            splat[_i - 1] = arguments[_i];
        }
        this.namedLog(models_1.LogLevel.WARNING, message, splat);
    };
    OptimizelyLogger.prototype.error = function (message) {
        var splat = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            splat[_i - 1] = arguments[_i];
        }
        this.namedLog(models_1.LogLevel.ERROR, message, splat);
    };
    OptimizelyLogger.prototype.format = function (data) {
        return "" + (this.messagePrefix ? this.messagePrefix + ': ' : '') + js_sdk_utils_1.sprintf.apply(void 0, __spreadArrays([data.message], data.splat));
    };
    OptimizelyLogger.prototype.internalLog = function (level, data) {
        if (!globalLogHandler) {
            return;
        }
        if (level < globalLogLevel) {
            return;
        }
        globalLogHandler.log(level, this.format(data));
        if (data.error && data.error instanceof Error) {
            errorHandler_1.getErrorHandler().handleError(data.error);
        }
    };
    OptimizelyLogger.prototype.namedLog = function (level, message, splat) {
        var error;
        if (message instanceof Error) {
            error = message;
            message = error.message;
            this.internalLog(level, {
                error: error,
                message: message,
                splat: splat,
            });
            return;
        }
        if (splat.length === 0) {
            this.internalLog(level, {
                message: message,
                splat: splat,
            });
            return;
        }
        var last = splat[splat.length - 1];
        if (last instanceof Error) {
            error = last;
            splat.splice(-1);
        }
        this.internalLog(level, { message: message, error: error, splat: splat });
    };
    return OptimizelyLogger;
}());
var globalLogManager = new DefaultLogManager();
function getLogger(name) {
    return globalLogManager.getLogger(name);
}
exports.getLogger = getLogger;
function setLogHandler(logger) {
    globalLogHandler = logger;
}
exports.setLogHandler = setLogHandler;
function setLogLevel(level) {
    level = coerceLogLevel(level);
    if (!js_sdk_utils_1.isValidEnum(models_1.LogLevel, level) || level === undefined) {
        globalLogLevel = models_1.LogLevel.ERROR;
    }
    else {
        globalLogLevel = level;
    }
}
exports.setLogLevel = setLogLevel;
function getLogLevel() {
    return globalLogLevel;
}
exports.getLogLevel = getLogLevel;
/**
 * Resets all global logger state to it's original
 */
function resetLogger() {
    globalLogManager = new DefaultLogManager();
    globalLogLevel = models_1.LogLevel.NOTSET;
}
exports.resetLogger = resetLogger;


/***/ }),

/***/ "./node_modules/.pnpm/@optimizely+js-sdk-logging@0.3.1/node_modules/@optimizely/js-sdk-logging/lib/models.js":
/*!*******************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@optimizely+js-sdk-logging@0.3.1/node_modules/@optimizely/js-sdk-logging/lib/models.js ***!
  \*******************************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
 * Copyright 2019, Optimizely
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["NOTSET"] = 0] = "NOTSET";
    LogLevel[LogLevel["DEBUG"] = 1] = "DEBUG";
    LogLevel[LogLevel["INFO"] = 2] = "INFO";
    LogLevel[LogLevel["WARNING"] = 3] = "WARNING";
    LogLevel[LogLevel["ERROR"] = 4] = "ERROR";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));


/***/ }),

/***/ "./node_modules/.pnpm/@optimizely+js-sdk-utils@0.4.0/node_modules/@optimizely/js-sdk-utils/lib/index.js":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@optimizely+js-sdk-utils@0.4.0/node_modules/@optimizely/js-sdk-utils/lib/index.js ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
 * Copyright 2019, Optimizely
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var uuid_1 = __webpack_require__(/*! uuid */ "./node_modules/.pnpm/uuid@3.4.0/node_modules/uuid/index.js");
function generateUUID() {
    return uuid_1.v4();
}
exports.generateUUID = generateUUID;
function getTimestamp() {
    return new Date().getTime();
}
exports.getTimestamp = getTimestamp;
/**
 * Validates a value is a valid TypeScript enum
 *
 * @export
 * @param {object} enumToCheck
 * @param {*} value
 * @returns {boolean}
 */
function isValidEnum(enumToCheck, value) {
    var found = false;
    var keys = Object.keys(enumToCheck);
    for (var index = 0; index < keys.length; index++) {
        if (value === enumToCheck[keys[index]]) {
            found = true;
            break;
        }
    }
    return found;
}
exports.isValidEnum = isValidEnum;
function groupBy(arr, grouperFn) {
    var grouper = {};
    arr.forEach(function (item) {
        var key = grouperFn(item);
        grouper[key] = grouper[key] || [];
        grouper[key].push(item);
    });
    return objectValues(grouper);
}
exports.groupBy = groupBy;
function objectValues(obj) {
    return Object.keys(obj).map(function (key) { return obj[key]; });
}
exports.objectValues = objectValues;
function objectEntries(obj) {
    return Object.keys(obj).map(function (key) { return [key, obj[key]]; });
}
exports.objectEntries = objectEntries;
function find(arr, cond) {
    var found;
    for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
        var item = arr_1[_i];
        if (cond(item)) {
            found = item;
            break;
        }
    }
    return found;
}
exports.find = find;
function keyBy(arr, keyByFn) {
    var map = {};
    arr.forEach(function (item) {
        var key = keyByFn(item);
        map[key] = item;
    });
    return map;
}
exports.keyBy = keyBy;
function sprintf(format) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var i = 0;
    return format.replace(/%s/g, function () {
        var arg = args[i++];
        var type = typeof arg;
        if (type === 'function') {
            return arg();
        }
        else if (type === 'string') {
            return arg;
        }
        else {
            return String(arg);
        }
    });
}
exports.sprintf = sprintf;
/*
 * Notification types for use with NotificationCenter
 * Format is EVENT: <list of parameters to callback>
 *
 * SDK consumers can use these to register callbacks with the notification center.
 *
 *  @deprecated since 3.1.0
 *  ACTIVATE: An impression event will be sent to Optimizely
 *  Callbacks will receive an object argument with the following properties:
 *    - experiment {Object}
 *    - userId {string}
 *    - attributes {Object|undefined}
 *    - variation {Object}
 *    - logEvent {Object}
 *
 *  DECISION: A decision is made in the system. i.e. user activation,
 *  feature access or feature-variable value retrieval
 *  Callbacks will receive an object argument with the following properties:
 *    - type {string}
 *    - userId {string}
 *    - attributes {Object|undefined}
 *    - decisionInfo {Object|undefined}
 *
 *  LOG_EVENT: A batch of events, which could contain impressions and/or conversions,
 *  will be sent to Optimizely
 *  Callbacks will receive an object argument with the following properties:
 *    - url {string}
 *    - httpVerb {string}
 *    - params {Object}
 *
 *  OPTIMIZELY_CONFIG_UPDATE: This Optimizely instance has been updated with a new
 *  config
 *
 *  TRACK: A conversion event will be sent to Optimizely
 *  Callbacks will receive the an object argument with the following properties:
 *    - eventKey {string}
 *    - userId {string}
 *    - attributes {Object|undefined}
 *    - eventTags {Object|undefined}
 *    - logEvent {Object}
 *
 */
var NOTIFICATION_TYPES;
(function (NOTIFICATION_TYPES) {
    NOTIFICATION_TYPES["ACTIVATE"] = "ACTIVATE:experiment, user_id,attributes, variation, event";
    NOTIFICATION_TYPES["DECISION"] = "DECISION:type, userId, attributes, decisionInfo";
    NOTIFICATION_TYPES["LOG_EVENT"] = "LOG_EVENT:logEvent";
    NOTIFICATION_TYPES["OPTIMIZELY_CONFIG_UPDATE"] = "OPTIMIZELY_CONFIG_UPDATE";
    NOTIFICATION_TYPES["TRACK"] = "TRACK:event_key, user_id, attributes, event_tags, event";
})(NOTIFICATION_TYPES = exports.NOTIFICATION_TYPES || (exports.NOTIFICATION_TYPES = {}));


/***/ }),

/***/ "./node_modules/.pnpm/@optimizely+optimizely-sdk@4.9.1/node_modules/@optimizely/optimizely-sdk/dist/optimizely.lite.es.js":
/*!********************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@optimizely+optimizely-sdk@4.9.1/node_modules/@optimizely/optimizely-sdk/dist/optimizely.lite.es.js ***!
  \********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OptimizelyDecideOption": () => (/* binding */ OptimizelyDecideOption),
/* harmony export */   "createInstance": () => (/* binding */ createInstance),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "enums": () => (/* binding */ enums),
/* harmony export */   "errorHandler": () => (/* binding */ defaultErrorHandler),
/* harmony export */   "eventDispatcher": () => (/* binding */ noOpEventDispatcher),
/* harmony export */   "logging": () => (/* binding */ loggerPlugin),
/* harmony export */   "setLogLevel": () => (/* reexport safe */ _optimizely_js_sdk_logging__WEBPACK_IMPORTED_MODULE_0__.setLogLevel),
/* harmony export */   "setLogger": () => (/* reexport safe */ _optimizely_js_sdk_logging__WEBPACK_IMPORTED_MODULE_0__.setLogHandler)
/* harmony export */ });
/* harmony import */ var _optimizely_js_sdk_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @optimizely/js-sdk-logging */ "./node_modules/.pnpm/@optimizely+js-sdk-logging@0.3.1/node_modules/@optimizely/js-sdk-logging/lib/index.js");
/* harmony import */ var _optimizely_js_sdk_logging__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_optimizely_js_sdk_logging__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _optimizely_js_sdk_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @optimizely/js-sdk-utils */ "./node_modules/.pnpm/@optimizely+js-sdk-utils@0.4.0/node_modules/@optimizely/js-sdk-utils/lib/index.js");
/* harmony import */ var murmurhash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! murmurhash */ "./node_modules/.pnpm/murmurhash@0.0.2/node_modules/murmurhash/murmurhash.js");
/* harmony import */ var murmurhash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(murmurhash__WEBPACK_IMPORTED_MODULE_2__);





/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

/****************************************************************************
 * Copyright 2016-2022, Optimizely, Inc. and contributors                   *
 *                                                                          *
 * Licensed under the Apache License, Version 2.0 (the "License");          *
 * you may not use this file except in compliance with the License.         *
 * You may obtain a copy of the License at                                  *
 *                                                                          *
 *    http://www.apache.org/licenses/LICENSE-2.0                            *
 *                                                                          *
 * Unless required by applicable law or agreed to in writing, software      *
 * distributed under the License is distributed on an "AS IS" BASIS,        *
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. *
 * See the License for the specific language governing permissions and      *
 * limitations under the License.                                           *
 ***************************************************************************/
/**
 * Contains global enums used throughout the library
 */
var LOG_LEVEL = {
    NOTSET: 0,
    DEBUG: 1,
    INFO: 2,
    WARNING: 3,
    ERROR: 4,
};
var ERROR_MESSAGES = {
    CONDITION_EVALUATOR_ERROR: '%s: Error evaluating audience condition of type %s: %s',
    DATAFILE_AND_SDK_KEY_MISSING: '%s: You must provide at least one of sdkKey or datafile. Cannot start Optimizely',
    EXPERIMENT_KEY_NOT_IN_DATAFILE: '%s: Experiment key %s is not in datafile.',
    FEATURE_NOT_IN_DATAFILE: '%s: Feature key %s is not in datafile.',
    IMPROPERLY_FORMATTED_EXPERIMENT: '%s: Experiment key %s is improperly formatted.',
    INVALID_ATTRIBUTES: '%s: Provided attributes are in an invalid format.',
    INVALID_BUCKETING_ID: '%s: Unable to generate hash for bucketing ID %s: %s',
    INVALID_DATAFILE: '%s: Datafile is invalid - property %s: %s',
    INVALID_DATAFILE_MALFORMED: '%s: Datafile is invalid because it is malformed.',
    INVALID_CONFIG: '%s: Provided Optimizely config is in an invalid format.',
    INVALID_JSON: '%s: JSON object is not valid.',
    INVALID_ERROR_HANDLER: '%s: Provided "errorHandler" is in an invalid format.',
    INVALID_EVENT_DISPATCHER: '%s: Provided "eventDispatcher" is in an invalid format.',
    INVALID_EVENT_TAGS: '%s: Provided event tags are in an invalid format.',
    INVALID_EXPERIMENT_KEY: '%s: Experiment key %s is not in datafile. It is either invalid, paused, or archived.',
    INVALID_EXPERIMENT_ID: '%s: Experiment ID %s is not in datafile.',
    INVALID_GROUP_ID: '%s: Group ID %s is not in datafile.',
    INVALID_LOGGER: '%s: Provided "logger" is in an invalid format.',
    INVALID_ROLLOUT_ID: '%s: Invalid rollout ID %s attached to feature %s',
    INVALID_USER_ID: '%s: Provided user ID is in an invalid format.',
    INVALID_USER_PROFILE_SERVICE: '%s: Provided user profile service instance is in an invalid format: %s.',
    NO_DATAFILE_SPECIFIED: '%s: No datafile specified. Cannot start optimizely.',
    NO_JSON_PROVIDED: '%s: No JSON object to validate against schema.',
    NO_VARIATION_FOR_EXPERIMENT_KEY: '%s: No variation key %s defined in datafile for experiment %s.',
    UNDEFINED_ATTRIBUTE: '%s: Provided attribute: %s has an undefined value.',
    UNRECOGNIZED_ATTRIBUTE: '%s: Unrecognized attribute %s provided. Pruning before sending event to Optimizely.',
    UNABLE_TO_CAST_VALUE: '%s: Unable to cast value %s to type %s, returning null.',
    USER_NOT_IN_FORCED_VARIATION: '%s: User %s is not in the forced variation map. Cannot remove their forced variation.',
    USER_PROFILE_LOOKUP_ERROR: '%s: Error while looking up user profile for user ID "%s": %s.',
    USER_PROFILE_SAVE_ERROR: '%s: Error while saving user profile for user ID "%s": %s.',
    VARIABLE_KEY_NOT_IN_DATAFILE: '%s: Variable with key "%s" associated with feature with key "%s" is not in datafile.',
    VARIATION_ID_NOT_IN_DATAFILE: '%s: No variation ID %s defined in datafile for experiment %s.',
    VARIATION_ID_NOT_IN_DATAFILE_NO_EXPERIMENT: '%s: Variation ID %s is not in the datafile.',
    INVALID_INPUT_FORMAT: '%s: Provided %s is in an invalid format.',
    INVALID_DATAFILE_VERSION: '%s: This version of the JavaScript SDK does not support the given datafile version: %s',
    INVALID_VARIATION_KEY: '%s: Provided variation key is in an invalid format.',
};
var LOG_MESSAGES = {
    ACTIVATE_USER: '%s: Activating user %s in experiment %s.',
    DISPATCH_CONVERSION_EVENT: '%s: Dispatching conversion event to URL %s with params %s.',
    DISPATCH_IMPRESSION_EVENT: '%s: Dispatching impression event to URL %s with params %s.',
    DEPRECATED_EVENT_VALUE: '%s: Event value is deprecated in %s call.',
    EVENT_KEY_NOT_FOUND: '%s: Event key %s is not in datafile.',
    EXPERIMENT_NOT_RUNNING: '%s: Experiment %s is not running.',
    FEATURE_ENABLED_FOR_USER: '%s: Feature %s is enabled for user %s.',
    FEATURE_NOT_ENABLED_FOR_USER: '%s: Feature %s is not enabled for user %s.',
    FEATURE_HAS_NO_EXPERIMENTS: '%s: Feature %s is not attached to any experiments.',
    FAILED_TO_PARSE_VALUE: '%s: Failed to parse event value "%s" from event tags.',
    FAILED_TO_PARSE_REVENUE: '%s: Failed to parse revenue value "%s" from event tags.',
    FORCED_BUCKETING_FAILED: '%s: Variation key %s is not in datafile. Not activating user %s.',
    INVALID_OBJECT: '%s: Optimizely object is not valid. Failing %s.',
    INVALID_CLIENT_ENGINE: '%s: Invalid client engine passed: %s. Defaulting to node-sdk.',
    INVALID_DEFAULT_DECIDE_OPTIONS: '%s: Provided default decide options is not an array.',
    INVALID_DECIDE_OPTIONS: '%s: Provided decide options is not an array. Using default decide options.',
    INVALID_VARIATION_ID: '%s: Bucketed into an invalid variation ID. Returning null.',
    NOTIFICATION_LISTENER_EXCEPTION: '%s: Notification listener for (%s) threw exception: %s',
    NO_ROLLOUT_EXISTS: '%s: There is no rollout of feature %s.',
    NOT_ACTIVATING_USER: '%s: Not activating user %s for experiment %s.',
    NOT_TRACKING_USER: '%s: Not tracking user %s.',
    PARSED_REVENUE_VALUE: '%s: Parsed revenue value "%s" from event tags.',
    PARSED_NUMERIC_VALUE: '%s: Parsed event value "%s" from event tags.',
    RETURNING_STORED_VARIATION: '%s: Returning previously activated variation "%s" of experiment "%s" for user "%s" from user profile.',
    ROLLOUT_HAS_NO_EXPERIMENTS: '%s: Rollout of feature %s has no experiments',
    SAVED_VARIATION: '%s: Saved variation "%s" of experiment "%s" for user "%s".',
    SAVED_VARIATION_NOT_FOUND: '%s: User %s was previously bucketed into variation with ID %s for experiment %s, but no matching variation was found.',
    SHOULD_NOT_DISPATCH_ACTIVATE: '%s: Experiment %s is not in "Running" state. Not activating user.',
    SKIPPING_JSON_VALIDATION: '%s: Skipping JSON schema validation.',
    TRACK_EVENT: '%s: Tracking event %s for user %s.',
    UNRECOGNIZED_DECIDE_OPTION: '%s: Unrecognized decide option %s provided.',
    USER_ASSIGNED_TO_EXPERIMENT_BUCKET: '%s: Assigned bucket %s to user with bucketing ID %s.',
    USER_BUCKETED_INTO_EXPERIMENT_IN_GROUP: '%s: User %s is in experiment %s of group %s.',
    USER_BUCKETED_INTO_TARGETING_RULE: '%s: User %s bucketed into targeting rule %s.',
    USER_IN_FEATURE_EXPERIMENT: '%s: User %s is in variation %s of experiment %s on the feature %s.',
    USER_IN_ROLLOUT: '%s: User %s is in rollout of feature %s.',
    USER_NOT_BUCKETED_INTO_EVERYONE_TARGETING_RULE: '%s: User %s not bucketed into everyone targeting rule due to traffic allocation.',
    USER_NOT_BUCKETED_INTO_EXPERIMENT_IN_GROUP: '%s: User %s is not in experiment %s of group %s.',
    USER_NOT_BUCKETED_INTO_ANY_EXPERIMENT_IN_GROUP: '%s: User %s is not in any experiment of group %s.',
    USER_NOT_BUCKETED_INTO_TARGETING_RULE: '%s User %s not bucketed into targeting rule %s due to traffic allocation. Trying everyone rule.',
    USER_NOT_IN_FEATURE_EXPERIMENT: '%s: User %s is not in any experiment on the feature %s.',
    USER_NOT_IN_ROLLOUT: '%s: User %s is not in rollout of feature %s.',
    USER_FORCED_IN_VARIATION: '%s: User %s is forced in variation %s.',
    USER_MAPPED_TO_FORCED_VARIATION: '%s: Set variation %s for experiment %s and user %s in the forced variation map.',
    USER_DOESNT_MEET_CONDITIONS_FOR_TARGETING_RULE: '%s: User %s does not meet conditions for targeting rule %s.',
    USER_MEETS_CONDITIONS_FOR_TARGETING_RULE: '%s: User %s meets conditions for targeting rule %s.',
    USER_HAS_VARIATION: '%s: User %s is in variation %s of experiment %s.',
    USER_HAS_FORCED_DECISION_WITH_RULE_SPECIFIED: 'Variation (%s) is mapped to flag (%s), rule (%s) and user (%s) in the forced decision map.',
    USER_HAS_FORCED_DECISION_WITH_NO_RULE_SPECIFIED: 'Variation (%s) is mapped to flag (%s) and user (%s) in the forced decision map.',
    USER_HAS_FORCED_DECISION_WITH_RULE_SPECIFIED_BUT_INVALID: 'Invalid variation is mapped to flag (%s), rule (%s) and user (%s) in the forced decision map.',
    USER_HAS_FORCED_DECISION_WITH_NO_RULE_SPECIFIED_BUT_INVALID: 'Invalid variation is mapped to flag (%s) and user (%s) in the forced decision map.',
    USER_HAS_FORCED_VARIATION: '%s: Variation %s is mapped to experiment %s and user %s in the forced variation map.',
    USER_HAS_NO_VARIATION: '%s: User %s is in no variation of experiment %s.',
    USER_HAS_NO_FORCED_VARIATION: '%s: User %s is not in the forced variation map.',
    USER_HAS_NO_FORCED_VARIATION_FOR_EXPERIMENT: '%s: No experiment %s mapped to user %s in the forced variation map.',
    USER_NOT_IN_ANY_EXPERIMENT: '%s: User %s is not in any experiment of group %s.',
    USER_NOT_IN_EXPERIMENT: '%s: User %s does not meet conditions to be in experiment %s.',
    USER_RECEIVED_DEFAULT_VARIABLE_VALUE: '%s: User "%s" is not in any variation or rollout rule. Returning default value for variable "%s" of feature flag "%s".',
    FEATURE_NOT_ENABLED_RETURN_DEFAULT_VARIABLE_VALUE: '%s: Feature "%s" is not enabled for user %s. Returning the default variable value "%s".',
    VARIABLE_NOT_USED_RETURN_DEFAULT_VARIABLE_VALUE: '%s: Variable "%s" is not used in variation "%s". Returning default value.',
    USER_RECEIVED_VARIABLE_VALUE: '%s: Got variable value "%s" for variable "%s" of feature flag "%s"',
    VALID_DATAFILE: '%s: Datafile is valid.',
    VALID_USER_PROFILE_SERVICE: '%s: Valid user profile service provided.',
    VARIATION_REMOVED_FOR_USER: '%s: Variation mapped to experiment %s has been removed for user %s.',
    VARIABLE_REQUESTED_WITH_WRONG_TYPE: '%s: Requested variable type "%s", but variable is of type "%s". Use correct API to retrieve value. Returning None.',
    VALID_BUCKETING_ID: '%s: BucketingId is valid: "%s"',
    BUCKETING_ID_NOT_STRING: '%s: BucketingID attribute is not a string. Defaulted to userId',
    EVALUATING_AUDIENCE: '%s: Starting to evaluate audience "%s" with conditions: %s.',
    EVALUATING_AUDIENCES_COMBINED: '%s: Evaluating audiences for %s "%s": %s.',
    AUDIENCE_EVALUATION_RESULT: '%s: Audience "%s" evaluated to %s.',
    AUDIENCE_EVALUATION_RESULT_COMBINED: '%s: Audiences for %s %s collectively evaluated to %s.',
    MISSING_ATTRIBUTE_VALUE: '%s: Audience condition %s evaluated to UNKNOWN because no value was passed for user attribute "%s".',
    UNEXPECTED_CONDITION_VALUE: '%s: Audience condition %s evaluated to UNKNOWN because the condition value is not supported.',
    UNEXPECTED_TYPE: '%s: Audience condition %s evaluated to UNKNOWN because a value of type "%s" was passed for user attribute "%s".',
    UNEXPECTED_TYPE_NULL: '%s: Audience condition %s evaluated to UNKNOWN because a null value was passed for user attribute "%s".',
    UNKNOWN_CONDITION_TYPE: '%s: Audience condition %s has an unknown condition type. You may need to upgrade to a newer release of the Optimizely SDK.',
    UNKNOWN_MATCH_TYPE: '%s: Audience condition %s uses an unknown match type. You may need to upgrade to a newer release of the Optimizely SDK.',
    UPDATED_OPTIMIZELY_CONFIG: '%s: Updated Optimizely config to revision %s (project id %s)',
    OUT_OF_BOUNDS: '%s: Audience condition %s evaluated to UNKNOWN because the number value for user attribute "%s" is not in the range [-2^53, +2^53].',
    UNABLE_TO_ATTACH_UNLOAD: '%s: unable to bind optimizely.close() to page unload event: "%s"',
};
var CONTROL_ATTRIBUTES = {
    BOT_FILTERING: '$opt_bot_filtering',
    BUCKETING_ID: '$opt_bucketing_id',
    STICKY_BUCKETING_KEY: '$opt_experiment_bucket_map',
    USER_AGENT: '$opt_user_agent',
    FORCED_DECISION_NULL_RULE_KEY: '$opt_null_rule_key'
};
var JAVASCRIPT_CLIENT_ENGINE = 'javascript-sdk';
var NODE_CLIENT_ENGINE = 'node-sdk';
var REACT_CLIENT_ENGINE = 'react-sdk';
var REACT_NATIVE_CLIENT_ENGINE = 'react-native-sdk';
var REACT_NATIVE_JS_CLIENT_ENGINE = 'react-native-js-sdk';
var NODE_CLIENT_VERSION = '4.9.1';
var NOTIFICATION_TYPES = _optimizely_js_sdk_utils__WEBPACK_IMPORTED_MODULE_1__.NOTIFICATION_TYPES;
var DECISION_NOTIFICATION_TYPES = {
    AB_TEST: 'ab-test',
    FEATURE: 'feature',
    FEATURE_TEST: 'feature-test',
    FEATURE_VARIABLE: 'feature-variable',
    ALL_FEATURE_VARIABLES: 'all-feature-variables',
    FLAG: 'flag',
};
/*
 * Represents the source of a decision for feature management. When a feature
 * is accessed through isFeatureEnabled or getVariableValue APIs, the decision
 * source is used to decide whether to dispatch an impression event to
 * Optimizely.
 */
var DECISION_SOURCES = {
    FEATURE_TEST: 'feature-test',
    ROLLOUT: 'rollout',
    EXPERIMENT: 'experiment',
};
var AUDIENCE_EVALUATION_TYPES = {
    RULE: 'rule',
    EXPERIMENT: 'experiment',
};
/*
 * Possible types of variables attached to features
 */
var FEATURE_VARIABLE_TYPES = {
    BOOLEAN: 'boolean',
    DOUBLE: 'double',
    INTEGER: 'integer',
    STRING: 'string',
    JSON: 'json',
};
/*
 * Supported datafile versions
 */
var DATAFILE_VERSIONS = {
    V2: '2',
    V3: '3',
    V4: '4',
};
var DECISION_MESSAGES = {
    SDK_NOT_READY: 'Optimizely SDK not configured properly yet.',
    FLAG_KEY_INVALID: 'No flag was found for key "%s".',
    VARIABLE_VALUE_INVALID: 'Variable value for key "%s" is invalid or wrong type.',
};

var enums = /*#__PURE__*/Object.freeze({
    __proto__: null,
    LOG_LEVEL: LOG_LEVEL,
    ERROR_MESSAGES: ERROR_MESSAGES,
    LOG_MESSAGES: LOG_MESSAGES,
    CONTROL_ATTRIBUTES: CONTROL_ATTRIBUTES,
    JAVASCRIPT_CLIENT_ENGINE: JAVASCRIPT_CLIENT_ENGINE,
    NODE_CLIENT_ENGINE: NODE_CLIENT_ENGINE,
    REACT_CLIENT_ENGINE: REACT_CLIENT_ENGINE,
    REACT_NATIVE_CLIENT_ENGINE: REACT_NATIVE_CLIENT_ENGINE,
    REACT_NATIVE_JS_CLIENT_ENGINE: REACT_NATIVE_JS_CLIENT_ENGINE,
    NODE_CLIENT_VERSION: NODE_CLIENT_VERSION,
    NOTIFICATION_TYPES: NOTIFICATION_TYPES,
    DECISION_NOTIFICATION_TYPES: DECISION_NOTIFICATION_TYPES,
    DECISION_SOURCES: DECISION_SOURCES,
    AUDIENCE_EVALUATION_TYPES: AUDIENCE_EVALUATION_TYPES,
    FEATURE_VARIABLE_TYPES: FEATURE_VARIABLE_TYPES,
    DATAFILE_VERSIONS: DATAFILE_VERSIONS,
    DECISION_MESSAGES: DECISION_MESSAGES
});

/**
 * Copyright 2016, 2018-2020, Optimizely
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var MODULE_NAME = 'CONFIG_VALIDATOR';
var SUPPORTED_VERSIONS = [DATAFILE_VERSIONS.V2, DATAFILE_VERSIONS.V3, DATAFILE_VERSIONS.V4];
/**
 * Validates the given config options
 * @param  {unknown} config
 * @param  {object}  config.errorHandler
 * @param  {object}  config.eventDispatcher
 * @param  {object}  config.logger
 * @return {boolean} true if the config options are valid
 * @throws If any of the config options are not valid
 */
var validate = function (config) {
    if (typeof config === 'object' && config !== null) {
        var configObj = config;
        var errorHandler = configObj['errorHandler'];
        var eventDispatcher = configObj['eventDispatcher'];
        var logger = configObj['logger'];
        if (errorHandler && typeof errorHandler['handleError'] !== 'function') {
            throw new Error((0,_optimizely_js_sdk_utils__WEBPACK_IMPORTED_MODULE_1__.sprintf)(ERROR_MESSAGES.INVALID_ERROR_HANDLER, MODULE_NAME));
        }
        if (eventDispatcher && typeof eventDispatcher['dispatchEvent'] !== 'function') {
            throw new Error((0,_optimizely_js_sdk_utils__WEBPACK_IMPORTED_MODULE_1__.sprintf)(ERROR_MESSAGES.INVALID_EVENT_DISPATCHER, MODULE_NAME));
        }
        if (logger && typeof logger['log'] !== 'function') {
            throw new Error((0,_optimizely_js_sdk_utils__WEBPACK_IMPORTED_MODULE_1__.sprintf)(ERROR_MESSAGES.INVALID_LOGGER, MODULE_NAME));
        }
        return true;
    }
    throw new Error((0,_optimizely_js_sdk_utils__WEBPACK_IMPORTED_MODULE_1__.sprintf)(ERROR_MESSAGES.INVALID_CONFIG, MODULE_NAME));
};
/**
 * Validates the datafile
 * @param {Object|string}  datafile
 * @return {Object} The datafile object if the datafile is valid
 * @throws If the datafile is not valid for any of the following reasons:
 - The datafile string is undefined
 - The datafile string cannot be parsed as a JSON object
 - The datafile version is not supported
 */
// eslint-disable-next-line
var validateDatafile = function (datafile) {
    if (!datafile) {
        throw new Error((0,_optimizely_js_sdk_utils__WEBPACK_IMPORTED_MODULE_1__.sprintf)(ERROR_MESSAGES.NO_DATAFILE_SPECIFIED, MODULE_NAME));
    }
    if (typeof datafile === 'string') {
        // Attempt to parse the datafile string
        try {
            datafile = JSON.parse(datafile);
        }
        catch (ex) {
            throw new Error((0,_optimizely_js_sdk_utils__WEBPACK_IMPORTED_MODULE_1__.sprintf)(ERROR_MESSAGES.INVALID_DATAFILE_MALFORMED, MODULE_NAME));
        }
    }
    if (typeof datafile === 'object' && !Array.isArray(datafile) && datafile !== null) {
        if (SUPPORTED_VERSIONS.indexOf(datafile['version']) === -1) {
            throw new Error((0,_optimizely_js_sdk_utils__WEBPACK_IMPORTED_MODULE_1__.sprintf)(ERROR_MESSAGES.INVALID_DATAFILE_VERSION, MODULE_NAME, datafile['version']));
        }
    }
    return datafile;
};
/**
 * Provides utility methods for validating that the configuration options are valid
 */
var configValidator = {
    validate: validate,
    validateDatafile: validateDatafile,
};

/**
 * Copyright 2016, 2020-2021, Optimizely
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Default error handler implementation
 */
function handleError() {
    // no-op
}
var defaultErrorHandler = {
    handleError: handleError,
};

/**
 * Copyright 2021, Optimizely
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * No Op Event dispatcher for non standard platforms like edge workers etc
 * @param  {Event}    eventObj
 * @param  {Function} callback
 */
/* eslint-disable @typescript-eslint/no-unused-vars */
var dispatchEvent = function (eventObj, callback) {
    // NoOp Event dispatcher. It does nothing really.
};
var noOpEventDispatcher = {
    dispatchEvent: dispatchEvent,
};

/**
 * Copyright 2016-2017, 2020-2021, Optimizely
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var NoOpLogger = /** @class */ (function () {
    function NoOpLogger() {
    }
    NoOpLogger.prototype.log = function () { };
    return NoOpLogger;
}());
function createLogger(opts) {
    return new _optimizely_js_sdk_logging__WEBPACK_IMPORTED_MODULE_0__.ConsoleLogHandler(opts);
}
function createNoOpLogger() {
    return new NoOpLogger();
}

var loggerPlugin = /*#__PURE__*/Object.freeze({
    __proto__: null,
    NoOpLogger: NoOpLogger,
    createLogger: createLogger,
    createNoOpLogger: createNoOpLogger
});

var VariableType;
(function (VariableType) {
    VariableType["BOOLEAN"] = "boolean";
    VariableType["DOUBLE"] = "double";
    VariableType["INTEGER"] = "integer";
    VariableType["STRING"] = "string";
    VariableType["JSON"] = "json";
})(VariableType || (VariableType = {}));
//TODO: Move OptimizelyDecideOption to @optimizely/optimizely-sdk/lib/utils/enums
var OptimizelyDecideOption;
(function (OptimizelyDecideOption) {
    OptimizelyDecideOption["DISABLE_DECISION_EVENT"] = "DISABLE_DECISION_EVENT";
    OptimizelyDecideOption["ENABLED_FLAGS_ONLY"] = "ENABLED_FLAGS_ONLY";
    OptimizelyDecideOption["IGNORE_USER_PROFILE_SERVICE"] = "IGNORE_USER_PROFILE_SERVICE";
    OptimizelyDecideOption["INCLUDE_REASONS"] = "INCLUDE_REASONS";
    OptimizelyDecideOption["EXCLUDE_VARIABLES"] = "EXCLUDE_VARIABLES";
})(OptimizelyDecideOption || (OptimizelyDecideOption = {}));

function newErrorDecision(key, user, reasons) {
    return {
        variationKey: null,
        enabled: false,
        variables: {},
        ruleKey: null,
        flagKey: key,
        userContext: user,
        reasons: reasons,
    };
}

var OptimizelyUserContext = /** @class */ (function () {
    function OptimizelyUserContext(_a) {
        var optimizely = _a.optimizely, userId = _a.userId, attributes = _a.attributes;
        var _b;
        this.optimizely = optimizely;
        this.userId = userId;
        this.attributes = (_b = __assign({}, attributes)) !== null && _b !== void 0 ? _b : {};
        this.forcedDecisionsMap = {};
    }
    /**
     * Sets an attribute for a given key.
     * @param     {string}                     key         An attribute key
     * @param     {any}                        value       An attribute value
     */
    OptimizelyUserContext.prototype.setAttribute = function (key, value) {
        this.attributes[key] = value;
    };
    OptimizelyUserContext.prototype.getUserId = function () {
        return this.userId;
    };
    OptimizelyUserContext.prototype.getAttributes = function () {
        return __assign({}, this.attributes);
    };
    OptimizelyUserContext.prototype.getOptimizely = function () {
        return this.optimizely;
    };
    /**
     * Returns a decision result for a given flag key and a user context, which contains all data required to deliver the flag.
     * If the SDK finds an error, it will return a decision with null for variationKey. The decision will include an error message in reasons.
     * @param     {string}                     key         A flag key for which a decision will be made.
     * @param     {OptimizelyDecideOption}     options     An array of options for decision-making.
     * @return    {OptimizelyDecision}                     A decision result.
     */
    OptimizelyUserContext.prototype.decide = function (key, options) {
        if (options === void 0) { options = []; }
        return this.optimizely.decide(this.cloneUserContext(), key, options);
    };
    /**
     * Returns an object of decision results for multiple flag keys and a user context.
     * If the SDK finds an error for a key, the response will include a decision for the key showing reasons for the error.
     * The SDK will always return key-mapped decisions. When it cannot process requests, it will return an empty map after logging the errors.
     * @param     {string[]}                   keys        An array of flag keys for which decisions will be made.
     * @param     {OptimizelyDecideOption[]}   options     An array of options for decision-making.
     * @return    {[key: string]: OptimizelyDecision}      An object of decision results mapped by flag keys.
     */
    OptimizelyUserContext.prototype.decideForKeys = function (keys, options) {
        if (options === void 0) { options = []; }
        return this.optimizely.decideForKeys(this.cloneUserContext(), keys, options);
    };
    /**
     * Returns an object of decision results for all active flag keys.
     * @param     {OptimizelyDecideOption[]}   options     An array of options for decision-making.
     * @return    {[key: string]: OptimizelyDecision}      An object of all decision results mapped by flag keys.
     */
    OptimizelyUserContext.prototype.decideAll = function (options) {
        if (options === void 0) { options = []; }
        return this.optimizely.decideAll(this.cloneUserContext(), options);
    };
    /**
     * Tracks an event.
     * @param     {string}                     eventName The event name.
     * @param     {EventTags}                  eventTags An optional map of event tag names to event tag values.
     */
    OptimizelyUserContext.prototype.trackEvent = function (eventName, eventTags) {
        this.optimizely.track(eventName, this.userId, this.attributes, eventTags);
    };
    /**
     * Sets the forced decision for specified optimizely decision context.
     * @param     {OptimizelyDecisionContext}   context      OptimizelyDecisionContext containing flagKey and optional ruleKey.
     * @param     {OptimizelyForcedDecision}    decision     OptimizelyForcedDecision containing forced variation key.
     * @return    {boolean}                     true if the forced decision has been set successfully.
     */
    OptimizelyUserContext.prototype.setForcedDecision = function (context, decision) {
        var _a;
        var flagKey = context.flagKey;
        var ruleKey = (_a = context.ruleKey) !== null && _a !== void 0 ? _a : CONTROL_ATTRIBUTES.FORCED_DECISION_NULL_RULE_KEY;
        var variationKey = decision.variationKey;
        var forcedDecision = { variationKey: variationKey };
        if (!this.forcedDecisionsMap[flagKey]) {
            this.forcedDecisionsMap[flagKey] = {};
        }
        this.forcedDecisionsMap[flagKey][ruleKey] = forcedDecision;
        return true;
    };
    /**
     * Returns the forced decision for specified optimizely decision context.
     * @param     {OptimizelyDecisionContext}  context  OptimizelyDecisionContext containing flagKey and optional ruleKey.
     * @return    {OptimizelyForcedDecision|null}       OptimizelyForcedDecision for specified context if exists or null.
     */
    OptimizelyUserContext.prototype.getForcedDecision = function (context) {
        return this.findForcedDecision(context);
    };
    /**
     * Removes the forced decision for specified optimizely decision context.
     * @param     {OptimizelyDecisionContext}  context  OptimizelyDecisionContext containing flagKey and optional ruleKey.
     * @return    {boolean}                    true if the forced decision has been removed successfully
     */
    OptimizelyUserContext.prototype.removeForcedDecision = function (context) {
        var _a;
        var ruleKey = (_a = context.ruleKey) !== null && _a !== void 0 ? _a : CONTROL_ATTRIBUTES.FORCED_DECISION_NULL_RULE_KEY;
        var flagKey = context.flagKey;
        var isForcedDecisionRemoved = false;
        if (this.forcedDecisionsMap.hasOwnProperty(flagKey)) {
            var forcedDecisionByRuleKey = this.forcedDecisionsMap[flagKey];
            if (forcedDecisionByRuleKey.hasOwnProperty(ruleKey)) {
                delete this.forcedDecisionsMap[flagKey][ruleKey];
                isForcedDecisionRemoved = true;
            }
            if (Object.keys(this.forcedDecisionsMap[flagKey]).length === 0) {
                delete this.forcedDecisionsMap[flagKey];
            }
        }
        return isForcedDecisionRemoved;
    };
    /**
     * Removes all forced decisions bound to this user context.
     * @return    {boolean}                    true if the forced decision has been removed successfully
     */
    OptimizelyUserContext.prototype.removeAllForcedDecisions = function () {
        this.forcedDecisionsMap = {};
        return true;
    };
    /**
     * Finds a forced decision in forcedDecisionsMap for provided optimizely decision context.
     * @param     {OptimizelyDecisionContext}     context  OptimizelyDecisionContext containing flagKey and optional ruleKey.
     * @return    {OptimizelyForcedDecision|null}          OptimizelyForcedDecision for specified context if exists or null.
     */
    OptimizelyUserContext.prototype.findForcedDecision = function (context) {
        var _a;
        var variationKey;
        var validRuleKey = (_a = context.ruleKey) !== null && _a !== void 0 ? _a : CONTROL_ATTRIBUTES.FORCED_DECISION_NULL_RULE_KEY;
        var flagKey = context.flagKey;
        if (this.forcedDecisionsMap.hasOwnProperty(context.flagKey)) {
            var forcedDecisionByRuleKey = this.forcedDecisionsMap[flagKey];
            if (forcedDecisionByRuleKey.hasOwnProperty(validRuleKey)) {
                variationKey = forcedDecisionByRuleKey[validRuleKey].variationKey;
                return { variationKey: variationKey };
            }
        }
        return null;
    };
    OptimizelyUserContext.prototype.cloneUserContext = function () {
        var userContext = new OptimizelyUserContext({
            optimizely: this.getOptimizely(),
            userId: this.getUserId(),
            attributes: this.getAttributes(),
        });
        if (Object.keys(this.forcedDecisionsMap).length > 0) {
            userContext.forcedDecisionsMap = __assign({}, this.forcedDecisionsMap);
        }
        return userContext;
    };
    return OptimizelyUserContext;
}());

/****************************************************************************
 * Copyright 2018, 2021, Optimizely, Inc. and contributors                  *
 *                                                                          *
 * Licensed under the Apache License, Version 2.0 (the "License");          *
 * you may not use this file except in compliance with the License.         *
 * You may obtain a copy of the License at                                  *
 *                                                                          *
 *    http://www.apache.org/licenses/LICENSE-2.0                            *
 *                                                                          *
 * Unless required by applicable law or agreed to in writing, software      *
 * distributed under the License is distributed on an "AS IS" BASIS,        *
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. *
 * See the License for the specific language governing permissions and      *
 * limitations under the License.                                           *
 ***************************************************************************/
var AND_CONDITION = 'and';
var OR_CONDITION = 'or';
var NOT_CONDITION = 'not';
var DEFAULT_OPERATOR_TYPES = [AND_CONDITION, OR_CONDITION, NOT_CONDITION];
/**
 * Top level method to evaluate conditions
 * @param  {ConditionTree<Leaf>}    conditions      Nested array of and/or conditions, or a single leaf
 *                                                  condition value of any type
 *                                                  Example: ['and', '0', ['or', '1', '2']]
 * @param  {LeafEvaluator<Leaf>}    leafEvaluator   Function which will be called to evaluate leaf condition
 *                                                  values
 * @return {?boolean}                               Result of evaluating the conditions using the operator
 *                                                  rules and the leaf evaluator. A return value of null
 *                                                  indicates that the conditions are invalid or unable to be
 *                                                  evaluated.
 */
function evaluate(conditions, leafEvaluator) {
    if (Array.isArray(conditions)) {
        var firstOperator = conditions[0];
        var restOfConditions = conditions.slice(1);
        if (typeof firstOperator === 'string' && DEFAULT_OPERATOR_TYPES.indexOf(firstOperator) === -1) {
            // Operator to apply is not explicit - assume 'or'
            firstOperator = OR_CONDITION;
            restOfConditions = conditions;
        }
        switch (firstOperator) {
            case AND_CONDITION:
                return andEvaluator(restOfConditions, leafEvaluator);
            case NOT_CONDITION:
                return notEvaluator(restOfConditions, leafEvaluator);
            default:
                // firstOperator is OR_CONDITION
                return orEvaluator(restOfConditions, leafEvaluator);
        }
    }
    var leafCondition = conditions;
    return leafEvaluator(leafCondition);
}
/**
 * Evaluates an array of conditions as if the evaluator had been applied
 * to each entry and the results AND-ed together.
 * @param  {unknown[]}             conditions      Array of conditions ex: [operand_1, operand_2]
 * @param  {LeafEvaluator<Leaf>}   leafEvaluator   Function which will be called to evaluate leaf condition values
 * @return {?boolean}                              Result of evaluating the conditions. A return value of null
 *                                                 indicates that the conditions are invalid or unable to be
 *                                                 evaluated.
 */
function andEvaluator(conditions, leafEvaluator) {
    var sawNullResult = false;
    if (Array.isArray(conditions)) {
        for (var i = 0; i < conditions.length; i++) {
            var conditionResult = evaluate(conditions[i], leafEvaluator);
            if (conditionResult === false) {
                return false;
            }
            if (conditionResult === null) {
                sawNullResult = true;
            }
        }
        return sawNullResult ? null : true;
    }
    return null;
}
/**
 * Evaluates an array of conditions as if the evaluator had been applied
 * to a single entry and NOT was applied to the result.
 * @param  {unknown[]}             conditions      Array of conditions ex: [operand_1]
 * @param  {LeafEvaluator<Leaf>}   leafEvaluator   Function which will be called to evaluate leaf condition values
 * @return {?boolean}                              Result of evaluating the conditions. A return value of null
 *                                                 indicates that the conditions are invalid or unable to be
 *                                                 evaluated.
 */
function notEvaluator(conditions, leafEvaluator) {
    if (Array.isArray(conditions) && conditions.length > 0) {
        var result = evaluate(conditions[0], leafEvaluator);
        return result === null ? null : !result;
    }
    return null;
}
/**
 * Evaluates an array of conditions as if the evaluator had been applied
 * to each entry and the results OR-ed together.
 * @param  {unknown[]}             conditions      Array of conditions ex: [operand_1, operand_2]
 * @param  {LeafEvaluator<Leaf>}   leafEvaluator   Function which will be called to evaluate leaf condition values
 * @return {?boolean}                              Result of evaluating the conditions. A return value of null
 *                                                 indicates that the conditions are invalid or unable to be
 *                                                 evaluated.
 */
function orEvaluator(conditions, leafEvaluator) {
    var sawNullResult = false;
    if (Array.isArray(conditions)) {
        for (var i = 0; i < conditions.length; i++) {
            var conditionResult = evaluate(conditions[i], leafEvaluator);
            if (conditionResult === true) {
                return true;
            }
            if (conditionResult === null) {
                sawNullResult = true;
            }
        }
        return sawNullResult ? null : false;
    }
    return null;
}

/**
 * The OptimizelyConfig class
 * @param {ProjectConfig} configObj
 * @param {string}        datafile
 */
var OptimizelyConfig = /** @class */ (function () {
    function OptimizelyConfig(configObj, datafile) {
        var _a, _b;
        this.sdkKey = (_a = configObj.sdkKey) !== null && _a !== void 0 ? _a : '';
        this.environmentKey = (_b = configObj.environmentKey) !== null && _b !== void 0 ? _b : '';
        this.attributes = configObj.attributes;
        this.audiences = OptimizelyConfig.getAudiences(configObj);
        this.events = configObj.events;
        this.revision = configObj.revision;
        var featureIdVariablesMap = (configObj.featureFlags || []).reduce(function (resultMap, feature) {
            resultMap[feature.id] = feature.variables;
            return resultMap;
        }, {});
        var experimentsMapById = OptimizelyConfig.getExperimentsMapById(configObj, featureIdVariablesMap);
        this.experimentsMap = OptimizelyConfig.getExperimentsKeyMap(experimentsMapById);
        this.featuresMap = OptimizelyConfig.getFeaturesMap(configObj, featureIdVariablesMap, experimentsMapById);
        this.datafile = datafile;
    }
    /**
     * Get the datafile
     * @returns {string} JSON string representation of the datafile that was used to create the current config object
     */
    OptimizelyConfig.prototype.getDatafile = function () {
        return this.datafile;
    };
    /**
     * Get Unique audiences list with typedAudiences as priority
     * @param       {ProjectConfig}              configObj
     * @returns     {OptimizelyAudience[]}       Array of unique audiences
     */
    OptimizelyConfig.getAudiences = function (configObj) {
        var audiences = [];
        var typedAudienceIds = [];
        (configObj.typedAudiences || []).forEach(function (typedAudience) {
            audiences.push({
                id: typedAudience.id,
                conditions: JSON.stringify(typedAudience.conditions),
                name: typedAudience.name,
            });
            typedAudienceIds.push(typedAudience.id);
        });
        (configObj.audiences || []).forEach(function (audience) {
            if (typedAudienceIds.indexOf(audience.id) === -1 && audience.id != '$opt_dummy_audience') {
                audiences.push({
                    id: audience.id,
                    conditions: JSON.stringify(audience.conditions),
                    name: audience.name,
                });
            }
        });
        return audiences;
    };
    /**
     * Converts list of audience conditions to serialized audiences used in experiment
     * for examples:
     * 1. Input: ["or", "1", "2"]
     * Output: "\"us\" OR \"female\""
     * 2. Input: ["not", "1"]
     * Output: "NOT \"us\""
     * 3. Input: ["or", "1"]
     * Output: "\"us\""
     * 4. Input: ["and", ["or", "1", ["and", "2", "3"]], ["and", "11", ["or", "12", "13"]]]
     * Output: "(\"us\" OR (\"female\" AND \"adult\")) AND (\"fr\" AND (\"male\" OR \"kid\"))"
     * @param       {Array<string | string[]>}                 conditions
     * @param       {[id: string]: Audience}                   audiencesById
     * @returns     {string}                                   Serialized audiences condition string
     */
    OptimizelyConfig.getSerializedAudiences = function (conditions, audiencesById) {
        var serializedAudience = '';
        if (conditions) {
            var cond_1 = '';
            conditions.forEach(function (item) {
                var subAudience = '';
                // Checks if item is list of conditions means it is sub audience
                if (item instanceof Array) {
                    subAudience = OptimizelyConfig.getSerializedAudiences(item, audiencesById);
                    subAudience = "(" + subAudience + ")";
                }
                else if (DEFAULT_OPERATOR_TYPES.indexOf(item) > -1) {
                    cond_1 = item.toUpperCase();
                }
                else {
                    // Checks if item is audience id
                    var audienceName = audiencesById[item] ? audiencesById[item].name : item;
                    // if audience condition is "NOT" then add "NOT" at start. Otherwise check if there is already audience id in serializedAudience then append condition between serializedAudience and item
                    if (serializedAudience || cond_1 === 'NOT') {
                        cond_1 = cond_1 === '' ? 'OR' : cond_1;
                        if (serializedAudience === '') {
                            serializedAudience = cond_1 + " \"" + audiencesById[item].name + "\"";
                        }
                        else {
                            serializedAudience = serializedAudience.concat(" " + cond_1 + " \"" + audienceName + "\"");
                        }
                    }
                    else {
                        serializedAudience = "\"" + audienceName + "\"";
                    }
                }
                // Checks if sub audience is empty or not
                if (subAudience !== '') {
                    if (serializedAudience !== '' || cond_1 === 'NOT') {
                        cond_1 = cond_1 === '' ? 'OR' : cond_1;
                        if (serializedAudience === '') {
                            serializedAudience = cond_1 + " " + subAudience;
                        }
                        else {
                            serializedAudience = serializedAudience.concat(" " + cond_1 + " " + subAudience);
                        }
                    }
                    else {
                        serializedAudience = serializedAudience.concat(subAudience);
                    }
                }
            });
        }
        return serializedAudience;
    };
    /**
     * Get serialized audience condition string for experiment
     * @param       {Experiment}                 experiment
     * @param       {ProjectConfig}              configObj
     * @returns     {string}                     Serialized audiences condition string
     */
    OptimizelyConfig.getExperimentAudiences = function (experiment, configObj) {
        if (!experiment.audienceConditions) {
            return '';
        }
        return OptimizelyConfig.getSerializedAudiences(experiment.audienceConditions, configObj.audiencesById);
    };
    /**
     * Make map of featureVariable which are associated with given feature experiment
     * @param       {FeatureVariablesMap}                 featureIdVariableMap
     * @param       {[id: string]: FeatureVariable}       variableIdMap
     * @param       {string}                              featureId
     * @param       {VariationVariable[] | undefined}     featureVariableUsages
     * @param       {boolean | undefined}                 isFeatureEnabled
     * @returns     {OptimizelyVariablesMap}              FeatureVariables mapped by key
     */
    OptimizelyConfig.mergeFeatureVariables = function (featureIdVariableMap, variableIdMap, featureId, featureVariableUsages, isFeatureEnabled) {
        var variablesMap = (featureIdVariableMap[featureId] || []).reduce(function (optlyVariablesMap, featureVariable) {
            optlyVariablesMap[featureVariable.key] = {
                id: featureVariable.id,
                key: featureVariable.key,
                type: featureVariable.type,
                value: featureVariable.defaultValue,
            };
            return optlyVariablesMap;
        }, {});
        (featureVariableUsages || []).forEach(function (featureVariableUsage) {
            var defaultVariable = variableIdMap[featureVariableUsage.id];
            var optimizelyVariable = {
                id: featureVariableUsage.id,
                key: defaultVariable.key,
                type: defaultVariable.type,
                value: isFeatureEnabled ? featureVariableUsage.value : defaultVariable.defaultValue,
            };
            variablesMap[defaultVariable.key] = optimizelyVariable;
        });
        return variablesMap;
    };
    /**
     * Gets Map of all experiment variations and variables including rollouts
     * @param       {Variation[]}                           variations
     * @param       {FeatureVariablesMap}                   featureIdVariableMap
     * @param       {[id: string]: FeatureVariable}         variableIdMap
     * @param       {string}                                featureId
     * @returns     {[key: string]: Variation}              Variations mapped by key
     */
    OptimizelyConfig.getVariationsMap = function (variations, featureIdVariableMap, variableIdMap, featureId) {
        var variationsMap = {};
        variationsMap = variations.reduce(function (optlyVariationsMap, variation) {
            var variablesMap = OptimizelyConfig.mergeFeatureVariables(featureIdVariableMap, variableIdMap, featureId, variation.variables, variation.featureEnabled);
            optlyVariationsMap[variation.key] = {
                id: variation.id,
                key: variation.key,
                featureEnabled: variation.featureEnabled,
                variablesMap: variablesMap,
            };
            return optlyVariationsMap;
        }, {});
        return variationsMap;
    };
    /**
     * Gets Map of FeatureVariable with respect to featureVariableId
     * @param       {ProjectConfig}                        configObj
     * @returns     {[id: string]: FeatureVariable}        FeatureVariables mapped by id
     */
    OptimizelyConfig.getVariableIdMap = function (configObj) {
        var variablesIdMap = {};
        variablesIdMap = (configObj.featureFlags || []).reduce(function (resultMap, feature) {
            feature.variables.forEach(function (variable) {
                resultMap[variable.id] = variable;
            });
            return resultMap;
        }, {});
        return variablesIdMap;
    };
    /**
     * Gets list of rollout experiments
     * @param       {ProjectConfig}               configObj
     * @param       {FeatureVariablesMap}         featureVariableIdMap
     * @param       {string}                      featureId
     * @param       {Experiment[]}                experiments
     * @returns     {OptimizelyExperiment[]}      List of Optimizely rollout experiments
     */
    OptimizelyConfig.getDeliveryRules = function (configObj, featureVariableIdMap, featureId, experiments) {
        var variableIdMap = OptimizelyConfig.getVariableIdMap(configObj);
        return experiments.map(function (experiment) {
            return {
                id: experiment.id,
                key: experiment.key,
                audiences: OptimizelyConfig.getExperimentAudiences(experiment, configObj),
                variationsMap: OptimizelyConfig.getVariationsMap(experiment.variations, featureVariableIdMap, variableIdMap, featureId),
            };
        });
    };
    /**
     * Get Experiment Ids which are part of rollout
     * @param       {Rollout[]}     rollouts
     * @returns     {string[]}      Array of experiment Ids
     */
    OptimizelyConfig.getRolloutExperimentIds = function (rollouts) {
        var experimentIds = [];
        (rollouts || []).forEach(function (rollout) {
            rollout.experiments.forEach(function (e) {
                experimentIds.push(e.id);
            });
        });
        return experimentIds;
    };
    /**
     * Get experiments mapped by their id's which are not part of a rollout
     * @param       {ProjectConfig}                           configObj
     * @param       {FeatureVariablesMap}                     featureIdVariableMap
     * @returns     {[id: string]: OptimizelyExperiment}      Experiments mapped by id
     */
    OptimizelyConfig.getExperimentsMapById = function (configObj, featureIdVariableMap) {
        var variableIdMap = OptimizelyConfig.getVariableIdMap(configObj);
        var rolloutExperimentIds = this.getRolloutExperimentIds(configObj.rollouts);
        var experiments = configObj.experiments;
        return (experiments || []).reduce(function (experimentsMap, experiment) {
            if (rolloutExperimentIds.indexOf(experiment.id) === -1) {
                var featureIds = configObj.experimentFeatureMap[experiment.id];
                var featureId = '';
                if (featureIds && featureIds.length > 0) {
                    featureId = featureIds[0];
                }
                var variationsMap = OptimizelyConfig.getVariationsMap(experiment.variations, featureIdVariableMap, variableIdMap, featureId.toString());
                experimentsMap[experiment.id] = {
                    id: experiment.id,
                    key: experiment.key,
                    audiences: OptimizelyConfig.getExperimentAudiences(experiment, configObj),
                    variationsMap: variationsMap,
                };
            }
            return experimentsMap;
        }, {});
    };
    /**
     * Get experiments mapped by their keys
     * @param       {OptimizelyExperimentsMap}     experimentsMapById
     * @returns     {OptimizelyExperimentsMap}     Experiments mapped by key
     */
    OptimizelyConfig.getExperimentsKeyMap = function (experimentsMapById) {
        var experimentKeysMap = {};
        for (var id in experimentsMapById) {
            var experiment = experimentsMapById[id];
            experimentKeysMap[experiment.key] = experiment;
        }
        return experimentKeysMap;
    };
    /**
     * Gets Map of all FeatureFlags and associated experiment map inside it
     * @param       {ProjectConfig}              configObj
     * @param       {FeatureVariablesMap}        featureVariableIdMap
     * @param       {OptimizelyExperimentsMap}   experimentsMapById
     * @returns     {OptimizelyFeaturesMap}      OptimizelyFeature mapped by key
     */
    OptimizelyConfig.getFeaturesMap = function (configObj, featureVariableIdMap, experimentsMapById) {
        var featuresMap = {};
        configObj.featureFlags.forEach(function (featureFlag) {
            var featureExperimentMap = {};
            var experimentRules = [];
            featureFlag.experimentIds.forEach(function (experimentId) {
                var experiment = experimentsMapById[experimentId];
                if (experiment) {
                    featureExperimentMap[experiment.key] = experiment;
                }
                experimentRules.push(experimentsMapById[experimentId]);
            });
            var featureVariableMap = (featureFlag.variables || []).reduce(function (variables, variable) {
                variables[variable.key] = {
                    id: variable.id,
                    key: variable.key,
                    type: variable.type,
                    value: variable.defaultValue,
                };
                return variables;
            }, {});
            var deliveryRules = [];
            var rollout = configObj.rolloutIdMap[featureFlag.rolloutId];
            if (rollout) {
                deliveryRules = OptimizelyConfig.getDeliveryRules(configObj, featureVariableIdMap, featureFlag.id, rollout.experiments);
            }
            featuresMap[featureFlag.key] = {
                id: featureFlag.id,
                key: featureFlag.key,
                experimentRules: experimentRules,
                deliveryRules: deliveryRules,
                experimentsMap: featureExperimentMap,
                variablesMap: featureVariableMap,
            };
        });
        return featuresMap;
    };
    return OptimizelyConfig;
}());
/**
 * Create an instance of OptimizelyConfig
 * @param   {ProjectConfig}             configObj
 * @param   {string}                    datafile
 * @returns {OptimizelyConfig}          An instance of OptimizelyConfig
 */
function createOptimizelyConfig(configObj, datafile) {
    return new OptimizelyConfig(configObj, datafile);
}

var MAX_SAFE_INTEGER_LIMIT = Math.pow(2, 53);
// eslint-disable-next-line
function assign(target) {
    var sources = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
    }
    if (!target) {
        return {};
    }
    if (typeof Object.assign === 'function') {
        return Object.assign.apply(Object, __spreadArrays([target], sources));
    }
    else {
        var to = Object(target);
        for (var index = 0; index < sources.length; index++) {
            var nextSource = sources[index];
            if (nextSource !== null && nextSource !== undefined) {
                for (var nextKey in nextSource) {
                    // Avoid bugs when hasOwnProperty is shadowed
                    if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                        to[nextKey] = nextSource[nextKey];
                    }
                }
            }
        }
        return to;
    }
}
function currentTimestamp() {
    return Math.round(new Date().getTime());
}
function isSafeInteger(number) {
    return typeof number == 'number' && Math.abs(number) <= MAX_SAFE_INTEGER_LIMIT;
}
function keyBy(arr, key) {
    if (!arr)
        return {};
    return (0,_optimizely_js_sdk_utils__WEBPACK_IMPORTED_MODULE_1__.keyBy)(arr, function (item) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return item[key];
    });
}
function isNumber(value) {
    return typeof value === 'number';
}
var fns = {
    assign: assign,
    currentTimestamp: currentTimestamp,
    isSafeInteger: isSafeInteger,
    keyBy: keyBy,
    uuid: _optimizely_js_sdk_utils__WEBPACK_IMPORTED_MODULE_1__.generateUUID,
    isNumber: isNumber,
};

/**
 * Copyright 2016-2021, Optimizely
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var EXPERIMENT_RUNNING_STATUS = 'Running';
var RESERVED_ATTRIBUTE_PREFIX = '$opt_';
var MODULE_NAME$1 = 'PROJECT_CONFIG';
// eslint-disable-next-line  @typescript-eslint/no-explicit-any
function createMutationSafeDatafileCopy(datafile) {
    var _a, _b;
    var datafileCopy = fns.assign({}, datafile);
    datafileCopy.audiences = (datafile.audiences || []).map(function (audience) {
        return fns.assign({}, audience);
    });
    datafileCopy.experiments = (datafile.experiments || []).map(function (experiment) {
        return fns.assign({}, experiment);
    });
    datafileCopy.featureFlags = (datafile.featureFlags || []).map(function (featureFlag) {
        return fns.assign({}, featureFlag);
    });
    datafileCopy.groups = (datafile.groups || []).map(function (group) {
        var groupCopy = fns.assign({}, group);
        groupCopy.experiments = (group.experiments || []).map(function (experiment) {
            return fns.assign({}, experiment);
        });
        return groupCopy;
    });
    datafileCopy.rollouts = (datafile.rollouts || []).map(function (rollout) {
        var rolloutCopy = fns.assign({}, rollout);
        rolloutCopy.experiments = (rollout.experiments || []).map(function (experiment) {
            return fns.assign({}, experiment);
        });
        return rolloutCopy;
    });
    datafileCopy.environmentKey = (_a = datafile.environmentKey) !== null && _a !== void 0 ? _a : '';
    datafileCopy.sdkKey = (_b = datafile.sdkKey) !== null && _b !== void 0 ? _b : '';
    return datafileCopy;
}
/**
 * Creates projectConfig object to be used for quick project property lookup
 * @param  {Object}        datafileObj   JSON datafile representing the project
 * @param  {string|null}   datafileStr   JSON string representation of the datafile
 * @return {ProjectConfig} Object representing project configuration
 */
var createProjectConfig = function (datafileObj, datafileStr) {
    if (datafileStr === void 0) { datafileStr = null; }
    var projectConfig = createMutationSafeDatafileCopy(datafileObj);
    projectConfig.__datafileStr = datafileStr === null ? JSON.stringify(datafileObj) : datafileStr;
    /*
     * Conditions of audiences in projectConfig.typedAudiences are not
     * expected to be string-encoded as they are here in projectConfig.audiences.
     */
    (projectConfig.audiences || []).forEach(function (audience) {
        audience.conditions = JSON.parse(audience.conditions);
    });
    projectConfig.audiencesById = fns.keyBy(projectConfig.audiences, 'id');
    fns.assign(projectConfig.audiencesById, fns.keyBy(projectConfig.typedAudiences, 'id'));
    projectConfig.attributeKeyMap = fns.keyBy(projectConfig.attributes, 'key');
    projectConfig.eventKeyMap = fns.keyBy(projectConfig.events, 'key');
    projectConfig.groupIdMap = fns.keyBy(projectConfig.groups, 'id');
    var experiments;
    Object.keys(projectConfig.groupIdMap || {}).forEach(function (Id) {
        experiments = projectConfig.groupIdMap[Id].experiments;
        (experiments || []).forEach(function (experiment) {
            projectConfig.experiments.push(fns.assign(experiment, { groupId: Id }));
        });
    });
    projectConfig.rolloutIdMap = fns.keyBy(projectConfig.rollouts || [], 'id');
    (0,_optimizely_js_sdk_utils__WEBPACK_IMPORTED_MODULE_1__.objectValues)(projectConfig.rolloutIdMap || {}).forEach(function (rollout) {
        (rollout.experiments || []).forEach(function (experiment) {
            projectConfig.experiments.push(experiment);
            // Creates { <variationKey>: <variation> } map inside of the experiment
            experiment.variationKeyMap = fns.keyBy(experiment.variations, 'key');
        });
    });
    projectConfig.experimentKeyMap = fns.keyBy(projectConfig.experiments, 'key');
    projectConfig.experimentIdMap = fns.keyBy(projectConfig.experiments, 'id');
    projectConfig.variationIdMap = {};
    projectConfig.variationVariableUsageMap = {};
    (projectConfig.experiments || []).forEach(function (experiment) {
        // Creates { <variationKey>: <variation> } map inside of the experiment
        experiment.variationKeyMap = fns.keyBy(experiment.variations, 'key');
        // Creates { <variationId>: { key: <variationKey>, id: <variationId> } } mapping for quick lookup
        fns.assign(projectConfig.variationIdMap, fns.keyBy(experiment.variations, 'id'));
        (0,_optimizely_js_sdk_utils__WEBPACK_IMPORTED_MODULE_1__.objectValues)(experiment.variationKeyMap || {}).forEach(function (variation) {
            if (variation.variables) {
                projectConfig.variationVariableUsageMap[variation.id] = fns.keyBy(variation.variables, 'id');
            }
        });
    });
    // Object containing experiment Ids that exist in any feature
    // for checking that experiment is a feature experiment or not.
    projectConfig.experimentFeatureMap = {};
    projectConfig.featureKeyMap = fns.keyBy(projectConfig.featureFlags || [], 'key');
    (0,_optimizely_js_sdk_utils__WEBPACK_IMPORTED_MODULE_1__.objectValues)(projectConfig.featureKeyMap || {}).forEach(function (feature) {
        // Json type is represented in datafile as a subtype of string for the sake of backwards compatibility.
        // Converting it to a first-class json type while creating Project Config
        feature.variables.forEach(function (variable) {
            if (variable.type === FEATURE_VARIABLE_TYPES.STRING && variable.subType === FEATURE_VARIABLE_TYPES.JSON) {
                variable.type = FEATURE_VARIABLE_TYPES.JSON;
                delete variable.subType;
            }
        });
        feature.variableKeyMap = fns.keyBy(feature.variables, 'key');
        (feature.experimentIds || []).forEach(function (experimentId) {
            // Add this experiment in experiment-feature map.
            if (projectConfig.experimentFeatureMap[experimentId]) {
                projectConfig.experimentFeatureMap[experimentId].push(feature.id);
            }
            else {
                projectConfig.experimentFeatureMap[experimentId] = [feature.id];
            }
        });
    });
    // all rules (experiment rules and delivery rules) for each flag
    projectConfig.flagRulesMap = {};
    (projectConfig.featureFlags || []).forEach(function (featureFlag) {
        var flagRuleExperiments = [];
        featureFlag.experimentIds.forEach(function (experimentId) {
            var experiment = projectConfig.experimentIdMap[experimentId];
            if (experiment) {
                flagRuleExperiments.push(experiment);
            }
        });
        var rollout = projectConfig.rolloutIdMap[featureFlag.rolloutId];
        if (rollout) {
            flagRuleExperiments.push.apply(flagRuleExperiments, rollout.experiments);
        }
        projectConfig.flagRulesMap[featureFlag.key] = flagRuleExperiments;
    });
    // all variations for each flag
    // - datafile does not contain a separate entity for this.
    // - we collect variations used in each rule (experiment rules and delivery rules)
    projectConfig.flagVariationsMap = {};
    (0,_optimizely_js_sdk_utils__WEBPACK_IMPORTED_MODULE_1__.objectEntries)(projectConfig.flagRulesMap || {}).forEach(function (_a) {
        var flagKey = _a[0], rules = _a[1];
        var variations = [];
        rules.forEach(function (rule) {
            rule.variations.forEach(function (variation) {
                if (!(0,_optimizely_js_sdk_utils__WEBPACK_IMPORTED_MODULE_1__.find)(variations, function (item) { return item.id === variation.id; })) {
                    variations.push(variation);
                }
            });
        });
        projectConfig.flagVariationsMap[flagKey] = variations;
    });
    return projectConfig;
};
/**
 * Get layer ID for the provided experiment key
 * @param  {ProjectConfig}    projectConfig   Object representing project configuration
 * @param  {string}           experimentId    Experiment ID for which layer ID is to be determined
 * @return {string}                           Layer ID corresponding to the provided experiment key
 * @throws If experiment key is not in datafile
 */
var getLayerId = function (projectConfig, experimentId) {
    var experiment = projectConfig.experimentIdMap[experimentId];
    if (!experiment) {
        throw new Error((0,_optimizely_js_sdk_utils__WEBPACK_IMPORTED_MODULE_1__.sprintf)(ERROR_MESSAGES.INVALID_EXPERIMENT_ID, MODULE_NAME$1, experimentId));
    }
    return experiment.layerId;
};
/**
 * Get attribute ID for the provided attribute key
 * @param  {ProjectConfig}   projectConfig    Object representing project configuration
 * @param  {string}          attributeKey     Attribute key for which ID is to be determined
 * @param  {LogHandler}      logger
 * @return {string|null}     Attribute ID corresponding to the provided attribute key. Attribute key if it is a reserved attribute.
 */
var getAttributeId = function (projectConfig, attributeKey, logger) {
    var attribute = projectConfig.attributeKeyMap[attributeKey];
    var hasReservedPrefix = attributeKey.indexOf(RESERVED_ATTRIBUTE_PREFIX) === 0;
    if (attribute) {
        if (hasReservedPrefix) {
            logger.log(LOG_LEVEL.WARNING, 'Attribute %s unexpectedly has reserved prefix %s; using attribute ID instead of reserved attribute name.', attributeKey, RESERVED_ATTRIBUTE_PREFIX);
        }
        return attribute.id;
    }
    else if (hasReservedPrefix) {
        return attributeKey;
    }
    logger.log(LOG_LEVEL.DEBUG, ERROR_MESSAGES.UNRECOGNIZED_ATTRIBUTE, MODULE_NAME$1, attributeKey);
    return null;
};
/**
 * Get event ID for the provided
 * @param  {ProjectConfig}   projectConfig  Object representing project configuration
 * @param  {string}          eventKey       Event key for which ID is to be determined
 * @return {string|null}     Event ID corresponding to the provided event key
 */
var getEventId = function (projectConfig, eventKey) {
    var event = projectConfig.eventKeyMap[eventKey];
    if (event) {
        return event.id;
    }
    return null;
};
/**
 * Get experiment status for the provided experiment key
 * @param  {ProjectConfig}  projectConfig   Object representing project configuration
 * @param  {string}         experimentKey   Experiment key for which status is to be determined
 * @return {string}         Experiment status corresponding to the provided experiment key
 * @throws If experiment key is not in datafile
 */
var getExperimentStatus = function (projectConfig, experimentKey) {
    var experiment = projectConfig.experimentKeyMap[experimentKey];
    if (!experiment) {
        throw new Error((0,_optimizely_js_sdk_utils__WEBPACK_IMPORTED_MODULE_1__.sprintf)(ERROR_MESSAGES.INVALID_EXPERIMENT_KEY, MODULE_NAME$1, experimentKey));
    }
    return experiment.status;
};
/**
 * Returns whether experiment has a status of 'Running'
 * @param  {ProjectConfig}  projectConfig   Object representing project configuration
 * @param  {string}         experimentKey   Experiment key for which status is to be compared with 'Running'
 * @return {boolean}                        True if experiment status is set to 'Running', false otherwise
 */
var isActive = function (projectConfig, experimentKey) {
    return getExperimentStatus(projectConfig, experimentKey) === EXPERIMENT_RUNNING_STATUS;
};
/**
 * Determine for given experiment if event is running, which determines whether should be dispatched or not
 * @param  {ProjectConfig}  configObj       Object representing project configuration
 * @param  {string}         experimentKey   Experiment key for which the status is to be determined
 * @return {boolean}                        True if the experiment is running
 *                                          False if the experiment is not running
 *
 */
var isRunning = function (projectConfig, experimentKey) {
    return getExperimentStatus(projectConfig, experimentKey) === EXPERIMENT_RUNNING_STATUS;
};
/**
 * Get audience conditions for the experiment
 * @param  {ProjectConfig}  projectConfig   Object representing project configuration
 * @param  {string}         experimentId    Experiment id for which audience conditions are to be determined
 * @return {Array<string|string[]>}         Audience conditions for the experiment - can be an array of audience IDs, or a
 *                                          nested array of conditions
 *                                          Examples: ["5", "6"], ["and", ["or", "1", "2"], "3"]
 * @throws If experiment key is not in datafile
 */
var getExperimentAudienceConditions = function (projectConfig, experimentId) {
    var experiment = projectConfig.experimentIdMap[experimentId];
    if (!experiment) {
        throw new Error((0,_optimizely_js_sdk_utils__WEBPACK_IMPORTED_MODULE_1__.sprintf)(ERROR_MESSAGES.INVALID_EXPERIMENT_ID, MODULE_NAME$1, experimentId));
    }
    return experiment.audienceConditions || experiment.audienceIds;
};
/**
 * Get variation key given experiment key and variation ID
 * @param  {ProjectConfig}  projectConfig   Object representing project configuration
 * @param  {string}         variationId     ID of the variation
 * @return {string|null}    Variation key or null if the variation ID is not found
 */
var getVariationKeyFromId = function (projectConfig, variationId) {
    if (projectConfig.variationIdMap.hasOwnProperty(variationId)) {
        return projectConfig.variationIdMap[variationId].key;
    }
    return null;
};
/**
 * Get variation given variation ID
 * @param  {ProjectConfig}  projectConfig   Object representing project configuration
 * @param  {string}         variationId     ID of the variation
 * @return {Variation|null}    Variation or null if the variation ID is not found
 */
var getVariationFromId = function (projectConfig, variationId) {
    if (projectConfig.variationIdMap.hasOwnProperty(variationId)) {
        return projectConfig.variationIdMap[variationId];
    }
    return null;
};
/**
 * Get the variation ID given the experiment key and variation key
 * @param  {ProjectConfig}  projectConfig   Object representing project configuration
 * @param  {string}         experimentKey   Key of the experiment the variation belongs to
 * @param  {string}         variationKey    The variation key
 * @return {string|null}    Variation ID or null
 */
var getVariationIdFromExperimentAndVariationKey = function (projectConfig, experimentKey, variationKey) {
    var experiment = projectConfig.experimentKeyMap[experimentKey];
    if (experiment.variationKeyMap.hasOwnProperty(variationKey)) {
        return experiment.variationKeyMap[variationKey].id;
    }
    return null;
};
/**
 * Get experiment from provided experiment key
 * @param  {ProjectConfig}  projectConfig  Object representing project configuration
 * @param  {string}         experimentKey  Event key for which experiment IDs are to be retrieved
 * @return {Experiment}     Experiment
 * @throws If experiment key is not in datafile
 */
var getExperimentFromKey = function (projectConfig, experimentKey) {
    if (projectConfig.experimentKeyMap.hasOwnProperty(experimentKey)) {
        var experiment = projectConfig.experimentKeyMap[experimentKey];
        if (experiment) {
            return experiment;
        }
    }
    throw new Error((0,_optimizely_js_sdk_utils__WEBPACK_IMPORTED_MODULE_1__.sprintf)(ERROR_MESSAGES.EXPERIMENT_KEY_NOT_IN_DATAFILE, MODULE_NAME$1, experimentKey));
};
/**
 * Given an experiment id, returns the traffic allocation within that experiment
 * @param  {ProjectConfig}  projectConfig  Object representing project configuration
 * @param  {string}         experimentId   Id representing the experiment
 * @return {TrafficAllocation[]}           Traffic allocation for the experiment
 * @throws If experiment key is not in datafile
 */
var getTrafficAllocation = function (projectConfig, experimentId) {
    var experiment = projectConfig.experimentIdMap[experimentId];
    if (!experiment) {
        throw new Error((0,_optimizely_js_sdk_utils__WEBPACK_IMPORTED_MODULE_1__.sprintf)(ERROR_MESSAGES.INVALID_EXPERIMENT_ID, MODULE_NAME$1, experimentId));
    }
    return experiment.trafficAllocation;
};
/**
 * Get experiment from provided experiment id. Log an error if no experiment
 * exists in the project config with the given ID.
 * @param  {ProjectConfig}  projectConfig  Object representing project configuration
 * @param  {string}         experimentId   ID of desired experiment object
 * @param  {LogHandler}     logger
 * @return {Experiment|null}               Experiment object or null
 */
var getExperimentFromId = function (projectConfig, experimentId, logger) {
    if (projectConfig.experimentIdMap.hasOwnProperty(experimentId)) {
        var experiment = projectConfig.experimentIdMap[experimentId];
        if (experiment) {
            return experiment;
        }
    }
    logger.log(LOG_LEVEL.ERROR, ERROR_MESSAGES.INVALID_EXPERIMENT_ID, MODULE_NAME$1, experimentId);
    return null;
};
/**
* Returns flag variation for specified flagKey and variationKey
* @param  {flagKey}        string
* @param  {variationKey}   string
* @return {Variation|null}
*/
var getFlagVariationByKey = function (projectConfig, flagKey, variationKey) {
    if (!projectConfig) {
        return null;
    }
    var variations = projectConfig.flagVariationsMap[flagKey];
    var result = (0,_optimizely_js_sdk_utils__WEBPACK_IMPORTED_MODULE_1__.find)(variations, function (item) { return item.key === variationKey; });
    if (result) {
        return result;
    }
    return null;
};
/**
 * Get feature from provided feature key. Log an error if no feature exists in
 * the project config with the given key.
 * @param  {ProjectConfig}    projectConfig
 * @param  {string}           featureKey
 * @param  {LogHandler}       logger
 * @return {FeatureFlag|null} Feature object, or null if no feature with the given
 *                            key exists
 */
var getFeatureFromKey = function (projectConfig, featureKey, logger) {
    if (projectConfig.featureKeyMap.hasOwnProperty(featureKey)) {
        var feature = projectConfig.featureKeyMap[featureKey];
        if (feature) {
            return feature;
        }
    }
    logger.log(LOG_LEVEL.ERROR, ERROR_MESSAGES.FEATURE_NOT_IN_DATAFILE, MODULE_NAME$1, featureKey);
    return null;
};
/**
 * Get the variable with the given key associated with the feature with the
 * given key. If the feature key or the variable key are invalid, log an error
 * message.
 * @param  {ProjectConfig}        projectConfig
 * @param  {string}               featureKey
 * @param  {string}               variableKey
 * @param  {LogHandler}           logger
 * @return {FeatureVariable|null} Variable object, or null one or both of the given
 * feature and variable keys are invalid
 */
var getVariableForFeature = function (projectConfig, featureKey, variableKey, logger) {
    var feature = projectConfig.featureKeyMap[featureKey];
    if (!feature) {
        logger.log(LOG_LEVEL.ERROR, ERROR_MESSAGES.FEATURE_NOT_IN_DATAFILE, MODULE_NAME$1, featureKey);
        return null;
    }
    var variable = feature.variableKeyMap[variableKey];
    if (!variable) {
        logger.log(LOG_LEVEL.ERROR, ERROR_MESSAGES.VARIABLE_KEY_NOT_IN_DATAFILE, MODULE_NAME$1, variableKey, featureKey);
        return null;
    }
    return variable;
};
/**
 * Get the value of the given variable for the given variation. If the given
 * variable has no value for the given variation, return null. Log an error message if the variation is invalid. If the
 * variable or variation are invalid, return null.
 * @param  {ProjectConfig}     projectConfig
 * @param  {FeatureVariable}   variable
 * @param  {Variation}         variation
 * @param  {LogHandler}        logger
 * @return {string|null}       The value of the given variable for the given
 * variation, or null if the given variable has no value
 * for the given variation or if the variation or variable are invalid
 */
var getVariableValueForVariation = function (projectConfig, variable, variation, logger) {
    if (!variable || !variation) {
        return null;
    }
    if (!projectConfig.variationVariableUsageMap.hasOwnProperty(variation.id)) {
        logger.log(LOG_LEVEL.ERROR, ERROR_MESSAGES.VARIATION_ID_NOT_IN_DATAFILE_NO_EXPERIMENT, MODULE_NAME$1, variation.id);
        return null;
    }
    var variableUsages = projectConfig.variationVariableUsageMap[variation.id];
    var variableUsage = variableUsages[variable.id];
    return variableUsage ? variableUsage.value : null;
};
/**
 * Given a variable value in string form, try to cast it to the argument type.
 * If the type cast succeeds, return the type casted value, otherwise log an
 * error and return null.
 * @param {string}     variableValue  Variable value in string form
 * @param {string}     variableType   Type of the variable whose value was passed
 *                                    in the first argument. Must be one of
 *                                    FEATURE_VARIABLE_TYPES in
 *                                    lib/utils/enums/index.js. The return value's
 *                                    type is determined by this argument (boolean
 *                                    for BOOLEAN, number for INTEGER or DOUBLE,
 *                                    and string for STRING).
 * @param {LogHandler} logger         Logger instance
 * @returns {*}                       Variable value of the appropriate type, or
 *                                    null if the type cast failed
 */
var getTypeCastValue = function (variableValue, variableType, logger) {
    var castValue;
    switch (variableType) {
        case FEATURE_VARIABLE_TYPES.BOOLEAN:
            if (variableValue !== 'true' && variableValue !== 'false') {
                logger.log(LOG_LEVEL.ERROR, ERROR_MESSAGES.UNABLE_TO_CAST_VALUE, MODULE_NAME$1, variableValue, variableType);
                castValue = null;
            }
            else {
                castValue = variableValue === 'true';
            }
            break;
        case FEATURE_VARIABLE_TYPES.INTEGER:
            castValue = parseInt(variableValue, 10);
            if (isNaN(castValue)) {
                logger.log(LOG_LEVEL.ERROR, ERROR_MESSAGES.UNABLE_TO_CAST_VALUE, MODULE_NAME$1, variableValue, variableType);
                castValue = null;
            }
            break;
        case FEATURE_VARIABLE_TYPES.DOUBLE:
            castValue = parseFloat(variableValue);
            if (isNaN(castValue)) {
                logger.log(LOG_LEVEL.ERROR, ERROR_MESSAGES.UNABLE_TO_CAST_VALUE, MODULE_NAME$1, variableValue, variableType);
                castValue = null;
            }
            break;
        case FEATURE_VARIABLE_TYPES.JSON:
            try {
                castValue = JSON.parse(variableValue);
            }
            catch (e) {
                logger.log(LOG_LEVEL.ERROR, ERROR_MESSAGES.UNABLE_TO_CAST_VALUE, MODULE_NAME$1, variableValue, variableType);
                castValue = null;
            }
            break;
        default:
            // type is STRING
            castValue = variableValue;
            break;
    }
    return castValue;
};
/**
 * Returns an object containing all audiences in the project config. Keys are audience IDs
 * and values are audience objects.
 * @param   {ProjectConfig}     projectConfig
 * @returns {{ [id: string]: Audience }}
 */
var getAudiencesById = function (projectConfig) {
    return projectConfig.audiencesById;
};
/**
 * Returns true if an event with the given key exists in the datafile, and false otherwise
 * @param   {ProjectConfig}     projectConfig
 * @param   {string}            eventKey
 * @returns {boolean}
 */
var eventWithKeyExists = function (projectConfig, eventKey) {
    return projectConfig.eventKeyMap.hasOwnProperty(eventKey);
};
/**
 * Returns true if experiment belongs to any feature, false otherwise.
 * @param   {ProjectConfig}       projectConfig
 * @param   {string}              experimentId
 * @returns {boolean}
 */
var isFeatureExperiment = function (projectConfig, experimentId) {
    return projectConfig.experimentFeatureMap.hasOwnProperty(experimentId);
};
/**
 * Returns the JSON string representation of the datafile
 * @param   {ProjectConfig}       projectConfig
 * @returns {string}
 */
var toDatafile = function (projectConfig) {
    return projectConfig.__datafileStr;
};
/**
 * @typedef   {Object}
 * @property  {Object|null} configObj
 * @property  {Error|null}  error
 */
/**
 * Try to create a project config object from the given datafile and
 * configuration properties.
 * Returns an object with configObj and error properties.
 * If successful, configObj is the project config object, and error is null.
 * Otherwise, configObj is null and error is an error with more information.
 * @param   {Object}         config
 * @param   {Object|string}  config.datafile
 * @param   {Object}         config.jsonSchemaValidator
 * @param   {Object}         config.logger
 * @returns {Object}         Object containing configObj and error properties
 */
var tryCreatingProjectConfig = function (config) {
    var newDatafileObj;
    try {
        newDatafileObj = configValidator.validateDatafile(config.datafile);
    }
    catch (error) {
        return { configObj: null, error: error };
    }
    if (config.jsonSchemaValidator) {
        try {
            config.jsonSchemaValidator.validate(newDatafileObj);
            config.logger.log(LOG_LEVEL.INFO, LOG_MESSAGES.VALID_DATAFILE, MODULE_NAME$1);
        }
        catch (error) {
            return { configObj: null, error: error };
        }
    }
    else {
        config.logger.log(LOG_LEVEL.INFO, LOG_MESSAGES.SKIPPING_JSON_VALIDATION, MODULE_NAME$1);
    }
    var createProjectConfigArgs = [newDatafileObj];
    if (typeof config.datafile === 'string') {
        // Since config.datafile was validated above, we know that it is a valid JSON string
        createProjectConfigArgs.push(config.datafile);
    }
    var newConfigObj = createProjectConfig.apply(void 0, createProjectConfigArgs);
    return {
        configObj: newConfigObj,
        error: null,
    };
};
/**
 * Get the send flag decisions value
 * @param  {ProjectConfig}   projectConfig
 * @return {boolean}         A boolean value that indicates if we should send flag decisions
 */
var getSendFlagDecisionsValue = function (projectConfig) {
    return !!projectConfig.sendFlagDecisions;
};

/**
 * Copyright 2019-2021, Optimizely
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var logger = (0,_optimizely_js_sdk_logging__WEBPACK_IMPORTED_MODULE_0__.getLogger)();
var MODULE_NAME$2 = 'PROJECT_CONFIG_MANAGER';
/**
 * Return an error message derived from a thrown value. If the thrown value is
 * an error, return the error's message property. Otherwise, return a default
 * provided by the second argument.
 * @param  {Error|null}                   maybeError
 * @param  {string}                       defaultMessage
 * @return {string}
 */
function getErrorMessage(maybeError, defaultMessage) {
    if (maybeError instanceof Error) {
        return maybeError.message;
    }
    return defaultMessage || 'Unknown error';
}
/**
 * ProjectConfigManager provides project config objects via its methods
 * getConfig and onUpdate. It uses a DatafileManager to fetch datafiles. It is
 * responsible for parsing and validating datafiles, and converting datafile
 * string into project config objects.
 * @param {ProjectConfigManagerConfig}    config
 */
var ProjectConfigManager = /** @class */ (function () {
    function ProjectConfigManager(config) {
        this.updateListeners = [];
        this.configObj = null;
        this.optimizelyConfigObj = null;
        this.datafileManager = null;
        try {
            this.jsonSchemaValidator = config.jsonSchemaValidator;
            if (!config.datafile && !config.sdkKey) {
                var datafileAndSdkKeyMissingError = new Error((0,_optimizely_js_sdk_utils__WEBPACK_IMPORTED_MODULE_1__.sprintf)(ERROR_MESSAGES.DATAFILE_AND_SDK_KEY_MISSING, MODULE_NAME$2));
                this.readyPromise = Promise.resolve({
                    success: false,
                    reason: getErrorMessage(datafileAndSdkKeyMissingError),
                });
                logger.error(datafileAndSdkKeyMissingError);
                return;
            }
            var handleNewDatafileException = null;
            if (config.datafile) {
                handleNewDatafileException = this.handleNewDatafile(config.datafile);
            }
            if (config.sdkKey && config.datafileManager) {
                this.datafileManager = config.datafileManager;
                this.datafileManager.start();
                this.readyPromise = this.datafileManager
                    .onReady()
                    .then(this.onDatafileManagerReadyFulfill.bind(this), this.onDatafileManagerReadyReject.bind(this));
                this.datafileManager.on('update', this.onDatafileManagerUpdate.bind(this));
            }
            else if (this.configObj) {
                this.readyPromise = Promise.resolve({
                    success: true,
                });
            }
            else {
                this.readyPromise = Promise.resolve({
                    success: false,
                    reason: getErrorMessage(handleNewDatafileException, 'Invalid datafile'),
                });
            }
        }
        catch (ex) {
            logger.error(ex);
            this.readyPromise = Promise.resolve({
                success: false,
                reason: getErrorMessage(ex, 'Error in initialize'),
            });
        }
    }
    /**
     * Respond to datafile manager's onReady promise becoming fulfilled.
     * If there are validation or parse failures using the datafile provided by
     * DatafileManager, ProjectConfigManager's ready promise is resolved with an
     * unsuccessful result. Otherwise, ProjectConfigManager updates its own project
     * config object from the new datafile, and its ready promise is resolved with a
     * successful result.
     */
    ProjectConfigManager.prototype.onDatafileManagerReadyFulfill = function () {
        if (this.datafileManager) {
            var newDatafileError = this.handleNewDatafile(this.datafileManager.get());
            if (newDatafileError) {
                return {
                    success: false,
                    reason: getErrorMessage(newDatafileError),
                };
            }
            return { success: true };
        }
        return {
            success: false,
            reason: getErrorMessage(null, 'Datafile manager is not provided'),
        };
    };
    /**
     * Respond to datafile manager's onReady promise becoming rejected.
     * When DatafileManager's onReady promise is rejected, there is no possibility
     * of obtaining a datafile. In this case, ProjectConfigManager's ready promise
     * is fulfilled with an unsuccessful result.
     * @param   {Error}   err
     * @returns {Object}
     */
    ProjectConfigManager.prototype.onDatafileManagerReadyReject = function (err) {
        return {
            success: false,
            reason: getErrorMessage(err, 'Failed to become ready'),
        };
    };
    /**
     * Respond to datafile manager's update event. Attempt to update own config
     * object using latest datafile from datafile manager. Call own registered
     * update listeners if successful
     */
    ProjectConfigManager.prototype.onDatafileManagerUpdate = function () {
        if (this.datafileManager) {
            this.handleNewDatafile(this.datafileManager.get());
        }
    };
    /**
     * Handle new datafile by attemping to create a new Project Config object. If successful and
     * the new config object's revision is newer than the current one, sets/updates the project config
     * and optimizely config object instance variables and returns null for the error. If unsuccessful,
     * the project config and optimizely config objects will not be updated, and the error is returned.
     * @param   {string}        newDatafile
     * @returns {Error|null}    error or null
     */
    ProjectConfigManager.prototype.handleNewDatafile = function (newDatafile) {
        var _a = tryCreatingProjectConfig({
            datafile: newDatafile,
            jsonSchemaValidator: this.jsonSchemaValidator,
            logger: logger
        }), configObj = _a.configObj, error = _a.error;
        if (error) {
            logger.error(error);
        }
        else {
            var oldRevision = this.configObj ? this.configObj.revision : 'null';
            if (configObj && oldRevision !== configObj.revision) {
                this.configObj = configObj;
                this.optimizelyConfigObj = null;
                this.updateListeners.forEach(function (listener) { return listener(configObj); });
            }
        }
        return error;
    };
    /**
     * Returns the current project config object, or null if no project config object
     * is available
     * @return {ProjectConfig|null}
     */
    ProjectConfigManager.prototype.getConfig = function () {
        return this.configObj;
    };
    /**
     * Returns the optimizely config object or null
     * @return {OptimizelyConfig|null}
     */
    ProjectConfigManager.prototype.getOptimizelyConfig = function () {
        if (!this.optimizelyConfigObj && this.configObj) {
            this.optimizelyConfigObj = createOptimizelyConfig(this.configObj, toDatafile(this.configObj));
        }
        return this.optimizelyConfigObj;
    };
    /**
     * Returns a Promise that fulfills when this ProjectConfigManager is ready to
     * use (meaning it has a valid project config object), or has failed to become
     * ready.
     *
     * Failure can be caused by the following:
     * - At least one of sdkKey or datafile is not provided in the constructor argument
     * - The provided datafile was invalid
     * - The datafile provided by the datafile manager was invalid
     * - The datafile manager failed to fetch a datafile
     *
     * The returned Promise is fulfilled with a result object containing these
     * properties:
     *    - success (boolean): True if this instance is ready to use with a valid
     *                         project config object, or false if it failed to
     *                         become ready
     *    - reason (string=):  If success is false, this is a string property with
     *                         an explanatory message.
     * @return {Promise}
     */
    ProjectConfigManager.prototype.onReady = function () {
        return this.readyPromise;
    };
    /**
     * Add a listener for project config updates. The listener will be called
     * whenever this instance has a new project config object available.
     * Returns a dispose function that removes the subscription
     * @param  {Function} listener
     * @return {Function}
     */
    ProjectConfigManager.prototype.onUpdate = function (listener) {
        var _this = this;
        this.updateListeners.push(listener);
        return function () {
            var index = _this.updateListeners.indexOf(listener);
            if (index > -1) {
                _this.updateListeners.splice(index, 1);
            }
        };
    };
    /**
     * Stop the internal datafile manager and remove all update listeners
     */
    ProjectConfigManager.prototype.stop = function () {
        if (this.datafileManager) {
            this.datafileManager.stop();
        }
        this.updateListeners = [];
    };
    return ProjectConfigManager;
}());
function createProjectConfigManager(config) {
    return new ProjectConfigManager(config);
}

/**
 * Copyright 2016, 2019-2021, Optimizely
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var HASH_SEED = 1;
var MAX_HASH_VALUE = Math.pow(2, 32);
var MAX_TRAFFIC_VALUE = 10000;
var MODULE_NAME$3 = 'BUCKETER';
var RANDOM_POLICY = 'random';
/**
 * Determines ID of variation to be shown for the given input params
 * @param  {Object}             bucketerParams
 * @param  {string}             bucketerParams.experimentId
 * @param  {string}             bucketerParams.experimentKey
 * @param  {string}             bucketerParams.userId
 * @param  {Object[]}           bucketerParams.trafficAllocationConfig
 * @param  {Array}              bucketerParams.experimentKeyMap
 * @param  {Object}             bucketerParams.groupIdMap
 * @param  {Object}             bucketerParams.variationIdMap
 * @param  {string}             bucketerParams.varationIdMap[].key
 * @param  {Object}             bucketerParams.logger
 * @param  {string}             bucketerParams.bucketingId
 * @return {Object}             DecisionResponse                         DecisionResponse containing variation ID that user has been bucketed into,
 *                                                                       null if user is not bucketed into any experiment and the decide reasons.
 */
var bucket = function (bucketerParams) {
    var decideReasons = [];
    // Check if user is in a random group; if so, check if user is bucketed into a specific experiment
    var experiment = bucketerParams.experimentIdMap[bucketerParams.experimentId];
    var groupId = experiment['groupId'];
    if (groupId) {
        var group = bucketerParams.groupIdMap[groupId];
        if (!group) {
            throw new Error((0,_optimizely_js_sdk_utils__WEBPACK_IMPORTED_MODULE_1__.sprintf)(ERROR_MESSAGES.INVALID_GROUP_ID, MODULE_NAME$3, groupId));
        }
        if (group.policy === RANDOM_POLICY) {
            var bucketedExperimentId = bucketUserIntoExperiment(group, bucketerParams.bucketingId, bucketerParams.userId, bucketerParams.logger);
            // Return if user is not bucketed into any experiment
            if (bucketedExperimentId === null) {
                bucketerParams.logger.log(LOG_LEVEL.INFO, LOG_MESSAGES.USER_NOT_IN_ANY_EXPERIMENT, MODULE_NAME$3, bucketerParams.userId, groupId);
                decideReasons.push([
                    LOG_MESSAGES.USER_NOT_IN_ANY_EXPERIMENT,
                    MODULE_NAME$3,
                    bucketerParams.userId,
                    groupId,
                ]);
                return {
                    result: null,
                    reasons: decideReasons,
                };
            }
            // Return if user is bucketed into a different experiment than the one specified
            if (bucketedExperimentId !== bucketerParams.experimentId) {
                bucketerParams.logger.log(LOG_LEVEL.INFO, LOG_MESSAGES.USER_NOT_BUCKETED_INTO_EXPERIMENT_IN_GROUP, MODULE_NAME$3, bucketerParams.userId, bucketerParams.experimentKey, groupId);
                decideReasons.push([
                    LOG_MESSAGES.USER_NOT_BUCKETED_INTO_EXPERIMENT_IN_GROUP,
                    MODULE_NAME$3,
                    bucketerParams.userId,
                    bucketerParams.experimentKey,
                    groupId,
                ]);
                return {
                    result: null,
                    reasons: decideReasons,
                };
            }
            // Continue bucketing if user is bucketed into specified experiment      
            bucketerParams.logger.log(LOG_LEVEL.INFO, LOG_MESSAGES.USER_BUCKETED_INTO_EXPERIMENT_IN_GROUP, MODULE_NAME$3, bucketerParams.userId, bucketerParams.experimentKey, groupId);
            decideReasons.push([
                LOG_MESSAGES.USER_BUCKETED_INTO_EXPERIMENT_IN_GROUP,
                MODULE_NAME$3,
                bucketerParams.userId,
                bucketerParams.experimentKey,
                groupId,
            ]);
        }
    }
    var bucketingId = "" + bucketerParams.bucketingId + bucketerParams.experimentId;
    var bucketValue = _generateBucketValue(bucketingId);
    bucketerParams.logger.log(LOG_LEVEL.DEBUG, LOG_MESSAGES.USER_ASSIGNED_TO_EXPERIMENT_BUCKET, MODULE_NAME$3, bucketValue, bucketerParams.userId);
    decideReasons.push([
        LOG_MESSAGES.USER_ASSIGNED_TO_EXPERIMENT_BUCKET,
        MODULE_NAME$3,
        bucketValue,
        bucketerParams.userId,
    ]);
    var entityId = _findBucket(bucketValue, bucketerParams.trafficAllocationConfig);
    if (entityId !== null) {
        if (!bucketerParams.variationIdMap[entityId]) {
            if (entityId) {
                bucketerParams.logger.log(LOG_LEVEL.WARNING, LOG_MESSAGES.INVALID_VARIATION_ID, MODULE_NAME$3);
                decideReasons.push([LOG_MESSAGES.INVALID_VARIATION_ID, MODULE_NAME$3]);
            }
            return {
                result: null,
                reasons: decideReasons,
            };
        }
    }
    return {
        result: entityId,
        reasons: decideReasons,
    };
};
/**
 * Returns bucketed experiment ID to compare against experiment user is being called into
 * @param  {Group}       group        Group that experiment is in
 * @param  {string}      bucketingId  Bucketing ID
 * @param  {string}      userId       ID of user to be bucketed into experiment
 * @param  {LogHandler}  logger       Logger implementation
 * @return {string|null}              ID of experiment if user is bucketed into experiment within the group, null otherwise
 */
var bucketUserIntoExperiment = function (group, bucketingId, userId, logger) {
    var bucketingKey = "" + bucketingId + group.id;
    var bucketValue = _generateBucketValue(bucketingKey);
    logger.log(LOG_LEVEL.DEBUG, LOG_MESSAGES.USER_ASSIGNED_TO_EXPERIMENT_BUCKET, MODULE_NAME$3, bucketValue, userId);
    var trafficAllocationConfig = group.trafficAllocation;
    var bucketedExperimentId = _findBucket(bucketValue, trafficAllocationConfig);
    return bucketedExperimentId;
};
/**
 * Returns entity ID associated with bucket value
 * @param  {number}                bucketValue
 * @param  {TrafficAllocation[]}   trafficAllocationConfig
 * @param  {number}                trafficAllocationConfig[].endOfRange
 * @param  {string}                trafficAllocationConfig[].entityId
 * @return {string|null}           Entity ID for bucketing if bucket value is within traffic allocation boundaries, null otherwise
 */
var _findBucket = function (bucketValue, trafficAllocationConfig) {
    for (var i = 0; i < trafficAllocationConfig.length; i++) {
        if (bucketValue < trafficAllocationConfig[i].endOfRange) {
            return trafficAllocationConfig[i].entityId;
        }
    }
    return null;
};
/**
 * Helper function to generate bucket value in half-closed interval [0, MAX_TRAFFIC_VALUE)
 * @param  {string}               bucketingKey          String value for bucketing
 * @return {number}               The generated bucket value
 * @throws                        If bucketing value is not a valid string
 */
var _generateBucketValue = function (bucketingKey) {
    try {
        // NOTE: the mmh library already does cast the hash value as an unsigned 32bit int
        // https://github.com/perezd/node-murmurhash/blob/master/murmurhash.js#L115
        var hashValue = murmurhash__WEBPACK_IMPORTED_MODULE_2___default().v3(bucketingKey, HASH_SEED);
        var ratio = hashValue / MAX_HASH_VALUE;
        return Math.floor(ratio * MAX_TRAFFIC_VALUE);
    }
    catch (ex) {
        throw new Error((0,_optimizely_js_sdk_utils__WEBPACK_IMPORTED_MODULE_1__.sprintf)(ERROR_MESSAGES.INVALID_BUCKETING_ID, MODULE_NAME$3, bucketingKey, ex.message));
    }
};

/**
 * Copyright 2020, Optimizely
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var MODULE_NAME$4 = 'SEMANTIC VERSION';
var logger$1 = (0,_optimizely_js_sdk_logging__WEBPACK_IMPORTED_MODULE_0__.getLogger)();
/**
 * Evaluate if provided string is number only
 * @param  {unknown}  content
 * @return {boolean}  true if the string is number only
 *
 */
function isNumber$1(content) {
    return /^\d+$/.test(content);
}
/**
 * Evaluate if provided version contains pre-release "-"
 * @param  {unknown}  version
 * @return {boolean}  true if the version contains "-" and meets condition
 *
 */
function isPreReleaseVersion(version) {
    var preReleaseIndex = version.indexOf("-" /* PRE_RELEASE_VERSION_DELIMITER */);
    var buildIndex = version.indexOf("+" /* BUILD_VERSION_DELIMITER */);
    if (preReleaseIndex < 0) {
        return false;
    }
    if (buildIndex < 0) {
        return true;
    }
    return preReleaseIndex < buildIndex;
}
/**
 * Evaluate if provided version contains build "+"
 * @param  {unknown}  version
 * @return {boolean}  true if the version contains "+" and meets condition
 *
 */
function isBuildVersion(version) {
    var preReleaseIndex = version.indexOf("-" /* PRE_RELEASE_VERSION_DELIMITER */);
    var buildIndex = version.indexOf("+" /* BUILD_VERSION_DELIMITER */);
    if (buildIndex < 0) {
        return false;
    }
    if (preReleaseIndex < 0) {
        return true;
    }
    return buildIndex < preReleaseIndex;
}
/**
 * check if there is any white spaces " " in version
 * @param  {unknown}  version
 * @return {boolean}  true if the version contains " "
 *
 */
function hasWhiteSpaces(version) {
    return /\s/.test(version);
}
/**
 * split version in parts
 * @param  {unknown}  version
 * @return {boolean}  The array of version split into smaller parts i.e major, minor, patch etc
 *                    null if given version is in invalid format
 */
function splitVersion(version) {
    var targetPrefix = version;
    var targetSuffix = '';
    // check that version shouldn't have white space
    if (hasWhiteSpaces(version)) {
        logger$1.warn(LOG_MESSAGES.UNKNOWN_MATCH_TYPE, MODULE_NAME$4, version);
        return null;
    }
    //check for pre release e.g. 1.0.0-alpha where 'alpha' is a pre release
    //otherwise check for build e.g. 1.0.0+001 where 001 is a build metadata
    if (isPreReleaseVersion(version)) {
        targetPrefix = version.substring(0, version.indexOf("-" /* PRE_RELEASE_VERSION_DELIMITER */));
        targetSuffix = version.substring(version.indexOf("-" /* PRE_RELEASE_VERSION_DELIMITER */) + 1);
    }
    else if (isBuildVersion(version)) {
        targetPrefix = version.substring(0, version.indexOf("+" /* BUILD_VERSION_DELIMITER */));
        targetSuffix = version.substring(version.indexOf("+" /* BUILD_VERSION_DELIMITER */) + 1);
    }
    // check dot counts in target_prefix
    if (typeof targetPrefix !== 'string' || typeof targetSuffix !== 'string') {
        return null;
    }
    var dotCount = targetPrefix.split('.').length - 1;
    if (dotCount > 2) {
        logger$1.warn(LOG_MESSAGES.UNKNOWN_MATCH_TYPE, MODULE_NAME$4, version);
        return null;
    }
    var targetVersionParts = targetPrefix.split('.');
    if (targetVersionParts.length != dotCount + 1) {
        logger$1.warn(LOG_MESSAGES.UNKNOWN_MATCH_TYPE, MODULE_NAME$4, version);
        return null;
    }
    for (var _i = 0, targetVersionParts_1 = targetVersionParts; _i < targetVersionParts_1.length; _i++) {
        var part = targetVersionParts_1[_i];
        if (!isNumber$1(part)) {
            logger$1.warn(LOG_MESSAGES.UNKNOWN_MATCH_TYPE, MODULE_NAME$4, version);
            return null;
        }
    }
    if (targetSuffix) {
        targetVersionParts.push(targetSuffix);
    }
    return targetVersionParts;
}
/**
 * Compare user version with condition version
 * @param  {string}  conditionsVersion
 * @param  {string}  userProvidedVersion
 * @return {number | null}  0 if user version is equal to condition version
 *                          1 if user version is greater than condition version
 *                         -1 if user version is less than condition version
 *                          null if invalid user or condition version is provided
 */
function compareVersion(conditionsVersion, userProvidedVersion) {
    var userVersionParts = splitVersion(userProvidedVersion);
    var conditionsVersionParts = splitVersion(conditionsVersion);
    if (!userVersionParts || !conditionsVersionParts) {
        return null;
    }
    var userVersionPartsLen = userVersionParts.length;
    for (var idx = 0; idx < conditionsVersionParts.length; idx++) {
        if (userVersionPartsLen <= idx) {
            return isPreReleaseVersion(conditionsVersion) || isBuildVersion(conditionsVersion) ? 1 : -1;
        }
        else if (!isNumber$1(userVersionParts[idx])) {
            if (userVersionParts[idx] < conditionsVersionParts[idx]) {
                return isPreReleaseVersion(conditionsVersion) && !isPreReleaseVersion(userProvidedVersion) ? 1 : -1;
            }
            else if (userVersionParts[idx] > conditionsVersionParts[idx]) {
                return !isPreReleaseVersion(conditionsVersion) && isPreReleaseVersion(userProvidedVersion) ? -1 : 1;
            }
        }
        else {
            var userVersionPart = parseInt(userVersionParts[idx]);
            var conditionsVersionPart = parseInt(conditionsVersionParts[idx]);
            if (userVersionPart > conditionsVersionPart) {
                return 1;
            }
            else if (userVersionPart < conditionsVersionPart) {
                return -1;
            }
        }
    }
    // check if user version contains release and target version does not
    if (isPreReleaseVersion(userProvidedVersion) && !isPreReleaseVersion(conditionsVersion)) {
        return -1;
    }
    return 0;
}

/****************************************************************************
 * Copyright 2018-2019, 2020 Optimizely, Inc. and contributors              *
 *                                                                          *
 * Licensed under the Apache License, Version 2.0 (the "License");          *
 * you may not use this file except in compliance with the License.         *
 * You may obtain a copy of the License at                                  *
 *                                                                          *
 *    http://www.apache.org/licenses/LICENSE-2.0                            *
 *                                                                          *
 * Unless required by applicable law or agreed to in writing, software      *
 * distributed under the License is distributed on an "AS IS" BASIS,        *
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. *
 * See the License for the specific language governing permissions and      *
 * limitations under the License.                                           *
 ***************************************************************************/
var MODULE_NAME$5 = 'CUSTOM_ATTRIBUTE_CONDITION_EVALUATOR';
var logger$2 = (0,_optimizely_js_sdk_logging__WEBPACK_IMPORTED_MODULE_0__.getLogger)();
var EXACT_MATCH_TYPE = 'exact';
var EXISTS_MATCH_TYPE = 'exists';
var GREATER_OR_EQUAL_THAN_MATCH_TYPE = 'ge';
var GREATER_THAN_MATCH_TYPE = 'gt';
var LESS_OR_EQUAL_THAN_MATCH_TYPE = 'le';
var LESS_THAN_MATCH_TYPE = 'lt';
var SEMVER_EXACT_MATCH_TYPE = 'semver_eq';
var SEMVER_GREATER_OR_EQUAL_THAN_MATCH_TYPE = 'semver_ge';
var SEMVER_GREATER_THAN_MATCH_TYPE = 'semver_gt';
var SEMVER_LESS_OR_EQUAL_THAN_MATCH_TYPE = 'semver_le';
var SEMVER_LESS_THAN_MATCH_TYPE = 'semver_lt';
var SUBSTRING_MATCH_TYPE = 'substring';
var MATCH_TYPES = [
    EXACT_MATCH_TYPE,
    EXISTS_MATCH_TYPE,
    GREATER_THAN_MATCH_TYPE,
    GREATER_OR_EQUAL_THAN_MATCH_TYPE,
    LESS_THAN_MATCH_TYPE,
    LESS_OR_EQUAL_THAN_MATCH_TYPE,
    SUBSTRING_MATCH_TYPE,
    SEMVER_EXACT_MATCH_TYPE,
    SEMVER_LESS_THAN_MATCH_TYPE,
    SEMVER_LESS_OR_EQUAL_THAN_MATCH_TYPE,
    SEMVER_GREATER_THAN_MATCH_TYPE,
    SEMVER_GREATER_OR_EQUAL_THAN_MATCH_TYPE
];
var EVALUATORS_BY_MATCH_TYPE = {};
EVALUATORS_BY_MATCH_TYPE[EXACT_MATCH_TYPE] = exactEvaluator;
EVALUATORS_BY_MATCH_TYPE[EXISTS_MATCH_TYPE] = existsEvaluator;
EVALUATORS_BY_MATCH_TYPE[GREATER_THAN_MATCH_TYPE] = greaterThanEvaluator;
EVALUATORS_BY_MATCH_TYPE[GREATER_OR_EQUAL_THAN_MATCH_TYPE] = greaterThanOrEqualEvaluator;
EVALUATORS_BY_MATCH_TYPE[LESS_THAN_MATCH_TYPE] = lessThanEvaluator;
EVALUATORS_BY_MATCH_TYPE[LESS_OR_EQUAL_THAN_MATCH_TYPE] = lessThanOrEqualEvaluator;
EVALUATORS_BY_MATCH_TYPE[SUBSTRING_MATCH_TYPE] = substringEvaluator;
EVALUATORS_BY_MATCH_TYPE[SEMVER_EXACT_MATCH_TYPE] = semverEqualEvaluator;
EVALUATORS_BY_MATCH_TYPE[SEMVER_GREATER_THAN_MATCH_TYPE] = semverGreaterThanEvaluator;
EVALUATORS_BY_MATCH_TYPE[SEMVER_GREATER_OR_EQUAL_THAN_MATCH_TYPE] = semverGreaterThanOrEqualEvaluator;
EVALUATORS_BY_MATCH_TYPE[SEMVER_LESS_THAN_MATCH_TYPE] = semverLessThanEvaluator;
EVALUATORS_BY_MATCH_TYPE[SEMVER_LESS_OR_EQUAL_THAN_MATCH_TYPE] = semverLessThanOrEqualEvaluator;
/**
 * Given a custom attribute audience condition and user attributes, evaluate the
 * condition against the attributes.
 * @param  {Condition}        condition
 * @param  {UserAttributes}   userAttributes
 * @param  {LoggerFacade}     logger
 * @return {?boolean}         true/false if the given user attributes match/don't match the given condition,
 *                            null if the given user attributes and condition can't be evaluated
 * TODO: Change to accept and object with named properties
 */
function evaluate$1(condition, userAttributes) {
    var conditionMatch = condition.match;
    if (typeof conditionMatch !== 'undefined' && MATCH_TYPES.indexOf(conditionMatch) === -1) {
        logger$2.warn(LOG_MESSAGES.UNKNOWN_MATCH_TYPE, MODULE_NAME$5, JSON.stringify(condition));
        return null;
    }
    var attributeKey = condition.name;
    if (!userAttributes.hasOwnProperty(attributeKey) && conditionMatch != EXISTS_MATCH_TYPE) {
        logger$2.debug(LOG_MESSAGES.MISSING_ATTRIBUTE_VALUE, MODULE_NAME$5, JSON.stringify(condition), attributeKey);
        return null;
    }
    var evaluatorForMatch;
    if (!conditionMatch) {
        evaluatorForMatch = exactEvaluator;
    }
    else {
        evaluatorForMatch = EVALUATORS_BY_MATCH_TYPE[conditionMatch] || exactEvaluator;
    }
    return evaluatorForMatch(condition, userAttributes);
}
/**
 * Returns true if the value is valid for exact conditions. Valid values include
 * strings, booleans, and numbers that aren't NaN, -Infinity, or Infinity.
 * @param value
 * @returns {boolean}
 */
function isValueTypeValidForExactConditions(value) {
    return typeof value === 'string' || typeof value === 'boolean' || fns.isNumber(value);
}
/**
 * Evaluate the given exact match condition for the given user attributes
 * @param   {Condition}       condition
 * @param   {UserAttributes}  userAttributes
 * @param   {LoggerFacade}    logger
 * @return  {?boolean}        true if the user attribute value is equal (===) to the condition value,
 *                            false if the user attribute value is not equal (!==) to the condition value,
 *                            null if the condition value or user attribute value has an invalid type, or
 *                            if there is a mismatch between the user attribute type and the condition value
 *                            type
 */
function exactEvaluator(condition, userAttributes) {
    var conditionValue = condition.value;
    var conditionValueType = typeof conditionValue;
    var conditionName = condition.name;
    var userValue = userAttributes[conditionName];
    var userValueType = typeof userValue;
    if (!isValueTypeValidForExactConditions(conditionValue) ||
        (fns.isNumber(conditionValue) && !fns.isSafeInteger(conditionValue))) {
        logger$2.warn(LOG_MESSAGES.UNEXPECTED_CONDITION_VALUE, MODULE_NAME$5, JSON.stringify(condition));
        return null;
    }
    if (userValue === null) {
        logger$2.debug(LOG_MESSAGES.UNEXPECTED_TYPE_NULL, MODULE_NAME$5, JSON.stringify(condition), conditionName);
        return null;
    }
    if (!isValueTypeValidForExactConditions(userValue) || conditionValueType !== userValueType) {
        logger$2.warn(LOG_MESSAGES.UNEXPECTED_TYPE, MODULE_NAME$5, JSON.stringify(condition), userValueType, conditionName);
        return null;
    }
    if (fns.isNumber(userValue) && !fns.isSafeInteger(userValue)) {
        logger$2.warn(LOG_MESSAGES.OUT_OF_BOUNDS, MODULE_NAME$5, JSON.stringify(condition), conditionName);
        return null;
    }
    return conditionValue === userValue;
}
/**
 * Evaluate the given exists match condition for the given user attributes
 * @param   {Condition}       condition
 * @param   {UserAttributes}  userAttributes
 * @returns {boolean}         true if both:
 *                              1) the user attributes have a value for the given condition, and
 *                              2) the user attribute value is neither null nor undefined
 *                            Returns false otherwise
 */
function existsEvaluator(condition, userAttributes) {
    var userValue = userAttributes[condition.name];
    return typeof userValue !== 'undefined' && userValue !== null;
}
/**
 * Validate user and condition values
 * @param   {Condition}       condition
 * @param   {UserAttributes}  userAttributes
 * @returns {?boolean}        true if values are valid,
 *                            false if values are not valid
 */
function validateValuesForNumericCondition(condition, userAttributes) {
    var conditionName = condition.name;
    var userValue = userAttributes[conditionName];
    var userValueType = typeof userValue;
    var conditionValue = condition.value;
    if (conditionValue === null || !fns.isSafeInteger(conditionValue)) {
        logger$2.warn(LOG_MESSAGES.UNEXPECTED_CONDITION_VALUE, MODULE_NAME$5, JSON.stringify(condition));
        return false;
    }
    if (userValue === null) {
        logger$2.debug(LOG_MESSAGES.UNEXPECTED_TYPE_NULL, MODULE_NAME$5, JSON.stringify(condition), conditionName);
        return false;
    }
    if (!fns.isNumber(userValue)) {
        logger$2.warn(LOG_MESSAGES.UNEXPECTED_TYPE, MODULE_NAME$5, JSON.stringify(condition), userValueType, conditionName);
        return false;
    }
    if (!fns.isSafeInteger(userValue)) {
        logger$2.warn(LOG_MESSAGES.OUT_OF_BOUNDS, MODULE_NAME$5, JSON.stringify(condition), conditionName);
        return false;
    }
    return true;
}
/**
 * Evaluate the given greater than match condition for the given user attributes
 * @param   {Condition}       condition
 * @param   {UserAttributes}  userAttributes
 * @param   {LoggerFacade}    logger
 * @returns {?boolean}        true if the user attribute value is greater than the condition value,
 *                            false if the user attribute value is less than or equal to the condition value,
 *                            null if the condition value isn't a number or the user attribute value
 *                            isn't a number
 */
function greaterThanEvaluator(condition, userAttributes) {
    var userValue = userAttributes[condition.name];
    var conditionValue = condition.value;
    if (!validateValuesForNumericCondition(condition, userAttributes) || conditionValue === null) {
        return null;
    }
    return userValue > conditionValue;
}
/**
 * Evaluate the given greater or equal than match condition for the given user attributes
 * @param   {Condition}        condition
 * @param   {UserAttributes}   userAttributes
 * @param   {LoggerFacade}     logger
 * @returns {?Boolean}         true if the user attribute value is greater or equal than the condition value,
 *                             false if the user attribute value is less than to the condition value,
 *                             null if the condition value isn't a number or the user attribute value isn't a
 *                             number
 */
function greaterThanOrEqualEvaluator(condition, userAttributes) {
    var userValue = userAttributes[condition.name];
    var conditionValue = condition.value;
    if (!validateValuesForNumericCondition(condition, userAttributes) || conditionValue === null) {
        return null;
    }
    return userValue >= conditionValue;
}
/**
 * Evaluate the given less than match condition for the given user attributes
 * @param   {Condition}       condition
 * @param   {UserAttributes}  userAttributes
 * @param   {LoggerFacade}    logger
 * @returns {?boolean}        true if the user attribute value is less than the condition value,
 *                            false if the user attribute value is greater than or equal to the condition value,
 *                            null if the condition value isn't a number or the user attribute value isn't a
 *                            number
 */
function lessThanEvaluator(condition, userAttributes) {
    var userValue = userAttributes[condition.name];
    var conditionValue = condition.value;
    if (!validateValuesForNumericCondition(condition, userAttributes) || conditionValue === null) {
        return null;
    }
    return userValue < conditionValue;
}
/**
 * Evaluate the given less or equal than match condition for the given user attributes
 * @param   {Condition}       condition
 * @param   {UserAttributes}  userAttributes
 * @param   {LoggerFacade}    logger
 * @returns {?Boolean}        true if the user attribute value is less or equal than the condition value,
 *                            false if the user attribute value is greater than to the condition value,
 *                            null if the condition value isn't a number or the user attribute value isn't a
 *                            number
 */
function lessThanOrEqualEvaluator(condition, userAttributes) {
    var userValue = userAttributes[condition.name];
    var conditionValue = condition.value;
    if (!validateValuesForNumericCondition(condition, userAttributes) || conditionValue === null) {
        return null;
    }
    return userValue <= conditionValue;
}
/**
 * Evaluate the given substring match condition for the given user attributes
 * @param   {Condition}       condition
 * @param   {UserAttributes}  userAttributes
 * @param   {LoggerFacade}    logger
 * @returns {?Boolean}        true if the condition value is a substring of the user attribute value,
 *                            false if the condition value is not a substring of the user attribute value,
 *                            null if the condition value isn't a string or the user attribute value
 *                            isn't a string
 */
function substringEvaluator(condition, userAttributes) {
    var conditionName = condition.name;
    var userValue = userAttributes[condition.name];
    var userValueType = typeof userValue;
    var conditionValue = condition.value;
    if (typeof conditionValue !== 'string') {
        logger$2.warn(LOG_MESSAGES.UNEXPECTED_CONDITION_VALUE, MODULE_NAME$5, JSON.stringify(condition));
        return null;
    }
    if (userValue === null) {
        logger$2.debug(LOG_MESSAGES.UNEXPECTED_TYPE_NULL, MODULE_NAME$5, JSON.stringify(condition), conditionName);
        return null;
    }
    if (typeof userValue !== 'string') {
        logger$2.warn(LOG_MESSAGES.UNEXPECTED_TYPE, MODULE_NAME$5, JSON.stringify(condition), userValueType, conditionName);
        return null;
    }
    return userValue.indexOf(conditionValue) !== -1;
}
/**
 * Evaluate the given semantic version match condition for the given user attributes
 * @param   {Condition}       condition
 * @param   {UserAttributes}  userAttributes
 * @param   {LoggerFacade}    logger
 * @returns {?number}         returns compareVersion result
 *                            null if the user attribute version has an invalid type
 */
function evaluateSemanticVersion(condition, userAttributes) {
    var conditionName = condition.name;
    var userValue = userAttributes[conditionName];
    var userValueType = typeof userValue;
    var conditionValue = condition.value;
    if (typeof conditionValue !== 'string') {
        logger$2.warn(LOG_MESSAGES.UNEXPECTED_CONDITION_VALUE, MODULE_NAME$5, JSON.stringify(condition));
        return null;
    }
    if (userValue === null) {
        logger$2.debug(LOG_MESSAGES.UNEXPECTED_TYPE_NULL, MODULE_NAME$5, JSON.stringify(condition), conditionName);
        return null;
    }
    if (typeof userValue !== 'string') {
        logger$2.warn(LOG_MESSAGES.UNEXPECTED_TYPE, MODULE_NAME$5, JSON.stringify(condition), userValueType, conditionName);
        return null;
    }
    return compareVersion(conditionValue, userValue);
}
/**
 * Evaluate the given version match condition for the given user attributes
 * @param   {Condition}       condition
 * @param   {UserAttributes}  userAttributes
 * @param   {LoggerFacade}    logger
 * @returns {?Boolean}        true if the user attribute version is equal (===) to the condition version,
 *                            false if the user attribute version is not equal (!==) to the condition version,
 *                            null if the user attribute version has an invalid type
 */
function semverEqualEvaluator(condition, userAttributes) {
    var result = evaluateSemanticVersion(condition, userAttributes);
    if (result === null) {
        return null;
    }
    return result === 0;
}
/**
 * Evaluate the given version match condition for the given user attributes
 * @param   {Condition}       condition
 * @param   {UserAttributes}  userAttributes
 * @param   {LoggerFacade}    logger
 * @returns {?Boolean}        true if the user attribute version is greater (>) than the condition version,
 *                            false if the user attribute version is not greater than the condition version,
 *                            null if the user attribute version has an invalid type
 */
function semverGreaterThanEvaluator(condition, userAttributes) {
    var result = evaluateSemanticVersion(condition, userAttributes);
    if (result === null) {
        return null;
    }
    return result > 0;
}
/**
 * Evaluate the given version match condition for the given user attributes
 * @param   {Condition}       condition
 * @param   {UserAttributes}  userAttributes
 * @param   {LoggerFacade}    logger
 * @returns {?Boolean}        true if the user attribute version is less (<) than the condition version,
 *                            false if the user attribute version is not less than the condition version,
 *                            null if the user attribute version has an invalid type
 */
function semverLessThanEvaluator(condition, userAttributes) {
    var result = evaluateSemanticVersion(condition, userAttributes);
    if (result === null) {
        return null;
    }
    return result < 0;
}
/**
 * Evaluate the given version match condition for the given user attributes
 * @param   {Condition}       condition
 * @param   {UserAttributes}  userAttributes
 * @param   {LoggerFacade}    logger
 * @returns {?Boolean}        true if the user attribute version is greater than or equal (>=) to the condition version,
 *                            false if the user attribute version is not greater than or equal to the condition version,
 *                            null if the user attribute version has an invalid type
 */
function semverGreaterThanOrEqualEvaluator(condition, userAttributes) {
    var result = evaluateSemanticVersion(condition, userAttributes);
    if (result === null) {
        return null;
    }
    return result >= 0;
}
/**
 * Evaluate the given version match condition for the given user attributes
 * @param   {Condition}       condition
 * @param   {UserAttributes}  userAttributes
 * @param   {LoggerFacade}    logger
 * @returns {?Boolean}        true if the user attribute version is less than or equal (<=) to the condition version,
 *                            false if the user attribute version is not less than or equal to the condition version,
 *                            null if the user attribute version has an invalid type
 */
function semverLessThanOrEqualEvaluator(condition, userAttributes) {
    var result = evaluateSemanticVersion(condition, userAttributes);
    if (result === null) {
        return null;
    }
    return result <= 0;
}

var customAttributeConditionEvaluator = /*#__PURE__*/Object.freeze({
    __proto__: null,
    evaluate: evaluate$1
});

/**
 * Copyright 2016, 2018-2021, Optimizely
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var logger$3 = (0,_optimizely_js_sdk_logging__WEBPACK_IMPORTED_MODULE_0__.getLogger)();
var MODULE_NAME$6 = 'AUDIENCE_EVALUATOR';
var AudienceEvaluator = /** @class */ (function () {
    /**
     * Construct an instance of AudienceEvaluator with given options
     * @param {Object=} UNSTABLE_conditionEvaluators     A map of condition evaluators provided by the consumer. This enables matching
     *                                                   condition types which are not supported natively by the SDK. Note that built in
     *                                                   Optimizely evaluators cannot be overridden.
     * @constructor
     */
    function AudienceEvaluator(UNSTABLE_conditionEvaluators) {
        this.typeToEvaluatorMap = fns.assign({}, UNSTABLE_conditionEvaluators, {
            custom_attribute: customAttributeConditionEvaluator,
        });
    }
    /**
     * Determine if the given user attributes satisfy the given audience conditions
     * @param  {Array<string|string[]}        audienceConditions    Audience conditions to match the user attributes against - can be an array
     *                                                              of audience IDs, a nested array of conditions, or a single leaf condition.
     *                                                              Examples: ["5", "6"], ["and", ["or", "1", "2"], "3"], "1"
     * @param  {[id: string]: Audience}       audiencesById         Object providing access to full audience objects for audience IDs
     *                                                              contained in audienceConditions. Keys should be audience IDs, values
     *                                                              should be full audience objects with conditions properties
     * @param  {UserAttributes}               userAttributes        User attributes which will be used in determining if audience conditions
     *                                                              are met. If not provided, defaults to an empty object
     * @return {boolean}                                            true if the user attributes match the given audience conditions, false
     *                                                              otherwise
     */
    AudienceEvaluator.prototype.evaluate = function (audienceConditions, audiencesById, userAttributes) {
        var _this = this;
        if (userAttributes === void 0) { userAttributes = {}; }
        // if there are no audiences, return true because that means ALL users are included in the experiment
        if (!audienceConditions || audienceConditions.length === 0) {
            return true;
        }
        var evaluateAudience = function (audienceId) {
            var audience = audiencesById[audienceId];
            if (audience) {
                logger$3.log(LOG_LEVEL.DEBUG, LOG_MESSAGES.EVALUATING_AUDIENCE, MODULE_NAME$6, audienceId, JSON.stringify(audience.conditions));
                var result = evaluate(audience.conditions, _this.evaluateConditionWithUserAttributes.bind(_this, userAttributes));
                var resultText = result === null ? 'UNKNOWN' : result.toString().toUpperCase();
                logger$3.log(LOG_LEVEL.DEBUG, LOG_MESSAGES.AUDIENCE_EVALUATION_RESULT, MODULE_NAME$6, audienceId, resultText);
                return result;
            }
            return null;
        };
        return !!evaluate(audienceConditions, evaluateAudience);
    };
    /**
     * Wrapper around evaluator.evaluate that is passed to the conditionTreeEvaluator.
     * Evaluates the condition provided given the user attributes if an evaluator has been defined for the condition type.
     * @param  {UserAttributes}       userAttributes     A map of user attributes.
     * @param  {Condition}            condition          A single condition object to evaluate.
     * @return {boolean|null}                            true if the condition is satisfied, null if a matcher is not found.
     */
    AudienceEvaluator.prototype.evaluateConditionWithUserAttributes = function (userAttributes, condition) {
        var evaluator = this.typeToEvaluatorMap[condition.type];
        if (!evaluator) {
            logger$3.log(LOG_LEVEL.WARNING, LOG_MESSAGES.UNKNOWN_CONDITION_TYPE, MODULE_NAME$6, JSON.stringify(condition));
            return null;
        }
        try {
            return evaluator.evaluate(condition, userAttributes);
        }
        catch (err) {
            logger$3.log(LOG_LEVEL.ERROR, ERROR_MESSAGES.CONDITION_EVALUATOR_ERROR, MODULE_NAME$6, condition.type, err.message);
        }
        return null;
    };
    return AudienceEvaluator;
}());
var createAudienceEvaluator = function (UNSTABLE_conditionEvaluators) {
    return new AudienceEvaluator(UNSTABLE_conditionEvaluators);
};

/**
 * Copyright 2018, 2020, Optimizely
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Validates provided value is a non-empty string
 * @param  {unknown}  input
 * @return {boolean}  true for non-empty string, false otherwise
 */
function validate$1(input) {
    return typeof input === 'string' && input !== '';
}

/****************************************************************************
 * Copyright 2017-2022 Optimizely, Inc. and contributors                    *
 *                                                                          *
 * Licensed under the Apache License, Version 2.0 (the "License");          *
 * you may not use this file except in compliance with the License.         *
 * You may obtain a copy of the License at                                  *
 *                                                                          *
 *    http://www.apache.org/licenses/LICENSE-2.0                            *
 *                                                                          *
 * Unless required by applicable law or agreed to in writing, software      *
 * distributed under the License is distributed on an "AS IS" BASIS,        *
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. *
 * See the License for the specific language governing permissions and      *
 * limitations under the License.                                           *
 ***************************************************************************/
var MODULE_NAME$7 = 'DECISION_SERVICE';
/**
 * Optimizely's decision service that determines which variation of an experiment the user will be allocated to.
 *
 * The decision service contains all logic around how a user decision is made. This includes all of the following (in order):
 *   1. Checking experiment status
 *   2. Checking forced bucketing
 *   3. Checking whitelisting
 *   4. Checking user profile service for past bucketing decisions (sticky bucketing)
 *   5. Checking audience targeting
 *   6. Using Murmurhash3 to bucket the user.
 *
 * @constructor
 * @param   {DecisionServiceOptions}      options
 * @returns {DecisionService}
 */
var DecisionService = /** @class */ (function () {
    function DecisionService(options) {
        this.audienceEvaluator = createAudienceEvaluator(options.UNSTABLE_conditionEvaluators);
        this.forcedVariationMap = {};
        this.logger = options.logger;
        this.userProfileService = options.userProfileService || null;
    }
    /**
     * Gets variation where visitor will be bucketed.
     * @param  {ProjectConfig}                          configObj         The parsed project configuration object
     * @param  {Experiment}                             experiment
     * @param  {OptimizelyUserContext}                  user              A user context
     * @param  {[key: string]: boolean}                 options           Optional map of decide options
     * @return {DecisionResponse<string|null>}          DecisionResponse containing the variation the user is bucketed into
     *                                                                    and the decide reasons.
     */
    DecisionService.prototype.getVariation = function (configObj, experiment, user, options) {
        if (options === void 0) { options = {}; }
        var userId = user.getUserId();
        var attributes = user.getAttributes();
        // by default, the bucketing ID should be the user ID
        var bucketingId = this.getBucketingId(userId, attributes);
        var decideReasons = [];
        var experimentKey = experiment.key;
        if (!this.checkIfExperimentIsActive(configObj, experimentKey)) {
            this.logger.log(LOG_LEVEL.INFO, LOG_MESSAGES.EXPERIMENT_NOT_RUNNING, MODULE_NAME$7, experimentKey);
            decideReasons.push([LOG_MESSAGES.EXPERIMENT_NOT_RUNNING, MODULE_NAME$7, experimentKey]);
            return {
                result: null,
                reasons: decideReasons,
            };
        }
        var decisionForcedVariation = this.getForcedVariation(configObj, experimentKey, userId);
        decideReasons.push.apply(decideReasons, decisionForcedVariation.reasons);
        var forcedVariationKey = decisionForcedVariation.result;
        if (forcedVariationKey) {
            return {
                result: forcedVariationKey,
                reasons: decideReasons,
            };
        }
        var decisionWhitelistedVariation = this.getWhitelistedVariation(experiment, userId);
        decideReasons.push.apply(decideReasons, decisionWhitelistedVariation.reasons);
        var variation = decisionWhitelistedVariation.result;
        if (variation) {
            return {
                result: variation.key,
                reasons: decideReasons,
            };
        }
        var shouldIgnoreUPS = options[OptimizelyDecideOption.IGNORE_USER_PROFILE_SERVICE];
        var experimentBucketMap = this.resolveExperimentBucketMap(userId, attributes);
        // check for sticky bucketing if decide options do not include shouldIgnoreUPS
        if (!shouldIgnoreUPS) {
            variation = this.getStoredVariation(configObj, experiment, userId, experimentBucketMap);
            if (variation) {
                this.logger.log(LOG_LEVEL.INFO, LOG_MESSAGES.RETURNING_STORED_VARIATION, MODULE_NAME$7, variation.key, experimentKey, userId);
                decideReasons.push([
                    LOG_MESSAGES.RETURNING_STORED_VARIATION,
                    MODULE_NAME$7,
                    variation.key,
                    experimentKey,
                    userId,
                ]);
                return {
                    result: variation.key,
                    reasons: decideReasons,
                };
            }
        }
        // Perform regular targeting and bucketing
        var decisionifUserIsInAudience = this.checkIfUserIsInAudience(configObj, experiment, AUDIENCE_EVALUATION_TYPES.EXPERIMENT, attributes, '');
        decideReasons.push.apply(decideReasons, decisionifUserIsInAudience.reasons);
        if (!decisionifUserIsInAudience.result) {
            this.logger.log(LOG_LEVEL.INFO, LOG_MESSAGES.USER_NOT_IN_EXPERIMENT, MODULE_NAME$7, userId, experimentKey);
            decideReasons.push([
                LOG_MESSAGES.USER_NOT_IN_EXPERIMENT,
                MODULE_NAME$7,
                userId,
                experimentKey,
            ]);
            return {
                result: null,
                reasons: decideReasons,
            };
        }
        var bucketerParams = this.buildBucketerParams(configObj, experiment, bucketingId, userId);
        var decisionVariation = bucket(bucketerParams);
        decideReasons.push.apply(decideReasons, decisionVariation.reasons);
        var variationId = decisionVariation.result;
        if (variationId) {
            variation = configObj.variationIdMap[variationId];
        }
        if (!variation) {
            this.logger.log(LOG_LEVEL.DEBUG, LOG_MESSAGES.USER_HAS_NO_VARIATION, MODULE_NAME$7, userId, experimentKey);
            decideReasons.push([
                LOG_MESSAGES.USER_HAS_NO_VARIATION,
                MODULE_NAME$7,
                userId,
                experimentKey,
            ]);
            return {
                result: null,
                reasons: decideReasons,
            };
        }
        this.logger.log(LOG_LEVEL.INFO, LOG_MESSAGES.USER_HAS_VARIATION, MODULE_NAME$7, userId, variation.key, experimentKey);
        decideReasons.push([
            LOG_MESSAGES.USER_HAS_VARIATION,
            MODULE_NAME$7,
            userId,
            variation.key,
            experimentKey,
        ]);
        // persist bucketing if decide options do not include shouldIgnoreUPS
        if (!shouldIgnoreUPS) {
            this.saveUserProfile(experiment, variation, userId, experimentBucketMap);
        }
        return {
            result: variation.key,
            reasons: decideReasons,
        };
    };
    /**
     * Merges attributes from attributes[STICKY_BUCKETING_KEY] and userProfileService
     * @param  {string}               userId
     * @param  {UserAttributes}       attributes
     * @return {ExperimentBucketMap}  finalized copy of experiment_bucket_map
     */
    DecisionService.prototype.resolveExperimentBucketMap = function (userId, attributes) {
        attributes = attributes || {};
        var userProfile = this.getUserProfile(userId) || {};
        var attributeExperimentBucketMap = attributes[CONTROL_ATTRIBUTES.STICKY_BUCKETING_KEY];
        return fns.assign({}, userProfile.experiment_bucket_map, attributeExperimentBucketMap);
    };
    /**
     * Checks whether the experiment is running
     * @param  {ProjectConfig}  configObj     The parsed project configuration object
     * @param  {string}         experimentKey Key of experiment being validated
     * @return {boolean}        True if experiment is running
     */
    DecisionService.prototype.checkIfExperimentIsActive = function (configObj, experimentKey) {
        return isActive(configObj, experimentKey);
    };
    /**
     * Checks if user is whitelisted into any variation and return that variation if so
     * @param  {Experiment}                                 experiment
     * @param  {string}                                     userId
     * @return {DecisionResponse<Variation|null>}           DecisionResponse containing the forced variation if it exists
     *                                                      or user ID and the decide reasons.
     */
    DecisionService.prototype.getWhitelistedVariation = function (experiment, userId) {
        var decideReasons = [];
        if (experiment.forcedVariations && experiment.forcedVariations.hasOwnProperty(userId)) {
            var forcedVariationKey = experiment.forcedVariations[userId];
            if (experiment.variationKeyMap.hasOwnProperty(forcedVariationKey)) {
                this.logger.log(LOG_LEVEL.INFO, LOG_MESSAGES.USER_FORCED_IN_VARIATION, MODULE_NAME$7, userId, forcedVariationKey);
                decideReasons.push([
                    LOG_MESSAGES.USER_FORCED_IN_VARIATION,
                    MODULE_NAME$7,
                    userId,
                    forcedVariationKey,
                ]);
                return {
                    result: experiment.variationKeyMap[forcedVariationKey],
                    reasons: decideReasons,
                };
            }
            else {
                this.logger.log(LOG_LEVEL.ERROR, LOG_MESSAGES.FORCED_BUCKETING_FAILED, MODULE_NAME$7, forcedVariationKey, userId);
                decideReasons.push([
                    LOG_MESSAGES.FORCED_BUCKETING_FAILED,
                    MODULE_NAME$7,
                    forcedVariationKey,
                    userId,
                ]);
                return {
                    result: null,
                    reasons: decideReasons,
                };
            }
        }
        return {
            result: null,
            reasons: decideReasons,
        };
    };
    /**
     * Checks whether the user is included in experiment audience
     * @param  {ProjectConfig}                configObj            The parsed project configuration object
     * @param  {string}                       experimentKey        Key of experiment being validated
     * @param  {string}                       evaluationAttribute  String representing experiment key or rule
     * @param  {string}                       userId               ID of user
     * @param  {UserAttributes}               attributes           Optional parameter for user's attributes
     * @param  {string}                       loggingKey           String representing experiment key or rollout rule. To be used in log messages only.
     * @return {DecisionResponse<boolean>}    DecisionResponse     DecisionResponse containing result true if user meets audience conditions and
     *                                                             the decide reasons.
     */
    DecisionService.prototype.checkIfUserIsInAudience = function (configObj, experiment, evaluationAttribute, attributes, loggingKey) {
        var decideReasons = [];
        var experimentAudienceConditions = getExperimentAudienceConditions(configObj, experiment.id);
        var audiencesById = getAudiencesById(configObj);
        this.logger.log(LOG_LEVEL.DEBUG, LOG_MESSAGES.EVALUATING_AUDIENCES_COMBINED, MODULE_NAME$7, evaluationAttribute, loggingKey || experiment.key, JSON.stringify(experimentAudienceConditions));
        decideReasons.push([
            LOG_MESSAGES.EVALUATING_AUDIENCES_COMBINED,
            MODULE_NAME$7,
            evaluationAttribute,
            loggingKey || experiment.key,
            JSON.stringify(experimentAudienceConditions),
        ]);
        var result = this.audienceEvaluator.evaluate(experimentAudienceConditions, audiencesById, attributes);
        this.logger.log(LOG_LEVEL.INFO, LOG_MESSAGES.AUDIENCE_EVALUATION_RESULT_COMBINED, MODULE_NAME$7, evaluationAttribute, loggingKey || experiment.key, result.toString().toUpperCase());
        decideReasons.push([
            LOG_MESSAGES.AUDIENCE_EVALUATION_RESULT_COMBINED,
            MODULE_NAME$7,
            evaluationAttribute,
            loggingKey || experiment.key,
            result.toString().toUpperCase(),
        ]);
        return {
            result: result,
            reasons: decideReasons,
        };
    };
    /**
     * Given an experiment key and user ID, returns params used in bucketer call
     * @param  {ProjectConfig}         configObj     The parsed project configuration object
     * @param  {string}                experimentKey Experiment key used for bucketer
     * @param  {string}                bucketingId   ID to bucket user into
     * @param  {string}                userId        ID of user to be bucketed
     * @return {BucketerParams}
     */
    DecisionService.prototype.buildBucketerParams = function (configObj, experiment, bucketingId, userId) {
        return {
            bucketingId: bucketingId,
            experimentId: experiment.id,
            experimentKey: experiment.key,
            experimentIdMap: configObj.experimentIdMap,
            experimentKeyMap: configObj.experimentKeyMap,
            groupIdMap: configObj.groupIdMap,
            logger: this.logger,
            trafficAllocationConfig: getTrafficAllocation(configObj, experiment.id),
            userId: userId,
            variationIdMap: configObj.variationIdMap,
        };
    };
    /**
     * Pull the stored variation out of the experimentBucketMap for an experiment/userId
     * @param  {ProjectConfig}        configObj            The parsed project configuration object
     * @param  {Experiment}           experiment
     * @param  {string}               userId
     * @param  {ExperimentBucketMap}  experimentBucketMap  mapping experiment => { variation_id: <variationId> }
     * @return {Variation|null}       the stored variation or null if the user profile does not have one for the given experiment
     */
    DecisionService.prototype.getStoredVariation = function (configObj, experiment, userId, experimentBucketMap) {
        if (experimentBucketMap.hasOwnProperty(experiment.id)) {
            var decision = experimentBucketMap[experiment.id];
            var variationId = decision.variation_id;
            if (configObj.variationIdMap.hasOwnProperty(variationId)) {
                return configObj.variationIdMap[decision.variation_id];
            }
            else {
                this.logger.log(LOG_LEVEL.INFO, LOG_MESSAGES.SAVED_VARIATION_NOT_FOUND, MODULE_NAME$7, userId, variationId, experiment.key);
            }
        }
        return null;
    };
    /**
     * Get the user profile with the given user ID
     * @param  {string} userId
     * @return {UserProfile|null} the stored user profile or null if one isn't found
     */
    DecisionService.prototype.getUserProfile = function (userId) {
        var userProfile = {
            user_id: userId,
            experiment_bucket_map: {},
        };
        if (!this.userProfileService) {
            return userProfile;
        }
        try {
            return this.userProfileService.lookup(userId);
        }
        catch (ex) {
            this.logger.log(LOG_LEVEL.ERROR, ERROR_MESSAGES.USER_PROFILE_LOOKUP_ERROR, MODULE_NAME$7, userId, ex.message);
        }
        return null;
    };
    /**
     * Saves the bucketing decision to the user profile
     * @param {Experiment}          experiment
     * @param {Variation}           variation
     * @param {string}              userId
     * @param {ExperimentBucketMap} experimentBucketMap
     */
    DecisionService.prototype.saveUserProfile = function (experiment, variation, userId, experimentBucketMap) {
        if (!this.userProfileService) {
            return;
        }
        try {
            experimentBucketMap[experiment.id] = {
                variation_id: variation.id
            };
            this.userProfileService.save({
                user_id: userId,
                experiment_bucket_map: experimentBucketMap,
            });
            this.logger.log(LOG_LEVEL.INFO, LOG_MESSAGES.SAVED_VARIATION, MODULE_NAME$7, variation.key, experiment.key, userId);
        }
        catch (ex) {
            this.logger.log(LOG_LEVEL.ERROR, ERROR_MESSAGES.USER_PROFILE_SAVE_ERROR, MODULE_NAME$7, userId, ex.message);
        }
    };
    /**
     * Given a feature, user ID, and attributes, returns a decision response containing
     * an object representing a decision and decide reasons. If the user was bucketed into
     * a variation for the given feature and attributes, the decision object will have variation and
     * experiment properties (both objects), as well as a decisionSource property.
     * decisionSource indicates whether the decision was due to a rollout or an
     * experiment.
     * @param   {ProjectConfig}               configObj         The parsed project configuration object
     * @param   {FeatureFlag}                 feature           A feature flag object from project configuration
     * @param   {OptimizelyUserContext}       user              A user context
     * @param   {[key: string]: boolean}      options           Map of decide options
     * @return  {DecisionResponse}            DecisionResponse  DecisionResponse containing an object with experiment, variation, and decisionSource
     *                                                          properties and decide reasons. If the user was not bucketed into a variation, the variation
     *                                                          property in decision object is null.
     */
    DecisionService.prototype.getVariationForFeature = function (configObj, feature, user, options) {
        if (options === void 0) { options = {}; }
        var decideReasons = [];
        var decisionVariation = this.getVariationForFeatureExperiment(configObj, feature, user, options);
        decideReasons.push.apply(decideReasons, decisionVariation.reasons);
        var experimentDecision = decisionVariation.result;
        if (experimentDecision.variation !== null) {
            return {
                result: experimentDecision,
                reasons: decideReasons,
            };
        }
        var decisionRolloutVariation = this.getVariationForRollout(configObj, feature, user);
        decideReasons.push.apply(decideReasons, decisionRolloutVariation.reasons);
        var rolloutDecision = decisionRolloutVariation.result;
        var userId = user.getUserId();
        if (rolloutDecision.variation) {
            this.logger.log(LOG_LEVEL.DEBUG, LOG_MESSAGES.USER_IN_ROLLOUT, MODULE_NAME$7, userId, feature.key);
            decideReasons.push([LOG_MESSAGES.USER_IN_ROLLOUT, MODULE_NAME$7, userId, feature.key]);
            return {
                result: rolloutDecision,
                reasons: decideReasons,
            };
        }
        this.logger.log(LOG_LEVEL.DEBUG, LOG_MESSAGES.USER_NOT_IN_ROLLOUT, MODULE_NAME$7, userId, feature.key);
        decideReasons.push([LOG_MESSAGES.USER_NOT_IN_ROLLOUT, MODULE_NAME$7, userId, feature.key]);
        return {
            result: rolloutDecision,
            reasons: decideReasons,
        };
    };
    DecisionService.prototype.getVariationForFeatureExperiment = function (configObj, feature, user, options) {
        if (options === void 0) { options = {}; }
        var decideReasons = [];
        var variationKey = null;
        var decisionVariation;
        var index;
        var variationForFeatureExperiment;
        // Check if the feature flag is under an experiment and the the user is bucketed into one of these experiments
        if (feature.experimentIds.length > 0) {
            // Evaluate each experiment ID and return the first bucketed experiment variation
            for (index = 0; index < feature.experimentIds.length; index++) {
                var experiment = getExperimentFromId(configObj, feature.experimentIds[index], this.logger);
                if (experiment) {
                    decisionVariation = this.getVariationFromExperimentRule(configObj, feature.key, experiment, user, options);
                    decideReasons.push.apply(decideReasons, decisionVariation.reasons);
                    variationKey = decisionVariation.result;
                    if (variationKey) {
                        var variation = null;
                        variation = experiment.variationKeyMap[variationKey];
                        if (!variation) {
                            variation = getFlagVariationByKey(configObj, feature.key, variationKey);
                        }
                        variationForFeatureExperiment = {
                            experiment: experiment,
                            variation: variation,
                            decisionSource: DECISION_SOURCES.FEATURE_TEST,
                        };
                        return {
                            result: variationForFeatureExperiment,
                            reasons: decideReasons,
                        };
                    }
                }
            }
        }
        else {
            this.logger.log(LOG_LEVEL.DEBUG, LOG_MESSAGES.FEATURE_HAS_NO_EXPERIMENTS, MODULE_NAME$7, feature.key);
            decideReasons.push([LOG_MESSAGES.FEATURE_HAS_NO_EXPERIMENTS, MODULE_NAME$7, feature.key]);
        }
        variationForFeatureExperiment = {
            experiment: null,
            variation: null,
            decisionSource: DECISION_SOURCES.FEATURE_TEST,
        };
        return {
            result: variationForFeatureExperiment,
            reasons: decideReasons,
        };
    };
    DecisionService.prototype.getVariationForRollout = function (configObj, feature, user) {
        var decideReasons = [];
        var decisionObj;
        if (!feature.rolloutId) {
            this.logger.log(LOG_LEVEL.DEBUG, LOG_MESSAGES.NO_ROLLOUT_EXISTS, MODULE_NAME$7, feature.key);
            decideReasons.push([LOG_MESSAGES.NO_ROLLOUT_EXISTS, MODULE_NAME$7, feature.key]);
            decisionObj = {
                experiment: null,
                variation: null,
                decisionSource: DECISION_SOURCES.ROLLOUT,
            };
            return {
                result: decisionObj,
                reasons: decideReasons,
            };
        }
        var rollout = configObj.rolloutIdMap[feature.rolloutId];
        if (!rollout) {
            this.logger.log(LOG_LEVEL.ERROR, ERROR_MESSAGES.INVALID_ROLLOUT_ID, MODULE_NAME$7, feature.rolloutId, feature.key);
            decideReasons.push([ERROR_MESSAGES.INVALID_ROLLOUT_ID, MODULE_NAME$7, feature.rolloutId, feature.key]);
            decisionObj = {
                experiment: null,
                variation: null,
                decisionSource: DECISION_SOURCES.ROLLOUT,
            };
            return {
                result: decisionObj,
                reasons: decideReasons,
            };
        }
        var rolloutRules = rollout.experiments;
        if (rolloutRules.length === 0) {
            this.logger.log(LOG_LEVEL.ERROR, LOG_MESSAGES.ROLLOUT_HAS_NO_EXPERIMENTS, MODULE_NAME$7, feature.rolloutId);
            decideReasons.push([LOG_MESSAGES.ROLLOUT_HAS_NO_EXPERIMENTS, MODULE_NAME$7, feature.rolloutId]);
            decisionObj = {
                experiment: null,
                variation: null,
                decisionSource: DECISION_SOURCES.ROLLOUT,
            };
            return {
                result: decisionObj,
                reasons: decideReasons,
            };
        }
        var decisionVariation;
        var skipToEveryoneElse;
        var variation;
        var rolloutRule;
        var index = 0;
        while (index < rolloutRules.length) {
            decisionVariation = this.getVariationFromDeliveryRule(configObj, feature.key, rolloutRules, index, user);
            decideReasons.push.apply(decideReasons, decisionVariation.reasons);
            variation = decisionVariation.result;
            skipToEveryoneElse = decisionVariation.skipToEveryoneElse;
            if (variation) {
                rolloutRule = configObj.experimentIdMap[rolloutRules[index].id];
                decisionObj = {
                    experiment: rolloutRule,
                    variation: variation,
                    decisionSource: DECISION_SOURCES.ROLLOUT
                };
                return {
                    result: decisionObj,
                    reasons: decideReasons,
                };
            }
            // the last rule is special for "Everyone Else"
            index = skipToEveryoneElse ? (rolloutRules.length - 1) : (index + 1);
        }
        decisionObj = {
            experiment: null,
            variation: null,
            decisionSource: DECISION_SOURCES.ROLLOUT,
        };
        return {
            result: decisionObj,
            reasons: decideReasons,
        };
    };
    /**
     * Get bucketing Id from user attributes.
     * @param   {string}          userId
     * @param   {UserAttributes}  attributes
     * @returns {string}          Bucketing Id if it is a string type in attributes, user Id otherwise.
     */
    DecisionService.prototype.getBucketingId = function (userId, attributes) {
        var bucketingId = userId;
        // If the bucketing ID key is defined in attributes, than use that in place of the userID for the murmur hash key
        if (attributes != null &&
            typeof attributes === 'object' &&
            attributes.hasOwnProperty(CONTROL_ATTRIBUTES.BUCKETING_ID)) {
            if (typeof attributes[CONTROL_ATTRIBUTES.BUCKETING_ID] === 'string') {
                bucketingId = attributes[CONTROL_ATTRIBUTES.BUCKETING_ID];
                this.logger.log(LOG_LEVEL.DEBUG, LOG_MESSAGES.VALID_BUCKETING_ID, MODULE_NAME$7, bucketingId);
            }
            else {
                this.logger.log(LOG_LEVEL.WARNING, LOG_MESSAGES.BUCKETING_ID_NOT_STRING, MODULE_NAME$7);
            }
        }
        return bucketingId;
    };
    /**
     * Finds a validated forced decision for specific flagKey and optional ruleKey.
     * @param     {ProjectConfig}         config               A projectConfig.
     * @param     {OptimizelyUserContext} user                 A Optimizely User Context.
     * @param     {string}                flagKey              A flagKey.
     * @param     {ruleKey}               ruleKey              A ruleKey (optional).
     * @return    {DecisionResponse<Variation|null>}  DecisionResponse object containing valid variation object and decide reasons.
     */
    DecisionService.prototype.findValidatedForcedDecision = function (config, user, flagKey, ruleKey) {
        var decideReasons = [];
        var forcedDecision = user.getForcedDecision({ flagKey: flagKey, ruleKey: ruleKey });
        var variation = null;
        var variationKey;
        var userId = user.getUserId();
        if (config && forcedDecision) {
            variationKey = forcedDecision.variationKey;
            variation = getFlagVariationByKey(config, flagKey, variationKey);
            if (variation) {
                if (ruleKey) {
                    this.logger.log(LOG_LEVEL.INFO, LOG_MESSAGES.USER_HAS_FORCED_DECISION_WITH_RULE_SPECIFIED, variationKey, flagKey, ruleKey, userId);
                    decideReasons.push([
                        LOG_MESSAGES.USER_HAS_FORCED_DECISION_WITH_RULE_SPECIFIED,
                        variationKey,
                        flagKey,
                        ruleKey,
                        userId
                    ]);
                }
                else {
                    this.logger.log(LOG_LEVEL.INFO, LOG_MESSAGES.USER_HAS_FORCED_DECISION_WITH_NO_RULE_SPECIFIED, variationKey, flagKey, userId);
                    decideReasons.push([
                        LOG_MESSAGES.USER_HAS_FORCED_DECISION_WITH_NO_RULE_SPECIFIED,
                        variationKey,
                        flagKey,
                        userId
                    ]);
                }
            }
            else {
                if (ruleKey) {
                    this.logger.log(LOG_LEVEL.INFO, LOG_MESSAGES.USER_HAS_FORCED_DECISION_WITH_RULE_SPECIFIED_BUT_INVALID, flagKey, ruleKey, userId);
                    decideReasons.push([
                        LOG_MESSAGES.USER_HAS_FORCED_DECISION_WITH_RULE_SPECIFIED_BUT_INVALID,
                        flagKey,
                        ruleKey,
                        userId
                    ]);
                }
                else {
                    this.logger.log(LOG_LEVEL.INFO, LOG_MESSAGES.USER_HAS_FORCED_DECISION_WITH_NO_RULE_SPECIFIED_BUT_INVALID, flagKey, userId);
                    decideReasons.push([
                        LOG_MESSAGES.USER_HAS_FORCED_DECISION_WITH_NO_RULE_SPECIFIED_BUT_INVALID,
                        flagKey,
                        userId
                    ]);
                }
            }
        }
        return {
            result: variation,
            reasons: decideReasons,
        };
    };
    /**
     * Removes forced variation for given userId and experimentKey
     * @param  {string} userId         String representing the user id
     * @param  {string} experimentId   Number representing the experiment id
     * @param  {string} experimentKey  Key representing the experiment id
     * @throws If the user id is not valid or not in the forced variation map
     */
    DecisionService.prototype.removeForcedVariation = function (userId, experimentId, experimentKey) {
        if (!userId) {
            throw new Error((0,_optimizely_js_sdk_utils__WEBPACK_IMPORTED_MODULE_1__.sprintf)(ERROR_MESSAGES.INVALID_USER_ID, MODULE_NAME$7));
        }
        if (this.forcedVariationMap.hasOwnProperty(userId)) {
            delete this.forcedVariationMap[userId][experimentId];
            this.logger.log(LOG_LEVEL.DEBUG, LOG_MESSAGES.VARIATION_REMOVED_FOR_USER, MODULE_NAME$7, experimentKey, userId);
        }
        else {
            throw new Error((0,_optimizely_js_sdk_utils__WEBPACK_IMPORTED_MODULE_1__.sprintf)(ERROR_MESSAGES.USER_NOT_IN_FORCED_VARIATION, MODULE_NAME$7, userId));
        }
    };
    /**
     * Sets forced variation for given userId and experimentKey
     * @param  {string} userId        String representing the user id
     * @param  {string} experimentId  Number representing the experiment id
     * @param  {number} variationId   Number representing the variation id
     * @throws If the user id is not valid
     */
    DecisionService.prototype.setInForcedVariationMap = function (userId, experimentId, variationId) {
        if (this.forcedVariationMap.hasOwnProperty(userId)) {
            this.forcedVariationMap[userId][experimentId] = variationId;
        }
        else {
            this.forcedVariationMap[userId] = {};
            this.forcedVariationMap[userId][experimentId] = variationId;
        }
        this.logger.log(LOG_LEVEL.DEBUG, LOG_MESSAGES.USER_MAPPED_TO_FORCED_VARIATION, MODULE_NAME$7, variationId, experimentId, userId);
    };
    /**
     * Gets the forced variation key for the given user and experiment.
     * @param  {ProjectConfig}                  configObj         Object representing project configuration
     * @param  {string}                         experimentKey     Key for experiment.
     * @param  {string}                         userId            The user Id.
     * @return {DecisionResponse<string|null>}                    DecisionResponse containing variation which the given user and experiment
     *                                                            should be forced into and the decide reasons.
     */
    DecisionService.prototype.getForcedVariation = function (configObj, experimentKey, userId) {
        var decideReasons = [];
        var experimentToVariationMap = this.forcedVariationMap[userId];
        if (!experimentToVariationMap) {
            this.logger.log(LOG_LEVEL.DEBUG, LOG_MESSAGES.USER_HAS_NO_FORCED_VARIATION, MODULE_NAME$7, userId);
            return {
                result: null,
                reasons: decideReasons,
            };
        }
        var experimentId;
        try {
            var experiment = getExperimentFromKey(configObj, experimentKey);
            if (experiment.hasOwnProperty('id')) {
                experimentId = experiment['id'];
            }
            else {
                // catching improperly formatted experiments
                this.logger.log(LOG_LEVEL.ERROR, ERROR_MESSAGES.IMPROPERLY_FORMATTED_EXPERIMENT, MODULE_NAME$7, experimentKey);
                decideReasons.push([
                    ERROR_MESSAGES.IMPROPERLY_FORMATTED_EXPERIMENT,
                    MODULE_NAME$7,
                    experimentKey,
                ]);
                return {
                    result: null,
                    reasons: decideReasons,
                };
            }
        }
        catch (ex) {
            // catching experiment not in datafile
            this.logger.log(LOG_LEVEL.ERROR, ex.message);
            decideReasons.push(ex.message);
            return {
                result: null,
                reasons: decideReasons,
            };
        }
        var variationId = experimentToVariationMap[experimentId];
        if (!variationId) {
            this.logger.log(LOG_LEVEL.DEBUG, LOG_MESSAGES.USER_HAS_NO_FORCED_VARIATION_FOR_EXPERIMENT, MODULE_NAME$7, experimentKey, userId);
            return {
                result: null,
                reasons: decideReasons,
            };
        }
        var variationKey = getVariationKeyFromId(configObj, variationId);
        if (variationKey) {
            this.logger.log(LOG_LEVEL.DEBUG, LOG_MESSAGES.USER_HAS_FORCED_VARIATION, MODULE_NAME$7, variationKey, experimentKey, userId);
            decideReasons.push([
                LOG_MESSAGES.USER_HAS_FORCED_VARIATION,
                MODULE_NAME$7,
                variationKey,
                experimentKey,
                userId,
            ]);
        }
        else {
            this.logger.log(LOG_LEVEL.DEBUG, LOG_MESSAGES.USER_HAS_NO_FORCED_VARIATION_FOR_EXPERIMENT, MODULE_NAME$7, experimentKey, userId);
        }
        return {
            result: variationKey,
            reasons: decideReasons,
        };
    };
    /**
     * Sets the forced variation for a user in a given experiment
     * @param  {ProjectConfig}  configObj      Object representing project configuration
     * @param  {string}         experimentKey  Key for experiment.
     * @param  {string}         userId         The user Id.
     * @param  {string|null}    variationKey   Key for variation. If null, then clear the existing experiment-to-variation mapping
     * @return {boolean}     A boolean value that indicates if the set completed successfully.
     */
    DecisionService.prototype.setForcedVariation = function (configObj, experimentKey, userId, variationKey) {
        if (variationKey != null && !validate$1(variationKey)) {
            this.logger.log(LOG_LEVEL.ERROR, ERROR_MESSAGES.INVALID_VARIATION_KEY, MODULE_NAME$7);
            return false;
        }
        var experimentId;
        try {
            var experiment = getExperimentFromKey(configObj, experimentKey);
            if (experiment.hasOwnProperty('id')) {
                experimentId = experiment['id'];
            }
            else {
                // catching improperly formatted experiments
                this.logger.log(LOG_LEVEL.ERROR, ERROR_MESSAGES.IMPROPERLY_FORMATTED_EXPERIMENT, MODULE_NAME$7, experimentKey);
                return false;
            }
        }
        catch (ex) {
            // catching experiment not in datafile
            this.logger.log(LOG_LEVEL.ERROR, ex.message);
            return false;
        }
        if (variationKey == null) {
            try {
                this.removeForcedVariation(userId, experimentId, experimentKey);
                return true;
            }
            catch (ex) {
                this.logger.log(LOG_LEVEL.ERROR, ex.message);
                return false;
            }
        }
        var variationId = getVariationIdFromExperimentAndVariationKey(configObj, experimentKey, variationKey);
        if (!variationId) {
            this.logger.log(LOG_LEVEL.ERROR, ERROR_MESSAGES.NO_VARIATION_FOR_EXPERIMENT_KEY, MODULE_NAME$7, variationKey, experimentKey);
            return false;
        }
        try {
            this.setInForcedVariationMap(userId, experimentId, variationId);
            return true;
        }
        catch (ex) {
            this.logger.log(LOG_LEVEL.ERROR, ex.message);
            return false;
        }
    };
    DecisionService.prototype.getVariationFromExperimentRule = function (configObj, flagKey, rule, user, options) {
        if (options === void 0) { options = {}; }
        var decideReasons = [];
        // check forced decision first
        var forcedDecisionResponse = this.findValidatedForcedDecision(configObj, user, flagKey, rule.key);
        decideReasons.push.apply(decideReasons, forcedDecisionResponse.reasons);
        var forcedVariaton = forcedDecisionResponse.result;
        if (forcedVariaton) {
            return {
                result: forcedVariaton.key,
                reasons: decideReasons,
            };
        }
        var decisionVariation = this.getVariation(configObj, rule, user, options);
        decideReasons.push.apply(decideReasons, decisionVariation.reasons);
        var variationKey = decisionVariation.result;
        return {
            result: variationKey,
            reasons: decideReasons,
        };
    };
    DecisionService.prototype.getVariationFromDeliveryRule = function (configObj, flagKey, rules, ruleIndex, user) {
        var decideReasons = [];
        var skipToEveryoneElse = false;
        // check forced decision first
        var rule = rules[ruleIndex];
        var forcedDecisionResponse = this.findValidatedForcedDecision(configObj, user, flagKey, rule.key);
        decideReasons.push.apply(decideReasons, forcedDecisionResponse.reasons);
        var forcedVariaton = forcedDecisionResponse.result;
        if (forcedVariaton) {
            return {
                result: forcedVariaton,
                reasons: decideReasons,
                skipToEveryoneElse: skipToEveryoneElse,
            };
        }
        var userId = user.getUserId();
        var attributes = user.getAttributes();
        var bucketingId = this.getBucketingId(userId, attributes);
        var everyoneElse = ruleIndex === rules.length - 1;
        var loggingKey = everyoneElse ? "Everyone Else" : ruleIndex + 1;
        var bucketedVariation = null;
        var bucketerVariationId;
        var bucketerParams;
        var decisionVariation;
        var decisionifUserIsInAudience = this.checkIfUserIsInAudience(configObj, rule, AUDIENCE_EVALUATION_TYPES.RULE, attributes, loggingKey);
        decideReasons.push.apply(decideReasons, decisionifUserIsInAudience.reasons);
        if (decisionifUserIsInAudience.result) {
            this.logger.log(LOG_LEVEL.DEBUG, LOG_MESSAGES.USER_MEETS_CONDITIONS_FOR_TARGETING_RULE, MODULE_NAME$7, userId, loggingKey);
            decideReasons.push([
                LOG_MESSAGES.USER_MEETS_CONDITIONS_FOR_TARGETING_RULE,
                MODULE_NAME$7,
                userId,
                loggingKey
            ]);
            bucketerParams = this.buildBucketerParams(configObj, rule, bucketingId, userId);
            decisionVariation = bucket(bucketerParams);
            decideReasons.push.apply(decideReasons, decisionVariation.reasons);
            bucketerVariationId = decisionVariation.result;
            if (bucketerVariationId) {
                bucketedVariation = getVariationFromId(configObj, bucketerVariationId);
            }
            if (bucketedVariation) {
                this.logger.log(LOG_LEVEL.DEBUG, LOG_MESSAGES.USER_BUCKETED_INTO_TARGETING_RULE, MODULE_NAME$7, userId, loggingKey);
                decideReasons.push([
                    LOG_MESSAGES.USER_BUCKETED_INTO_TARGETING_RULE,
                    MODULE_NAME$7,
                    userId,
                    loggingKey
                ]);
            }
            else if (!everyoneElse) {
                // skip this logging for EveryoneElse since this has a message not for EveryoneElse
                this.logger.log(LOG_LEVEL.DEBUG, LOG_MESSAGES.USER_NOT_BUCKETED_INTO_TARGETING_RULE, MODULE_NAME$7, userId, loggingKey);
                decideReasons.push([
                    LOG_MESSAGES.USER_NOT_BUCKETED_INTO_TARGETING_RULE,
                    MODULE_NAME$7,
                    userId,
                    loggingKey
                ]);
                // skip the rest of rollout rules to the everyone-else rule if audience matches but not bucketed
                skipToEveryoneElse = true;
            }
        }
        else {
            this.logger.log(LOG_LEVEL.DEBUG, LOG_MESSAGES.USER_DOESNT_MEET_CONDITIONS_FOR_TARGETING_RULE, MODULE_NAME$7, userId, loggingKey);
            decideReasons.push([
                LOG_MESSAGES.USER_DOESNT_MEET_CONDITIONS_FOR_TARGETING_RULE,
                MODULE_NAME$7,
                userId,
                loggingKey
            ]);
        }
        return {
            result: bucketedVariation,
            reasons: decideReasons,
            skipToEveryoneElse: skipToEveryoneElse,
        };
    };
    return DecisionService;
}());
/**
 * Creates an instance of the DecisionService.
 * @param  {DecisionServiceOptions}     options       Configuration options
 * @return {Object}                     An instance of the DecisionService
 */
function createDecisionService(options) {
    return new DecisionService(options);
}

/**
 * Provides utility method for parsing event tag values
 */
var MODULE_NAME$8 = 'EVENT_TAG_UTILS';
var REVENUE_EVENT_METRIC_NAME = "revenue" /* REVENUE */;
var VALUE_EVENT_METRIC_NAME = "value" /* VALUE */;
/**
 * Grab the revenue value from the event tags. "revenue" is a reserved keyword.
 * @param {EventTags} eventTags
 * @param {LoggerFacade} logger
 * @return {number|null}
 */
function getRevenueValue(eventTags, logger) {
    if (eventTags.hasOwnProperty(REVENUE_EVENT_METRIC_NAME)) {
        var rawValue = eventTags[REVENUE_EVENT_METRIC_NAME];
        var parsedRevenueValue = void 0;
        if (typeof rawValue === 'string') {
            parsedRevenueValue = parseInt(rawValue);
            if (isNaN(parsedRevenueValue)) {
                logger.log(LOG_LEVEL.INFO, LOG_MESSAGES.FAILED_TO_PARSE_REVENUE, MODULE_NAME$8, rawValue);
                return null;
            }
            logger.log(LOG_LEVEL.INFO, LOG_MESSAGES.PARSED_REVENUE_VALUE, MODULE_NAME$8, parsedRevenueValue);
            return parsedRevenueValue;
        }
        if (typeof rawValue === 'number') {
            parsedRevenueValue = rawValue;
            logger.log(LOG_LEVEL.INFO, LOG_MESSAGES.PARSED_REVENUE_VALUE, MODULE_NAME$8, parsedRevenueValue);
            return parsedRevenueValue;
        }
        return null;
    }
    return null;
}
/**
 * Grab the event value from the event tags. "value" is a reserved keyword.
 * @param {EventTags} eventTags
 * @param {LoggerFacade} logger
 * @return {number|null}
 */
function getEventValue(eventTags, logger) {
    if (eventTags.hasOwnProperty(VALUE_EVENT_METRIC_NAME)) {
        var rawValue = eventTags[VALUE_EVENT_METRIC_NAME];
        var parsedEventValue = void 0;
        if (typeof rawValue === 'string') {
            parsedEventValue = parseFloat(rawValue);
            if (isNaN(parsedEventValue)) {
                logger.log(LOG_LEVEL.INFO, LOG_MESSAGES.FAILED_TO_PARSE_VALUE, MODULE_NAME$8, rawValue);
                return null;
            }
            logger.log(LOG_LEVEL.INFO, LOG_MESSAGES.PARSED_NUMERIC_VALUE, MODULE_NAME$8, parsedEventValue);
            return parsedEventValue;
        }
        if (typeof rawValue === 'number') {
            parsedEventValue = rawValue;
            logger.log(LOG_LEVEL.INFO, LOG_MESSAGES.PARSED_NUMERIC_VALUE, MODULE_NAME$8, parsedEventValue);
            return parsedEventValue;
        }
        return null;
    }
    return null;
}

/**
 * Copyright 2016, 2018-2020, Optimizely
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var MODULE_NAME$9 = 'ATTRIBUTES_VALIDATOR';
/**
 * Validates user's provided attributes
 * @param  {unknown}  attributes
 * @return {boolean}  true if the attributes are valid
 * @throws If the attributes are not valid
 */
function validate$2(attributes) {
    if (typeof attributes === 'object' && !Array.isArray(attributes) && attributes !== null) {
        Object.keys(attributes).forEach(function (key) {
            if (typeof attributes[key] === 'undefined') {
                throw new Error((0,_optimizely_js_sdk_utils__WEBPACK_IMPORTED_MODULE_1__.sprintf)(ERROR_MESSAGES.UNDEFINED_ATTRIBUTE, MODULE_NAME$9, key));
            }
        });
        return true;
    }
    else {
        throw new Error((0,_optimizely_js_sdk_utils__WEBPACK_IMPORTED_MODULE_1__.sprintf)(ERROR_MESSAGES.INVALID_ATTRIBUTES, MODULE_NAME$9));
    }
}
/**
 * Validates user's provided attribute
 * @param  {unknown}  attributeKey
 * @param  {unknown}  attributeValue
 * @return {boolean}  true if the attribute is valid
 */
function isAttributeValid(attributeKey, attributeValue) {
    return (typeof attributeKey === 'string' &&
        (typeof attributeValue === 'string' ||
            typeof attributeValue === 'boolean' ||
            (fns.isNumber(attributeValue) && fns.isSafeInteger(attributeValue))));
}

var ACTIVATE_EVENT_KEY = 'campaign_activated';
var CUSTOM_ATTRIBUTE_FEATURE_TYPE = 'custom';
var ENDPOINT = 'https://logx.optimizely.com/v1/events';
var HTTP_VERB = 'POST';
/**
 * Get params which are used same in both conversion and impression events
 * @param  {ImpressionOptions|ConversionEventOptions} options    Object containing values needed to build impression/conversion event
 * @return {CommonEventParams}                                   Common params with properties that are used in both conversion and impression events
 */
function getCommonEventParams(_a) {
    var attributes = _a.attributes, userId = _a.userId, clientEngine = _a.clientEngine, clientVersion = _a.clientVersion, configObj = _a.configObj, logger = _a.logger;
    var anonymize_ip = configObj.anonymizeIP ? configObj.anonymizeIP : false;
    var botFiltering = configObj.botFiltering;
    var visitor = {
        snapshots: [],
        visitor_id: userId,
        attributes: [],
    };
    var commonParams = {
        account_id: configObj.accountId,
        project_id: configObj.projectId,
        visitors: [visitor],
        revision: configObj.revision,
        client_name: clientEngine,
        client_version: clientVersion,
        anonymize_ip: anonymize_ip,
        enrich_decisions: true,
    };
    if (attributes) {
        // Omit attribute values that are not supported by the log endpoint.
        Object.keys(attributes || {}).forEach(function (attributeKey) {
            var attributeValue = attributes[attributeKey];
            if (isAttributeValid(attributeKey, attributeValue)) {
                var attributeId = getAttributeId(configObj, attributeKey, logger);
                if (attributeId) {
                    commonParams.visitors[0].attributes.push({
                        entity_id: attributeId,
                        key: attributeKey,
                        type: CUSTOM_ATTRIBUTE_FEATURE_TYPE,
                        value: attributes[attributeKey],
                    });
                }
            }
        });
    }
    if (typeof botFiltering === 'boolean') {
        commonParams.visitors[0].attributes.push({
            entity_id: CONTROL_ATTRIBUTES.BOT_FILTERING,
            key: CONTROL_ATTRIBUTES.BOT_FILTERING,
            type: CUSTOM_ATTRIBUTE_FEATURE_TYPE,
            value: botFiltering,
        });
    }
    return commonParams;
}
/**
 * Creates object of params specific to impression events
 * @param  {ProjectConfig}       configObj    Object representing project configuration
 * @param  {string|null}         experimentId ID of experiment for which impression needs to be recorded
 * @param  {string|null}         variationId  ID for variation which would be presented to user
 * @param  {string}              ruleKey      Key of experiment for which impression needs to be recorded
 * @param  {string}              ruleType     Type for the decision source
 * @param  {string}              flagKey      Key for a feature flag
 * @param  {boolean}             enabled      Boolean representing if feature is enabled
 * @return {Snapshot}                         Impression event params
 */
function getImpressionEventParams(configObj, experimentId, variationId, ruleKey, ruleType, flagKey, enabled) {
    var campaignId = experimentId ? getLayerId(configObj, experimentId) : null;
    var variationKey = variationId ? getVariationKeyFromId(configObj, variationId) : null;
    variationKey = variationKey || '';
    var impressionEventParams = {
        decisions: [
            {
                campaign_id: campaignId,
                experiment_id: experimentId,
                variation_id: variationId,
                metadata: {
                    flag_key: flagKey,
                    rule_key: ruleKey,
                    rule_type: ruleType,
                    variation_key: variationKey,
                    enabled: enabled,
                }
            },
        ],
        events: [
            {
                entity_id: campaignId,
                timestamp: fns.currentTimestamp(),
                key: ACTIVATE_EVENT_KEY,
                uuid: fns.uuid(),
            },
        ],
    };
    return impressionEventParams;
}
/**
 * Creates object of params specific to conversion events
 * @param  {ProjectConfig} configObj                 Object representing project configuration
 * @param  {string}        eventKey                  Event key representing the event which needs to be recorded
 * @param  {LoggerFacade}  logger                    Logger object
 * @param  {EventTags}     eventTags                 Values associated with the event.
 * @return {Snapshot}                                Conversion event params
 */
function getVisitorSnapshot(configObj, eventKey, logger, eventTags) {
    var snapshot = {
        events: [],
    };
    var eventDict = {
        entity_id: getEventId(configObj, eventKey),
        timestamp: fns.currentTimestamp(),
        uuid: fns.uuid(),
        key: eventKey,
    };
    if (eventTags) {
        var revenue = getRevenueValue(eventTags, logger);
        if (revenue !== null) {
            eventDict["revenue" /* REVENUE */] = revenue;
        }
        var eventValue = getEventValue(eventTags, logger);
        if (eventValue !== null) {
            eventDict["value" /* VALUE */] = eventValue;
        }
        eventDict['tags'] = eventTags;
    }
    snapshot.events.push(eventDict);
    return snapshot;
}
/**
 * Create impression event params to be sent to the logging endpoint
 * @param  {ImpressionOptions}    options    Object containing values needed to build impression event
 * @return {EventLoggingEndpoint}            Params to be used in impression event logging endpoint call
 */
function getImpressionEvent(options) {
    var commonParams = getCommonEventParams(options);
    var impressionEventParams = getImpressionEventParams(options.configObj, options.experimentId, options.variationId, options.ruleKey, options.ruleType, options.flagKey, options.enabled);
    commonParams.visitors[0].snapshots.push(impressionEventParams);
    var impressionEvent = {
        httpVerb: HTTP_VERB,
        url: ENDPOINT,
        params: commonParams,
    };
    return impressionEvent;
}
/**
 * Create conversion event params to be sent to the logging endpoint
 * @param  {ConversionEventOptions}  options   Object containing values needed to build conversion event
 * @return {EventLoggingEndpoint}              Params to be used in conversion event logging endpoint call
 */
function getConversionEvent(options) {
    var commonParams = getCommonEventParams(options);
    var snapshot = getVisitorSnapshot(options.configObj, options.eventKey, options.logger, options.eventTags);
    commonParams.visitors[0].snapshots = [snapshot];
    var conversionEvent = {
        httpVerb: HTTP_VERB,
        url: ENDPOINT,
        params: commonParams,
    };
    return conversionEvent;
}

/**
 * Copyright 2020, Optimizely
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Get experiment key from the provided decision object
 * @param   {DecisionObj} decisionObj       Object representing decision
 * @returns {string}                        Experiment key or empty string if experiment is null
 */
function getExperimentKey(decisionObj) {
    var _a, _b;
    return (_b = (_a = decisionObj.experiment) === null || _a === void 0 ? void 0 : _a.key) !== null && _b !== void 0 ? _b : '';
}
/**
 * Get variation key from the provided decision object
 * @param   {DecisionObj} decisionObj       Object representing decision
 * @returns {string}                        Variation key or empty string if variation is null
 */
function getVariationKey(decisionObj) {
    var _a, _b;
    return (_b = (_a = decisionObj.variation) === null || _a === void 0 ? void 0 : _a.key) !== null && _b !== void 0 ? _b : '';
}
/**
 * Get featureEnabled from variation in the provided decision object
 * @param   {DecisionObj} decisionObj       Object representing decision
 * @returns {boolean}                       featureEnabled boolean or false if variation is null
 */
function getFeatureEnabledFromVariation(decisionObj) {
    var _a, _b;
    return (_b = (_a = decisionObj.variation) === null || _a === void 0 ? void 0 : _a.featureEnabled) !== null && _b !== void 0 ? _b : false;
}
/**
 * Get experiment id from the provided decision object
 * @param   {DecisionObj} decisionObj       Object representing decision
 * @returns {string}                        Experiment id or null if experiment is null
 */
function getExperimentId(decisionObj) {
    var _a, _b;
    return (_b = (_a = decisionObj.experiment) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : null;
}
/**
 * Get variation id from the provided decision object
 * @param   {DecisionObj} decisionObj       Object representing decision
 * @returns {string}                        Variation id or null if variation is null
 */
function getVariationId(decisionObj) {
    var _a, _b;
    return (_b = (_a = decisionObj.variation) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : null;
}

/**
 * Copyright 2019-2021, Optimizely
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var logger$4 = (0,_optimizely_js_sdk_logging__WEBPACK_IMPORTED_MODULE_0__.getLogger)('EVENT_BUILDER');
/**
 * Creates an ImpressionEvent object from decision data
 * @param  {ImpressionConfig}  config
 * @return {ImpressionEvent}   an ImpressionEvent object
 */
var buildImpressionEvent = function (_a) {
    var configObj = _a.configObj, decisionObj = _a.decisionObj, userId = _a.userId, flagKey = _a.flagKey, enabled = _a.enabled, userAttributes = _a.userAttributes, clientEngine = _a.clientEngine, clientVersion = _a.clientVersion;
    var ruleType = decisionObj.decisionSource;
    var experimentKey = getExperimentKey(decisionObj);
    var experimentId = getExperimentId(decisionObj);
    var variationKey = getVariationKey(decisionObj);
    var variationId = getVariationId(decisionObj);
    var layerId = experimentId !== null ? getLayerId(configObj, experimentId) : null;
    return {
        type: 'impression',
        timestamp: fns.currentTimestamp(),
        uuid: fns.uuid(),
        user: {
            id: userId,
            attributes: buildVisitorAttributes(configObj, userAttributes),
        },
        context: {
            accountId: configObj.accountId,
            projectId: configObj.projectId,
            revision: configObj.revision,
            clientName: clientEngine,
            clientVersion: clientVersion,
            anonymizeIP: configObj.anonymizeIP || false,
            botFiltering: configObj.botFiltering,
        },
        layer: {
            id: layerId,
        },
        experiment: {
            id: experimentId,
            key: experimentKey,
        },
        variation: {
            id: variationId,
            key: variationKey,
        },
        ruleKey: experimentKey,
        flagKey: flagKey,
        ruleType: ruleType,
        enabled: enabled,
    };
};
/**
 * Creates a ConversionEvent object from track
 * @param  {ConversionConfig} config
 * @return {ConversionEvent}  a ConversionEvent object
 */
var buildConversionEvent = function (_a) {
    var configObj = _a.configObj, userId = _a.userId, userAttributes = _a.userAttributes, clientEngine = _a.clientEngine, clientVersion = _a.clientVersion, eventKey = _a.eventKey, eventTags = _a.eventTags;
    var eventId = getEventId(configObj, eventKey);
    var revenue = eventTags ? getRevenueValue(eventTags, logger$4) : null;
    var eventValue = eventTags ? getEventValue(eventTags, logger$4) : null;
    return {
        type: 'conversion',
        timestamp: fns.currentTimestamp(),
        uuid: fns.uuid(),
        user: {
            id: userId,
            attributes: buildVisitorAttributes(configObj, userAttributes),
        },
        context: {
            accountId: configObj.accountId,
            projectId: configObj.projectId,
            revision: configObj.revision,
            clientName: clientEngine,
            clientVersion: clientVersion,
            anonymizeIP: configObj.anonymizeIP || false,
            botFiltering: configObj.botFiltering,
        },
        event: {
            id: eventId,
            key: eventKey,
        },
        revenue: revenue,
        value: eventValue,
        tags: eventTags,
    };
};
function buildVisitorAttributes(configObj, attributes) {
    var builtAttributes = [];
    // Omit attribute values that are not supported by the log endpoint.
    if (attributes) {
        Object.keys(attributes || {}).forEach(function (attributeKey) {
            var attributeValue = attributes[attributeKey];
            if (isAttributeValid(attributeKey, attributeValue)) {
                var attributeId = getAttributeId(configObj, attributeKey, logger$4);
                if (attributeId) {
                    builtAttributes.push({
                        entityId: attributeId,
                        key: attributeKey,
                        value: attributes[attributeKey],
                    });
                }
            }
        });
    }
    return builtAttributes;
}

/**
 * Copyright 2017, 2020 Optimizely
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var MODULE_NAME$a = 'EVENT_TAGS_VALIDATOR';
/**
 * Validates user's provided event tags
 * @param  {unknown}  eventTags
 * @return {boolean} true if event tags are valid
 * @throws If event tags are not valid
 */
function validate$3(eventTags) {
    if (typeof eventTags === 'object' && !Array.isArray(eventTags) && eventTags !== null) {
        return true;
    }
    else {
        throw new Error((0,_optimizely_js_sdk_utils__WEBPACK_IMPORTED_MODULE_1__.sprintf)(ERROR_MESSAGES.INVALID_EVENT_TAGS, MODULE_NAME$a));
    }
}

/****************************************************************************
 * Copyright 2017, 2020, Optimizely, Inc. and contributors                  *
 *                                                                          *
 * Licensed under the Apache License, Version 2.0 (the "License");          *
 * you may not use this file except in compliance with the License.         *
 * You may obtain a copy of the License at                                  *
 *                                                                          *
 *    http://www.apache.org/licenses/LICENSE-2.0                            *
 *                                                                          *
 * Unless required by applicable law or agreed to in writing, software      *
 * distributed under the License is distributed on an "AS IS" BASIS,        *
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. *
 * See the License for the specific language governing permissions and      *
 * limitations under the License.                                           *
 ***************************************************************************/
var MODULE_NAME$b = 'USER_PROFILE_SERVICE_VALIDATOR';
/**
 * Validates user's provided user profile service instance
 * @param  {unknown}  userProfileServiceInstance
 * @return {boolean} true if the instance is valid
 * @throws If the instance is not valid
 */
function validate$4(userProfileServiceInstance) {
    if (typeof userProfileServiceInstance === 'object' && userProfileServiceInstance !== null) {
        if (typeof userProfileServiceInstance['lookup'] !== 'function') {
            throw new Error((0,_optimizely_js_sdk_utils__WEBPACK_IMPORTED_MODULE_1__.sprintf)(ERROR_MESSAGES.INVALID_USER_PROFILE_SERVICE, MODULE_NAME$b, "Missing function 'lookup'"));
        }
        else if (typeof userProfileServiceInstance['save'] !== 'function') {
            throw new Error((0,_optimizely_js_sdk_utils__WEBPACK_IMPORTED_MODULE_1__.sprintf)(ERROR_MESSAGES.INVALID_USER_PROFILE_SERVICE, MODULE_NAME$b, "Missing function 'save'"));
        }
        return true;
    }
    throw new Error((0,_optimizely_js_sdk_utils__WEBPACK_IMPORTED_MODULE_1__.sprintf)(ERROR_MESSAGES.INVALID_USER_PROFILE_SERVICE, MODULE_NAME$b));
}

var MODULE_NAME$c = 'OPTIMIZELY';
var DEFAULT_ONREADY_TIMEOUT = 30000;
var Optimizely = /** @class */ (function () {
    function Optimizely(config) {
        var _this = this;
        var _a;
        var clientEngine = config.clientEngine;
        if (!clientEngine) {
            config.logger.log(LOG_LEVEL.INFO, LOG_MESSAGES.INVALID_CLIENT_ENGINE, MODULE_NAME$c, clientEngine);
            clientEngine = NODE_CLIENT_ENGINE;
        }
        this.clientEngine = clientEngine;
        this.clientVersion = config.clientVersion || NODE_CLIENT_VERSION;
        this.errorHandler = config.errorHandler;
        this.isOptimizelyConfigValid = config.isValidInstance;
        this.logger = config.logger;
        var decideOptionsArray = (_a = config.defaultDecideOptions) !== null && _a !== void 0 ? _a : [];
        if (!Array.isArray(decideOptionsArray)) {
            this.logger.log(LOG_LEVEL.DEBUG, LOG_MESSAGES.INVALID_DEFAULT_DECIDE_OPTIONS, MODULE_NAME$c);
            decideOptionsArray = [];
        }
        var defaultDecideOptions = {};
        decideOptionsArray.forEach(function (option) {
            // Filter out all provided default decide options that are not in OptimizelyDecideOption[]
            if (OptimizelyDecideOption[option]) {
                defaultDecideOptions[option] = true;
            }
            else {
                _this.logger.log(LOG_LEVEL.WARNING, LOG_MESSAGES.UNRECOGNIZED_DECIDE_OPTION, MODULE_NAME$c, option);
            }
        });
        this.defaultDecideOptions = defaultDecideOptions;
        this.projectConfigManager = createProjectConfigManager({
            datafile: config.datafile,
            jsonSchemaValidator: config.jsonSchemaValidator,
            sdkKey: config.sdkKey,
            datafileManager: config.datafileManager
        });
        this.disposeOnUpdate = this.projectConfigManager.onUpdate(function (configObj) {
            _this.logger.log(LOG_LEVEL.INFO, LOG_MESSAGES.UPDATED_OPTIMIZELY_CONFIG, MODULE_NAME$c, configObj.revision, configObj.projectId);
            _this.notificationCenter.sendNotifications(NOTIFICATION_TYPES.OPTIMIZELY_CONFIG_UPDATE);
        });
        var projectConfigManagerReadyPromise = this.projectConfigManager.onReady();
        var userProfileService = null;
        if (config.userProfileService) {
            try {
                if (validate$4(config.userProfileService)) {
                    userProfileService = config.userProfileService;
                    this.logger.log(LOG_LEVEL.INFO, LOG_MESSAGES.VALID_USER_PROFILE_SERVICE, MODULE_NAME$c);
                }
            }
            catch (ex) {
                this.logger.log(LOG_LEVEL.WARNING, ex.message);
            }
        }
        this.decisionService = createDecisionService({
            userProfileService: userProfileService,
            logger: this.logger,
            UNSTABLE_conditionEvaluators: config.UNSTABLE_conditionEvaluators,
        });
        this.notificationCenter = config.notificationCenter;
        this.eventProcessor = config.eventProcessor;
        var eventProcessorStartedPromise = this.eventProcessor.start();
        this.readyPromise = Promise.all([projectConfigManagerReadyPromise, eventProcessorStartedPromise]).then(function (promiseResults) {
            // Only return status from project config promise because event processor promise does not return any status.
            return promiseResults[0];
        });
        this.readyTimeouts = {};
        this.nextReadyTimeoutId = 0;
    }
    /**
     * Returns a truthy value if this instance currently has a valid project config
     * object, and the initial configuration object that was passed into the
     * constructor was also valid.
     * @return {boolean}
     */
    Optimizely.prototype.isValidInstance = function () {
        return this.isOptimizelyConfigValid && !!this.projectConfigManager.getConfig();
    };
    /**
     * Buckets visitor and sends impression event to Optimizely.
     * @param  {string}             experimentKey
     * @param  {string}             userId
     * @param  {UserAttributes}     attributes
     * @return {string|null}        variation key
     */
    Optimizely.prototype.activate = function (experimentKey, userId, attributes) {
        try {
            if (!this.isValidInstance()) {
                this.logger.log(LOG_LEVEL.ERROR, LOG_MESSAGES.INVALID_OBJECT, MODULE_NAME$c, 'activate');
                return null;
            }
            if (!this.validateInputs({ experiment_key: experimentKey, user_id: userId }, attributes)) {
                return this.notActivatingExperiment(experimentKey, userId);
            }
            var configObj = this.projectConfigManager.getConfig();
            if (!configObj) {
                return null;
            }
            try {
                var variationKey = this.getVariation(experimentKey, userId, attributes);
                if (variationKey === null) {
                    return this.notActivatingExperiment(experimentKey, userId);
                }
                // If experiment is not set to 'Running' status, log accordingly and return variation key
                if (!isRunning(configObj, experimentKey)) {
                    this.logger.log(LOG_LEVEL.DEBUG, LOG_MESSAGES.SHOULD_NOT_DISPATCH_ACTIVATE, MODULE_NAME$c, experimentKey);
                    return variationKey;
                }
                var experiment = getExperimentFromKey(configObj, experimentKey);
                var variation = experiment.variationKeyMap[variationKey];
                var decisionObj = {
                    experiment: experiment,
                    variation: variation,
                    decisionSource: DECISION_SOURCES.EXPERIMENT
                };
                this.sendImpressionEvent(decisionObj, '', userId, true, attributes);
                return variationKey;
            }
            catch (ex) {
                this.logger.log(LOG_LEVEL.ERROR, ex.message);
                this.logger.log(LOG_LEVEL.INFO, LOG_MESSAGES.NOT_ACTIVATING_USER, MODULE_NAME$c, userId, experimentKey);
                this.errorHandler.handleError(ex);
                return null;
            }
        }
        catch (e) {
            this.logger.log(LOG_LEVEL.ERROR, e.message);
            this.errorHandler.handleError(e);
            return null;
        }
    };
    /**
     * Create an impression event and call the event dispatcher's dispatch method to
     * send this event to Optimizely. Then use the notification center to trigger
     * any notification listeners for the ACTIVATE notification type.
     * @param {DecisionObj}    decisionObj    Decision Object
     * @param {string}         flagKey        Key for a feature flag
     * @param {string}         userId         ID of user to whom the variation was shown
     * @param {UserAttributes} attributes     Optional user attributes
     * @param {boolean}        enabled        Boolean representing if feature is enabled
     */
    Optimizely.prototype.sendImpressionEvent = function (decisionObj, flagKey, userId, enabled, attributes) {
        var configObj = this.projectConfigManager.getConfig();
        if (!configObj) {
            return;
        }
        var impressionEvent = buildImpressionEvent({
            decisionObj: decisionObj,
            flagKey: flagKey,
            enabled: enabled,
            userId: userId,
            userAttributes: attributes,
            clientEngine: this.clientEngine,
            clientVersion: this.clientVersion,
            configObj: configObj,
        });
        // TODO is it okay to not pass a projectConfig as second argument
        this.eventProcessor.process(impressionEvent);
        this.emitNotificationCenterActivate(decisionObj, flagKey, userId, enabled, attributes);
    };
    /**
     * Emit the ACTIVATE notification on the notificationCenter
     * @param  {DecisionObj}    decisionObj    Decision object
     * @param  {string}         flagKey        Key for a feature flag
     * @param  {string}         userId         ID of user to whom the variation was shown
     * @param  {boolean}        enabled        Boolean representing if feature is enabled
     * @param  {UserAttributes} attributes     Optional user attributes
     */
    Optimizely.prototype.emitNotificationCenterActivate = function (decisionObj, flagKey, userId, enabled, attributes) {
        var configObj = this.projectConfigManager.getConfig();
        if (!configObj) {
            return;
        }
        var ruleType = decisionObj.decisionSource;
        var experimentKey = getExperimentKey(decisionObj);
        var experimentId = getExperimentId(decisionObj);
        var variationKey = getVariationKey(decisionObj);
        var variationId = getVariationId(decisionObj);
        var experiment;
        if (experimentId !== null && variationKey !== '') {
            experiment = configObj.experimentIdMap[experimentId];
        }
        var impressionEventOptions = {
            attributes: attributes,
            clientEngine: this.clientEngine,
            clientVersion: this.clientVersion,
            configObj: configObj,
            experimentId: experimentId,
            ruleKey: experimentKey,
            flagKey: flagKey,
            ruleType: ruleType,
            userId: userId,
            enabled: enabled,
            variationId: variationId,
            logger: this.logger,
        };
        var impressionEvent = getImpressionEvent(impressionEventOptions);
        var variation;
        if (experiment && experiment.variationKeyMap && variationKey !== '') {
            variation = experiment.variationKeyMap[variationKey];
        }
        this.notificationCenter.sendNotifications(NOTIFICATION_TYPES.ACTIVATE, {
            experiment: experiment,
            userId: userId,
            attributes: attributes,
            variation: variation,
            logEvent: impressionEvent,
        });
    };
    /**
     * Sends conversion event to Optimizely.
     * @param  {string}         eventKey
     * @param  {string}         userId
     * @param  {UserAttributes} attributes
     * @param  {EventTags}      eventTags Values associated with the event.
     */
    Optimizely.prototype.track = function (eventKey, userId, attributes, eventTags) {
        try {
            if (!this.isValidInstance()) {
                this.logger.log(LOG_LEVEL.ERROR, LOG_MESSAGES.INVALID_OBJECT, MODULE_NAME$c, 'track');
                return;
            }
            if (!this.validateInputs({ user_id: userId, event_key: eventKey }, attributes, eventTags)) {
                return;
            }
            var configObj = this.projectConfigManager.getConfig();
            if (!configObj) {
                return;
            }
            if (!eventWithKeyExists(configObj, eventKey)) {
                this.logger.log(LOG_LEVEL.WARNING, LOG_MESSAGES.EVENT_KEY_NOT_FOUND, MODULE_NAME$c, eventKey);
                this.logger.log(LOG_LEVEL.WARNING, LOG_MESSAGES.NOT_TRACKING_USER, MODULE_NAME$c, userId);
                return;
            }
            // remove null values from eventTags
            eventTags = this.filterEmptyValues(eventTags);
            var conversionEvent = buildConversionEvent({
                eventKey: eventKey,
                eventTags: eventTags,
                userId: userId,
                userAttributes: attributes,
                clientEngine: this.clientEngine,
                clientVersion: this.clientVersion,
                configObj: configObj,
            });
            this.logger.log(LOG_LEVEL.INFO, LOG_MESSAGES.TRACK_EVENT, MODULE_NAME$c, eventKey, userId);
            // TODO is it okay to not pass a projectConfig as second argument
            this.eventProcessor.process(conversionEvent);
            this.emitNotificationCenterTrack(eventKey, userId, attributes, eventTags);
        }
        catch (e) {
            this.logger.log(LOG_LEVEL.ERROR, e.message);
            this.errorHandler.handleError(e);
            this.logger.log(LOG_LEVEL.ERROR, LOG_MESSAGES.NOT_TRACKING_USER, MODULE_NAME$c, userId);
        }
    };
    /**
     * Send TRACK event to notificationCenter
     * @param  {string}         eventKey
     * @param  {string}         userId
     * @param  {UserAttributes} attributes
     * @param  {EventTags}      eventTags Values associated with the event.
     */
    Optimizely.prototype.emitNotificationCenterTrack = function (eventKey, userId, attributes, eventTags) {
        try {
            var configObj = this.projectConfigManager.getConfig();
            if (!configObj) {
                return;
            }
            var conversionEventOptions = {
                attributes: attributes,
                clientEngine: this.clientEngine,
                clientVersion: this.clientVersion,
                configObj: configObj,
                eventKey: eventKey,
                eventTags: eventTags,
                logger: this.logger,
                userId: userId,
            };
            var conversionEvent = getConversionEvent(conversionEventOptions);
            this.notificationCenter.sendNotifications(NOTIFICATION_TYPES.TRACK, {
                eventKey: eventKey,
                userId: userId,
                attributes: attributes,
                eventTags: eventTags,
                logEvent: conversionEvent,
            });
        }
        catch (ex) {
            this.logger.log(LOG_LEVEL.ERROR, ex.message);
            this.errorHandler.handleError(ex);
        }
    };
    /**
     * Gets variation where visitor will be bucketed.
     * @param  {string}              experimentKey
     * @param  {string}              userId
     * @param  {UserAttributes}      attributes
     * @return {string|null}         variation key
     */
    Optimizely.prototype.getVariation = function (experimentKey, userId, attributes) {
        try {
            if (!this.isValidInstance()) {
                this.logger.log(LOG_LEVEL.ERROR, LOG_MESSAGES.INVALID_OBJECT, MODULE_NAME$c, 'getVariation');
                return null;
            }
            try {
                if (!this.validateInputs({ experiment_key: experimentKey, user_id: userId }, attributes)) {
                    return null;
                }
                var configObj = this.projectConfigManager.getConfig();
                if (!configObj) {
                    return null;
                }
                var experiment = configObj.experimentKeyMap[experimentKey];
                if (!experiment) {
                    this.logger.log(LOG_LEVEL.DEBUG, ERROR_MESSAGES.INVALID_EXPERIMENT_KEY, MODULE_NAME$c, experimentKey);
                    return null;
                }
                var variationKey = this.decisionService.getVariation(configObj, experiment, this.createUserContext(userId, attributes)).result;
                var decisionNotificationType = isFeatureExperiment(configObj, experiment.id)
                    ? DECISION_NOTIFICATION_TYPES.FEATURE_TEST
                    : DECISION_NOTIFICATION_TYPES.AB_TEST;
                this.notificationCenter.sendNotifications(NOTIFICATION_TYPES.DECISION, {
                    type: decisionNotificationType,
                    userId: userId,
                    attributes: attributes || {},
                    decisionInfo: {
                        experimentKey: experimentKey,
                        variationKey: variationKey,
                    },
                });
                return variationKey;
            }
            catch (ex) {
                this.logger.log(LOG_LEVEL.ERROR, ex.message);
                this.errorHandler.handleError(ex);
                return null;
            }
        }
        catch (e) {
            this.logger.log(LOG_LEVEL.ERROR, e.message);
            this.errorHandler.handleError(e);
            return null;
        }
    };
    /**
     * Force a user into a variation for a given experiment.
     * @param  {string}      experimentKey
     * @param  {string}      userId
     * @param  {string|null} variationKey   user will be forced into. If null,
     *                                      then clear the existing experiment-to-variation mapping.
     * @return {boolean}                    A boolean value that indicates if the set completed successfully.
     */
    Optimizely.prototype.setForcedVariation = function (experimentKey, userId, variationKey) {
        if (!this.validateInputs({ experiment_key: experimentKey, user_id: userId })) {
            return false;
        }
        var configObj = this.projectConfigManager.getConfig();
        if (!configObj) {
            return false;
        }
        try {
            return this.decisionService.setForcedVariation(configObj, experimentKey, userId, variationKey);
        }
        catch (ex) {
            this.logger.log(LOG_LEVEL.ERROR, ex.message);
            this.errorHandler.handleError(ex);
            return false;
        }
    };
    /**
     * Gets the forced variation for a given user and experiment.
     * @param  {string}      experimentKey
     * @param  {string}      userId
     * @return {string|null} The forced variation key.
     */
    Optimizely.prototype.getForcedVariation = function (experimentKey, userId) {
        if (!this.validateInputs({ experiment_key: experimentKey, user_id: userId })) {
            return null;
        }
        var configObj = this.projectConfigManager.getConfig();
        if (!configObj) {
            return null;
        }
        try {
            return this.decisionService.getForcedVariation(configObj, experimentKey, userId).result;
        }
        catch (ex) {
            this.logger.log(LOG_LEVEL.ERROR, ex.message);
            this.errorHandler.handleError(ex);
            return null;
        }
    };
    /**
     * Validate string inputs, user attributes and event tags.
     * @param  {StringInputs}  stringInputs   Map of string keys and associated values
     * @param  {unknown}       userAttributes Optional parameter for user's attributes
     * @param  {unknown}       eventTags      Optional parameter for event tags
     * @return {boolean}                      True if inputs are valid
     *
     */
    Optimizely.prototype.validateInputs = function (stringInputs, userAttributes, eventTags) {
        try {
            if (stringInputs.hasOwnProperty('user_id')) {
                var userId = stringInputs['user_id'];
                if (typeof userId !== 'string' || userId === null || userId === 'undefined') {
                    throw new Error((0,_optimizely_js_sdk_utils__WEBPACK_IMPORTED_MODULE_1__.sprintf)(ERROR_MESSAGES.INVALID_INPUT_FORMAT, MODULE_NAME$c, 'user_id'));
                }
                delete stringInputs['user_id'];
            }
            Object.keys(stringInputs).forEach(function (key) {
                if (!validate$1(stringInputs[key])) {
                    throw new Error((0,_optimizely_js_sdk_utils__WEBPACK_IMPORTED_MODULE_1__.sprintf)(ERROR_MESSAGES.INVALID_INPUT_FORMAT, MODULE_NAME$c, key));
                }
            });
            if (userAttributes) {
                validate$2(userAttributes);
            }
            if (eventTags) {
                validate$3(eventTags);
            }
            return true;
        }
        catch (ex) {
            this.logger.log(LOG_LEVEL.ERROR, ex.message);
            this.errorHandler.handleError(ex);
            return false;
        }
    };
    /**
     * Shows failed activation log message and returns null when user is not activated in experiment
     * @param  {string} experimentKey
     * @param  {string} userId
     * @return {null}
     */
    Optimizely.prototype.notActivatingExperiment = function (experimentKey, userId) {
        this.logger.log(LOG_LEVEL.INFO, LOG_MESSAGES.NOT_ACTIVATING_USER, MODULE_NAME$c, userId, experimentKey);
        return null;
    };
    /**
     * Filters out attributes/eventTags with null or undefined values
     * @param   {EventTags | undefined} map
     * @returns {EventTags | undefined}
     */
    Optimizely.prototype.filterEmptyValues = function (map) {
        for (var key in map) {
            if (map.hasOwnProperty(key) && (map[key] === null || map[key] === undefined)) {
                delete map[key];
            }
        }
        return map;
    };
    /**
     * Returns true if the feature is enabled for the given user.
     * @param  {string}         featureKey   Key of feature which will be checked
     * @param  {string}         userId       ID of user which will be checked
     * @param  {UserAttributes} attributes   Optional user attributes
     * @return {boolean}                     true if the feature is enabled for the user, false otherwise
     */
    Optimizely.prototype.isFeatureEnabled = function (featureKey, userId, attributes) {
        try {
            if (!this.isValidInstance()) {
                this.logger.log(LOG_LEVEL.ERROR, LOG_MESSAGES.INVALID_OBJECT, MODULE_NAME$c, 'isFeatureEnabled');
                return false;
            }
            if (!this.validateInputs({ feature_key: featureKey, user_id: userId }, attributes)) {
                return false;
            }
            var configObj = this.projectConfigManager.getConfig();
            if (!configObj) {
                return false;
            }
            var feature = getFeatureFromKey(configObj, featureKey, this.logger);
            if (!feature) {
                return false;
            }
            var sourceInfo = {};
            var user = this.createUserContext(userId, attributes);
            var decisionObj = this.decisionService.getVariationForFeature(configObj, feature, user).result;
            var decisionSource = decisionObj.decisionSource;
            var experimentKey = getExperimentKey(decisionObj);
            var variationKey = getVariationKey(decisionObj);
            var featureEnabled = getFeatureEnabledFromVariation(decisionObj);
            if (decisionSource === DECISION_SOURCES.FEATURE_TEST) {
                sourceInfo = {
                    experimentKey: experimentKey,
                    variationKey: variationKey,
                };
            }
            if (decisionSource === DECISION_SOURCES.FEATURE_TEST ||
                decisionSource === DECISION_SOURCES.ROLLOUT && getSendFlagDecisionsValue(configObj)) {
                this.sendImpressionEvent(decisionObj, feature.key, userId, featureEnabled, attributes);
            }
            if (featureEnabled === true) {
                this.logger.log(LOG_LEVEL.INFO, LOG_MESSAGES.FEATURE_ENABLED_FOR_USER, MODULE_NAME$c, featureKey, userId);
            }
            else {
                this.logger.log(LOG_LEVEL.INFO, LOG_MESSAGES.FEATURE_NOT_ENABLED_FOR_USER, MODULE_NAME$c, featureKey, userId);
                featureEnabled = false;
            }
            var featureInfo = {
                featureKey: featureKey,
                featureEnabled: featureEnabled,
                source: decisionObj.decisionSource,
                sourceInfo: sourceInfo,
            };
            this.notificationCenter.sendNotifications(NOTIFICATION_TYPES.DECISION, {
                type: DECISION_NOTIFICATION_TYPES.FEATURE,
                userId: userId,
                attributes: attributes || {},
                decisionInfo: featureInfo,
            });
            return featureEnabled;
        }
        catch (e) {
            this.logger.log(LOG_LEVEL.ERROR, e.message);
            this.errorHandler.handleError(e);
            return false;
        }
    };
    /**
     * Returns an Array containing the keys of all features in the project that are
     * enabled for the given user.
     * @param  {string}         userId
     * @param  {UserAttributes} attributes
     * @return {string[]}       Array of feature keys (strings)
     */
    Optimizely.prototype.getEnabledFeatures = function (userId, attributes) {
        var _this = this;
        try {
            var enabledFeatures_1 = [];
            if (!this.isValidInstance()) {
                this.logger.log(LOG_LEVEL.ERROR, LOG_MESSAGES.INVALID_OBJECT, MODULE_NAME$c, 'getEnabledFeatures');
                return enabledFeatures_1;
            }
            if (!this.validateInputs({ user_id: userId })) {
                return enabledFeatures_1;
            }
            var configObj = this.projectConfigManager.getConfig();
            if (!configObj) {
                return enabledFeatures_1;
            }
            (0,_optimizely_js_sdk_utils__WEBPACK_IMPORTED_MODULE_1__.objectValues)(configObj.featureKeyMap).forEach(function (feature) {
                if (_this.isFeatureEnabled(feature.key, userId, attributes)) {
                    enabledFeatures_1.push(feature.key);
                }
            });
            return enabledFeatures_1;
        }
        catch (e) {
            this.logger.log(LOG_LEVEL.ERROR, e.message);
            this.errorHandler.handleError(e);
            return [];
        }
    };
    /**
     * Returns dynamically-typed value of the variable attached to the given
     * feature flag. Returns null if the feature key or variable key is invalid.
     *
     * @param  {string}          featureKey           Key of the feature whose variable's
     *                                                value is being accessed
     * @param  {string}          variableKey          Key of the variable whose value is
     *                                                being accessed
     * @param  {string}          userId               ID for the user
     * @param  {UserAttributes}  attributes           Optional user attributes
     * @return {unknown}                              Value of the variable cast to the appropriate
     *                                                type, or null if the feature key is invalid or
     *                                                the variable key is invalid
     */
    Optimizely.prototype.getFeatureVariable = function (featureKey, variableKey, userId, attributes) {
        try {
            if (!this.isValidInstance()) {
                this.logger.log(LOG_LEVEL.ERROR, LOG_MESSAGES.INVALID_OBJECT, MODULE_NAME$c, 'getFeatureVariable');
                return null;
            }
            return this.getFeatureVariableForType(featureKey, variableKey, null, userId, attributes);
        }
        catch (e) {
            this.logger.log(LOG_LEVEL.ERROR, e.message);
            this.errorHandler.handleError(e);
            return null;
        }
    };
    /**
     * Helper method to get the value for a variable of a certain type attached to a
     * feature flag. Returns null if the feature key is invalid, the variable key is
     * invalid, the given variable type does not match the variable's actual type,
     * or the variable value cannot be cast to the required type. If the given variable
     * type is null, the value of the variable cast to the appropriate type is returned.
     *
     * @param   {string}         featureKey           Key of the feature whose variable's value is
     *                                                being accessed
     * @param   {string}         variableKey          Key of the variable whose value is being
     *                                                accessed
     * @param   {string|null}    variableType         Type of the variable whose value is being
     *                                                accessed (must be one of FEATURE_VARIABLE_TYPES
     *                                                in lib/utils/enums/index.js), or null to return the
     *                                                value of the variable cast to the appropriate type
     * @param   {string}         userId               ID for the user
     * @param   {UserAttributes} attributes           Optional user attributes
     * @return  {unknown}                             Value of the variable cast to the appropriate
     *                                                type, or null if the feature key is invalid, thevariable
     *                                                key is invalid, or there is a mismatch with the type of
     *                                                the variable
     */
    Optimizely.prototype.getFeatureVariableForType = function (featureKey, variableKey, variableType, userId, attributes) {
        if (!this.validateInputs({ feature_key: featureKey, variable_key: variableKey, user_id: userId }, attributes)) {
            return null;
        }
        var configObj = this.projectConfigManager.getConfig();
        if (!configObj) {
            return null;
        }
        var featureFlag = getFeatureFromKey(configObj, featureKey, this.logger);
        if (!featureFlag) {
            return null;
        }
        var variable = getVariableForFeature(configObj, featureKey, variableKey, this.logger);
        if (!variable) {
            return null;
        }
        if (variableType && variable.type !== variableType) {
            this.logger.log(LOG_LEVEL.WARNING, LOG_MESSAGES.VARIABLE_REQUESTED_WITH_WRONG_TYPE, MODULE_NAME$c, variableType, variable.type);
            return null;
        }
        var user = this.createUserContext(userId, attributes);
        var decisionObj = this.decisionService.getVariationForFeature(configObj, featureFlag, user).result;
        var featureEnabled = getFeatureEnabledFromVariation(decisionObj);
        var variableValue = this.getFeatureVariableValueFromVariation(featureKey, featureEnabled, decisionObj.variation, variable, userId);
        var sourceInfo = {};
        if (decisionObj.decisionSource === DECISION_SOURCES.FEATURE_TEST &&
            decisionObj.experiment !== null &&
            decisionObj.variation !== null) {
            sourceInfo = {
                experimentKey: decisionObj.experiment.key,
                variationKey: decisionObj.variation.key,
            };
        }
        this.notificationCenter.sendNotifications(NOTIFICATION_TYPES.DECISION, {
            type: DECISION_NOTIFICATION_TYPES.FEATURE_VARIABLE,
            userId: userId,
            attributes: attributes || {},
            decisionInfo: {
                featureKey: featureKey,
                featureEnabled: featureEnabled,
                source: decisionObj.decisionSource,
                variableKey: variableKey,
                variableValue: variableValue,
                variableType: variable.type,
                sourceInfo: sourceInfo,
            },
        });
        return variableValue;
    };
    /**
     * Helper method to get the non type-casted value for a variable attached to a
     * feature flag. Returns appropriate variable value depending on whether there
     * was a matching variation, feature was enabled or not or varible was part of the
     * available variation or not. Also logs the appropriate message explaining how it
     * evaluated the value of the variable.
     *
     * @param  {string}          featureKey           Key of the feature whose variable's value is
     *                                                being accessed
     * @param  {boolean}         featureEnabled       Boolean indicating if feature is enabled or not
     * @param  {Variation}       variation            variation returned by decision service
     * @param  {FeatureVariable} variable             varible whose value is being evaluated
     * @param  {string}          userId               ID for the user
     * @return {unknown}                              Value of the variable or null if the
     *                                                config Obj is null
     */
    Optimizely.prototype.getFeatureVariableValueFromVariation = function (featureKey, featureEnabled, variation, variable, userId) {
        var configObj = this.projectConfigManager.getConfig();
        if (!configObj) {
            return null;
        }
        var variableValue = variable.defaultValue;
        if (variation !== null) {
            var value = getVariableValueForVariation(configObj, variable, variation, this.logger);
            if (value !== null) {
                if (featureEnabled) {
                    variableValue = value;
                    this.logger.log(LOG_LEVEL.INFO, LOG_MESSAGES.USER_RECEIVED_VARIABLE_VALUE, MODULE_NAME$c, variableValue, variable.key, featureKey);
                }
                else {
                    this.logger.log(LOG_LEVEL.INFO, LOG_MESSAGES.FEATURE_NOT_ENABLED_RETURN_DEFAULT_VARIABLE_VALUE, MODULE_NAME$c, featureKey, userId, variableValue);
                }
            }
            else {
                this.logger.log(LOG_LEVEL.INFO, LOG_MESSAGES.VARIABLE_NOT_USED_RETURN_DEFAULT_VARIABLE_VALUE, MODULE_NAME$c, variable.key, variation.key);
            }
        }
        else {
            this.logger.log(LOG_LEVEL.INFO, LOG_MESSAGES.USER_RECEIVED_DEFAULT_VARIABLE_VALUE, MODULE_NAME$c, userId, variable.key, featureKey);
        }
        return getTypeCastValue(variableValue, variable.type, this.logger);
    };
    /**
     * Returns value for the given boolean variable attached to the given feature
     * flag.
     * @param  {string}         featureKey   Key of the feature whose variable's value is
     *                                       being accessed
     * @param  {string}         variableKey  Key of the variable whose value is being
     *                                       accessed
     * @param  {string}         userId       ID for the user
     * @param  {UserAttributes} attributes   Optional user attributes
     * @return {boolean|null}                Boolean value of the variable, or null if the
     *                                       feature key is invalid, the variable key is invalid,
     *                                       or there is a mismatch with the type of the variable.
     */
    Optimizely.prototype.getFeatureVariableBoolean = function (featureKey, variableKey, userId, attributes) {
        try {
            if (!this.isValidInstance()) {
                this.logger.log(LOG_LEVEL.ERROR, LOG_MESSAGES.INVALID_OBJECT, MODULE_NAME$c, 'getFeatureVariableBoolean');
                return null;
            }
            return this.getFeatureVariableForType(featureKey, variableKey, FEATURE_VARIABLE_TYPES.BOOLEAN, userId, attributes);
        }
        catch (e) {
            this.logger.log(LOG_LEVEL.ERROR, e.message);
            this.errorHandler.handleError(e);
            return null;
        }
    };
    /**
     * Returns value for the given double variable attached to the given feature
     * flag.
     * @param  {string} featureKey           Key of the feature whose variable's value is
     *                                       being accessed
     * @param  {string} variableKey          Key of the variable whose value is being
     *                                       accessed
     * @param  {string} userId               ID for the user
     * @param  {UserAttributes} attributes   Optional user attributes
     * @return {number|null}                 Number value of the variable, or null if the
     *                                       feature key is invalid, the variable key is
     *                                       invalid, or there is a mismatch with the type
     *                                       of the variable
     */
    Optimizely.prototype.getFeatureVariableDouble = function (featureKey, variableKey, userId, attributes) {
        try {
            if (!this.isValidInstance()) {
                this.logger.log(LOG_LEVEL.ERROR, LOG_MESSAGES.INVALID_OBJECT, MODULE_NAME$c, 'getFeatureVariableDouble');
                return null;
            }
            return this.getFeatureVariableForType(featureKey, variableKey, FEATURE_VARIABLE_TYPES.DOUBLE, userId, attributes);
        }
        catch (e) {
            this.logger.log(LOG_LEVEL.ERROR, e.message);
            this.errorHandler.handleError(e);
            return null;
        }
    };
    /**
     * Returns value for the given integer variable attached to the given feature
     * flag.
     * @param  {string}         featureKey   Key of the feature whose variable's value is
     *                                       being accessed
     * @param  {string}         variableKey  Key of the variable whose value is being
     *                                       accessed
     * @param  {string}         userId       ID for the user
     * @param  {UserAttributes} attributes   Optional user attributes
     * @return {number|null}                 Number value of the variable, or null if the
     *                                       feature key is invalid, the variable key is
     *                                       invalid, or there is a mismatch with the type
     *                                       of the variable
     */
    Optimizely.prototype.getFeatureVariableInteger = function (featureKey, variableKey, userId, attributes) {
        try {
            if (!this.isValidInstance()) {
                this.logger.log(LOG_LEVEL.ERROR, LOG_MESSAGES.INVALID_OBJECT, MODULE_NAME$c, 'getFeatureVariableInteger');
                return null;
            }
            return this.getFeatureVariableForType(featureKey, variableKey, FEATURE_VARIABLE_TYPES.INTEGER, userId, attributes);
        }
        catch (e) {
            this.logger.log(LOG_LEVEL.ERROR, e.message);
            this.errorHandler.handleError(e);
            return null;
        }
    };
    /**
     * Returns value for the given string variable attached to the given feature
     * flag.
     * @param  {string}         featureKey   Key of the feature whose variable's value is
     *                                       being accessed
     * @param  {string}         variableKey  Key of the variable whose value is being
     *                                       accessed
     * @param  {string}         userId       ID for the user
     * @param  {UserAttributes} attributes   Optional user attributes
     * @return {string|null}                 String value of the variable, or null if the
     *                                       feature key is invalid, the variable key is
     *                                       invalid, or there is a mismatch with the type
     *                                       of the variable
     */
    Optimizely.prototype.getFeatureVariableString = function (featureKey, variableKey, userId, attributes) {
        try {
            if (!this.isValidInstance()) {
                this.logger.log(LOG_LEVEL.ERROR, LOG_MESSAGES.INVALID_OBJECT, MODULE_NAME$c, 'getFeatureVariableString');
                return null;
            }
            return this.getFeatureVariableForType(featureKey, variableKey, FEATURE_VARIABLE_TYPES.STRING, userId, attributes);
        }
        catch (e) {
            this.logger.log(LOG_LEVEL.ERROR, e.message);
            this.errorHandler.handleError(e);
            return null;
        }
    };
    /**
     * Returns value for the given json variable attached to the given feature
     * flag.
     * @param  {string}         featureKey   Key of the feature whose variable's value is
     *                                       being accessed
     * @param  {string}         variableKey  Key of the variable whose value is being
     *                                       accessed
     * @param  {string}         userId       ID for the user
     * @param  {UserAttributes} attributes   Optional user attributes
     * @return {unknown}                     Object value of the variable, or null if the
     *                                       feature key is invalid, the variable key is
     *                                       invalid, or there is a mismatch with the type
     *                                       of the variable
     */
    Optimizely.prototype.getFeatureVariableJSON = function (featureKey, variableKey, userId, attributes) {
        try {
            if (!this.isValidInstance()) {
                this.logger.log(LOG_LEVEL.ERROR, LOG_MESSAGES.INVALID_OBJECT, MODULE_NAME$c, 'getFeatureVariableJSON');
                return null;
            }
            return this.getFeatureVariableForType(featureKey, variableKey, FEATURE_VARIABLE_TYPES.JSON, userId, attributes);
        }
        catch (e) {
            this.logger.log(LOG_LEVEL.ERROR, e.message);
            this.errorHandler.handleError(e);
            return null;
        }
    };
    /**
     * Returns values for all the variables attached to the given feature
     * flag.
     * @param  {string}         featureKey   Key of the feature whose variables are being
     *                                       accessed
     * @param  {string}         userId       ID for the user
     * @param  {UserAttributes} attributes   Optional user attributes
     * @return {object|null}                 Object containing all the variables, or null if the
     *                                       feature key is invalid
     */
    Optimizely.prototype.getAllFeatureVariables = function (featureKey, userId, attributes) {
        var _this = this;
        try {
            if (!this.isValidInstance()) {
                this.logger.log(LOG_LEVEL.ERROR, LOG_MESSAGES.INVALID_OBJECT, MODULE_NAME$c, 'getAllFeatureVariables');
                return null;
            }
            if (!this.validateInputs({ feature_key: featureKey, user_id: userId }, attributes)) {
                return null;
            }
            var configObj = this.projectConfigManager.getConfig();
            if (!configObj) {
                return null;
            }
            var featureFlag = getFeatureFromKey(configObj, featureKey, this.logger);
            if (!featureFlag) {
                return null;
            }
            var user = this.createUserContext(userId, attributes);
            var decisionObj_1 = this.decisionService.getVariationForFeature(configObj, featureFlag, user).result;
            var featureEnabled_1 = getFeatureEnabledFromVariation(decisionObj_1);
            var allVariables_1 = {};
            featureFlag.variables.forEach(function (variable) {
                allVariables_1[variable.key] = _this.getFeatureVariableValueFromVariation(featureKey, featureEnabled_1, decisionObj_1.variation, variable, userId);
            });
            var sourceInfo = {};
            if (decisionObj_1.decisionSource === DECISION_SOURCES.FEATURE_TEST &&
                decisionObj_1.experiment !== null &&
                decisionObj_1.variation !== null) {
                sourceInfo = {
                    experimentKey: decisionObj_1.experiment.key,
                    variationKey: decisionObj_1.variation.key,
                };
            }
            this.notificationCenter.sendNotifications(NOTIFICATION_TYPES.DECISION, {
                type: DECISION_NOTIFICATION_TYPES.ALL_FEATURE_VARIABLES,
                userId: userId,
                attributes: attributes || {},
                decisionInfo: {
                    featureKey: featureKey,
                    featureEnabled: featureEnabled_1,
                    source: decisionObj_1.decisionSource,
                    variableValues: allVariables_1,
                    sourceInfo: sourceInfo,
                },
            });
            return allVariables_1;
        }
        catch (e) {
            this.logger.log(LOG_LEVEL.ERROR, e.message);
            this.errorHandler.handleError(e);
            return null;
        }
    };
    /**
     * Returns OptimizelyConfig object containing experiments and features data
     * @return {OptimizelyConfig|null}
     *
     * OptimizelyConfig Object Schema
     * {
     *   'experimentsMap': {
     *     'my-fist-experiment': {
     *       'id': '111111',
     *       'key': 'my-fist-experiment'
     *       'variationsMap': {
     *         'variation_1': {
     *           'id': '121212',
     *           'key': 'variation_1',
     *           'variablesMap': {
     *             'age': {
     *               'id': '222222',
     *               'key': 'age',
     *               'type': 'integer',
     *               'value': '0',
     *             }
     *           }
     *         }
     *       }
     *     }
     *   },
     *   'featuresMap': {
     *     'awesome-feature': {
     *       'id': '333333',
     *       'key': 'awesome-feature',
     *       'experimentsMap': Object,
     *       'variationsMap': Object,
     *     }
     *   }
     * }
     */
    Optimizely.prototype.getOptimizelyConfig = function () {
        try {
            var configObj = this.projectConfigManager.getConfig();
            if (!configObj) {
                return null;
            }
            return this.projectConfigManager.getOptimizelyConfig();
        }
        catch (e) {
            this.logger.log(LOG_LEVEL.ERROR, e.message);
            this.errorHandler.handleError(e);
            return null;
        }
    };
    /**
     * Stop background processes belonging to this instance, including:
     *
     * - Active datafile requests
     * - Pending datafile requests
     * - Pending event queue flushes
     *
     * In-flight datafile requests will be aborted. Any events waiting to be sent
     * as part of a batched event request will be immediately flushed to the event
     * dispatcher.
     *
     * Returns a Promise that fulfills after all in-flight event dispatcher requests
     * (including any final request resulting from flushing the queue as described
     * above) are complete. If there are no in-flight event dispatcher requests and
     * no queued events waiting to be sent, returns an immediately-fulfilled Promise.
     *
     * Returned Promises are fulfilled with result objects containing these
     * properties:
     *    - success (boolean): true if the event dispatcher signaled completion of
     *                         all in-flight and final requests, or if there were no
     *                         queued events and no in-flight requests. false if an
     *                         unexpected error was encountered during the close
     *                         process.
     *    - reason (string=):  If success is false, this is a string property with
     *                         an explanatory message.
     *
     * NOTE: After close is called, this instance is no longer usable - any events
     * generated will no longer be sent to the event dispatcher.
     *
     * @return {Promise}
     */
    Optimizely.prototype.close = function () {
        var _this = this;
        try {
            var eventProcessorStoppedPromise = this.eventProcessor.stop();
            if (this.disposeOnUpdate) {
                this.disposeOnUpdate();
                this.disposeOnUpdate = null;
            }
            if (this.projectConfigManager) {
                this.projectConfigManager.stop();
            }
            Object.keys(this.readyTimeouts).forEach(function (readyTimeoutId) {
                var readyTimeoutRecord = _this.readyTimeouts[readyTimeoutId];
                clearTimeout(readyTimeoutRecord.readyTimeout);
                readyTimeoutRecord.onClose();
            });
            this.readyTimeouts = {};
            return eventProcessorStoppedPromise.then(function () {
                return {
                    success: true,
                };
            }, function (err) {
                return {
                    success: false,
                    reason: String(err),
                };
            });
        }
        catch (err) {
            this.logger.log(LOG_LEVEL.ERROR, err.message);
            this.errorHandler.handleError(err);
            return Promise.resolve({
                success: false,
                reason: String(err),
            });
        }
    };
    /**
     * Returns a Promise that fulfills when this instance is ready to use (meaning
     * it has a valid datafile), or has failed to become ready within a period of
     * time (configurable by the timeout property of the options argument), or when
     * this instance is closed via the close method.
     *
     * If a valid datafile was provided in the constructor, the returned Promise is
     * immediately fulfilled. If an sdkKey was provided, a manager will be used to
     * fetch  a datafile, and the returned promise will fulfill if that fetch
     * succeeds or fails before the timeout. The default timeout is 30 seconds,
     * which will be used if no timeout is provided in the argument options object.
     *
     * The returned Promise is fulfilled with a result object containing these
     * properties:
     *    - success (boolean): True if this instance is ready to use with a valid
     *                         datafile, or false if this instance failed to become
     *                         ready or was closed prior to becoming ready.
     *    - reason (string=):  If success is false, this is a string property with
     *                         an explanatory message. Failure could be due to
     *                         expiration of the timeout, network errors,
     *                         unsuccessful responses, datafile parse errors,
     *                         datafile validation errors, or the instance being
     *                         closed
     * @param  {Object=}          options
     * @param  {number|undefined} options.timeout
     * @return {Promise}
     */
    Optimizely.prototype.onReady = function (options) {
        var _this = this;
        var timeoutValue;
        if (typeof options === 'object' && options !== null) {
            if (options.timeout !== undefined) {
                timeoutValue = options.timeout;
            }
        }
        if (!fns.isSafeInteger(timeoutValue)) {
            timeoutValue = DEFAULT_ONREADY_TIMEOUT;
        }
        var resolveTimeoutPromise;
        var timeoutPromise = new Promise(function (resolve) {
            resolveTimeoutPromise = resolve;
        });
        var timeoutId = this.nextReadyTimeoutId;
        this.nextReadyTimeoutId++;
        var onReadyTimeout = (function () {
            delete _this.readyTimeouts[timeoutId];
            resolveTimeoutPromise({
                success: false,
                reason: (0,_optimizely_js_sdk_utils__WEBPACK_IMPORTED_MODULE_1__.sprintf)('onReady timeout expired after %s ms', timeoutValue),
            });
        });
        var readyTimeout = setTimeout(onReadyTimeout, timeoutValue);
        var onClose = function () {
            resolveTimeoutPromise({
                success: false,
                reason: 'Instance closed',
            });
        };
        this.readyTimeouts[timeoutId] = {
            readyTimeout: readyTimeout,
            onClose: onClose,
        };
        this.readyPromise.then(function () {
            clearTimeout(readyTimeout);
            delete _this.readyTimeouts[timeoutId];
            resolveTimeoutPromise({
                success: true,
            });
        });
        return Promise.race([this.readyPromise, timeoutPromise]);
    };
    //============ decide ============//
    /**
     * Creates a context of the user for which decision APIs will be called.
     *
     * A user context will be created successfully even when the SDK is not fully configured yet, so no
     * this.isValidInstance() check is performed here.
     *
     * @param  {string}          userId      The user ID to be used for bucketing.
     * @param  {UserAttributes}  attributes  Optional user attributes.
     * @return {OptimizelyUserContext|null}  An OptimizelyUserContext associated with this OptimizelyClient or
     *                                       null if provided inputs are invalid
     */
    Optimizely.prototype.createUserContext = function (userId, attributes) {
        if (!this.validateInputs({ user_id: userId }, attributes)) {
            return null;
        }
        return new OptimizelyUserContext({
            optimizely: this,
            userId: userId,
            attributes: attributes
        });
    };
    Optimizely.prototype.decide = function (user, key, options) {
        var _this = this;
        var _a, _b, _c, _d;
        if (options === void 0) { options = []; }
        var userId = user.getUserId();
        var attributes = user.getAttributes();
        var configObj = this.projectConfigManager.getConfig();
        var reasons = [];
        var decisionObj;
        if (!this.isValidInstance() || !configObj) {
            this.logger.log(LOG_LEVEL.INFO, LOG_MESSAGES.INVALID_OBJECT, MODULE_NAME$c, 'decide');
            return newErrorDecision(key, user, [DECISION_MESSAGES.SDK_NOT_READY]);
        }
        var feature = configObj.featureKeyMap[key];
        if (!feature) {
            this.logger.log(LOG_LEVEL.ERROR, ERROR_MESSAGES.FEATURE_NOT_IN_DATAFILE, MODULE_NAME$c, key);
            return newErrorDecision(key, user, [(0,_optimizely_js_sdk_utils__WEBPACK_IMPORTED_MODULE_1__.sprintf)(DECISION_MESSAGES.FLAG_KEY_INVALID, key)]);
        }
        var allDecideOptions = this.getAllDecideOptions(options);
        var forcedDecisionResponse = this.decisionService.findValidatedForcedDecision(configObj, user, key);
        reasons.push.apply(reasons, forcedDecisionResponse.reasons);
        var variation = forcedDecisionResponse.result;
        if (variation) {
            decisionObj = {
                experiment: null,
                variation: variation,
                decisionSource: DECISION_SOURCES.FEATURE_TEST
            };
        }
        else {
            var decisionVariation = this.decisionService.getVariationForFeature(configObj, feature, user, allDecideOptions);
            reasons.push.apply(reasons, decisionVariation.reasons);
            decisionObj = decisionVariation.result;
        }
        var decisionSource = decisionObj.decisionSource;
        var experimentKey = (_b = (_a = decisionObj.experiment) === null || _a === void 0 ? void 0 : _a.key) !== null && _b !== void 0 ? _b : null;
        var variationKey = (_d = (_c = decisionObj.variation) === null || _c === void 0 ? void 0 : _c.key) !== null && _d !== void 0 ? _d : null;
        var flagEnabled = getFeatureEnabledFromVariation(decisionObj);
        if (flagEnabled === true) {
            this.logger.log(LOG_LEVEL.INFO, LOG_MESSAGES.FEATURE_ENABLED_FOR_USER, MODULE_NAME$c, key, userId);
        }
        else {
            this.logger.log(LOG_LEVEL.INFO, LOG_MESSAGES.FEATURE_NOT_ENABLED_FOR_USER, MODULE_NAME$c, key, userId);
        }
        var variablesMap = {};
        var decisionEventDispatched = false;
        if (!allDecideOptions[OptimizelyDecideOption.EXCLUDE_VARIABLES]) {
            feature.variables.forEach(function (variable) {
                variablesMap[variable.key] =
                    _this.getFeatureVariableValueFromVariation(key, flagEnabled, decisionObj.variation, variable, userId);
            });
        }
        if (!allDecideOptions[OptimizelyDecideOption.DISABLE_DECISION_EVENT] && (decisionSource === DECISION_SOURCES.FEATURE_TEST ||
            decisionSource === DECISION_SOURCES.ROLLOUT && getSendFlagDecisionsValue(configObj))) {
            this.sendImpressionEvent(decisionObj, key, userId, flagEnabled, attributes);
            decisionEventDispatched = true;
        }
        var shouldIncludeReasons = allDecideOptions[OptimizelyDecideOption.INCLUDE_REASONS];
        var reportedReasons = [];
        if (shouldIncludeReasons) {
            reportedReasons = reasons.map(function (reason) { return _optimizely_js_sdk_utils__WEBPACK_IMPORTED_MODULE_1__.sprintf.apply(void 0, __spreadArrays([reason[0]], reason.slice(1))); });
        }
        var featureInfo = {
            flagKey: key,
            enabled: flagEnabled,
            variationKey: variationKey,
            ruleKey: experimentKey,
            variables: variablesMap,
            reasons: reportedReasons,
            decisionEventDispatched: decisionEventDispatched,
        };
        this.notificationCenter.sendNotifications(NOTIFICATION_TYPES.DECISION, {
            type: DECISION_NOTIFICATION_TYPES.FLAG,
            userId: userId,
            attributes: attributes,
            decisionInfo: featureInfo,
        });
        return {
            variationKey: variationKey,
            enabled: flagEnabled,
            variables: variablesMap,
            ruleKey: experimentKey,
            flagKey: key,
            userContext: user,
            reasons: reportedReasons,
        };
    };
    /**
     * Get all decide options.
     * @param  {OptimizelyDecideOption[]}          options   decide options
     * @return {[key: string]: boolean}             Map of all provided decide options including default decide options
     */
    Optimizely.prototype.getAllDecideOptions = function (options) {
        var _this = this;
        var allDecideOptions = __assign({}, this.defaultDecideOptions);
        if (!Array.isArray(options)) {
            this.logger.log(LOG_LEVEL.DEBUG, LOG_MESSAGES.INVALID_DECIDE_OPTIONS, MODULE_NAME$c);
        }
        else {
            options.forEach(function (option) {
                // Filter out all provided decide options that are not in OptimizelyDecideOption[]
                if (OptimizelyDecideOption[option]) {
                    allDecideOptions[option] = true;
                }
                else {
                    _this.logger.log(LOG_LEVEL.WARNING, LOG_MESSAGES.UNRECOGNIZED_DECIDE_OPTION, MODULE_NAME$c, option);
                }
            });
        }
        return allDecideOptions;
    };
    /**
     * Returns an object of decision results for multiple flag keys and a user context.
     * If the SDK finds an error for a key, the response will include a decision for the key showing reasons for the error.
     * The SDK will always return an object of decisions. When it cannot process requests, it will return an empty object after logging the errors.
     * @param     {OptimizelyUserContext}      user        A user context associated with this OptimizelyClient
     * @param     {string[]}                   keys        An array of flag keys for which decisions will be made.
     * @param     {OptimizelyDecideOption[]}  options     An array of options for decision-making.
     * @return    {[key: string]: OptimizelyDecision}      An object of decision results mapped by flag keys.
     */
    Optimizely.prototype.decideForKeys = function (user, keys, options) {
        var _this = this;
        if (options === void 0) { options = []; }
        var decisionMap = {};
        if (!this.isValidInstance()) {
            this.logger.log(LOG_LEVEL.ERROR, LOG_MESSAGES.INVALID_OBJECT, MODULE_NAME$c, 'decideForKeys');
            return decisionMap;
        }
        if (keys.length === 0) {
            return decisionMap;
        }
        var allDecideOptions = this.getAllDecideOptions(options);
        keys.forEach(function (key) {
            var optimizelyDecision = _this.decide(user, key, options);
            if (!allDecideOptions[OptimizelyDecideOption.ENABLED_FLAGS_ONLY] || optimizelyDecision.enabled) {
                decisionMap[key] = optimizelyDecision;
            }
        });
        return decisionMap;
    };
    /**
     * Returns an object of decision results for all active flag keys.
     * @param     {OptimizelyUserContext}      user        A user context associated with this OptimizelyClient
     * @param     {OptimizelyDecideOption[]}  options     An array of options for decision-making.
     * @return    {[key: string]: OptimizelyDecision}      An object of all decision results mapped by flag keys.
     */
    Optimizely.prototype.decideAll = function (user, options) {
        if (options === void 0) { options = []; }
        var configObj = this.projectConfigManager.getConfig();
        var decisionMap = {};
        if (!this.isValidInstance() || !configObj) {
            this.logger.log(LOG_LEVEL.ERROR, LOG_MESSAGES.INVALID_OBJECT, MODULE_NAME$c, 'decideAll');
            return decisionMap;
        }
        var allFlagKeys = Object.keys(configObj.featureKeyMap);
        return this.decideForKeys(user, allFlagKeys, options);
    };
    return Optimizely;
}());

/**
 * Copyright 2020, Optimizely
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var MODULE_NAME$d = 'NOTIFICATION_CENTER';
/**
 * NotificationCenter allows registration and triggering of callback functions using
 * notification event types defined in NOTIFICATION_TYPES of utils/enums/index.js:
 * - ACTIVATE: An impression event will be sent to Optimizely.
 * - TRACK a conversion event will be sent to Optimizely
 */
var NotificationCenter = /** @class */ (function () {
    /**
     * @constructor
     * @param   {NotificationCenterOptions}  options
     * @param   {LogHandler}                 options.logger       An instance of a logger to log messages with
     * @param   {ErrorHandler}               options.errorHandler An instance of errorHandler to handle any unexpected error
     */
    function NotificationCenter(options) {
        var _this = this;
        this.logger = options.logger;
        this.errorHandler = options.errorHandler;
        this.notificationListeners = {};
        (0,_optimizely_js_sdk_utils__WEBPACK_IMPORTED_MODULE_1__.objectValues)(NOTIFICATION_TYPES).forEach(function (notificationTypeEnum) {
            _this.notificationListeners[notificationTypeEnum] = [];
        });
        this.listenerId = 1;
    }
    /**
     * Add a notification callback to the notification center
     * @param   {string}                   notificationType     One of the values from NOTIFICATION_TYPES in utils/enums/index.js
     * @param   {NotificationListener<T>}  callback             Function that will be called when the event is triggered
     * @returns {number}                   If the callback was successfully added, returns a listener ID which can be used
     * to remove the callback by calling removeNotificationListener. The ID is a number greater than 0.
     * If there was an error and the listener was not added, addNotificationListener returns -1. This
     * can happen if the first argument is not a valid notification type, or if the same callback
     * function was already added as a listener by a prior call to this function.
     */
    NotificationCenter.prototype.addNotificationListener = function (notificationType, callback) {
        try {
            var notificationTypeValues = (0,_optimizely_js_sdk_utils__WEBPACK_IMPORTED_MODULE_1__.objectValues)(NOTIFICATION_TYPES);
            var isNotificationTypeValid = notificationTypeValues.indexOf(notificationType) > -1;
            if (!isNotificationTypeValid) {
                return -1;
            }
            if (!this.notificationListeners[notificationType]) {
                this.notificationListeners[notificationType] = [];
            }
            var callbackAlreadyAdded_1 = false;
            (this.notificationListeners[notificationType] || []).forEach(function (listenerEntry) {
                if (listenerEntry.callback === callback) {
                    callbackAlreadyAdded_1 = true;
                    return;
                }
            });
            if (callbackAlreadyAdded_1) {
                return -1;
            }
            this.notificationListeners[notificationType].push({
                id: this.listenerId,
                callback: callback,
            });
            var returnId = this.listenerId;
            this.listenerId += 1;
            return returnId;
        }
        catch (e) {
            this.logger.log(LOG_LEVEL.ERROR, e.message);
            this.errorHandler.handleError(e);
            return -1;
        }
    };
    /**
     * Remove a previously added notification callback
     * @param   {number}                 listenerId ID of listener to be removed
     * @returns {boolean}                Returns true if the listener was found and removed, and false
     * otherwise.
     */
    NotificationCenter.prototype.removeNotificationListener = function (listenerId) {
        var _this = this;
        try {
            var indexToRemove_1;
            var typeToRemove_1;
            Object.keys(this.notificationListeners).some(function (notificationType) {
                var listenersForType = _this.notificationListeners[notificationType];
                (listenersForType || []).every(function (listenerEntry, i) {
                    if (listenerEntry.id === listenerId) {
                        indexToRemove_1 = i;
                        typeToRemove_1 = notificationType;
                        return false;
                    }
                    return true;
                });
                if (indexToRemove_1 !== undefined && typeToRemove_1 !== undefined) {
                    return true;
                }
                return false;
            });
            if (indexToRemove_1 !== undefined && typeToRemove_1 !== undefined) {
                this.notificationListeners[typeToRemove_1].splice(indexToRemove_1, 1);
                return true;
            }
        }
        catch (e) {
            this.logger.log(LOG_LEVEL.ERROR, e.message);
            this.errorHandler.handleError(e);
        }
        return false;
    };
    /**
     * Removes all previously added notification listeners, for all notification types
     */
    NotificationCenter.prototype.clearAllNotificationListeners = function () {
        var _this = this;
        try {
            (0,_optimizely_js_sdk_utils__WEBPACK_IMPORTED_MODULE_1__.objectValues)(NOTIFICATION_TYPES).forEach(function (notificationTypeEnum) {
                _this.notificationListeners[notificationTypeEnum] = [];
            });
        }
        catch (e) {
            this.logger.log(LOG_LEVEL.ERROR, e.message);
            this.errorHandler.handleError(e);
        }
    };
    /**
     * Remove all previously added notification listeners for the argument type
     * @param   {notificationTypesEnum}    notificationType One of NOTIFICATION_TYPES
     */
    NotificationCenter.prototype.clearNotificationListeners = function (notificationType) {
        try {
            this.notificationListeners[notificationType] = [];
        }
        catch (e) {
            this.logger.log(LOG_LEVEL.ERROR, e.message);
            this.errorHandler.handleError(e);
        }
    };
    /**
     * Fires notifications for the argument type. All registered callbacks for this type will be
     * called. The notificationData object will be passed on to callbacks called.
     * @param {string} notificationType One of NOTIFICATION_TYPES
     * @param {Object} notificationData Will be passed to callbacks called
     */
    NotificationCenter.prototype.sendNotifications = function (notificationType, notificationData) {
        var _this = this;
        try {
            (this.notificationListeners[notificationType] || []).forEach(function (listenerEntry) {
                var callback = listenerEntry.callback;
                try {
                    callback(notificationData);
                }
                catch (ex) {
                    _this.logger.log(LOG_LEVEL.ERROR, LOG_MESSAGES.NOTIFICATION_LISTENER_EXCEPTION, MODULE_NAME$d, notificationType, ex.message);
                }
            });
        }
        catch (e) {
            this.logger.log(LOG_LEVEL.ERROR, e.message);
            this.errorHandler.handleError(e);
        }
    };
    return NotificationCenter;
}());
/**
 * Create an instance of NotificationCenter
 * @param   {NotificationCenterOptions}   options
 * @returns {NotificationCenter}          An instance of NotificationCenter
 */
function createNotificationCenter(options) {
    return new NotificationCenter(options);
}

var ACTIVATE_EVENT_KEY$1 = 'campaign_activated';
var CUSTOM_ATTRIBUTE_FEATURE_TYPE$1 = 'custom';
var BOT_FILTERING_KEY = '$opt_bot_filtering';
/**
 * Given an array of batchable Decision or ConversionEvent events it returns
 * a single EventV1 with proper batching
 *
 * @param {ProcessableEvent[]} events
 * @returns {EventV1}
 */
function makeBatchedEventV1(events) {
    var visitors = [];
    var data = events[0];
    events.forEach(function (event) {
        if (event.type === 'conversion' || event.type === 'impression') {
            var visitor = makeVisitor(event);
            if (event.type === 'impression') {
                visitor.snapshots.push(makeDecisionSnapshot(event));
            }
            else if (event.type === 'conversion') {
                visitor.snapshots.push(makeConversionSnapshot(event));
            }
            visitors.push(visitor);
        }
    });
    return {
        client_name: data.context.clientName,
        client_version: data.context.clientVersion,
        account_id: data.context.accountId,
        project_id: data.context.projectId,
        revision: data.context.revision,
        anonymize_ip: data.context.anonymizeIP,
        enrich_decisions: true,
        visitors: visitors,
    };
}
function makeConversionSnapshot(conversion) {
    var tags = __assign({}, conversion.tags);
    delete tags['revenue'];
    delete tags['value'];
    var event = {
        entity_id: conversion.event.id,
        key: conversion.event.key,
        timestamp: conversion.timestamp,
        uuid: conversion.uuid,
    };
    if (conversion.tags) {
        event.tags = conversion.tags;
    }
    if (conversion.value != null) {
        event.value = conversion.value;
    }
    if (conversion.revenue != null) {
        event.revenue = conversion.revenue;
    }
    return {
        events: [event],
    };
}
function makeDecisionSnapshot(event) {
    var _a, _b;
    var layer = event.layer, experiment = event.experiment, variation = event.variation, ruleKey = event.ruleKey, flagKey = event.flagKey, ruleType = event.ruleType, enabled = event.enabled;
    var layerId = layer ? layer.id : null;
    var experimentId = (_a = experiment === null || experiment === void 0 ? void 0 : experiment.id) !== null && _a !== void 0 ? _a : '';
    var variationId = (_b = variation === null || variation === void 0 ? void 0 : variation.id) !== null && _b !== void 0 ? _b : '';
    var variationKey = variation ? variation.key : '';
    return {
        decisions: [
            {
                campaign_id: layerId,
                experiment_id: experimentId,
                variation_id: variationId,
                metadata: {
                    flag_key: flagKey,
                    rule_key: ruleKey,
                    rule_type: ruleType,
                    variation_key: variationKey,
                    enabled: enabled,
                },
            },
        ],
        events: [
            {
                entity_id: layerId,
                timestamp: event.timestamp,
                key: ACTIVATE_EVENT_KEY$1,
                uuid: event.uuid,
            },
        ],
    };
}
function makeVisitor(data) {
    var visitor = {
        snapshots: [],
        visitor_id: data.user.id,
        attributes: [],
    };
    data.user.attributes.forEach(function (attr) {
        visitor.attributes.push({
            entity_id: attr.entityId,
            key: attr.key,
            type: 'custom',
            value: attr.value,
        });
    });
    if (typeof data.context.botFiltering === 'boolean') {
        visitor.attributes.push({
            entity_id: BOT_FILTERING_KEY,
            key: BOT_FILTERING_KEY,
            type: CUSTOM_ATTRIBUTE_FEATURE_TYPE$1,
            value: data.context.botFiltering,
        });
    }
    return visitor;
}
function formatEvents(events) {
    return {
        url: 'https://logx.optimizely.com/v1/events',
        httpVerb: 'POST',
        params: makeBatchedEventV1(events),
    };
}

/**
 * Copyright 2021, Optimizely
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var ForwardingEventProcessor = /** @class */ (function () {
    function ForwardingEventProcessor(dispatcher, notificationCenter) {
        this.dispatcher = dispatcher;
        this.notificationCenter = notificationCenter;
    }
    ForwardingEventProcessor.prototype.process = function (event) {
        var formattedEvent = formatEvents([event]);
        this.dispatcher.dispatchEvent(formattedEvent, function () { });
        if (this.notificationCenter) {
            this.notificationCenter.sendNotifications(NOTIFICATION_TYPES.LOG_EVENT, formattedEvent);
        }
    };
    ForwardingEventProcessor.prototype.start = function () { };
    ForwardingEventProcessor.prototype.stop = function () {
        return Promise.resolve();
    };
    return ForwardingEventProcessor;
}());
function createForwardingEventProcessor(dispatcher, notificationCenter) {
    return new ForwardingEventProcessor(dispatcher, notificationCenter);
}

var NoOpDatafileManager = /** @class */ (function () {
    function NoOpDatafileManager() {
    }
    /* eslint-disable @typescript-eslint/no-unused-vars */
    NoOpDatafileManager.prototype.on = function (_eventName, _listener) {
        return function () { };
    };
    NoOpDatafileManager.prototype.get = function () {
        return '';
    };
    NoOpDatafileManager.prototype.onReady = function () {
        return Promise.resolve();
    };
    NoOpDatafileManager.prototype.start = function () { };
    NoOpDatafileManager.prototype.stop = function () {
        return Promise.resolve();
    };
    return NoOpDatafileManager;
}());
function createNoOpDatafileManager() {
    return new NoOpDatafileManager();
}

var logger$5 = (0,_optimizely_js_sdk_logging__WEBPACK_IMPORTED_MODULE_0__.getLogger)();
(0,_optimizely_js_sdk_logging__WEBPACK_IMPORTED_MODULE_0__.setLogHandler)(createLogger());
(0,_optimizely_js_sdk_logging__WEBPACK_IMPORTED_MODULE_0__.setLogLevel)(_optimizely_js_sdk_logging__WEBPACK_IMPORTED_MODULE_0__.LogLevel.ERROR);
/**
 * Creates an instance of the Optimizely class
 * @param  {SDKOptions} config
 * @return {Optimizely|null} the Optimizely object
 *                           null on error
 */
var createInstance = function (config) {
    try {
        // TODO warn about setting per instance errorHandler / logger / logLevel
        if (config.errorHandler) {
            (0,_optimizely_js_sdk_logging__WEBPACK_IMPORTED_MODULE_0__.setErrorHandler)(config.errorHandler);
        }
        if (config.logger) {
            (0,_optimizely_js_sdk_logging__WEBPACK_IMPORTED_MODULE_0__.setLogHandler)(config.logger);
            // respect the logger's shouldLog functionality
            (0,_optimizely_js_sdk_logging__WEBPACK_IMPORTED_MODULE_0__.setLogLevel)(_optimizely_js_sdk_logging__WEBPACK_IMPORTED_MODULE_0__.LogLevel.NOTSET);
        }
        if (config.logLevel !== undefined) {
            (0,_optimizely_js_sdk_logging__WEBPACK_IMPORTED_MODULE_0__.setLogLevel)(config.logLevel);
        }
        try {
            configValidator.validate(config);
            config.isValidInstance = true;
        }
        catch (ex) {
            logger$5.error(ex);
            config.isValidInstance = false;
        }
        var errorHandler = (0,_optimizely_js_sdk_logging__WEBPACK_IMPORTED_MODULE_0__.getErrorHandler)();
        var notificationCenter = createNotificationCenter({ logger: logger$5, errorHandler: errorHandler });
        var eventDispatcher = config.eventDispatcher || noOpEventDispatcher;
        var eventProcessor = createForwardingEventProcessor(eventDispatcher, notificationCenter);
        var optimizelyOptions = __assign(__assign({ clientEngine: JAVASCRIPT_CLIENT_ENGINE }, config), { logger: logger$5,
            errorHandler: errorHandler, datafileManager: createNoOpDatafileManager(), eventProcessor: eventProcessor,
            notificationCenter: notificationCenter });
        var optimizely = new Optimizely(optimizelyOptions);
        return optimizely;
    }
    catch (e) {
        logger$5.error(e);
        return null;
    }
};
var index_lite = {
    logging: loggerPlugin,
    errorHandler: defaultErrorHandler,
    eventDispatcher: noOpEventDispatcher,
    enums: enums,
    setLogger: _optimizely_js_sdk_logging__WEBPACK_IMPORTED_MODULE_0__.setLogHandler,
    setLogLevel: _optimizely_js_sdk_logging__WEBPACK_IMPORTED_MODULE_0__.setLogLevel,
    createInstance: createInstance,
    OptimizelyDecideOption: OptimizelyDecideOption,
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (index_lite);

//# sourceMappingURL=optimizely.lite.es.js.map


/***/ }),

/***/ "./node_modules/.pnpm/murmurhash@0.0.2/node_modules/murmurhash/murmurhash.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/.pnpm/murmurhash@0.0.2/node_modules/murmurhash/murmurhash.js ***!
  \***********************************************************************************/
/***/ ((module) => {

(function(){
  var _global = this;

  /**
   * JS Implementation of MurmurHash2
   *
   * @author <a href="mailto:gary.court@gmail.com">Gary Court</a>
   * @see http://github.com/garycourt/murmurhash-js
   * @author <a href="mailto:aappleby@gmail.com">Austin Appleby</a>
   * @see http://sites.google.com/site/murmurhash/
   *
   * @param {string} str ASCII only
   * @param {number} seed Positive integer only
   * @return {number} 32-bit positive integer hash
   */
  function MurmurHashV2(str, seed) {
    var
      l = str.length,
      h = seed ^ l,
      i = 0,
      k;

    while (l >= 4) {
      k =
        ((str.charCodeAt(i) & 0xff)) |
        ((str.charCodeAt(++i) & 0xff) << 8) |
        ((str.charCodeAt(++i) & 0xff) << 16) |
        ((str.charCodeAt(++i) & 0xff) << 24);

      k = (((k & 0xffff) * 0x5bd1e995) + ((((k >>> 16) * 0x5bd1e995) & 0xffff) << 16));
      k ^= k >>> 24;
      k = (((k & 0xffff) * 0x5bd1e995) + ((((k >>> 16) * 0x5bd1e995) & 0xffff) << 16));

    h = (((h & 0xffff) * 0x5bd1e995) + ((((h >>> 16) * 0x5bd1e995) & 0xffff) << 16)) ^ k;

      l -= 4;
      ++i;
    }

    switch (l) {
    case 3: h ^= (str.charCodeAt(i + 2) & 0xff) << 16;
    case 2: h ^= (str.charCodeAt(i + 1) & 0xff) << 8;
    case 1: h ^= (str.charCodeAt(i) & 0xff);
            h = (((h & 0xffff) * 0x5bd1e995) + ((((h >>> 16) * 0x5bd1e995) & 0xffff) << 16));
    }

    h ^= h >>> 13;
    h = (((h & 0xffff) * 0x5bd1e995) + ((((h >>> 16) * 0x5bd1e995) & 0xffff) << 16));
    h ^= h >>> 15;

    return h >>> 0;
  };

  /**
   * JS Implementation of MurmurHash3 (r136) (as of May 20, 2011)
   *
   * @author <a href="mailto:gary.court@gmail.com">Gary Court</a>
   * @see http://github.com/garycourt/murmurhash-js
   * @author <a href="mailto:aappleby@gmail.com">Austin Appleby</a>
   * @see http://sites.google.com/site/murmurhash/
   *
   * @param {string} key ASCII only
   * @param {number} seed Positive integer only
   * @return {number} 32-bit positive integer hash
   */
  function MurmurHashV3(key, seed) {
    var remainder, bytes, h1, h1b, c1, c1b, c2, c2b, k1, i;

    remainder = key.length & 3; // key.length % 4
    bytes = key.length - remainder;
    h1 = seed;
    c1 = 0xcc9e2d51;
    c2 = 0x1b873593;
    i = 0;

    while (i < bytes) {
        k1 =
          ((key.charCodeAt(i) & 0xff)) |
          ((key.charCodeAt(++i) & 0xff) << 8) |
          ((key.charCodeAt(++i) & 0xff) << 16) |
          ((key.charCodeAt(++i) & 0xff) << 24);
      ++i;

      k1 = ((((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16))) & 0xffffffff;
      k1 = (k1 << 15) | (k1 >>> 17);
      k1 = ((((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16))) & 0xffffffff;

      h1 ^= k1;
          h1 = (h1 << 13) | (h1 >>> 19);
      h1b = ((((h1 & 0xffff) * 5) + ((((h1 >>> 16) * 5) & 0xffff) << 16))) & 0xffffffff;
      h1 = (((h1b & 0xffff) + 0x6b64) + ((((h1b >>> 16) + 0xe654) & 0xffff) << 16));
    }

    k1 = 0;

    switch (remainder) {
      case 3: k1 ^= (key.charCodeAt(i + 2) & 0xff) << 16;
      case 2: k1 ^= (key.charCodeAt(i + 1) & 0xff) << 8;
      case 1: k1 ^= (key.charCodeAt(i) & 0xff);

      k1 = (((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16)) & 0xffffffff;
      k1 = (k1 << 15) | (k1 >>> 17);
      k1 = (((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16)) & 0xffffffff;
      h1 ^= k1;
    }

    h1 ^= key.length;

    h1 ^= h1 >>> 16;
    h1 = (((h1 & 0xffff) * 0x85ebca6b) + ((((h1 >>> 16) * 0x85ebca6b) & 0xffff) << 16)) & 0xffffffff;
    h1 ^= h1 >>> 13;
    h1 = ((((h1 & 0xffff) * 0xc2b2ae35) + ((((h1 >>> 16) * 0xc2b2ae35) & 0xffff) << 16))) & 0xffffffff;
    h1 ^= h1 >>> 16;

    return h1 >>> 0;
  }

  var murmur = MurmurHashV3;
  murmur.v2 = MurmurHashV2;
  murmur.v3 = MurmurHashV3;

  if (true) {
    module.exports = murmur;
  } else { var _previousRoot; }
}());


/***/ }),

/***/ "./src/optimizely_helper.ts":
/*!**********************************!*\
  !*** ./src/optimizely_helper.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dispatchEvent": () => (/* binding */ dispatchEvent),
/* harmony export */   "getDatafile": () => (/* binding */ getDatafile)
/* harmony export */ });
/* harmony import */ var http_request__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! http-request */ "http-request");
/**
 *    Copyright 2022, Optimizely and contributors
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */

async function getDatafile(sdkKey) {
    let datafile = '';
    // Akamai edgeworkers do not provide a way to cache the response through code.
    // In order to cache, make sure to enable caching to outgoing request from Akamai control panel
    // https://techdocs.akamai.com/purge-cache/docs/cache-strategies
    const datafileResponse = await (0,http_request__WEBPACK_IMPORTED_MODULE_0__.httpRequest)(`https://cdn.optimizely.com/datafiles/${sdkKey}.json`);
    if (datafileResponse.ok) {
        datafile = await datafileResponse.json();
    }
    return datafile;
}
async function dispatchEvent(payload) {
    const eventResponse = await (0,http_request__WEBPACK_IMPORTED_MODULE_0__.httpRequest)('https://ew.logx.optimizely.com/v1/events', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Content-Length": payload.length,
        },
        body: payload,
    });
    return eventResponse.status;
}


/***/ }),

/***/ "../common.ts":
/*!********************!*\
  !*** ../common.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "COUNTRY_KEY": () => (/* binding */ COUNTRY_KEY),
/* harmony export */   "EXPERIMENT_EXPERIMENT_KEY": () => (/* binding */ EXPERIMENT_EXPERIMENT_KEY),
/* harmony export */   "OPTIMIZELY_SDK_KEY": () => (/* binding */ OPTIMIZELY_SDK_KEY),
/* harmony export */   "OPTIMIZELY_VISITOR_KEY": () => (/* binding */ OPTIMIZELY_VISITOR_KEY),
/* harmony export */   "SALEOR_URL": () => (/* binding */ SALEOR_URL),
/* harmony export */   "WATCH_IMG": () => (/* binding */ WATCH_IMG)
/* harmony export */ });
const OPTIMIZELY_VISITOR_KEY = "optimizely_visitor_id";
const EXPERIMENT_EXPERIMENT_KEY = "new_page_layout";
const COUNTRY_KEY = "new_page_layout";
const OPTIMIZELY_SDK_KEY = "V6gUpRk4RCpfxUYeFLEKe";
const WATCH_IMG = "https://www-breitling-int.eu.saleor.cloud/media/thumbnails/products/ab01762a1l1x1-top-time-b01-ford-mustang-soldier_b90db6fe_thumbnail_1024.avif";
const SALEOR_URL = "https://www-breitling-int.eu.saleor.cloud";


/***/ }),

/***/ "./node_modules/.pnpm/uuid@3.4.0/node_modules/uuid/index.js":
/*!******************************************************************!*\
  !*** ./node_modules/.pnpm/uuid@3.4.0/node_modules/uuid/index.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var v1 = __webpack_require__(/*! ./v1 */ "./node_modules/.pnpm/uuid@3.4.0/node_modules/uuid/v1.js");
var v4 = __webpack_require__(/*! ./v4 */ "./node_modules/.pnpm/uuid@3.4.0/node_modules/uuid/v4.js");

var uuid = v4;
uuid.v1 = v1;
uuid.v4 = v4;

module.exports = uuid;


/***/ }),

/***/ "./node_modules/.pnpm/uuid@3.4.0/node_modules/uuid/lib/bytesToUuid.js":
/*!****************************************************************************!*\
  !*** ./node_modules/.pnpm/uuid@3.4.0/node_modules/uuid/lib/bytesToUuid.js ***!
  \****************************************************************************/
/***/ ((module) => {

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
  return ([
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]]
  ]).join('');
}

module.exports = bytesToUuid;


/***/ }),

/***/ "./node_modules/.pnpm/uuid@3.4.0/node_modules/uuid/lib/rng-browser.js":
/*!****************************************************************************!*\
  !*** ./node_modules/.pnpm/uuid@3.4.0/node_modules/uuid/lib/rng-browser.js ***!
  \****************************************************************************/
/***/ ((module) => {

// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection

// getRandomValues needs to be invoked in a context where "this" is a Crypto
// implementation. Also, find the complete implementation of crypto on IE11.
var getRandomValues = (typeof(crypto) != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto)) ||
                      (typeof(msCrypto) != 'undefined' && typeof window.msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto));

if (getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef

  module.exports = function whatwgRNG() {
    getRandomValues(rnds8);
    return rnds8;
  };
} else {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);

  module.exports = function mathRNG() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}


/***/ }),

/***/ "./node_modules/.pnpm/uuid@3.4.0/node_modules/uuid/v1.js":
/*!***************************************************************!*\
  !*** ./node_modules/.pnpm/uuid@3.4.0/node_modules/uuid/v1.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var rng = __webpack_require__(/*! ./lib/rng */ "./node_modules/.pnpm/uuid@3.4.0/node_modules/uuid/lib/rng-browser.js");
var bytesToUuid = __webpack_require__(/*! ./lib/bytesToUuid */ "./node_modules/.pnpm/uuid@3.4.0/node_modules/uuid/lib/bytesToUuid.js");

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

var _nodeId;
var _clockseq;

// Previous uuid creation time
var _lastMSecs = 0;
var _lastNSecs = 0;

// See https://github.com/uuidjs/uuid for API details
function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];

  options = options || {};
  var node = options.node || _nodeId;
  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

  // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189
  if (node == null || clockseq == null) {
    var seedBytes = rng();
    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [
        seedBytes[0] | 0x01,
        seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]
      ];
    }
    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  }

  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

  // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock
  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

  // Time since last uuid creation (in msecs)
  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

  // Per 4.2.1.2, Bump clockseq on clock regression
  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  }

  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  }

  // Per 4.2.1.2 Throw error if too many uuids are requested
  if (nsecs >= 10000) {
    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;

  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
  msecs += 12219292800000;

  // `time_low`
  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff;

  // `time_mid`
  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff;

  // `time_high_and_version`
  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
  b[i++] = tmh >>> 16 & 0xff;

  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
  b[i++] = clockseq >>> 8 | 0x80;

  // `clock_seq_low`
  b[i++] = clockseq & 0xff;

  // `node`
  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf ? buf : bytesToUuid(b);
}

module.exports = v1;


/***/ }),

/***/ "./node_modules/.pnpm/uuid@3.4.0/node_modules/uuid/v4.js":
/*!***************************************************************!*\
  !*** ./node_modules/.pnpm/uuid@3.4.0/node_modules/uuid/v4.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var rng = __webpack_require__(/*! ./lib/rng */ "./node_modules/.pnpm/uuid@3.4.0/node_modules/uuid/lib/rng-browser.js");
var bytesToUuid = __webpack_require__(/*! ./lib/bytesToUuid */ "./node_modules/.pnpm/uuid@3.4.0/node_modules/uuid/lib/bytesToUuid.js");

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options === 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid(rnds);
}

module.exports = v4;


/***/ }),

/***/ "cookies":
/*!**************************!*\
  !*** external "cookies" ***!
  \**************************/
/***/ ((module) => {

var x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var y = x => () => x
module.exports = __WEBPACK_EXTERNAL_MODULE_cookies__;

/***/ }),

/***/ "http-request":
/*!*******************************!*\
  !*** external "http-request" ***!
  \*******************************/
/***/ ((module) => {

var x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var y = x => () => x
module.exports = __WEBPACK_EXTERNAL_MODULE_http_request_b4b0d76d__;

/***/ }),

/***/ "log":
/*!**********************!*\
  !*** external "log" ***!
  \**********************/
/***/ ((module) => {

var x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var y = x => () => x
module.exports = __WEBPACK_EXTERNAL_MODULE_log__;

/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/compat get default export */
/******/ (() => {
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = (module) => {
/******/ 		var getter = module && module.__esModule ?
/******/ 			() => (module['default']) :
/******/ 			() => (module);
/******/ 		__webpack_require__.d(getter, { a: getter });
/******/ 		return getter;
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generateRandomUserId": () => (/* binding */ generateRandomUserId),
/* harmony export */   "onClientRequest": () => (/* binding */ onClientRequest),
/* harmony export */   "onClientResponse": () => (/* binding */ onClientResponse)
/* harmony export */ });
/* harmony import */ var log__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! log */ "log");
/* harmony import */ var cookies__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cookies */ "cookies");
/* harmony import */ var _optimizely_optimizely_sdk_dist_optimizely_lite_es__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @optimizely/optimizely-sdk/dist/optimizely.lite.es */ "./node_modules/.pnpm/@optimizely+optimizely-sdk@4.9.1/node_modules/@optimizely/optimizely-sdk/dist/optimizely.lite.es.js");
/* harmony import */ var _optimizely_helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./optimizely_helper */ "./src/optimizely_helper.ts");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../common */ "../common.ts");
/**
 *    Copyright 2022, Optimizely and contributors
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */





const AKAMAI_CLIENT_ENGINE = "javascript-sdk/akamai-edgeworker";
// https://techdocs.akamai.com/edgeworkers/docs/request-object#setvariable
const VARIABLE_NAME_USER_ID = `PMUSER_${_common__WEBPACK_IMPORTED_MODULE_4__.OPTIMIZELY_VISITOR_KEY}`;
const VARIABLE_NAME_EXPERIMENT_KEY = `PMUSER_${_common__WEBPACK_IMPORTED_MODULE_4__.EXPERIMENT_EXPERIMENT_KEY}`;
const VARIABLE_NAME_DECISION_EVENT = "PMUSER_OPTIMIZELY_DECISION_EVENT";
const VARIABLE_USER_NAME_COUNTRY = "PMUSER_USER_COUNTRY";
const SHOULD_DISPATCH_EVENT = false;
let logStash = [];
/**
 * Generates a unique 16 digit user id for demo purpose. For production use, please use user Ids from your system
 * or autogenerate a uuid using a standard library such as https://www.npmjs.com/package/uuid.
 *
 * Attribution:
 * This unique id generation function was taken from a Stack Overflow question and modified to fit our use case.
 * https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid
 * This is the answer that was used
 * https://stackoverflow.com/a/21963136
 * Question by Jason Cohen:
 * https://stackoverflow.com/users/4926/jason-cohen
 * Answer by Jeff Ward:
 * https://stackoverflow.com/users/1026023/jeff-ward
 */
var lut = [];
for (var i = 0; i < 256; i++) {
    lut[i] = (i < 16 ? "0" : "") + i.toString(16);
}
function generateRandomUserId() {
    var d0 = (Math.random() * 0xffffffff) | 0;
    var d1 = (Math.random() * 0xffffffff) | 0;
    return (lut[d0 & 0xff] +
        lut[(d0 >> 8) & 0xff] +
        "-" +
        lut[(d0 >> 16) & 0xff] +
        lut[(d0 >> 24) & 0xff] +
        "-" +
        lut[d1 & 0xff] +
        lut[(d1 >> 8) & 0xff] +
        "-" +
        lut[((d1 >> 16) & 0x0f) | 0x40] +
        lut[(d1 >> 24) & 0xff]);
}
// Helper function to log to the debug logger and print to the response body.
function logAndPrint(message) {
    logStash.push(message);
    log__WEBPACK_IMPORTED_MODULE_0__.logger.log(message);
}
/**
 * 1. Fetch the optimizely datafile based on the given sdk key.
 * 2. Read the user id from the cookie if available to enable sticky bucketing or generate a new one to be saved to the cookie.
 * 3. Create an optimizely instance.
 * 4. Access optimizelyConfig object and print datafile revision number.
 * 5. Get a decision for a specific flag and dispatch logx event.
 * 6. Get decisions for all the available flags.
 */
async function onClientRequest(request) {
    logStash = [];
    if (request.path !== "/akamai/") {
        return;
    }
    let cookies = new cookies__WEBPACK_IMPORTED_MODULE_1__.Cookies(request.getHeader("Cookie"));
    // Fetch user Id from the cookie if available to make sure that a returning user from same browser session always sees the same variation.
    const userId = cookies.get(_common__WEBPACK_IMPORTED_MODULE_4__.OPTIMIZELY_VISITOR_KEY) || generateRandomUserId();
    // onClientRequest handler does not allow setting the cookie. Saving the user id in a variable
    // to be retrieved and set when onClientResponse handler is executed later on.
    request.setVariable(VARIABLE_NAME_USER_ID, userId);
    // Add your SDK here.
    const datafile = await (0,_optimizely_helper__WEBPACK_IMPORTED_MODULE_3__.getDatafile)(_common__WEBPACK_IMPORTED_MODULE_4__.OPTIMIZELY_SDK_KEY);
    if (datafile === "") {
        logAndPrint(`[optimizely] Failed to fetch the datafile, please check the optimizely sdk key`);
        sendGenericReponse(request, logStash, "Failed to fetch the datafile, please check the optimizely sdk key.");
        return;
    }
    // Creating an optimizely SDK instance.
    const optimizelyClient = (0,_optimizely_optimizely_sdk_dist_optimizely_lite_es__WEBPACK_IMPORTED_MODULE_2__.createInstance)({
        datafile,
        // keep the LOG_LEVEL to ERROR in production. Setting LOG_LEVEL to INFO or DEBUG can adversely impact performance.
        logLevel: _optimizely_optimizely_sdk_dist_optimizely_lite_es__WEBPACK_IMPORTED_MODULE_2__.enums.LOG_LEVEL.ERROR,
        clientEngine: AKAMAI_CLIENT_ENGINE,
        /* Add other Optimizely SDK initialization options here if needed */
    });
    const optimizelyUserContext = optimizelyClient.createUserContext(userId, {
    /* YOUR_OPTIONAL_ATTRIBUTES_HERE */
    });
    if (SHOULD_DISPATCH_EVENT) {
        logAndPrint("[optimizely] Adding a Notification Listener to Capture Event Payload");
        // The default event dispatching mechanism of optimizely SDK does not work with Akamai edgeworker because it does not support
        // sending out more than one http sub request in onClientRequest handler. Optimizely SDK lets you add a notification listener
        // that can notify when an event is logged. This peice of code is capturing the event payload and storing it in to akamai variable
        // which will be later used in onClientResponse handler to dispatch the event to optimizely logx backend.
        console.error("I'm not handled");
        // FIXME: Types apparently do not cover with the example
        // optimizelyClient.notificationCenter.addNotificationListener(
        //   OptimizelyEnums.NOTIFICATION_TYPES.LOG_EVENT,
        //   ({ params }) => {
        //     // Set event payload in Akamai variable.
        //     request.setVariable(
        //       VARIABLE_NAME_DECISION_EVENT,
        //       JSON.stringify(params)
        //     );
        //   }
        // );
    }
    // --- Using Optimizely Config
    const optimizelyConfig = optimizelyClient.getOptimizelyConfig();
    logAndPrint(`[optimizely] Datafile Revision: ${optimizelyConfig.revision}`);
    // --- For a single flag --- //
    const decision = optimizelyUserContext.decide(_common__WEBPACK_IMPORTED_MODULE_4__.EXPERIMENT_EXPERIMENT_KEY);
    let path;
    if (decision.enabled) {
        path = "/akamai/b/";
        logAndPrint(`[optimizely] The Flag ${decision.flagKey} was Enabled for the user ${decision.userContext.getUserId()}`);
    }
    else {
        path = "/akamai/a/";
        logAndPrint(`[optimizely] The Flag ${decision.flagKey} was Not Enabled for the user ${decision.userContext.getUserId()}`);
    }
    request.setVariable(VARIABLE_NAME_EXPERIMENT_KEY, decision.enabled.toString());
    request.setVariable(VARIABLE_USER_NAME_COUNTRY, request.userLocation.country);
    // Clearing notification listener so that it does not call the hanlder above for all other decisions.
    optimizelyClient.notificationCenter.clearNotificationListeners(_optimizely_optimizely_sdk_dist_optimizely_lite_es__WEBPACK_IMPORTED_MODULE_2__.enums.NOTIFICATION_TYPES.LOG_EVENT);
    // // --- For all flags --- //
    // const allDecisions = optimizelyUserContext.decideAll();
    // Object.entries(allDecisions).forEach(([flagKey, decision]) => {
    //   if (decision.enabled) {
    //     logAndPrint(
    //       `[optimizely] The Flag ${
    //         decision.flagKey
    //       } was Enabled for the user ${decision.userContext.getUserId()}`
    //     );
    //   } else {
    //     logAndPrint(
    //       `[optimizely] The Flag ${
    //         decision.flagKey
    //       } was Not Enabled for the user ${decision.userContext.getUserId()}`
    //     );
    //   }
    // });
    // sendGenericReponse(request, logStash);
    request.route({ path });
}
/**
 * 1. onClientRequest handler does not allow setting the cookie. We are saving the cookie in a variable and then settig it here.
 * 2. onClientRequest handler does not allow more than one http subrequests. We are dispatching the optimizely logx event from here.
 */
async function onClientResponse(request, response) {
    if (request.path !== "/akamai/") {
        return;
    }
    const userId = request.getVariable(VARIABLE_NAME_USER_ID);
    const decision = request.getVariable(VARIABLE_NAME_EXPERIMENT_KEY);
    const country = request.getVariable(VARIABLE_USER_NAME_COUNTRY);
    if (SHOULD_DISPATCH_EVENT) {
        const eventPayload = request.getVariable(VARIABLE_NAME_DECISION_EVENT);
        if (eventPayload) {
            const eventResponseStatus = await (0,_optimizely_helper__WEBPACK_IMPORTED_MODULE_3__.dispatchEvent)(eventPayload);
            log__WEBPACK_IMPORTED_MODULE_0__.logger.log(`[optimizely] Optimizely Logx Event dispatched. Response status code: ${eventResponseStatus}`);
        }
    }
    const cookie = new cookies__WEBPACK_IMPORTED_MODULE_1__.Cookies();
    cookie.add(_common__WEBPACK_IMPORTED_MODULE_4__.OPTIMIZELY_VISITOR_KEY, userId);
    cookie.add(_common__WEBPACK_IMPORTED_MODULE_4__.EXPERIMENT_EXPERIMENT_KEY, decision);
    cookie.add(_common__WEBPACK_IMPORTED_MODULE_4__.COUNTRY_KEY, country);
    response.setHeader("set-cookie", cookie.toHeader());
    // const visitorCookie = new SetCookie({
    //   name: OPTIMIZELY_VISITOR_KEY,
    //   value: userId,
    // });
    // response.setHeader("Set-Cookie", visitorCookie.toHeader());
    // const decisionCookie = new SetCookie({
    //   name: EXPERIMENT_EXPERIMENT_KEY,
    //   value: decision,
    // });
    // response.setHeader("Set-Cookie", decisionCookie.toHeader());
}
function sendGenericReponse(request, logStash, message = "Edge worker generic response.") {
    request.respondWith(200, { "Content-Type": "text/plain" }, `${message}\n\n` + "Log Messages:\n" + logStash.join("\n"));
}

})();

var __webpack_exports__generateRandomUserId = __webpack_exports__.generateRandomUserId;
var __webpack_exports__onClientRequest = __webpack_exports__.onClientRequest;
var __webpack_exports__onClientResponse = __webpack_exports__.onClientResponse;
export { __webpack_exports__generateRandomUserId as generateRandomUserId, __webpack_exports__onClientRequest as onClientRequest, __webpack_exports__onClientResponse as onClientResponse };

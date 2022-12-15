/* eslint-disable @typescript-eslint/no-this-alias */
export const isNullOrWs = function (str) {
	return (
		typeof str === 'undefined' ||
		str === null ||
		(typeof str === 'string' && str.trim().length === 0)
	);
};

const isValidJson = function (str) {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
};

// Parses URL param that are in query
export function parseUrlParams() {
	const search = window.location.search.substring(1);
	if (!search) return {};

	const str = search.replace(/&/g, '","').replace(/=/g, '":"');
	const json = `{"${str}"}`;
	const transform = (key, value) => (isNullOrWs(key) ? value : decodeURIComponent(value));

	return isValidJson(json) ? JSON.parse(json, transform) : {};
}

// Debounce - straightforward don't you think?
export function debounce(fn, delay) {
	let timeoutID = null;
	return function () {
		clearTimeout(timeoutID);
		let args = arguments;
		let that = this;
		timeoutID = setTimeout(function () {
			fn.apply(that, args);
		}, delay);
	};
}

// Copies object into new object, without key that is omited
export function omit(obj, omitKey) {
	return Object.keys(obj).reduce((result, key) => {
		if (key !== omitKey) {
			result[key] = obj[key];
		}
		return result;
	}, {});
}

// Copies object into new object, without keys that are omited
export function omitArray(obj, omitKeys) {
	return Object.keys(obj).reduce((result, key) => {
		if (!omitKeys.includes(key)) {
			result[key] = obj[key];
		}
		return result;
	}, {});
}

// Used for mapping store mutations
// Taken from: https://dev.to/matheusgomes062/how-to-make-a-form-handling-with-vuex-6g0
export function mapFields(options) {
	const object = {};
	for (let x = 0; x < options.fields.length; x++) {
		const field = [options.fields[x]];
		object[field] = {
			get() {
				return this.$store.state[options.base][field];
			},
			set(value) {
				/* Original set
				 * this.$store.commit(options.mutation, { [field]: value });
				 * this.$store.commit(mutationName, { [field]: value });
				 */
				let mutationName = '';
				if (isNullOrWs(options.base)) mutationName += options.mutationPrefix + field;
				else mutationName += options.base + '/' + options.mutationPrefix + field;
				this.$store.commit(mutationName, value);
			},
		};
	}
	return object;
}

// Returns a function, that, when invoked, will only be triggered at most once
// during a given window of time. Normally, the throttled function will run
// as much as it can, without ever going more than once per `wait` duration;
// but if you'd like to disable the execution on the leading edge, pass
// `{leading: false}`. To disable execution on the trailing edge, ditto.
export function throttle(func, wait, options) {
	let context, args, result;
	let timeout = null;
	let previous = 0;
	if (!options) options = {};
	let later = function () {
		previous = options.leading === false ? 0 : Date.now();
		timeout = null;
		result = func.apply(context, args);
		if (!timeout) context = args = null;
	};
	return function () {
		let now = Date.now();
		if (!previous && options.leading === false) previous = now;
		let remaining = wait - (now - previous);
		context = this;
		args = arguments;
		if (remaining <= 0 || remaining > wait) {
			if (timeout) {
				clearTimeout(timeout);
				timeout = null;
			}
			previous = now;
			result = func.apply(context, args);
			if (!timeout) context = args = null;
		} else if (!timeout && options.trailing !== false) {
			timeout = setTimeout(later, remaining);
		}
		return result;
	};
}

export function hideChildElements(parentElementId) {
	// <input
	let inputElems = document.getElementById(parentElementId).getElementsByTagName('input');
	for (let i = 0; i < inputElems.length; i++) {
		inputElems[i].disabled = true;
	}
	// <select
	let selectElems = document.getElementById(parentElementId).getElementsByTagName('select');
	for (let i = 0; i < selectElems.length; i++) {
		selectElems[i].disabled = true;
	}

	// <button
	let buttonElems = document.getElementById(parentElementId).getElementsByTagName('button');
	for (let i = 0; i < buttonElems.length; i++) {
		buttonElems[i].disabled = true;
	}
}
export function showChildElements(parentElementId) {
	// <input
	let inputElems = document.getElementById(parentElementId).getElementsByTagName('input');
	for (let i = 0; i < inputElems.length; i++) {
		inputElems[i].disabled = false;
	}
	// <select
	let selectElems = document.getElementById(parentElementId).getElementsByTagName('select');
	for (let i = 0; i < selectElems.length; i++) {
		selectElems[i].disabled = false;
	}
	// <button
	let buttonElems = document.getElementById(parentElementId).getElementsByTagName('button');
	for (let i = 0; i < buttonElems.length; i++) {
		buttonElems[i].disabled = false;
	}
}

// URLs need to have the scheme portion, e.g. `file://` or `https://`.
export function getFileName(fileName) {
	return new URL(fileName).pathname.split('/').pop();
}

// Check if Array has any Elements of Another Array - JavaScript
// Stolen from https://stackoverflow.com/a/16312569/4267429 -> Edit 2
export function anyMatchInArray(target, toMatch) {
	'use strict';

	let found, targetMap, i, j, cur;

	found = false;
	targetMap = {};

	// Put all values in the `target` array into a map, where
	//  the keys are the values from the array
	for (i = 0, j = target.length; i < j; i++) {
		cur = target[i];
		targetMap[cur] = true;
	}

	// Loop over all items in the `toMatch` array and see if any of
	//  their values are in the map from before
	for (i = 0, j = toMatch.length; !found && i < j; i++) {
		cur = toMatch[i];
		found = !!targetMap[cur];
		// If found, `targetMap[cur]` will return true, otherwise it
		//  will return `undefined`...that's what the `!!` is for
	}

	return found;
}

export function formatDate(date) {
	let d = new Date(date),
		month = '' + (d.getMonth() + 1),
		day = '' + d.getDate(),
		year = d.getFullYear();

	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;

	return [day, month, year].join('-');
}

export function toLocalDateFormat(date) {
	let result = typeof date === 'string' ? new Date(date) : date;
	return result.toLocaleString();
}

export default {
	isNullOrWs: isNullOrWs,
	parseUrlParams: parseUrlParams,
	debounce: debounce,
	omit: omit,
	omitArray: omitArray,
	mapFields: mapFields,
	throttle: throttle,
	hideChildElements: hideChildElements,
	showChildElements: showChildElements,
	getFileName: getFileName,
	anyMatchInArray: anyMatchInArray,
	formatDate: formatDate,
	toLocalDateFormat: toLocalDateFormat,
};

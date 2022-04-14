"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkjupiter_clothing"] = self["webpackChunkjupiter_clothing"] || []).push([["client_src_components_Common_ReviewStars_jsx"],{

/***/ "./client/src/components/Common/ReviewStars.jsx":
/*!******************************************************!*\
  !*** ./client/src/components/Common/ReviewStars.jsx ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_rating__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-rating */ \"./node_modules/react-rating/lib/react-rating.esm.js\");\n/* harmony import */ var _star_empty_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./star-empty.png */ \"./client/src/components/Common/star-empty.png\");\n/* harmony import */ var _star_full_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./star-full.png */ \"./client/src/components/Common/star-full.png\");\n\n\n\n\n\nvar PropTypes = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\"); // This component requires a reviews object, usually\n// obtained via reviews.results on a get request to reviews/product_id\n\n\nfunction ReviewStars(_ref) {\n  var reviews = _ref.reviews;\n\n  var reviewAvg = function reviewAvg(list) {\n    var reviewTotal = 0;\n    var numberOfReviews = reviews.length;\n    list.forEach(function (review) {\n      reviewTotal += review.rating;\n    });\n    return (reviewTotal / numberOfReviews).toFixed(3);\n  };\n\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"product-rating\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_rating__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n    readonly: true,\n    className: \"rating-stars\",\n    initialRating: reviewAvg(reviews),\n    emptySymbol: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"img\", {\n      src: _star_empty_png__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\n      className: \"icon\",\n      alt: \"empty star\"\n    }),\n    fullSymbol: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"img\", {\n      src: _star_full_png__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n      className: \"icon\",\n      alt: \"full star\"\n    }),\n    fractions: 4\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"a\", {\n    className: \"rating-link\",\n    href: \"#RatingsReviews\"\n  }, \"Read all\", ' ', reviews.length, ' ', \"reviews\")));\n}\n\nReviewStars.propTypes = {\n  reviews: PropTypes.instanceOf(Object).isRequired\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ReviewStars);\n\n//# sourceURL=webpack://jupiter-clothing/./client/src/components/Common/ReviewStars.jsx?");

/***/ }),

/***/ "./client/src/components/Common/star-empty.png":
/*!*****************************************************!*\
  !*** ./client/src/components/Common/star-empty.png ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + \"2349412396d54d3662fe11dbf6007588.png\");\n\n//# sourceURL=webpack://jupiter-clothing/./client/src/components/Common/star-empty.png?");

/***/ }),

/***/ "./client/src/components/Common/star-full.png":
/*!****************************************************!*\
  !*** ./client/src/components/Common/star-full.png ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + \"4704d28ce411ed9c94ca6013c567c3fa.png\");\n\n//# sourceURL=webpack://jupiter-clothing/./client/src/components/Common/star-full.png?");

/***/ })

}]);
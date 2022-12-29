/**
 * Name: Devika Dwivedi
 * Date: 11/04/2022
 * Section: CSE 154 AC
 * TA: Allison Ho
 * This is a file with a random excuse generator. It has multiple categories of
 * excuses including office, family, and developers.
 */

"use strict";
(function() {

  window.addEventListener("load", init);
  const BASE_URL = "https://excuser.herokuapp.com/v1/excuse/";

  /**
   * sets up necessary functionality when page loads
   */
  function init() {
    let generateButton = qs("button");
    generateButton.addEventListener("click", getSection);
  }

  /**
   * Get the section of excuses specified by the user
   */
  function getSection() {
    let type = qs("input").value;
    let arr = ["family", "office", "children", "college", "party", "funny", "unbelievable",
    "developers"];

    for (let i = 0; i < 8; i++) {
      if (type === arr[i]) {
        makeRequest(type);
      }
    }
  }

  /**
   * takes the type of excuse and tests the number of
   * @param {String} type of excuse desired
   */
  function makeRequest(type) {
    let url = BASE_URL + type;
    fetch(url)
      .then(statusCheck)
      .then(resp => resp.json())
      .then(processData)
      .catch(handleError);
  }

  /**
   * puts the excuse on the web page
   * @param {Object} responseData of the JSON excuse given by the API
   */
  function processData(responseData) {
    console.log(responseData);
  }

  /**
   * gives the user a helpful message if an error occurs while requesting
   */
  function handleError() {
    let message = gen("p");
    message.textContent = "Error: refresh your screen and try again.";
    let origExcuse = qsa("p")[2];
    id("excuse").replaceChild(message, origExcuse);
    let generateButton = qs("button");
    generateButton.removeEventListener("click", getSection);
  }

  /**
   * Helper function to return the response's result text if successful, otherwise
   * returns the rejected Promise result with an error status and corresponding text
   * @param {object} res - response to check for success/error
   * @return {object} - valid response if response was successful, otherwise rejected
   *                    Promise result
   */
  async function statusCheck(res) {
    if (!res.ok) {
      throw new Error(await res.text());
    }
    return res;
  }

  /**
   * Returns the desired element node
   * @param {string} tag - the name of the tag to create
   * @returns {object} the desired element node
   */
  function gen(tag) {
    return document.createElement(tag);
  }

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} id - element ID.
   * @returns {object} - DOM object associated with id.
   */
  function id(id) {
    return document.getElementById(id);
  }

  /**
   * Returns first element matching the given CSS selector.
   * @param {string} selector - CSS selector.
   * @returns {object} - object associated selector.
   */
  function qs(selector) {
    return document.querySelector(selector);
  }

  /**
   * Returns an array of elements that match the given CSS selector.
   *  @param {string} selector - CSS selector
   *  @returns {object[]} array of DOM objects matching the query.
   */
  function qsa(selector) {
    return document.querySelectorAll(selector);
  }

})();
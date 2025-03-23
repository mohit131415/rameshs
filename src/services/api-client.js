/**
 * Base API client for making HTTP requests
 * Provides methods for common HTTP operations with error handling
 */

// Base API URL - would typically come from environment variables
const API_BASE_URL = "https://api.rameshsweets.co.in/api/v1"

/**
 * Handles API response and error checking
 * @param {Response} response - The fetch response object
 * @returns {Promise<any>} - The parsed response data
 * @throws {Error} - If the response is not ok
 */
async function handleResponse(response) {
  const contentType = response.headers.get("content-type")
  const isJson = contentType && contentType.includes("application/json")
  const data = isJson ? await response.json() : await response.text()

  if (!response.ok) {
    // Try to get error message from response, or use status text
    const errorMessage = isJson && data.message ? data.message : response.statusText

    const error = new Error(errorMessage)
    error.status = response.status
    error.data = data
    throw error
  }

  return data
}

/**
 * Creates request options for fetch
 * @param {string} method - HTTP method
 * @param {Object} [data] - Request body data
 * @param {Object} [customHeaders] - Additional headers
 * @returns {Object} - Request options for fetch
 */
function createRequestOptions(method, data, customHeaders = {}) {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...customHeaders,
    },
    credentials: "include", // Include cookies for authentication
  }

  if (data) {
    options.body = JSON.stringify(data)
  }

  return options
}

/**
 * Adds authentication token to headers if available
 * @param {Object} headers - Request headers
 * @returns {Object} - Headers with auth token if available
 */
function addAuthHeader(headers = {}) {
  const token = localStorage.getItem("auth_token")

  if (token) {
    return {
      ...headers,
      Authorization: `Bearer ${token}`,
    }
  }

  return headers
}

/**
 * API client with methods for common HTTP operations
 */
const apiClient = {
  /**
   * Performs a GET request
   * @param {string} endpoint - API endpoint
   * @param {Object} [options] - Additional options
   * @returns {Promise<any>} - Response data
   */
  async get(endpoint, options = {}) {
    const { headers = {}, params = {}, requireAuth = true } = options

    // Build query string from params
    const queryParams = new URLSearchParams(params).toString()
    const url = `${API_BASE_URL}${endpoint}${queryParams ? `?${queryParams}` : ""}`

    const requestHeaders = requireAuth ? addAuthHeader(headers) : headers
    const requestOptions = createRequestOptions("GET", null, requestHeaders)

    const response = await fetch(url, requestOptions)
    return handleResponse(response)
  },

  /**
   * Performs a POST request
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request body data
   * @param {Object} [options] - Additional options
   * @returns {Promise<any>} - Response data
   */
  async post(endpoint, data, options = {}) {
    const { headers = {}, requireAuth = true } = options
    const url = `${API_BASE_URL}${endpoint}`

    const requestHeaders = requireAuth ? addAuthHeader(headers) : headers
    const requestOptions = createRequestOptions("POST", data, requestHeaders)

    const response = await fetch(url, requestOptions)
    return handleResponse(response)
  },

  /**
   * Performs a PUT request
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request body data
   * @param {Object} [options] - Additional options
   * @returns {Promise<any>} - Response data
   */
  async put(endpoint, data, options = {}) {
    const { headers = {}, requireAuth = true } = options
    const url = `${API_BASE_URL}${endpoint}`

    const requestHeaders = requireAuth ? addAuthHeader(headers) : headers
    const requestOptions = createRequestOptions("PUT", data, requestHeaders)

    const response = await fetch(url, requestOptions)
    return handleResponse(response)
  },

  /**
   * Performs a PATCH request
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request body data
   * @param {Object} [options] - Additional options
   * @returns {Promise<any>} - Response data
   */
  async patch(endpoint, data, options = {}) {
    const { headers = {}, requireAuth = true } = options
    const url = `${API_BASE_URL}${endpoint}`

    const requestHeaders = requireAuth ? addAuthHeader(headers) : headers
    const requestOptions = createRequestOptions("PATCH", data, requestHeaders)

    const response = await fetch(url, requestOptions)
    return handleResponse(response)
  },

  /**
   * Performs a DELETE request
   * @param {string} endpoint - API endpoint
   * @param {Object} [options] - Additional options
   * @returns {Promise<any>} - Response data
   */
  async delete(endpoint, options = {}) {
    const { headers = {}, requireAuth = true } = options
    const url = `${API_BASE_URL}${endpoint}`

    const requestHeaders = requireAuth ? addAuthHeader(headers) : headers
    const requestOptions = createRequestOptions("DELETE", null, requestHeaders)

    const response = await fetch(url, requestOptions)
    return handleResponse(response)
  },

  /**
   * Uploads a file
   * @param {string} endpoint - API endpoint
   * @param {FormData} formData - Form data with file
   * @param {Object} [options] - Additional options
   * @returns {Promise<any>} - Response data
   */
  async uploadFile(endpoint, formData, options = {}) {
    const { headers = {}, requireAuth = true, onProgress } = options
    const url = `${API_BASE_URL}${endpoint}`

    const requestHeaders = requireAuth ? addAuthHeader(headers) : headers
    // Don't set Content-Type for FormData, browser will set it with boundary
    delete requestHeaders["Content-Type"]

    const requestOptions = {
      method: "POST",
      headers: requestHeaders,
      credentials: "include",
      body: formData,
    }

    // Use XMLHttpRequest for upload progress if callback provided
    if (onProgress && typeof onProgress === "function") {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()

        xhr.open("POST", url)

        // Add headers
        Object.keys(requestHeaders).forEach((key) => {
          xhr.setRequestHeader(key, requestHeaders[key])
        })

        xhr.withCredentials = true

        xhr.upload.addEventListener("progress", (event) => {
          if (event.lengthComputable) {
            const percentComplete = (event.loaded / event.total) * 100
            onProgress(percentComplete)
          }
        })

        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            const contentType = xhr.getResponseHeader("Content-Type")
            const response =
              contentType && contentType.includes("application/json") ? JSON.parse(xhr.responseText) : xhr.responseText
            resolve(response)
          } else {
            reject(new Error(`HTTP Error: ${xhr.status} ${xhr.statusText}`))
          }
        }

        xhr.onerror = () => {
          reject(new Error("Network Error"))
        }

        xhr.send(formData)
      })
    }

    // Use regular fetch if no progress callback
    const response = await fetch(url, requestOptions)
    return handleResponse(response)
  },
}

export default apiClient


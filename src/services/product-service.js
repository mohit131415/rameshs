/**
 * Product-related API services
 */
import apiClient from "./api-client"

/**
 * Product service for fetching and managing products
 */
const productService = {
  /**
   * Fetches all products with optional filtering
   * @param {Object} [params] - Query parameters for filtering
   * @param {string} [params.category] - Filter by category
   * @param {string} [params.search] - Search term
   * @param {string} [params.sort] - Sort field and direction (e.g., 'price:asc')
   * @param {number} [params.page] - Page number for pagination
   * @param {number} [params.limit] - Number of items per page
   * @returns {Promise<Object>} - Products data with pagination info
   */
  async getProducts(params = {}) {
    return apiClient.get("/products", { params, requireAuth: false })
  },

  /**
   * Fetches a single product by ID
   * @param {number|string} id - Product ID
   * @returns {Promise<Object>} - Product data
   */
  async getProductById(id) {
    return apiClient.get(`/products/${id}`, { requireAuth: false })
  },

  /**
   * Fetches a single product by slug
   * @param {string} slug - Product slug
   * @returns {Promise<Object>} - Product data
   */
  async getProductBySlug(slug) {
    return apiClient.get(`/products/slug/${slug}`, { requireAuth: false })
  },

  /**
   * Fetches featured products
   * @param {number} [limit=4] - Number of featured products to fetch
   * @returns {Promise<Array>} - Featured products
   */
  async getFeaturedProducts(limit = 4) {
    return apiClient.get("/products/featured", {
      params: { limit },
      requireAuth: false,
    })
  },

  /**
   * Fetches bestseller products
   * @param {number} [limit=4] - Number of bestseller products to fetch
   * @returns {Promise<Array>} - Bestseller products
   */
  async getBestsellerProducts(limit = 4) {
    return apiClient.get("/products/bestsellers", {
      params: { limit },
      requireAuth: false,
    })
  },

  /**
   * Fetches new products
   * @param {number} [limit=4] - Number of new products to fetch
   * @returns {Promise<Array>} - New products
   */
  async getNewProducts(limit = 4) {
    return apiClient.get("/products/new", {
      params: { limit },
      requireAuth: false,
    })
  },

  /**
   * Fetches related products for a given product
   * @param {number|string} productId - Product ID
   * @param {number} [limit=4] - Number of related products to fetch
   * @returns {Promise<Array>} - Related products
   */
  async getRelatedProducts(productId, limit = 4) {
    return apiClient.get(`/products/${productId}/related`, {
      params: { limit },
      requireAuth: false,
    })
  },

  /**
   * Fetches all product categories
   * @returns {Promise<Array>} - Product categories
   */
  async getCategories() {
    return apiClient.get("/categories", { requireAuth: false })
  },

  /**
   * Fetches products by category
   * @param {string} categoryId - Category ID or slug
   * @param {Object} [params] - Additional query parameters
   * @returns {Promise<Object>} - Products data with pagination info
   */
  async getProductsByCategory(categoryId, params = {}) {
    return apiClient.get(`/categories/${categoryId}/products`, {
      params,
      requireAuth: false,
    })
  },

  /**
   * Searches products
   * @param {string} query - Search query
   * @param {Object} [params] - Additional query parameters
   * @returns {Promise<Object>} - Search results with pagination info
   */
  async searchProducts(query, params = {}) {
    return apiClient.get("/products/search", {
      params: { query, ...params },
      requireAuth: false,
    })
  },

  /**
   * Adds a product review
   * @param {number|string} productId - Product ID
   * @param {Object} reviewData - Review data
   * @param {number} reviewData.rating - Rating (1-5)
   * @param {string} reviewData.comment - Review comment
   * @param {string} [reviewData.title] - Review title
   * @returns {Promise<Object>} - Added review
   */
  async addProductReview(productId, reviewData) {
    return apiClient.post(`/products/${productId}/reviews`, reviewData)
  },

  /**
   * Fetches product reviews
   * @param {number|string} productId - Product ID
   * @param {Object} [params] - Query parameters
   * @returns {Promise<Object>} - Reviews with pagination info
   */
  async getProductReviews(productId, params = {}) {
    return apiClient.get(`/products/${productId}/reviews`, {
      params,
      requireAuth: false,
    })
  },
}

export default productService


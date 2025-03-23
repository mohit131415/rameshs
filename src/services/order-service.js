/**
 * Order-related API services
 */
import apiClient from "./api-client"

/**
 * Order service for creating and managing orders
 */
const orderService = {
  /**
   * Creates a new order
   * @param {Object} orderData - Order data
   * @param {Array} orderData.items - Order items
   * @param {Object} orderData.shippingAddress - Shipping address
   * @param {Object} [orderData.billingAddress] - Billing address (if different from shipping)
   * @param {string} orderData.paymentMethod - Payment method
   * @returns {Promise<Object>} - Created order
   */
  async createOrder(orderData) {
    return apiClient.post("/orders", orderData)
  },

  /**
   * Fetches all orders for the current user
   * @param {Object} [params] - Query parameters
   * @returns {Promise<Object>} - Orders with pagination info
   */
  async getOrders(params = {}) {
    return apiClient.get("/orders", { params })
  },

  /**
   * Fetches a single order by ID
   * @param {number|string} orderId - Order ID
   * @returns {Promise<Object>} - Order data
   */
  async getOrderById(orderId) {
    return apiClient.get(`/orders/${orderId}`)
  },

  /**
   * Cancels an order
   * @param {number|string} orderId - Order ID
   * @param {Object} [data] - Cancellation data
   * @param {string} [data.reason] - Cancellation reason
   * @returns {Promise<Object>} - Updated order
   */
  async cancelOrder(orderId, data = {}) {
    return apiClient.post(`/orders/${orderId}/cancel`, data)
  },

  /**
   * Initiates payment for an order
   * @param {number|string} orderId - Order ID
   * @param {Object} paymentData - Payment data
   * @param {string} paymentData.method - Payment method
   * @param {Object} [paymentData.details] - Payment details
   * @returns {Promise<Object>} - Payment result
   */
  async initiatePayment(orderId, paymentData) {
    return apiClient.post(`/orders/${orderId}/payment`, paymentData)
  },

  /**
   * Verifies payment for an order
   * @param {number|string} orderId - Order ID
   * @param {Object} verificationData - Payment verification data
   * @returns {Promise<Object>} - Verification result
   */
  async verifyPayment(orderId, verificationData) {
    return apiClient.post(`/orders/${orderId}/payment/verify`, verificationData)
  },

  /**
   * Fetches order status
   * @param {number|string} orderId - Order ID
   * @returns {Promise<Object>} - Order status
   */
  async getOrderStatus(orderId) {
    return apiClient.get(`/orders/${orderId}/status`)
  },

  /**
   * Adds a shipping address for the order
   * @param {number|string} orderId - Order ID
   * @param {Object} addressData - Shipping address data
   * @returns {Promise<Object>} - Updated order
   */
  async addShippingAddress(orderId, addressData) {
    return apiClient.post(`/orders/${orderId}/shipping-address`, addressData)
  },

  /**
   * Applies a coupon to an order
   * @param {number|string} orderId - Order ID
   * @param {Object} couponData - Coupon data
   * @param {string} couponData.code - Coupon code
   * @returns {Promise<Object>} - Updated order with applied discount
   */
  async applyCoupon(orderId, couponData) {
    return apiClient.post(`/orders/${orderId}/apply-coupon`, couponData)
  },

  /**
   * Removes a coupon from an order
   * @param {number|string} orderId - Order ID
   * @returns {Promise<Object>} - Updated order
   */
  async removeCoupon(orderId) {
    return apiClient.delete(`/orders/${orderId}/coupon`)
  },

  /**
   * Fetches order invoice
   * @param {number|string} orderId - Order ID
   * @returns {Promise<Blob>} - Invoice PDF as blob
   */
  async getOrderInvoice(orderId) {
    return apiClient.get(`/orders/${orderId}/invoice`, {
      headers: {
        Accept: "application/pdf",
      },
      responseType: "blob",
    })
  },

  /**
   * Tracks order shipment
   * @param {number|string} orderId - Order ID
   * @returns {Promise<Object>} - Tracking information
   */
  async trackOrder(orderId) {
    return apiClient.get(`/orders/${orderId}/tracking`)
  },
}

export default orderService


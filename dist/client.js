"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrintifyClient = void 0;
const axios_1 = __importDefault(require("axios"));
const errors_1 = require("./errors");
class PrintifyClient {
    constructor(config) {
        this.client = axios_1.default.create({
            baseURL: config.endpoint,
            headers: {
                Authorization: `Bearer ${config.apiKey}`,
                'User-Agent': config.userAgent || 'PrintifyApiClient/1.0',
                'Content-Type': 'application/json'
            },
            timeout: 10000
        });
    }
    // ======================
    // PRODUCT METHODS
    // ======================
    /**
     * Get paginated list of products
     * @param shopId - Printify shop ID
     * @param params - Pagination parameters
     * @returns Promise with array of Products
     */
    async getProducts(shopId, params) {
        return this.handleRequest(this.client.get(`/shops/${shopId}/products.json`, { params }));
    }
    /**
     * Get single product details
     * @param shopId - Printify shop ID
     * @param productId - Product ID to retrieve
     * @returns Promise with Product details
     */
    async getProduct(shopId, productId) {
        return this.handleRequest(this.client.get(`/shops/${shopId}/products/${productId}.json`));
    }
    // ======================
    // ORDER METHODS
    // ======================
    /**
     * Create a new order
     * @param shopId - Printify shop ID
     * @param orderData - Order payload
     * @returns Promise with created Order
     */
    async createOrder(shopId, orderData) {
        return this.handleRequest(this.client.post(`/shops/${shopId}/orders.json`, orderData));
    }
    /**
     * Get order details
     * @param shopId - Printify shop ID
     * @param orderId - Order ID to retrieve
     * @returns Promise with Order details
     */
    async getOrderDetails(shopId, orderId) {
        return this.handleRequest(this.client.get(`/shops/${shopId}/orders/${orderId}.json`));
    }
    /**
     * Update an existing order
     * @param shopId - Printify shop ID
     * @param orderId - Order ID to update
     * @param updateData - Partial order data to update
     * @returns Promise with updated Order
     */
    async updateOrder(shopId, orderId, updateData) {
        return this.handleRequest(this.client.put(`/shops/${shopId}/orders/${orderId}.json`, updateData));
    }
    /**
     * Delete an order
     * @param shopId - Printify shop ID
     * @param orderId - Order ID to delete
     * @returns Promise indicating success
     */
    async deleteOrder(shopId, orderId) {
        return this.handleRequest(this.client.delete(`/shops/${shopId}/orders/${orderId}.json`));
    }
    // ======================
    // SHIPPING METHODS
    // ======================
    /**
     * Get shipping options for a product
     * @param shopId - Printify shop ID
     * @param productId - Product ID to check
     * @returns Promise with array of ShippingOptions
     */
    async getShippingOptions(shopId, productId) {
        return this.handleRequest(this.client.get(`/shops/${shopId}/products/${productId}/shipping.json`));
    }
    // ======================
    // ERROR HANDLING
    // ======================
    /**
     * Central request handler with error management
     * @param promise - Axios request promise
     * @returns Promise with typed response
     */
    async handleRequest(promise) {
        var _a, _b;
        try {
            const response = await promise;
            return response.data;
        }
        catch (error) {
            if (axios_1.default.isAxiosError(error)) {
                const apiError = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data;
                throw new errors_1.PrintifyError((apiError === null || apiError === void 0 ? void 0 : apiError.message) || error.message, ((_b = error.response) === null || _b === void 0 ? void 0 : _b.status) || 500, apiError === null || apiError === void 0 ? void 0 : apiError.errors);
            }
            throw new errors_1.PrintifyError('Unknown error occurred', 500);
        }
    }
}
exports.PrintifyClient = PrintifyClient;

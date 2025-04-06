"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PressmaticClient = void 0;
const axios_1 = __importDefault(require("axios"));
const errors_1 = require("./errors");
class PressmaticClient {
    constructor(config) {
        this.client = axios_1.default.create({
            baseURL: config.endpoint,
            headers: {
                Authorization: `Bearer ${config.apiKey}`,
                "User-Agent": config.userAgent || "PrintifyApiClient/1.0",
                "Content-Type": "application/json",
            },
            timeout: 10000,
        });
    }
    // ======================
    // SHOP METHODS
    // ======================
    /**
     * Get shop list
     * @returns Promise with Shop list
     */
    async getShops() {
        return this.handleRequest(this.client.get("/shops.json"));
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
    /**
     * Delete a product
     * @param shopId - Printify shop ID
     * @param productId - Product ID to delete
     * @returns Promise indicating success
     */
    async deleteProduct(shopId, productId) {
        return this.handleRequest(this.client.delete(`/shops/${shopId}/products/${productId}.json`));
    }
    /**
     * Publish a product
     * @param shopId - Printify shop ID
     * @param productId - Product ID to publish
     * @returns Promise indicating success
     */
    async publishProduct(shopId, productId) {
        const publishData = {
            title: true,
            description: true,
            images: true,
            variants: true,
            tags: true,
            keyFeatures: true,
            shipping_template: true,
        };
        return this.handleRequest(this.client.post(`/shops/${shopId}/products/${productId}/publish.json`, publishData));
    }
    /**
     * Set publishing succeeded status
     * @param shopId - Printify shop ID
     * @param productId - Product ID
     * @param handle - Product handle
     * @param externalId - External ID
     * @returns Promise indicating success
     */
    async setPublishingSucceeded(shopId, productId, handle, externalId) {
        const data = {
            external: {
                id: externalId,
                handle: handle,
            },
        };
        return this.handleRequest(this.client.post(`/shops/${shopId}/products/${productId}/publishing_succeeded.json`, data));
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
     * Create order with product ID
     * @param shopId - Printify shop ID
     * @param externalId - External order ID
     * @param label - Order label
     * @param lineItems - Order line items with product IDs
     * @param shippingMethod - Shipping method ID
     * @param address - Shipping address
     * @param isPrintifyExpress - Use Printify Express shipping
     * @param isEconomyShipping - Use economy shipping
     * @param sendShippingNotification - Send shipping notification
     * @returns Promise with created Order
     */
    async createOrderWithProductId(shopId, externalId, label, lineItems, shippingMethod, address, isPrintifyExpress = false, isEconomyShipping = false, sendShippingNotification = false) {
        const orderData = {
            external_id: externalId,
            label: label,
            line_items: lineItems,
            shipping_method: shippingMethod,
            is_printify_express: isPrintifyExpress,
            is_economy_shipping: isEconomyShipping,
            send_shipping_notification: sendShippingNotification,
            address_to: address,
        };
        return this.handleRequest(this.client.post(`/shops/${shopId}/orders.json`, orderData));
    }
    /**
     * Create order with SKU
     * @param shopId - Printify shop ID
     * @param externalId - External order ID
     * @param label - Order label
     * @param lineItems - Order line items with SKUs
     * @param shippingMethod - Shipping method ID
     * @param address - Shipping address
     * @param isPrintifyExpress - Use Printify Express shipping
     * @param isEconomyShipping - Use economy shipping
     * @param sendShippingNotification - Send shipping notification
     * @returns Promise with created Order
     */
    async createOrderWithSKU(shopId, externalId, label, lineItems, shippingMethod, address, isPrintifyExpress = false, isEconomyShipping = false, sendShippingNotification = false) {
        const orderData = {
            external_id: externalId,
            label: label,
            line_items: lineItems,
            shipping_method: shippingMethod,
            is_printify_express: isPrintifyExpress,
            is_economy_shipping: isEconomyShipping,
            send_shipping_notification: sendShippingNotification,
            address_to: address,
        };
        return this.handleRequest(this.client.post(`/shops/${shopId}/orders.json`, orderData));
    }
    /**
     * Create a flexible order with either product IDs or SKUs
     * @param shopId - Printify shop ID
     * @param externalId - External order ID
     * @param label - Order label
     * @param lineItems - Order line items with either product IDs or SKUs
     * @param shippingMethod - Shipping method ID
     * @param address - Shipping address
     * @param isPrintifyExpress - Use Printify Express shipping
     * @param isEconomyShipping - Use economy shipping
     * @param sendShippingNotification - Send shipping notification
     * @returns Promise with created Order
     */
    async createFlexibleOrder(shopId, externalId, label, lineItems, shippingMethod, address, isPrintifyExpress = false, isEconomyShipping = false, sendShippingNotification = false) {
        const orderData = {
            external_id: externalId,
            label: label,
            line_items: lineItems,
            shipping_method: shippingMethod,
            is_printify_express: isPrintifyExpress,
            is_economy_shipping: isEconomyShipping,
            send_shipping_notification: sendShippingNotification,
            address_to: address,
        };
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
    /**
     * Send order to production
     * @param shopId - Printify shop ID
     * @param orderId - Order ID to send to production
     * @returns Promise indicating success
     */
    async sendOrderToProduction(shopId, orderId) {
        return this.handleRequest(this.client.post(`/shops/${shopId}/orders/${orderId}/send_to_production.json`, {}));
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
    /**
     * Calculate shipping cost
     * @param shopId - Printify shop ID
     * @param lineItems - Order line items
     * @param address - Shipping address
     * @returns Promise with shipping cost details
     */
    async getShippingCost(shopId, lineItems, address) {
        const shippingData = {
            line_items: lineItems,
            address_to: address,
        };
        return this.handleRequest(this.client.post(`/shops/${shopId}/orders/shipping.json`, shippingData));
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
            throw new errors_1.PrintifyError("Unknown error occurred", 500);
        }
    }
}
exports.PressmaticClient = PressmaticClient;

# Pressmatic Printify Client

Your friendly helper for building print-on-demand apps

## Installation

To install the package, run:

```sh
npm install pressmatic
pnpm add pressmatic
bun add pressmatic
```

## Usage

### Configuration

First, you need to configure the client with your Printify API key and endpoint:

```ts
import { PressmaticClient, PressmaticConfig } from "pressmatic";

const config: PressmaticConfig = {
  apiKey: "your-api-key",
  endpoint: "https://api.printify.com/v1",
};

const client = new PressmaticClient(config);
```

### Product Methods

#### Get Products

Get a paginated list of products:

```ts
const products = await client.getProducts("shopId", { page: 1, limit: 10 });
console.log(products);
```

#### Get Product

Get details of a single product:

```ts
const product = await client.getProduct("shopId", "productId");
console.log(product);
```

#### Publish Product

Publish a product to your store:

```ts
await client.publishProduct("shopId", "productId");
console.log("Product published");
```

#### Set Publishing Succeeded

Mark a product as successfully published:

```ts
await client.setPublishingSucceeded(
  "shopId",
  "productId",
  "product-handle",
  "external-id"
);
console.log("Publishing status updated");
```

### Order Methods

#### Create Order

Create a new order:

```ts
const orderData = {
  id: "orderId",
  address_to: {
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    country: "US",
    address1: "123 Main St",
    city: "New York",
    zip: "10001",
  },
  line_items: [
    {
      product_id: "productId",
      variant_id: 1,
      quantity: 2,
    },
  ],
  shipping_method: 1,
  send_shipping_notification: true,
  status: "pending",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const order = await client.createOrder("shopId", orderData);
console.log(order);
```

#### Create Order with Product ID

Create a new order with a product ID:

```ts
const order = await client.createOrderWithProductId(
  "shopId",
  "external-order-id",
  "Order Label",
  [
    {
      product_id: "productId",
      variant_id: 1,
      quantity: 2,
    },
  ],
  1, // shipping method
  {
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    country: "US",
    address1: "123 Main St",
    city: "New York",
    zip: "10001",
  },
  false, // isPrintifyExpress
  false, // isEconomyShipping
  true // sendShippingNotification
);
console.log(order);
```

#### Create Order with SKU

Create a new order with SKU:

```ts
const order = await client.createOrderWithSKU(
  "shopId",
  "external-order-id",
  "Order Label",
  [
    {
      sku: "product-sku",
      quantity: 2,
    },
  ],
  1, // shipping method
  {
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    country: "US",
    address1: "123 Main St",
    city: "New York",
    zip: "10001",
  }
);
console.log(order);
```

#### Get Order Details

Get details of an existing order:

```ts
const orderDetails = await client.getOrderDetails("shopId", "orderId");
console.log(orderDetails);
```

#### Update Order

Update an existing order:

```ts
const updatedOrder = await client.updateOrder("shopId", "orderId", {
  status: "completed",
});
console.log(updatedOrder);
```

#### Delete Order

Delete an order:

```ts
await client.deleteOrder("shopId", "orderId");
console.log("Order deleted");
```

### Shipping Methods

#### Get Shipping Options

Get shipping options for a product:

```ts
const shippingOptions = await client.getShippingOptions("shopId", "productId");
console.log(shippingOptions);
```

#### Get Shipping Cost

Get the shipping cost for a order:

```ts
const shippingCost = await client.getShippingCost(
  "shopId",
  [
    {
      product_id: "productId",
      variant_id: 1,
      quantity: 2,
    },
  ],
  {
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    country: "US",
    address1: "123 Main St",
    city: "New York",
    zip: "10001",
  }
);
console.log(shippingCost);
```

## Error Handling

The client uses a central request handler with error management. If an error occurs, it throws a `PrintifyError`:

```ts
try {
  const products = await client.getProducts("shopId");
} catch (error) {
  if (error instanceof PrintifyError) {
    console.error(`Error: ${error.message}, Status Code: ${error.statusCode}`);
  } else {
    console.error("Unknown error occurred");
  }
}
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## Acknowledgements

Special thanks to the Printify team for their API.

## Author

This package is maintained by [10d3](https://amherley.dev).

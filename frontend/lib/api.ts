
import axios from 'axios';

// Service URLs (assuming running locally on default ports)
const PRODUCT_SERVICE_URL = 'http://localhost:8080/api/product';
const ORDER_SERVICE_URL = 'http://localhost:8081/api/orders';
const INVENTORY_SERVICE_URL = 'http://localhost:8082/api/inventory';

// Create specific instances if needed, or helper functions
export const getProducts = async () => {
  try {
    const response = await axios.get(PRODUCT_SERVICE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const createProduct = async (product: any) => {
    try {
        const response = await axios.post(PRODUCT_SERVICE_URL, product);
        return response.data;
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
}

export const placeOrder = async (order: any) => {
  try {
    const response = await axios.post(ORDER_SERVICE_URL, order);
    return response.data;
  } catch (error) {
    console.error('Error placing order:', error);
    throw error;
  }
};

export const checkStock = async (skuCode: string, quantity: number) => {
    try {
        const response = await axios.get(`${INVENTORY_SERVICE_URL}?skuCode=${skuCode}&quantity=${quantity}`);
        return response.data;
    } catch (error) {
        console.error('Error checking stock:', error);
        return false;
    }
}

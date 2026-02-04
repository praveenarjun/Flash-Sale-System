
const axios = require('axios');

const BACKEND_URL = 'http://localhost:8080/api/product';
const RAPID_API_KEY = '09a2b93fdcmsh19fcc910eff2c55p116973jsna7f333c5efe2';
const RAPID_API_HOST = 'real-time-amazon-data.p.rapidapi.com';

const ASINS = [
    'B07KMBNGWV', // Nike Backpack
    'B07ZPKBL9V', // iPhone 11 (from user curl)
    'B08N5WRWNW', // Sony WH-1000XM4
    'B08J5F3G18', // Samsung Galaxy S20 FE
    'B07XJ8C8F7', // Bose QuietComfort 35 II
];

async function fetchProductData(asin) {
    const options = {
        method: 'GET',
        url: 'https://real-time-amazon-data.p.rapidapi.com/product-details',
        params: {
            asin: asin,
            country: 'US'
        },
        headers: {
            'x-rapidapi-key': RAPID_API_KEY,
            'x-rapidapi-host': RAPID_API_HOST
        }
    };

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.error(`Failed to fetch data for ASIN ${asin}:`, error.message);
        return null;
    }
}

async function seedProducts() {
    console.log('Starting product seeding...');

    for (const asin of ASINS) {
        console.log(`Fetching data for ASIN: ${asin}`);
        const data = await fetchProductData(asin);

        if (data && data.status === 'OK' && data.data) {
            const productData = data.data;

            // Clean price string (remove '$' and commas)
            let price = productData.product_price ? parseFloat(productData.product_price.replace('$', '').replace(',', '')) : 0;
            if (!price && productData.product_original_price) {
                price = parseFloat(productData.product_original_price.replace('$', '').replace(',', ''));
            }

            // Truncate description if too long (optional, but good for DB)
            const description = productData.product_description || productData.about_product?.[0] || 'No description available';

            const payload = {
                name: productData.product_title,
                description: description.substring(0, 255), // Limit description length
                price: price,
                imageUrl: productData.product_photo
            };

            try {
                await axios.post(BACKEND_URL, payload);
                console.log(`Successfully added product: ${payload.name.substring(0, 30)}...`);
            } catch (error) {
                console.error(`Failed to add product to backend: ${error.message}`);
                if (error.response) {
                    console.error('Response data:', error.response.data);
                }
            }
        } else {
            console.warn(`Skipping ASIN ${asin}: Invalid data received.`);
        }

        // Respect API rate limits (optional wait)
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log('Seeding completed.');
}

seedProducts();

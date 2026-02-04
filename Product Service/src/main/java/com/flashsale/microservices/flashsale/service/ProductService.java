package com.flashsale.microservices.flashsale.service;

import com.flashsale.microservices.flashsale.dto.ProductRequest;
import com.flashsale.microservices.flashsale.dto.ProductResponse;
import com.flashsale.microservices.flashsale.model.Product;
import com.flashsale.microservices.flashsale.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductService {
        private final ProductRepository productRepository;

        public ProductResponse createProduct(ProductRequest productRequest) {
                Product product = Product.builder()
                                .name(productRequest.name())
                                .description(productRequest.description())
                                .price(productRequest.price())
                                .imageUrl(productRequest.imageUrl())
                                .build();
                productRepository.save(product);

                log.info("Product created Successfully: {}", product.getId());
                return new ProductResponse(product.getId(),
                                product.getName(),
                                product.getDescription(),
                                product.getImageUrl(),
                                product.getPrice());
        }

        public List<ProductResponse> getAllProducts() {
                return productRepository.findAll()
                                .stream()
                                .map(product -> new ProductResponse(product.getId(),
                                                product.getName(),
                                                product.getDescription(),
                                                product.getImageUrl(),
                                                product.getPrice()))
                                .toList();
        }
}

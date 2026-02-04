package com.flashsale.microservices.flashsale.controller;


import com.flashsale.microservices.flashsale.dto.ProductRequest;
import com.flashsale.microservices.flashsale.dto.ProductResponse;
import com.flashsale.microservices.flashsale.model.Product;
import com.flashsale.microservices.flashsale.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/product")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ProductResponse createProduct(@RequestBody ProductRequest productRequest) {
        return productService.createProduct(productRequest);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<ProductResponse> getAllProducts() {
        return productService.getAllProducts();
    }
}

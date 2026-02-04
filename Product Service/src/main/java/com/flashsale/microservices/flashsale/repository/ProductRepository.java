package com.flashsale.microservices.flashsale.repository;

import com.flashsale.microservices.flashsale.model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProductRepository extends MongoRepository<Product, String> {
}

package com.flashsale.microservices.inventoryservice.repository;

import com.flashsale.microservices.inventoryservice.model.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InventoryRepository extends JpaRepository<Inventory, Long> {

   boolean existsBySkuCodeAndQuantityGreaterThanEqual(String skuCode, Integer quantity);
}

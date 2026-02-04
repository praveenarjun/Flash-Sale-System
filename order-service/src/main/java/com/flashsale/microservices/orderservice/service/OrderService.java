package com.flashsale.microservices.orderservice.service;

import com.flashsale.microservices.orderservice.client.InventoryClient;
import com.flashsale.microservices.orderservice.dto.OrderRequest;
import com.flashsale.microservices.orderservice.model.Order;
import com.flashsale.microservices.orderservice.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    private final InventoryClient inventoryClient;

    public void placeOrder(OrderRequest orderRequest) {

        //Using wire mock


        var isProductInStock= inventoryClient.isInStock(orderRequest.skuCode(),orderRequest.quantity());
        if(isProductInStock){
            Order order = new Order();
            order.setOrderNumber(UUID.randomUUID().toString());
            order.setPrice(orderRequest.price());
            order.setQuantity(orderRequest.quantity());
            order.setSkuCode(orderRequest.skuCode());

            orderRepository.save(order);

        }else{
            throw new RuntimeException("Product is with SkuCode"+ orderRequest.skuCode() + " is not in stock");
        }
    }

}

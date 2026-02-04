package com.flashsale.microservices.flashsale.dto;

import java.math.BigDecimal;

public record ProductResponse(String id, String name, String description, String imageUrl, BigDecimal price) {
}

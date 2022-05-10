package com.example.bazar.service;

import com.example.bazar.payload.PaymentRequest;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

@Service
public class PaymentService {

    @Value("${STRIPE_SECRET_KEY}")
    private String secretKey;

    @PostConstruct
    public void init() {
        Stripe.apiKey = secretKey;
    }

    public String processPayment(PaymentRequest paymentRequest) {
        try {
            PaymentIntent paymentIntent = createPaymentIntent(paymentRequest.getAmount(), paymentRequest.getPaymentMethod());
            //orderService.markOrderAsPaid(paymentRequest.getOrderId());
            return paymentIntent.getStatus();
        } catch (StripeException e) {
            return e.getMessage();
        }
    }

    private PaymentIntent createPaymentIntent(double price, String paymentMethod) throws StripeException {
        System.out.println(price);
        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount((long) (price * 100L))
                .setCurrency("USD")
                .setPaymentMethod(paymentMethod)
                .setConfirm(true)
                .build();
        return PaymentIntent.create(params);
    }
}

package com.ftn.paymentGateway.paymentStrategy;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ftn.paymentGateway.exceptions.InvalidPaymentTypeException;
import com.ftn.paymentGateway.model.TipPlacanja;
import com.ftn.paymentGateway.repository.TipPlacanjaRepository;

@Component
public class PaymentFactory {
	
	@Autowired 
	private TipPlacanjaRepository tipPlacanjaRepository;
	
	public PaymentFactory() {
		super();
	}

	public PaymentStrategy getPaymentStrategy(TipPlacanja tp) throws InvalidPaymentTypeException{
		
		if(tp == null) {
			throw new InvalidPaymentTypeException();
		}
		
		try {
			return (PaymentStrategy) Class.forName("com.ftn.paymentGateway.paymentStrategy.impl."+tp.getKlasa()).newInstance(); 
		}catch(Exception e) {
			throw new InvalidPaymentTypeException();
		}
		
	}
}

package com.demo.bankapp.test;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.demo.bankapp.model.Transaction;

class TransactionTest {
	
	Transaction transaction;

	@BeforeEach
	public void setup() {
		transaction = new Transaction();
	}
	
	@AfterEach
	public void afterTest(){
		transaction = null;
	}
	
	@Test
	public void getSenderAccountNo() throws Exception{
		Long senderAccountNo = 4L;
		transaction.setSenderAccountNo(senderAccountNo);
		assertEquals(senderAccountNo, transaction.getSenderAccountNo());
	}
	
	@Test
	public void getRecieverAccountNo() throws Exception{
		Long recieverAccountNo = 4L;
		transaction.setRecieverAccountNo(recieverAccountNo);
		assertEquals(recieverAccountNo, transaction.getRecieverAccountNo());
	}
	
	@Test
	public void getAmount() throws Exception{
		float amount = (float) 100.53;
		transaction.setAmount(amount);
		assertEquals(amount, transaction.getAmount());
	}

}

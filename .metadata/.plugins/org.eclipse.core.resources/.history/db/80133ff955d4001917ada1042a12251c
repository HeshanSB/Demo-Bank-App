package com.demo.bankapp.test;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.demo.bankapp.model.Account;

class AccountTest {

	Account account;
	
	@BeforeEach
	public void setup() {
		account = new Account();
	}
	
	@AfterEach
	public void afterTest() {
		account = null;
	}
	
	@Test
	public void getUserAccountNo() throws Exception{
		Long accountNo = 4L;
		account.setAccountNo(accountNo);
		assertEquals(accountNo, account.getAccountNo());
	}
	
	@Test
	public void getAvailableBalance() throws Exception{
		float availableBalance = (float) 100.59;
		account.setAvailableBalance(availableBalance);
		assertEquals(availableBalance, account.getAvailableBalance());
	}

}

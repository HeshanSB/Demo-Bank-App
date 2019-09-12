package com.demo.bankapp.test;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.demo.bankapp.dao.AccountDAO;
import com.demo.bankapp.model.Account;
import com.demo.bankapp.model.User;
import com.demo.bankapp.repository.AccountRepository;

class AccountDAOTest {
	
	@Mock
	AccountRepository accountRepository;
	
	@InjectMocks
	AccountDAO accountDao;
	
	Account account;
	
	@BeforeEach
	public void setup() {
		MockitoAnnotations.initMocks(this);
		account = new Account();
		account.setAccountNo(4L);
		account.setAvailableBalance(1000);
	}
	
	@Test
	public void getAllAccounts() {
		List<Account> list = new ArrayList<Account>();
		list.add(account);
		
		when(accountDao.findAll()).thenReturn(list);
		
		List<Account> usr = accountDao.findAll();
		assertEquals(usr.size(), 1);
		verify(accountRepository, times(1)).findAll();
	}
	
	@Test
	public void getAccountById() {
		when(accountDao.findOne(4L)).thenReturn(account);
		
		Account acc = accountDao.findOne(4L);
		assertEquals(acc.getAvailableBalance(), 1000);
		
	}
	
	@Test
	public void saveAccount() {
		accountDao.save(account);
		verify(accountRepository, times(1)).save(account);
	}

}

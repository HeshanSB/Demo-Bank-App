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

import com.demo.bankapp.dao.TransactionDAO;
import com.demo.bankapp.model.Transaction;
import com.demo.bankapp.model.User;
import com.demo.bankapp.repository.TransactionRepository;

class TransactionDAOTest {
	@Mock
	TransactionRepository transactionRepository;
	
	@InjectMocks
	TransactionDAO transactionDao;
	
	Transaction transaction;

	@BeforeEach
	public void setup() {
		MockitoAnnotations.initMocks(this);
		transaction = new Transaction();
		transaction.setAmount(1000);
		transaction.setId(4L);
		transaction.setRecieverAccountNo(1111);
		transaction.setSenderAccountNo(1000);
	}

	@Test
	public void getAllTrans() {
		List<Transaction> trans = new ArrayList<Transaction>();
		trans.add(transaction);
		
		when(transactionDao.findAll()).thenReturn(trans);
		
		List<Transaction> tran = transactionDao.findAll();
		assertEquals(tran.size(), 1);
		verify(transactionRepository, times(1)).findAll();
	}
	
	@Test
	public void getTransById() {
		when(transactionDao.findOne(4L)).thenReturn(transaction);
		
		Transaction trans = transactionDao.findOne(4L);
		assertEquals(trans.getAmount(), 1000);
		assertEquals(trans.getRecieverAccountNo(), 1111);
	}
	
	@Test
	public void saveTrans() {
		transactionDao.save(transaction);
		verify(transactionRepository, times(1)).save(transaction);
	}
}

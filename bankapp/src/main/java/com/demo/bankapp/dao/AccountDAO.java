package com.demo.bankapp.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.bankapp.model.Account;
import com.demo.bankapp.repository.AccountRepository;

@Service
public class AccountDAO {
	@Autowired
	AccountRepository accountRepository;
	
	public Account save(Account account) {
		return accountRepository.save(account);
	}
	
	public List<Account> findAll(){
		return accountRepository.findAll();
	}
	
	public Account findOne(Long accountNo) {
		return accountRepository.findOne(accountNo);
	}
	
	public void delete(Account account) {
		accountRepository.delete(account);
	}
}

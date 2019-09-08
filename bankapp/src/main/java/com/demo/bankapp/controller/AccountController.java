package com.demo.bankapp.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.demo.bankapp.dao.AccountDAO;
import com.demo.bankapp.model.Account;
import com.demo.bankapp.model.User;

@RestController
@RequestMapping("/bank")
@CrossOrigin(origins="http://localhost:3000")
public class AccountController {
	
	@Autowired
	AccountDAO accountDAO;
	
	@PostMapping("/accounts")
	public Account createAccount(@Valid @RequestBody Account account) {
		return accountDAO.save(account);
	}
	
	@GetMapping("/accounts")
	public List<Account> getAllAccount(){
		return accountDAO.findAll();
	}
	
	@GetMapping("/accounts/{id}")
	public ResponseEntity<Account> getUserById(@PathVariable(value="id") Long accountNo){
		Account account = accountDAO.findOne(accountNo);
		
		if(account==null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok().body(account);
	}
	
	@PutMapping("/accounts/{id}")
	public ResponseEntity<Account> updateUser(@PathVariable(value="id") Long accountNo, @Valid @RequestBody Account accountDetails){
		Account account = accountDAO.findOne(accountNo);
		
		if(account==null) {
			return ResponseEntity.notFound().build();
		}
		
		account.setAvailableBalance(accountDetails.getAvailableBalance());
		Account updateAccount = accountDAO.save(account);
		
		return ResponseEntity.ok().body(updateAccount);
	}
	
	@DeleteMapping("/accounts/{id}")
	public ResponseEntity<Account> deleteAccount(@PathVariable(value="id") Long accountNo){
		Account account = accountDAO.findOne(accountNo);
		
		if(accountNo==null) {
			return ResponseEntity.notFound().build();
		}
		accountDAO.delete(account);
		return ResponseEntity.ok().build(); 
	}

}

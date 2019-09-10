package com.demo.bankapp.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.demo.bankapp.dao.AccountDAO;
import com.demo.bankapp.dao.TransactionDAO;
import com.demo.bankapp.dao.UserDAO;
import com.demo.bankapp.model.Account;
import com.demo.bankapp.model.Transaction;
import com.demo.bankapp.model.User;
import com.demo.bankapp.service.Notification;

@RestController
@RequestMapping("/bank")
@CrossOrigin(origins="http://localhost:3000")
public class TransactionController {
	
	@Autowired
	TransactionDAO transactionDAO;
	
	@Autowired
	AccountDAO accountDAO;
	
	@Autowired
	UserDAO userDAO;
	
	@Autowired
	private Notification notification;
	
	@PostMapping("/transactions")
	public Map<String , String> createTransaction(@Valid @RequestBody Transaction trans) {
		HashMap<String, String> map = new HashMap<>();
		//find sender account
		Account senderAccount = accountDAO.findOne(trans.getSenderAccountNo());
		
		//find receiver account
		Account receiverAccount = accountDAO.findOne(trans.getRecieverAccountNo());
		User receiverProfile = userDAO.findOne(trans.getRecieverAccountNo());
		
		if(receiverAccount==null) {
			
			map.put("receiver","not Found");
			
		}
		else {
			
			if(senderAccount.getAvailableBalance() < trans.getAmount()) {
				map.put("amount", "less amount");
			}
			else {
			// update sender account balance
				float afterSenderBalance = senderAccount.getAvailableBalance() - trans.getAmount();
				senderAccount.setAvailableBalance(afterSenderBalance);
				accountDAO.save(senderAccount);
				
				// update receiver account balance
				float afterReceiverBalance = receiverAccount.getAvailableBalance() + trans.getAmount();
				receiverAccount.setAvailableBalance(afterReceiverBalance);
				accountDAO.save(receiverAccount);
				transactionDAO.save(trans);
				notification.sendNotifcation(senderAccount.getAccountNo(), receiverProfile.getUsername(), trans.getAmount() );
				map.put("receiver", "found");
				map.put("amount", "ok");
			}
			
		}
		return map;
	}
	
	@PostMapping("/transactions/trans")
	public Map<String , String> adminTransaction(@Valid @RequestBody Transaction trans) {
		HashMap<String, String> map = new HashMap<>();
		
		//find receiver account
		Account receiverAccount = accountDAO.findOne(trans.getRecieverAccountNo());
		User receiverProfile = userDAO.findOne(trans.getRecieverAccountNo());
		
		if(receiverAccount==null) {
			
			map.put("receiver","not Found");
			
		}
		else {	
			// update receiver account balance
			float afterReceiverBalance = receiverAccount.getAvailableBalance() + trans.getAmount();
			receiverAccount.setAvailableBalance(afterReceiverBalance);
			accountDAO.save(receiverAccount);
			transactionDAO.save(trans);
			map.put("receiver", "found");
			map.put("amount", "ok");
		}
		return map;
	}
	
	@GetMapping("/transactions")
	public List<Transaction> getAllTransactions(){
		return transactionDAO.findAll();
	}
	
	@GetMapping("/transactions/sender/{senderAccountNo}")
	public List<Transaction> getBySenderNumber(@PathVariable(value="senderAccountNo") Long senAccNo){
		List<Transaction> trans = transactionDAO.findBySenderAccountNo(senAccNo);
		if(trans==null) {
			return null;
		}
		return trans;
	}
	
	@GetMapping("/transactions/receiver/{receiverAccountNo}")
	public List<Transaction> getByReceiverNumber(@PathVariable(value="receiverAccountNo") Long recAccNo){
		List<Transaction> trans = transactionDAO.findByReceiverAccountNo(recAccNo);
		if(trans==null) {
			return null;
		}
		return trans;
	}
	
	@GetMapping("/transactions/{id}")
	public ResponseEntity<Transaction> getUserById(@PathVariable(value="id") Long transId){
		Transaction trans = transactionDAO.findOne(transId);
		
		if(trans==null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok().body(trans);
	}
	
	@PostMapping("/transactions/admin")
	public ResponseEntity<Transaction> bankAddMoney(@Valid @RequestBody Transaction trans){
		Transaction tran = transactionDAO.save(trans);
		if(tran==null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok().body(tran);
	}
	
//	@GetMapping("/transactions/mail")
//	public String sendEmail() {
//		try {
//			notification.sendNotifcation();
//		}catch(MailException e) {
//			System.out.println(e);
//		}
//		return "email sent";
//	}
	
//	@PostMapping("/transactions/money/{id}")
//	public Map<String, String>
	
//	@PutMapping("/transactions/{id}")
//	public ResponseEntity<Transaction> updateUser(@PathVariable(value="id") Long transId, @Valid @RequestBody Transaction transDetails){
//		Transaction trans = transactionDAO.findOne(transId);
//		
//		if(trans==null) {
//			return ResponseEntity.notFound().build();
//		}
//		
//		trans.setAccountNo(transDetails.getAccountNo());
//		usr.setName(usrDetails.getName());
//		
//		User updateUser = userDAO.save(usr);
//		
//		return ResponseEntity.ok().body(updateUser);
//	}
	
//	@DeleteMapping("/users/{id}")
//	public ResponseEntity<User> deleteUser(@PathVariable(value="id") Long usrId){
//		User usr = userDAO.findOne(usrId);
//		
//		if(usr==null) {
//			return ResponseEntity.notFound().build();
//		}
//		userDAO.delete(usr);
//		return ResponseEntity.ok().build(); 
//	}


}

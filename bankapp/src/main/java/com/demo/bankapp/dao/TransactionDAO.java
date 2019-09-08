package com.demo.bankapp.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.bankapp.model.Transaction;
import com.demo.bankapp.repository.TransactionRepository;

@Service
public class TransactionDAO {
	@Autowired
	TransactionRepository transactionRepository;
	
	public Transaction save(Transaction trans) {
		return transactionRepository.save(trans);
	}
	
	public List<Transaction> findAll(){
		return transactionRepository.findAll();
	}
	
	public List<Transaction> findBySenderAccountNo(Long senderAccountNo){
		return transactionRepository.findBySenderAccountNo(senderAccountNo);
	}
	
	public List<Transaction> findByReceiverAccountNo(Long receiverAccountNo){
		return transactionRepository.findByRecieverAccountNo(receiverAccountNo);
	}
	
	public Transaction findOne(Long transId) {
		return transactionRepository.findOne(transId);
	}
	
	public void delete(Transaction trans) {
		transactionRepository.delete(trans);
	}
}

package com.demo.bankapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.demo.bankapp.model.Transaction;



public interface TransactionRepository extends JpaRepository<Transaction, Long>{
	List<Transaction> findBySenderAccountNo(Long senderAccountNo);
	List<Transaction> findByRecieverAccountNo(Long recieverAccountNo);
}

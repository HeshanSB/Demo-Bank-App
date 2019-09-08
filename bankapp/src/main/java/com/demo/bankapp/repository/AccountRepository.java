package com.demo.bankapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.demo.bankapp.model.Account;

public interface AccountRepository extends JpaRepository<Account, Long> {
	
}

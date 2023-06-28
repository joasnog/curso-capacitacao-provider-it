package br.com.provider.trilhaProvider.acompanhamento.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.stereotype.Repository;

import br.com.provider.trilhaProvider.acompanhamento.Models.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

    List<Customer> findByName(String name);

}

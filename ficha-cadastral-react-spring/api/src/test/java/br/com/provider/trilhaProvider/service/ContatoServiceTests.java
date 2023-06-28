package br.com.provider.trilhaProvider.service;

import static org.junit.Assert.assertTrue;
// import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
// import java.util.Optional;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
// import org.mockito.MockitoAnnotations;

import br.com.provider.trilhaProvider.acompanhamento.DTO.CustomerDto;
import br.com.provider.trilhaProvider.acompanhamento.Models.Customer;
import br.com.provider.trilhaProvider.acompanhamento.Repositories.CustomerRepository;
import br.com.provider.trilhaProvider.acompanhamento.Services.CustomerService;

public class ContatoServiceTests {

        private CustomerService gestorService;

        @Mock
        private CustomerRepository gestorRepository;

        @Before
        public void setupMock() {

                // MockitoAnnotations.initMocks(this);
                gestorService = new CustomerService();
                gestorService.setContatoRepository(gestorRepository);
        }

        private Customer criarGestorGet(Long id) {
                Customer customer = new Customer();

                customer.setId(id);
                customer.setName("Nome");
                customer.setBirthday(new Date());

                return customer;
        }

        // private CustomerDto criarDto(Customer customer) {

        // CustomerDto retorno = new CustomerDto();

        // retorno.setId(customer.getId());
        // retorno.setName(customer.getName());
        // retorno.setBirthday(customer.getBirthday());

        // return retorno;
        // }

        @Test
        public void testGetAllGestor() {

                List<Customer> customers = new ArrayList<>();

                customers.add(criarGestorGet(1L));
                customers.add(criarGestorGet(2L));

                when(gestorRepository.findAll()).thenReturn(customers);
                List<CustomerDto> retornoContatos = gestorService.GetAll();

                assertTrue("A lista não pode ser nula: ", retornoContatos.size() > 0);

                assertTrue("Id não pode ser nulo: ", retornoContatos.get(0).getId() > 0);

                assertTrue("Nome do cliente não pode ser nulo: : ", retornoContatos.get(0)
                                .getName().equals(customers.get(0).getName()));

                assertTrue("Data de nascimento não pode ser nulo: ", retornoContatos.get(0).getBirthday()
                                .equals(customers.get(0).getBirthday()));

        }

}

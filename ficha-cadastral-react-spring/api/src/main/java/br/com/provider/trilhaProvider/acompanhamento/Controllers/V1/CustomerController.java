package br.com.provider.trilhaProvider.acompanhamento.Controllers.V1;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

import br.com.provider.trilhaProvider.acompanhamento.DTO.CustomerDto;
import br.com.provider.trilhaProvider.acompanhamento.Services.CustomerService;

@RestController
@RequestMapping("/customers")
public class CustomerController {

    // Injeção automática de dependência
    @Autowired
    private CustomerService customerService;

    // Obtém todos os clientes
    @CrossOrigin
    @GetMapping("")
    public ResponseEntity<List<CustomerDto>> getAllCustomers() {
        try {
            List<CustomerDto> customers = customerService.GetAll();
            if (customers.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(customers, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Obtém um cliente pelo id
    @CrossOrigin
    @GetMapping("/{id}")
    public ResponseEntity<CustomerDto> getCustomerById(@PathVariable("id") Long id) {
        try {
            CustomerDto customer = customerService.GetCustomerDtoID(id);
            if (customer == null) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(customer, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Cria um novo cliente
    @CrossOrigin
    @PostMapping("")
    public ResponseEntity<CustomerDto> createCustomer(@RequestBody CustomerDto customer) {
        try {
            CustomerDto newCustomer = customerService.save(customer);
            return new ResponseEntity<>(newCustomer, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Atualiza um cliente pelo id
    @CrossOrigin
    @PutMapping("/{id}")
    public CustomerDto updateCustomerById(@RequestBody CustomerDto customer, @PathVariable("id") Long id) {
        return customerService.updateById(customer, id);
    }

    // Deleta um cliente pelo id
    @CrossOrigin
    @DeleteMapping("/{id}")
    public ResponseEntity<CustomerDto> deleteCustomerById(@PathVariable("id") Long id) {
        try {
            CustomerDto customer = customerService.GetCustomerDtoID(id);
            if (customer == null) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            customerService.deleteById(id);
            return new ResponseEntity<>(customer, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    // Pesquisa um cliente pelo nome
    // @CrossOrigin
    // @GetMapping("findByNome/{name}")
    // public ResponseEntity<List<CustomerDto>> getAllCustomersByNome(@PathVariable
    // String name) {
    // try {
    // List<CustomerDto> customers = customerService.getByNomeGestor(name);
    // return new ResponseEntity<>(customers, HttpStatus.OK);

    // } catch (Exception e) {
    // return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    // }

    // }

}

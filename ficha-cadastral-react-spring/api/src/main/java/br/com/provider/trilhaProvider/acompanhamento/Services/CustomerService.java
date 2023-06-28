
package br.com.provider.trilhaProvider.acompanhamento.Services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.provider.trilhaProvider.acompanhamento.DTO.CustomerDto;
import br.com.provider.trilhaProvider.acompanhamento.Models.Customer;
import br.com.provider.trilhaProvider.acompanhamento.Repositories.CustomerRepository;

@Service
public class CustomerService {

    /**     
     */
    @Autowired
    CustomerRepository customerRepository;

    /**
     * @param id
     * @return
     */
    public CustomerDto GetCustomerDtoID(Long id) {
        Optional<Customer> optional = customerRepository.findById(id);
        if (optional.isPresent()) {
            return CustomerToCustomerDto(optional.get());
        }
        return null;
    }

    public void setContatoRepository(CustomerRepository gestorRepository) {
        this.customerRepository = gestorRepository;
    }

    public CustomerDto save(CustomerDto customerDto) {
        Customer customer = CustomerDtoToCustomer(customerDto);
        return CustomerToCustomerDto(customerRepository.save(customer));
    }

    public List<CustomerDto> GetAll() {
        return convertListToDto(customerRepository.findAll());
    }

    private Customer CustomerDtoToCustomer(CustomerDto customerDto) {
        Customer customer = new Customer();
        customer.setId(customerDto.getId());
        customer.setName(customerDto.getName());
        customer.setCpf(customerDto.getCpf());
        customer.setBirthday(customerDto.getBirthday());
        customer.setGender(customerDto.getGender());
        customer.setPhone(customerDto.getPhone());
        customer.setCep(customerDto.getCep());
        customer.setAddress(customerDto.getAddress());
        customer.setNumber(customerDto.getNumber());
        customer.setComplement(customerDto.getComplement());
        customer.setCreatedBy(customerDto.getCreatedBy());

        return customer;
    }

    private CustomerDto CustomerToCustomerDto(Customer customer) {
        CustomerDto customerDto = new CustomerDto();
        customerDto.setId(customer.getId());
        customerDto.setName(customer.getName());
        customerDto.setCpf(customer.getCpf());
        customerDto.setBirthday(customer.getBirthday());
        customerDto.setGender(customer.getGender());
        customerDto.setPhone(customer.getPhone());
        customerDto.setCep(customer.getCep());
        customerDto.setAddress(customer.getAddress());
        customerDto.setNumber(customer.getNumber());
        customerDto.setComplement(customer.getComplement());
        customerDto.setCreatedBy(customer.getCreatedBy());

        return customerDto;
    }

    private List<CustomerDto> convertListToDto(List<Customer> customer) {
        return customer.stream().map(t -> CustomerToCustomerDto(t)).collect(Collectors.toList());
    }

    public CustomerDto updateById(CustomerDto customerDto, Long id) {
        Optional<Customer> op = customerRepository.findById(id);
        if (op.isPresent()) {
            Customer obj = op.get();
            if (customerDto.getName() != null) {
                obj.setName(customerDto.getName());
            }
            if (customerDto.getBirthday() != null) {
                obj.setBirthday(customerDto.getBirthday());
            }

            if (customerDto.getCpf() != null) {
                obj.setCpf(customerDto.getCpf());
            }

            if (customerDto.getGender() != null) {
                obj.setGender(customerDto.getGender());
            }

            if (customerDto.getPhone() != null) {
                obj.setPhone(customerDto.getPhone());
            }

            if (customerDto.getCep() != null) {
                obj.setCep(customerDto.getCep());
            }

            if (customerDto.getAddress() != null) {
                obj.setAddress(customerDto.getAddress());
            }

            if (customerDto.getNumber() != null) {
                obj.setNumber(customerDto.getNumber());
            }

            if (customerDto.getComplement() != null) {
                obj.setComplement(customerDto.getComplement());
            }

            if (customerDto.getCreatedBy() != null) {
                obj.setCreatedBy(customerDto.getCreatedBy());
            }

            customerRepository.save(obj);
            return CustomerToCustomerDto(obj);
        }
        return null;
    }

    public CustomerDto deleteById(Long id) {
        Optional<Customer> op = customerRepository.findById(id);
        if (op.isPresent()) {
            Customer customer = op.get();
            customerRepository.delete(customer);
            return CustomerToCustomerDto(customer);
        }
        return null;
    }

    // TODO: precisa de revisão não esta bem feito
    public List<CustomerDto> getByNomeGestor(String name) throws Exception {

        List<CustomerDto> contatos = convertListToDto(
                customerRepository.findByName(name));
        if (contatos.size() == 0) {
            throw new Exception("NOT FOUND");
        }
        return contatos;
    }
}
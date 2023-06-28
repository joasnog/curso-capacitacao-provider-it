package br.com.provider.trilhaProvider.Controllers;

// import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

// import java.time.LocalDate;
// import static org.hamcrest.core.Is.is;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;

import br.com.provider.trilhaProvider.acompanhamento.Controllers.V1.CustomerController;
import br.com.provider.trilhaProvider.acompanhamento.DTO.CustomerDto;
import br.com.provider.trilhaProvider.acompanhamento.Services.CustomerService;

@WebMvcTest(CustomerController.class)
public class CustomerControllerTests {

    @MockBean
    private CustomerService customerService;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void testGetAllCustomers() throws Exception {

        List<CustomerDto> customers = new ArrayList<>();

        CustomerDto customer1 = new CustomerDto();
        customer1.setId(1);
        customer1.setName("Pedro Silva");
        customer1.setCep("65907340");
        customer1.setAddress("Rua Teste, Cidade Teste");
        customer1.setBirthday(new Date());
        customer1.setNumber("1269");
        customer1.setGender("Masculino");
        customer1.setCpf("613.926.154.88");
        customer1.setCreatedBy("teste");
        customer1.setComplement("");
        customer1.setPhone("99982579616");

        CustomerDto customer2 = new CustomerDto();
        customer2.setId(2);
        customer2.setName("Pedro Silva 2");
        customer2.setCep("65907340");
        customer2.setAddress("Rua Teste2, Cidade Teste2");
        customer2.setBirthday(new Date());
        customer2.setNumber("1269");
        customer2.setGender("Masculino");
        customer2.setCpf("613.926.154.88");
        customer2.setCreatedBy("teste2");
        customer2.setComplement("");
        customer2.setPhone("99982579616");

        customers.add(customer1);
        customers.add(customer2);

        when(customerService.GetAll()).thenReturn(customers);
        mockMvc.perform(get("/customers"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(customer1.getId()))
                .andExpect(jsonPath("$[0].name").value(customer1.getName()))
                .andExpect(jsonPath("$[0].cep").value(customer1.getCep()))
                .andExpect(jsonPath("$[0].address").value(customer1.getAddress()))
                // .andExpect(jsonPath("$[0].birthday").value(customer1.getBirthday()))
                .andExpect(jsonPath("$[0].number").value(customer1.getNumber()))
                .andExpect(jsonPath("$[0].gender").value(customer1.getGender()))
                .andExpect(jsonPath("$[0].cpf").value(customer1.getCpf()))
                .andExpect(jsonPath("$[0].createdBy").value(customer1.getCreatedBy()))
                .andExpect(jsonPath("$[0].complement").value(customer1.getComplement()))
                .andExpect(jsonPath("$[0].phone").value(customer1.getPhone()))

                .andExpect(jsonPath("$[1].id").value(customer2.getId()))
                .andExpect(jsonPath("$[1].name").value(customer2.getName()))
                .andExpect(jsonPath("$[1].cep").value(customer2.getCep()))
                .andExpect(jsonPath("$[1].address").value(customer2.getAddress()))
                // .andExpect(jsonPath("$[1].birthday").value(customer2.getBirthday()))
                .andExpect(jsonPath("$[1].number").value(customer2.getNumber()))
                .andExpect(jsonPath("$[1].gender").value(customer2.getGender()))
                .andExpect(jsonPath("$[1].cpf").value(customer2.getCpf()))
                .andExpect(jsonPath("$[1].createdBy").value(customer2.getCreatedBy()))
                .andExpect(jsonPath("$[1].complement").value(customer2.getComplement()))
                .andExpect(jsonPath("$[1].phone").value(customer2.getPhone()))
                .andDo(print());
    }

    @Test
    public void testCreateCustomerPost() throws Exception {
        CustomerDto customer = new CustomerDto();
        customer.setId(1);
        customer.setName("Pedro Silva");
        customer.setCep("65907340");
        customer.setAddress("Rua Teste, Cidade Teste");
        customer.setBirthday(new Date());
        customer.setNumber("1269");
        customer.setGender("Masculino");
        customer.setCpf("613.926.154.88");
        customer.setCreatedBy("teste");
        customer.setComplement("");
        customer.setPhone("99982579616");

        mockMvc.perform(post("/customers").contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(customer)))
                .andExpect(status().isCreated())
                .andDo(print());
    }

    // @Test
    // public void testCreategestorPost() throws Exception {

    // long id = 1L;

    // ContatoDto contato = new ContatoDto();

    // contato.setIdGestor(1);

    // contato.setIdBCP(1);

    // contato.setNomeGestor("contato x");

    // contato.setDataAdmissao(new Date());

    // when(gestorService.GetGestorID(id)).thenReturn(null);
    // when(gestorService.save(any(ContatoDto.class))).thenReturn(contato);

    // mockMvc.perform(post("/contatos").contentType(MediaType.APPLICATION_JSON)
    // .content(objectMapper.writeValueAsString(contato)))
    // .andExpect(status().isCreated())
    // .andDo(print());
    // }

    // @Test
    // public void testCreategestorPut() throws Exception {

    // long id = 1L;

    // ContatoDto contato = new ContatoDto();

    // contato.setIdGestor(1);

    // contato.setIdBCP(1);

    // contato.setNomeGestor("contato x");

    // contato.setDataAdmissao(new Date());

    // when(gestorService.GetGestorID(id)).thenReturn(null);
    // when(gestorService.save(any(ContatoDto.class))).thenReturn(contato);

    // mockMvc.perform(put("/contatos/{id}", id)
    // .contentType(MediaType.APPLICATION_JSON)
    // .content(objectMapper.writeValueAsString(contato)))
    // .andExpect(status().isOk())
    // .andDo(print());

    // }

    // @Test
    // public void testCreategestorGet() throws Exception {

    // long id = 1L;

    // ContatoDto contato = new ContatoDto();

    // contato.setIdGestor(1);

    // contato.setIdBCP(1);

    // contato.setNomeGestor("contato x");

    // contato.setDataAdmissao(java.sql.Date.valueOf(LocalDate.now()));

    // System.out.println("Today is : " + contato.getDataAdmissao());

    // when(gestorService.GetGestorID(id)).thenReturn(contato);
    // mockMvc.perform(get("/contatos/{id}", id))
    // .andExpect(status().isOk())
    // .andExpect(jsonPath("$.idGestor").value(id))
    // .andExpect(jsonPath("$.nomeGestor").value(contato.getNomeGestor()))
    // .andExpect(jsonPath("$.dataAdmissao", is(LocalDate.now().toString())))
    // .andDo(print());
    // }

    // @Test
    // public void testCreategestorGetAllNull() throws Exception {
    // when(gestorService.GetAll()).thenReturn(null);
    // mockMvc.perform(get("/contatos"))
    // .andExpect(status().is5xxServerError())
    // .andDo(print());
    // }

    // @Test
    // public void testCreategestorGetNull() throws Exception {

    // long id = 1L;

    // when(gestorService.GetGestorID(id)).thenReturn(null);
    // mockMvc.perform(get("/contatos/{id}", id))
    // .andExpect(status().isNoContent())
    // .andDo(print());
    // }

    // @Test
    // public void testCreategestorPostNull() throws Exception {

    // when(gestorService.save(any(ContatoDto.class))).thenReturn(null);

    // mockMvc.perform(post("/contatos").contentType(MediaType.APPLICATION_JSON)
    // .content(objectMapper.writeValueAsString(null)))
    // .andExpect(status().is4xxClientError())
    // .andDo(print());
    // }

    // @Test
    // public void testCreategestorPutNull() throws Exception {

    // when(gestorService.save(any(ContatoDto.class))).thenReturn(null);

    // mockMvc.perform(put("/contatos/{id}", 1)
    // .contentType(MediaType.APPLICATION_JSON)
    // .content(objectMapper.writeValueAsString(null)))
    // .andExpect(status().is4xxClientError())
    // .andDo(print());

    // }

    // @Test
    // public void testCreategestorPutException() throws Exception {

    // long id = 1L;
    // RuntimeException error = new RuntimeException("Hello");
    // when(gestorService.GetGestorID(id)).thenReturn(null)
    // .thenThrow(error);
    // when(gestorService.save(any(ContatoDto.class))).thenThrow(error);

    // when(gestorService.updateById(new ContatoDto(), id)).thenThrow(error);
    // // doThrow(new Exception()).when(gestorService.save(any(GestorDto.class)));

    // mockMvc.perform(put("/contatos/{id}", 1)
    // .contentType(MediaType.APPLICATION_JSON)
    // .content(objectMapper.writeValueAsString(null)))
    // .andExpect(status().is4xxClientError())
    // .andDo(print());

    // }

}

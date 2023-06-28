package br.com.provider.trilhaProvider.acompanhamento.DTO;

import java.util.Date;

import lombok.Data;

@Data
public class CustomerDto {

    private long id;

    private String name;

    private Date birthday;

    private String gender;

    private String phone;

    private String cpf;

    private String cep;

    private String address;

    private String complement;

    private String createdBy;

    private String number;

}

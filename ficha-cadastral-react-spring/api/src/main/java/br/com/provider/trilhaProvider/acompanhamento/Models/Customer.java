/*

Modelagem			Banco de dados			JAVA				DTO
customer			tb_Customer				customer			customer
 

*/

package br.com.provider.trilhaProvider.acompanhamento.Models;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.*;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import lombok.Data;

@Data
@Entity
@Table(name = "tb_customer")
public class Customer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @NotNull
    @Column(name = "name")
    private String name;

    @NotNull
    @Column(name = "gender")
    private String gender;

    @NotNull
    @Column(name = "phone")
    private String phone;

    @NotNull
    @Column(name = "birthday")
    private Date birthday;

    @NotNull
    @Column(name = "cpf")
    private String cpf;

    @NotNull
    @Column(name = "cep")
    private String cep;

    @NotNull
    @Column(name = "address")
    private String address;

    @Column(name = "complement")
    private String complement;

    @NotNull
    @Column(name = "createdBy")
    private String createdBy;

    @NotNull
    @Column(name = "number")
    private String number;

}
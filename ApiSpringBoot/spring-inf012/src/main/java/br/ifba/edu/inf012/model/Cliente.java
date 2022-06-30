package br.ifba.edu.inf012.model;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

public class Cliente {

	@GeneratedValue
	@Id
	private int id;
	@Column(name="nome")
	private String nome;
	@Column(name="cnpj")
	private String cnpj;
	@Column(name="endereco")
	private String endereco;
	@Column(name="cadastroEm")
	private String cadastroEm;
	

	public Cliente(){
	}
	public Cliente(String name,int age){
	    this.nome = nome;
	    this.cnpj = cnpj;
	    this.endereco = endereco;
	    this.cadastroEm = cadastroEm;
	}
	
	public String getCadastroEm() {
		return cadastroEm;
	}
	public void setCadastroEm(String cadastroEm) {
		this.cadastroEm = cadastroEm;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public String getCnpj() {
		return cnpj;
	}
	public void setCnpj(String cnpj) {
		this.cnpj = cnpj;
	}
	public String getEndereco() {
		return endereco;
	}
	public void setEndereco(String endereco) {
		this.endereco = endereco;
	}
	
	
}

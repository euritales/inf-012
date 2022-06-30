package br.ifba.edu.inf012.model;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

public class User {

	@GeneratedValue
	@Id
	private int id;
	@Column(name="nome")
	private String nome;
	@Column(name="email")
	private String email;
	

	public User(){
	}
	public User(String name,int age){
	    this.nome = nome;
	    this.email = email;
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
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	
}

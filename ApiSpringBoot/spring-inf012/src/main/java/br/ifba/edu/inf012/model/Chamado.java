package br.ifba.edu.inf012.model;

import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

public class Chamado {

	@GeneratedValue
	@Id
	private int id;
	@ManyToOne(fetch= FetchType.LAZY)
	private Cliente cliente;
	@Column(name="assunto")
	private String assunto;
	@Column(name="status")
	private String status;
	@Column(name="complemento")
	private String complemento;
	
	public Chamado(){
	}
	public Chamado(String name,int age){
	    this.cliente= cliente;
	    this.assunto = assunto;
	    this.status= status;
	    this.complemento = complemento; 
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public Cliente getCliente() {
		return cliente;
	}
	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
	}
	public String getAssunto() {
		return assunto;
	}
	public void setAssunto(String assunto) {
		this.assunto = assunto;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getComplemento() {
		return complemento;
	}
	public void setComplemento(String complemento) {
		this.complemento = complemento;
	}
	

}

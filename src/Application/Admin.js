import React, { Component } from 'react';
import '../styles/main.css';
import '../styles/banks/societe_generale.css';
import '../bulma.min.css';
import visa from '../images/visa.png';
import mastercard from '../images/masterard.png';
import axios from 'axios';

import { faSignOutAlt, /*faArrowDown, faArrowUp, */ faPhone, faEnvelope, /*faInfoCircle*/ } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Admin extends Component {

    state = {
        bankPhone : "",
        bankMail : "",

        decouvert : 0,
        montant : '',

        numerocompte : '',
        email : "",

        numerofermeture : ''
    }

    //Methode appelee une seule fois lorsque le composant est monte
    componentDidMount() {
        var data = require('../data/societe_generale.json');
        this.setState({
          bankPhone : data.phoneNumber,
          bankMail : data.mail
        })
        //Requete pour recuperer le montant de decouvert actuel
        axios.get('http://localhost:8080/devrepBanque/DecouvertServlet')
        .then(response => {
          this.setState({
            decouvert : response.data
          })
        })
        .catch(error => {
          console.log(error)
        })
    }

    deconnexion = () => {
      this.props.logout()
    }

    //Fonction pour recuperer ce qui est saisi par le client dans le formulaire
    handleForm = event => {
      this.setState({
        [event.target.name] : event.target.value
      })
    }

    //Fonction appelee lors de la validation du formulaire pour mettre a jour le montant de decouvert
    handleDecouvert = event => {
      //Permet de ne pas rafraichir la page apres vdalidation du formulaire
      event.preventDefault();
      
      //Requete de modification du decouvert
      axios.post('http://localhost:8080/devrepBanque/DecouvertServlet', this.state.montant)
        .then(response => {
          this.setState({
            decouvert : response.data
          })
        })
        .catch(error => {
          console.log(error)
        })
      
      this.setState({
        montant : ''
      })
    }

    //Fonction appellee lors de la validation du formulaire de creation d'un nouveau compte client
    handleCreationCompte = event => {
      //Permet de ne pas rafraichir la page apres validation du formulaire
      event.preventDefault();

      var req = "creation+" + this.state.email + "+" + this.state.numerocompte

      //Requete de creation d'un nouveau compte
      axios.post('http://localhost:8080/devrepBanque/CompteServlet', req)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })

      this.setState({
        email : '',
        numerocompte : ''
      })
    }

    handleFermeture = event => {
      event.preventDefault();

      var req = "fermeture+" + this.state.numerofermeture

      //Requete de fermeture de compte
      axios.post('http://localhost:8080/devrepBanque/CompteServlet', req)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })      

      this.setState({
        numerofermeture : ''
      })
    }

    render() {
    return (
      <div className="container" style={{marginTop: '5%'}}>

        <div className="column" style={{textAlign: 'right'}}>
          <span id="logout-button-container">
            <button className="button is-danger is-outlined" id="logout-button" onClick={this.deconnexion}>
              <span className="icon">
                <FontAwesomeIcon icon={faSignOutAlt} />
              </span>
              <span>Logout</span>
            </button>
          </span> 
          <span id="logged-tag" className="tag is-success is-medium">Connected</span>
        </div>

        <section className="section">
          <div className="container">
            <h1 className="title primary-color-text" id="bankNameContainer">Compte administrateur</h1>
          </div>
        </section>
      
        <div className="columns is-mobile">
      
          <div className="column is-4 is-offset-0">
            <div className="box">
              <form onSubmit={this.handleDecouvert}>
                <strong>Découvert</strong><br/><br/>
                Montant découvert actuel : <strong>{this.state.decouvert}</strong>
                <br/><br/>
                <label>Nouveau montant autorisé : </label><br/>
                <input type="text" name="montant" value={this.state.montant} placeholder='montant' onChange={this.handleForm}/>
                <br/><br/>
                <input type="submit" value="Valider"/>
              </form>
            </div>
          </div>

          <div className="column is-4 is-offset-0">
            <div className="box">
              <form onSubmit={this.handleCreationCompte}>
                <strong>Création de compte client</strong>
                <br/><br/>
                <label>Numéro de compte : </label><br/>
                <input type="text" name="numerocompte" value={this.state.numerocompte} placeholder='numero de compte' onChange={this.handleForm}/>
                <br/>
                <label>Adresse email : </label><br/>
                <input type="text" name="email" value={this.state.email} placeholder='email' onChange={this.handleForm}/>
                <br/><br/>
                <input type="submit" value="Créer" />
              </form>
            </div>
          </div>

          <div className="column is-4 is-offset-0">
            <div className="box">
              <form onSubmit={this.handleFermeture}>
                <strong>Fermeture de compte</strong>
                <br/><br/>
                <label>Numéro de compte : </label><br/>
                <input type="text" name="numerofermeture" value={this.state.numerofermeture} placeholder='numero de compte' onChange={this.handleForm}/>
                <br/><br/><br/><br/>
                <input type="submit" value="Cloturer" />
              </form>
            </div>
          </div>

        </div>
      
        <div className="columns is-mobile">
          <div className="column is-6">
            <div className="content secondary-color-text">
              Contact
              <ul>
                <li>
                  <FontAwesomeIcon icon={faPhone} />
                  <span id="phoneNumberContainer"> {this.state.bankPhone}</span>
                </li>
                <li>
                  <FontAwesomeIcon icon={faEnvelope} />
                  <span id="mailContainer"> {this.state.bankMail}</span>
                </li>
              </ul>
            </div>
          </div>
      
          <div className="column is-offset-4 is-2">
            <div className="columns is-mobile">
              <div className="column is-half">
                <figure className="image is-64x64">
                  <img src={mastercard} alt="neMarchePas" />
                </figure>
              </div>
              <div className="column is-half">
                <figure className="image is-64x64">
                  <img style={{marginTop: '13px'}} src={visa} alt="neMarchePas" />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Admin;
import React, { Component } from 'react';
import '../styles/main.css';
import '../styles/banks/societe_generale.css';
import '../bulma.min.css';
import socgen from '../images/bank_icons/societe_generale.png';
import visa from '../images/visa.png';
import mastercard from '../images/masterard.png';
import axios from 'axios';

import { faSignOutAlt, faArrowDown, faArrowUp, faPhone, faEnvelope, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Compte extends Component {
  
  state = {
    n_account : 0,
    balance : 0,
    bankName : "",
    bankDescription : "",
    bankPhone : "",
    bankMail : "",

    destinataire : '',
    montant : '',

    decouvert : ''
  }

  //Methode appelee une seule fois lorsque le composant est monte
  componentDidMount() {
    //Recuperer les informations depuis un fichier JSON
    var data = require('../data/societe_generale.json');
    this.setState({
      bankName : data.name,
      bankDescription : data.description,
      bankPhone : data.phoneNumber,
      bankMail : data.mail
    })

    var req = "first+" + this.props.whoisconnected

    //Requete vers servlet Compte, utiliser this.props.whoIsConnected pour aller chercher le compte avec l'adresse mail
    axios.post('http://localhost:8080/devrepBanque/CompteServlet', req)
      .then(response => {
        var respdata = response.data.split("+");
        this.setState({
          n_account : respdata[0],
          balance : respdata[1]
        })
      })
      .catch(error => {
        console.log(error)
      })

    //recuperer le montant de decouvert actuel avec une requete get sur le servlet Decouvert
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

  //Fonction appelee pour retirer 200 
  withdraw = () => {
    var montantChaqueRetrait = 200
    if(this.state.balance - montantChaqueRetrait < this.state.decouvert) {
      //Retourne une alerte si le retrait depasse le decouvert autorise
      alert("Plafond de découvert atteint !\nImpossible de retirer plus")
      return
    }

    //Sinon requete vers le serveur pour mettre a jour la valeur dans la base de donnees
    axios.post('http://localhost:8080/devrepBanque/CompteServlet', "withdraw")
      .then(response => {
        this.setState({
          balance : response.data
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  //Fonction appelee pour ajouter 200
  deposit = () => {
    //Requete vers le serveur pour mettre a jour la valeur dans la base de donnees
    axios.post('http://localhost:8080/devrepBanque/CompteServlet', "deposit")
      .then(response => {
        this.setState({
          balance : response.data
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  deconnexion = () => {
    //Reinitialisation des etats
    this.setState({
      n_account : 0,
      balance : 0
    })
    //Appelle la fonction passee en parametre par App pour mettre a jour l'etat et revenir sur l'ecran de connexion
    this.props.logout()
  }

  //Fonction pour recuperer ce qui est saisi par le client dans le formulaire
  handleForm = event => {
    this.setState({
      [event.target.name] : event.target.value 
    })
  }

  //Fonction pour le transfert d'une somme d'un client vers un autre
  transfert = event => {
    //Pour ne pas refraichir la page apres avoir soumis la requete
    event.preventDefault();
  
    var req = "transfert+" + this.state.destinataire + "+" + this.state.montant

    //Requete vers le serveur
    axios.post('http://localhost:8080/devrepBanque/CompteServlet', req)
      .then(response => {
        this.setState({
          balance : response.data
        })
      })
      .catch(error => {
        console.log(error)
      })
    
    this.setState({
      destinataire : '',
      montant : ''
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
            <h1 className="title primary-color-text" id="bankNameContainer">{this.state.bankName}</h1>
            <h2 className="subtitle secondary-color-text" id="bankDescriptionContainer">{this.state.bankDescription}</h2>
          </div>
        </section>
      
        <div className="columns is-mobile">
      
          <div className="column is-4 is-offset-0">
            <div className="box">
              <article className="media">
                <div className="media-left">
                  <figure className="image is-64x64">
                    <img src={socgen} alt="neMarchePas" />
                  </figure>
                </div>
                <div className="media-content">
                  <div className="content">
                    <p>
                      <strong>Account n° <span id="accountId">{this.state.n_account}</span></strong> <br />
                      <small>Current balance : <span id="accountBalance">{this.state.balance}</span>
                        <span id="accountCurrency"></span></small>
                    </p>
                  </div>
                  <nav className="level is-mobile">
                    <div className="level-left">
                      <a className="level-item" href="https://particuliers.societegenerale.fr/" aria-label="info">
                        <span className="icon is-small primary-color-text">
                        <FontAwesomeIcon icon={faInfoCircle}/>
                        </span>
                      </a>
                    </div>
                  </nav>
                </div>
              </article>
            </div>
          </div>

          <div className="column is-4 is-offset-0">
            <div className="box">
              <form onSubmit={this.transfert}>
                <strong>Transfert</strong>
                <br/>
                <label>Destinataire (N° compte) : </label><br/>
                <input type="text" name="destinataire" value={this.state.destinataire} placeholder='numero de compte' onChange={this.handleForm}/>
                <br/>
                <label>Montant : </label><br/>
                <input type="text" name="montant" value={this.state.montant} placeholder='montant' onChange={this.handleForm}/>
                <br/><br/>
                <input type="submit" value="Transferer"/>
              </form>
            </div>
          </div>

          <div className="column is-4 is-offset-0">
            <iframe title="Converter" src="https://xeconvert.com/widget1?from=usd&to=eur&lang=&theme=blue&font=12"
              width="100%" height="100%"></iframe>
          </div>


        </div>
      
        <div className="columns">
          <div className="column" style={{textAlign: 'start'}}>
            <button id="withdraw-button" onClick={this.withdraw} className="button primary-color">
              <span className="icon">
                <FontAwesomeIcon icon={faArrowDown} />
              </span>
              <span>Withdraw</span>
            </button>
          </div>
          <div className="column" style={{textAlign: 'end'}}>
            <button id="deposit-button" onClick={this.deposit} className="button secondary-color">
              <span className="icon">
                <FontAwesomeIcon icon={faArrowUp} />
              </span>
              <span>Deposit</span>
            </button>
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

export default Compte;
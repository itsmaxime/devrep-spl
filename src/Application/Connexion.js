import React, { Component } from 'react';
import '../styles/main.css';
import '../styles/banks/societe_generale.css';
import '../bulma.min.css';

import { faGoogle, faMicrosoft, faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import socialMediaAuth from '../service/auth';
import { googleProvider, githubProvider } from '../Config/authMethods';

class Connexion extends Component {

  //Fixer l'adresse de l'administrateur 
  state = {
    admin : "devrepadm@gmail.com"
  }

  //Passe par firebase pour la connexion aux comptes
  handleOnClick = async (provider) => {
    const res = await socialMediaAuth(provider);
    console.log(res)
    if(res.email === this.state.admin) {
      //Connexion de l'administrateur
      this.props.fctAdmin()
    }
    if(res.emailVerified === true) {
      //Appeler la fonction du Composant App, l'utilisateur est connecte donc passer l'etat connected a true
      //Passer en parametre l'adresse email de l'utilisateur qui vient de se connecter
      this.props.fctConnection(res.email)
    }
  }

  render() {
    return (
      <div className="container" style={{marginTop: '5%'}}>
        <div className="columns">
          <div className="column">
            <span id="login-buttons-container">
              <button className="button is-info is-outlined" id="google-login-button" style={{display: 'default'}} onClick={() => this.handleOnClick(googleProvider)}>
                <span className="icon">
                  <FontAwesomeIcon icon={faGoogle}/>
                </span>
                <span>Google login</span>
              </button>
              <button className="button is-link is-outlined" id="microsoft-login-button">
                <span className="icon">
                <FontAwesomeIcon icon={faMicrosoft}/>
                </span>
                <span>Microsoft login</span>
              </button>
              <button className="button is-dark is-outlined" id="github-login-button" onClick={() => this.handleOnClick(githubProvider)}>
                <span className="icon">
                <FontAwesomeIcon icon={faGithub}/>
                </span>
                <span>Github login</span>
              </button>
            </span>
          </div>
          <div className="column" style={{textAlign: 'right'}}>
            <span id="not-logged-tag" className="tag is-warning is-medium">Not connected</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Connexion;
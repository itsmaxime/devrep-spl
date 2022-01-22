import React, { Component } from 'react';

import Connexion from './Connexion'
import Compte from './Compte'
import Admin from './Admin'

import '../styles/main.css';
import '../styles/banks/societe_generale.css';
import '../bulma.min.css';

class App extends Component {
  
  state = {
    connected : false,
    whoIsConnected : "",
    admin : false
  }

  //Fonction passee en parametre du composant Connexion qui l'appellera une fois que le client sera connecte
  setConnection = (whoisconnected) => {
    //Mise a jour des etats
    this.setState({
      connected : true,
      whoIsConnected : whoisconnected
    })
    this.forceUpdate()
  }

  //Fonction egalement utilisee pour specifier qu'il s'agit de l'administrateur qui s'est connecte
  setAdmin = () => {
    this.setState({
      admin : true
    })
    this.forceUpdate()
  }

  //Fonction appelee par le client et l'admin lorsqu'ils se deconnectent, reinitialise les etats
  logout = () => {
    this.setState({
      connected : false,
      whoIsConnected : "",
      admin : false
    })
    this.forceUpdate()
  }

  render() {
    if(!this.state.connected) {
      //Page de connexion
      return (
        <div>
          <Connexion fctConnection={this.setConnection} fctAdmin={this.setAdmin}/>
        </div>
      );
    } else if (this.state.connected && this.state.admin) {
      //Connexion admin
      return (
        <div>
          <Admin logout={this.logout}/>
        </div>
      );
    } else {
      //Connexion client
      //Passer whoIsConnected en props pour que le composant compte puisse aller recuperer le numero
      //de compte dans la base de donnees
      return (
        <div>
          <Compte whoisconnected={this.state.whoIsConnected} logout={this.logout}/>
        </div>
      );
    }
  }
}

export default App;
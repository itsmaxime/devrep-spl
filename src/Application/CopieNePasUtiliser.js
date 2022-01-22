import React, { Component } from 'react';
import '../styles/main.css';
import '../styles/banks/societe_generale.css';
import '../bulma.min.css';
import socgen from '../images/bank_icons/societe_generale.png';
import visa from '../images/visa.png';
import mastercard from '../images/masterard.png';

import { faSignOutAlt, faArrowDown, faArrowUp, faPhone, faEnvelope, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faMicrosoft, faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class App extends Component {
  
  render() {
    return (
      <div className="container" style={{marginTop: '5%'}}>
        <div className="columns">
          <div className="column">
            <span id="login-buttons-container">
              <button className="button is-info is-outlined" id="google-login-button" style={{display: 'default'}}>
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
              <button className="button is-dark is-outlined" id="github-login-button">
                <span className="icon">
                <FontAwesomeIcon icon={faGithub}/>
                </span>
                <span>Github login</span>
              </button>
            </span>
            <span id="logout-button-container">
              <button className="button is-danger is-outlined" id="logout-button">
                <span className="icon">
                  <FontAwesomeIcon icon={faSignOutAlt} />
                </span>
                <span>Logout</span>
              </button>
            </span>
          </div>
      
          <div className="column" style={{textAlign: 'right'}}>
            <span id="logged-tag" className="tag is-success is-medium">Connected</span>
            <span id="not-logged-tag" className="tag is-warning is-medium">Not connected</span>
          </div>
        </div>
      
        <section className="section">
          <div className="container">
            <h1 className="title primary-color-text" id="bankNameContainer"></h1>
            <h2 className="subtitle secondary-color-text" id="bankDescriptionContainer"></h2>
          </div>
        </section>
      
        <div className="columns is-mobile">
      
          <div className="column is-4 is-offset-2">
            <div className="box">
              <article className="media">
                <div className="media-left">
                  <figure className="image is-64x64">
                    <img src={socgen} alt="Image" />
                  </figure>
                </div>
                <div className="media-content">
                  <div className="content">
                    <p>
                      <strong>Account n°<span id="accountId"></span></strong> <br />
                      <small>Current balance : <span id="accountBalance"></span>
                        <span id="accountCurrency"></span></small>
                    </p>
                  </div>
                  <nav className="level is-mobile">
                    <div className="level-left">
                      <a className="level-item" aria-label="info">
                        <span className="icon is-small primary-color-text">
                        <FontAwesomeIcon icon={faInfoCircle} />
                        </span>
                      </a>
                    </div>
                  </nav>
                </div>
              </article>
            </div>
          </div>
          <div className="column is-4 is-offset-1">
            <iframe title="Converter" src="https://xeconvert.com/widget1?from=usd&to=eur&lang=&theme=blue&font=12"
              width="100%" height="100%"></iframe>
          </div>
        </div>
      
        <div className="columns">
          <div className="column" style={{textAlign: 'start'}}>
            <button id="withdraw-button" onclick="withdraw()" className="button primary-color">
              <span className="icon">
                <FontAwesomeIcon icon={faArrowDown} />
              </span>
              <span>Withdraw</span>
            </button>
          </div>
          <div className="column" style={{textAlign: 'end'}}>
            <button id="deposit-button" onclick="deposit()" className="button secondary-color">
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
                  <span id="phoneNumberContainer"></span>
                </li>
                <li>
                  <FontAwesomeIcon icon={faEnvelope} />
                  <span id="mailContainer"></span>
                </li>
              </ul>
            </div>
          </div>
      
          <div className="column is-offset-4 is-2">
            <div className="columns is-mobile">
              <div className="column is-half">
                <figure className="image is-64x64">
                  <img src={mastercard} alt="Image" />
                </figure>
              </div>
              <div className="column is-half">
                <figure className="image is-64x64">
                  <img style={{marginTop: '13px'}} src={visa} alt="Image" />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

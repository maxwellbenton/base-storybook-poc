import { Component, Method, State, h } from '@stencil/core';
import sign from 'jwt-encode';

@Component({
  tag: 'dpa-token-generator',
  styleUrl: 'dpa-token-generator.css',
  shadow: true,
})
export class DPATokenGenerator {
  @State() dpaToken: string = '';

  @Method()
  handleSubmit(event) {
    event.preventDefault();
    const dpaId = event.target.elements[0].value;
    const defaultLocale = event.target.elements[1].value;
    const supportedCardBrands = {
      mastercard: event.target.elements[2].checked,
      maestro: event.target.elements[3].checked,
      visa: event.target.elements[4].checked,
      amex: event.target.elements[5].checked,
      discover: event.target.elements[6].checked,
    }
    const supportedAuthenticationMethods = {
      threeDS: event.target.elements[7].checked,
      lowValueLowRisk: event.target.elements[8].checked,
    }
    const coBrandNames = event.target.elements[9].value;
    const handleFinalPaymentConfirmation = event.target.elements[10].checked;
    const receiveConsumerInformationAfterCheckout = event.target.elements[11].checked;

    console.log(dpaId, supportedCardBrands)
    const secret = 'mastercard-token-generator-secret';
    const data = {
      dpaId,
      defaultLocale,
      supportedCardBrands,
      supportedAuthenticationMethods,
      coBrandNames,
      handleFinalPaymentConfirmation,
      receiveConsumerInformationAfterCheckout,
      iat: Date.now()
    };
    const jwt = sign(data, secret);
    console.log({ jwt })
    this.dpaToken = jwt;
    return new Promise<void>((resolve) => { resolve() });
  }

  render() {
    return (
      <div>
        <header>
          <h1>Click To Pay DPA Token Generator</h1>
        </header>
        <main>
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <div>
              <h3>Digital Payment Application ID</h3>
              <label>
                <input
                  type="text"
                  defaultValue='b756a2b0-ef62-4c62-a6de-f72e75ce5f17'
                />
              </label>
            </div>
            <div>
              <label>
                Default Locale
                <input
                  type="text"
                  defaultValue='en_US'
                />
              </label>
            </div>
            <div>
              <h3>Supported Card Brands</h3>
              <span>
                <input
                  id="enable-mastercard"
                  type="checkbox"
                  defaultChecked={true}
                />
                <label htmlFor="enable-mastercard">Mastercard</label>
              </span>
              <span>
                <input
                  id="enable-maestro"
                  type="checkbox"
                />
                <label htmlFor="enable-maestro">Maestro</label>
              </span>
              <span>
                <input id="enable-visa" type="checkbox" />
                <label htmlFor="enable-visa">Visa</label>
              </span>
              <span>
                <input id="enable-amex" type="checkbox" />
                <label htmlFor="enable-amex">Amex</label>
              </span>
              <span>
                <input id="enable-discover" type="checkbox" />
                <label htmlFor="enable-discover">Discover</label>
              </span>
            </div>
            <div>
              <h3>Supported Authentication Methods</h3>
              <span>
                <input id="enable-3ds" type="checkbox" />
                <label htmlFor="enable-3ds">3DS</label>
              </span>
              <span>
                <input id="enable-lvlr" type="checkbox" />
                <label htmlFor="enable-lvlr">Low Value / Low Risk</label>
              </span>
            </div>
            <div>
              <h3>Checkout Experience Configuration</h3>
              <span>
                <label>
                  Co-Brand Names
                  <input
                    type="text"
                    defaultValue=''
                  />
                </label>
              </span>
              <span>
                <input id="enable-confirm-payment" type="checkbox" />
                <label htmlFor="enable-confirm-payment">Handle final payment confirmation</label>
              </span>
              <span>
                <input id="enable-confirm-payment" type="checkbox" />
                <label htmlFor="enable-confirm-payment">Receive consumer information after checkout</label>
              </span>
            </div>
            <input type="submit" value="Generate Token" />
          </form>
        </main>
        <section>
          <h2>Token</h2>
          <p>{this.dpaToken}</p>
        </section>
      </div>
    );
  }
}

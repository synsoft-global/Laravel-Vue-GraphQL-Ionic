import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
declare let require: any;
import * as Web3 from "web3";
import * as TruffleContract from "truffle-contract";

declare let window: any;

@Injectable()
export class Web3Service {
  private web3: any;
  public ready = false;

  public accountsObservable = new Subject<string[]>();

  constructor() {
    window.addEventListener("load", event => {
      this.bootstrapWeb3();
    });
  }

  public bootstrapWeb3() {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof window.ethereum !== "undefined") {
      // Use Mist/MetaMask's provider
      window.ethereum.enable().then(() => {
        this.web3 = new Web3(window.ethereum);
      });
    } else {
      console.log("No web3? You should consider trying MetaMask!");

      // Hack to provide backwards compatibility for Truffle, which uses web3js 0.20.x
      Web3.providers.HttpProvider.prototype.sendAsync =
        Web3.providers.HttpProvider.prototype.send;
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      this.web3 = new Web3(
        new Web3.providers.HttpProvider("http://localhost:8545")
      );
    }
  }

  public async artifactsToContract(artifacts) {

    if (!this.web3) {
      const delay = new Promise(resolve => setTimeout(resolve, 100));
      await delay;
      return await this.artifactsToContract(artifacts);
    }

    const contractAbstraction = TruffleContract(artifacts);
    contractAbstraction.setProvider(this.web3.currentProvider);
    return contractAbstraction;
  }
}

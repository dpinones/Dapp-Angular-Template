import {
  Injectable,
  ɵCompiler_compileModuleSync__POST_R3__,
} from '@angular/core';
import { Contract, ethers, BigNumber } from 'ethers';
import * as abis from './../../../utils/getAbis';
// import * as artfinabi from './../../../constants/abis/artfin.json';
const artfinabi = require('./../../../constants/abis/artfin.json');
import { getContractAddress } from 'ethers/lib/utils';

declare let window: any;

@Injectable({
  providedIn: 'root',
})
export class BlockchainService {
  ethereum: any;
  private signer: any;
  private enable: any;
  private accounts: any;
  constructor() {}

  async connectToMetamask() {
    if (window.ethereum === undefined) {
      alert('Non-Ethereum browser detected. Install MetaMask');
    } else {
      if (typeof window.ethereum !== 'undefined') {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        //this.ethereum = await window.ethereum.currentProvider;
        //console.log(this.ethereum);
      }
      this.enable = this.enableMetaMaskAccount();
    }
  }

  private async enableMetaMaskAccount(): Promise<any> {
    let enable = false;
    await new Promise((resolve, reject) => {
      enable = window.ethereum.request({ method: 'eth_requestAccounts' });
    });
    return Promise.resolve(enable);
  }

  async getAccount() {
    let accounts: [];
    accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    return accounts;
  }

  async getChainId() {
    let chainId: number;
    console.log('window.ethereum = ', window.ethereum);
    chainId = parseInt(window.ethereum.chainId);
    return chainId;
  }

  async getBnbBalance(address: string) {
    let balance: string;
    balance = await window.ethereum.request({
      method: 'eth_getBalance',
      params: [address, 'latest'],
    });
    return balance;
  }

  async sendEther(sender: string, receiver: string, amount: string, payment: string) {

    let paymentContract: Contract;
    var provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    paymentContract = new ethers.Contract(
      payment,
      abis.getAbiForPayment(),
      signer
    );
    paymentContract.connect(signer);
    // Acccounts now exposed
    const params = { value: ethers.utils.parseEther(amount) };
    console.log('ethers.utils.parseEther(amount):', ethers.utils.parseEther(amount))
    await paymentContract.nuevaTransaccion(receiver, params);
  }

  async getHolaMundo(payment: string) {
    let paymentContract: Contract;
    var provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    paymentContract = new ethers.Contract(
      payment,
      abis.getAbiForPayment(),
      signer
    );
    paymentContract.connect(signer);
    let holaMundo: string;
    holaMundo = await paymentContract.holaMundo();
    console.log('holaMundo = ', holaMundo);
    return holaMundo;
  }
}

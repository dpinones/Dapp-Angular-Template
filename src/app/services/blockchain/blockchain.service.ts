import {
  Injectable,
  ɵCompiler_compileModuleSync__POST_R3__,
} from '@angular/core';
import { Contract, ethers } from 'ethers';
import * as abis from './../../../utils/getAbis';
// import * as artfinabi from './../../../constants/abis/artfin.json';
const artfinabi = require("./../../../constants/abis/artfin.json");
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
  private pancakeSwapContract = '0x10ED43C718714eb63d5aA57B78B54704E256024E';
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
  async mintArtfin() {
    var accountconnect = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });

    var provider = new ethers.providers.Web3Provider(window.ethereum);

    var signer = provider.getSigner();
    console.log('Signer : ' + signer);

    const tokenaddress = '0x80Ce15D1bAcf1d672F7d4c301FF24f8dA6fBf5E1';

    const contract = new ethers.Contract(tokenaddress, artfinabi, signer);

    const mintAddress = '0x9803Ce33953964D397d0fb7C17556Ab96235F3c1';

    const mintUrl = 'http://www.google.com';
    var mintToken;

    await new Promise((resolve, reject) => {
      mintToken = contract.mint(mintAddress, mintUrl);
    });

    var mintedToken = Promise.resolve(mintToken);

    console.log(mintedToken);
  }

  async getAccount() {
    let accounts: [];
    accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    return accounts;
  }

  async getChainId() {
    let chainId: number;
    console.log("window.ethereum = ", window.ethereum);
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

  async getTokenBalance(contractAddress: string, userAddress: string) {
    let balance: number;
    let tokenContract: Contract;
    var provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    tokenContract = new ethers.Contract(
      contractAddress,
      abis.getAbiForToken(),
      provider
    );
    console.log('Getting balance for ' + tokenContract.address);
    tokenContract.connect(provider);
    balance = await tokenContract.balanceOf(userAddress);
    return balance;
  }

  async approveTokenForContract(tokenAddress: string, spenderAddress: string) {
    let goatxContract: Contract;
    let approval: boolean;
    var provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    goatxContract = new ethers.Contract(
      tokenAddress,
      abis.getAbiForToken(),
      signer
    );
    goatxContract.connect(signer);
    approval = await goatxContract.approve(
      spenderAddress,
      '99999999999999999999999999999999999999999999'
    );
    return approval;
  }

  async stakeGoatx(masterChef: string, amount: number) {
    let masterChefContract: Contract;
    var provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    masterChefContract = new ethers.Contract(
      masterChef,
      abis.getAbiForMasterChef(),
      signer
    );
    masterChefContract.connect(signer);
    await masterChefContract.enterStaking(amount.toString());
  }

  async unstakeGoatx(masterChef: string, amount: number) {
    let masterChefContract: Contract;
    var provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    masterChefContract = new ethers.Contract(
      masterChef,
      abis.getAbiForMasterChef(),
      signer
    );
    masterChefContract.connect(signer);
    await masterChefContract.leaveStaking(amount.toString());
  }

  async sendEther(payment: string, address: string, amount: number){
    
    let paymentContract: Contract;
    var provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    paymentContract = new ethers.Contract(
      payment,
      abis.getAbiForPayment(),
      signer
    );
    paymentContract.connect(signer);
    await paymentContract.nuevaTransaccion(amount.toString());

  }

  async getHolaMundo(payment: string){
    
    console.log(payment);
    
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
    console.log("holaMundo = ", holaMundo);
    return holaMundo;
  }
}

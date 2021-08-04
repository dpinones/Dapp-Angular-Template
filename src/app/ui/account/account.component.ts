import { Component, Inject, OnInit } from '@angular/core';
import { BlockchainService } from './../../services/blockchain/blockchain.service';
import { providers } from 'ethers';
import { AnyAaaaRecord } from 'dns';
import * as contractAddresses from './../../../utils/getContractAddress';
import { getContractAddress } from 'ethers/lib/utils';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {

  NFT: any;
  constructor(private blockchainService: BlockchainService) {}
  MyAccount = '';
  ChainId: any;
  GoatxStakeAmount: any = '10';
  Balance: any;
  GOATXBAL: any;
  valueEther: any;
  address: any;
  holaMundo: any;

  async connectToMetamask() {
    await this.blockchainService.connectToMetamask();
  }

  toEth(i: number) {
    return i / 1000000000000000000;
  }

  toWei(i: number) {
    return i * 1000000000000000000;
  }
  async getAccount() {
    let account: string[];
    account = await this.blockchainService.getAccount();
    this.MyAccount = account[0];
  }

  async getChainId() {
    let chainid: number;
    chainid = await this.blockchainService.getChainId();
    this.ChainId = chainid;
  }

  async getBnbBalance() {
    let balance: string;
    let account: string[];
    account = await this.blockchainService.getAccount();
    this.MyAccount = account[0];
    balance = await this.blockchainService.getBnbBalance(this.MyAccount);
    this.Balance = this.toEth(parseInt(balance));
  }

  async getGoatxBalance() {
    let goatxbal: number;
    let account: string[];
    account = await this.blockchainService.getAccount();
    this.MyAccount = account[0];
    goatxbal = await this.blockchainService.getTokenBalance(
      contractAddresses.getGoatxTokenAddress(),
      this.MyAccount
    );
    this.GOATXBAL = this.toEth(goatxbal);
  }

  async mintArtfinNFT() {
    let nft;
    nft = await this.blockchainService.mintArtfin();
    this.NFT = nft;
  }

  async approveGoatx() {
    let approved: boolean;
    approved = await this.blockchainService.approveTokenForContract(
      contractAddresses.getGoatxTokenAddress(),
      contractAddresses.getMasterChefAddress()
    );
  }

  async approveGrainStore() {
    let approved: boolean;
    approved = await this.blockchainService.approveTokenForContract(
      contractAddresses.getGrainStoreAddress(),
      contractAddresses.getMasterChefAddress()
    );
  }

  async stakeGoatx() {
    await this.blockchainService.stakeGoatx(
      contractAddresses.getMasterChefAddress(),
      this.toWei(this.GoatxStakeAmount)
    );
  }

  async unstakeGoatx() {
    await this.blockchainService.unstakeGoatx(
      contractAddresses.getMasterChefAddress(),
      this.toWei(this.GoatxStakeAmount)
    );
  }

  async sendEther(){
    console.log("valueEther = ", this.valueEther);
    console.log("address = ", this.address);
    this.holaMundo = await this.blockchainService.sendEther(
      contractAddresses.getPaymentAddress(),
      this.address,
      this.toWei(this.valueEther)
    );
  }

  async getHolaMundo(){
    this.holaMundo = await this.blockchainService.getHolaMundo(
      contractAddresses.getPaymentAddress()
    );
  }

}

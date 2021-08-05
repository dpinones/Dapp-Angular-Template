import { Component, Inject, OnInit } from '@angular/core';
import { BlockchainService } from './../../services/blockchain/blockchain.service';
import { providers } from 'ethers';
import { AnyAaaaRecord } from 'dns';
import * as contractAddresses from './../../../utils/getContractAddress';
import { getContractAddress } from 'ethers/lib/utils';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
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
  addressReceiver: any;
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
    console.log('balance:', balance);
    console.log('parseInt(balance):', parseInt(balance));
    this.Balance = this.toEth(parseInt(balance));
  }

  async sendEther() {
    console.log('valueEther = ', this.valueEther);
    console.log('address = ', this.addressReceiver);
    this.holaMundo = await this.blockchainService.sendEther(
      this.MyAccount,
      this.addressReceiver,
      this.valueEther,
      contractAddresses.getPaymentAddress()
    );

    // this.toWei(this.valueEther),
  }

  async getHolaMundo() {
    this.holaMundo = await this.blockchainService.getHolaMundo(
      contractAddresses.getPaymentAddress()
    );
  }
}

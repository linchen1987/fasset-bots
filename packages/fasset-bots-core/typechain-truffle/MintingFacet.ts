/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import type { Truffle } from "./types";

import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface MintingFacetContract
  extends Truffle.Contract<MintingFacetInstance> {
  "new"(meta?: Truffle.TransactionDetails): Promise<MintingFacetInstance>;
}

export interface DustChanged {
  name: "DustChanged";
  args: {
    agentVault: string;
    dustUBA: BN;
    0: string;
    1: BN;
  };
}

export interface MintingExecuted {
  name: "MintingExecuted";
  args: {
    agentVault: string;
    collateralReservationId: BN;
    mintedAmountUBA: BN;
    agentFeeUBA: BN;
    poolFeeUBA: BN;
    0: string;
    1: BN;
    2: BN;
    3: BN;
    4: BN;
  };
}

export interface RedemptionTicketCreated {
  name: "RedemptionTicketCreated";
  args: {
    agentVault: string;
    redemptionTicketId: BN;
    ticketValueUBA: BN;
    0: string;
    1: BN;
    2: BN;
  };
}

export interface RedemptionTicketUpdated {
  name: "RedemptionTicketUpdated";
  args: {
    agentVault: string;
    redemptionTicketId: BN;
    ticketValueUBA: BN;
    0: string;
    1: BN;
    2: BN;
  };
}

export interface SelfMint {
  name: "SelfMint";
  args: {
    agentVault: string;
    mintFromFreeUnderlying: boolean;
    mintedAmountUBA: BN;
    depositedAmountUBA: BN;
    poolFeeUBA: BN;
    0: string;
    1: boolean;
    2: BN;
    3: BN;
    4: BN;
  };
}

export interface UnderlyingBalanceChanged {
  name: "UnderlyingBalanceChanged";
  args: {
    agentVault: string;
    underlyingBalanceUBA: BN;
    0: string;
    1: BN;
  };
}

export type AllEvents =
  | DustChanged
  | MintingExecuted
  | RedemptionTicketCreated
  | RedemptionTicketUpdated
  | SelfMint
  | UnderlyingBalanceChanged;

export interface MintingFacetInstance extends Truffle.ContractInstance {
  executeMinting: {
    (
      _payment: {
        merkleProof: string[];
        data: {
          attestationType: string;
          sourceId: string;
          votingRound: number | BN | string;
          lowestUsedTimestamp: number | BN | string;
          requestBody: {
            transactionId: string;
            inUtxo: number | BN | string;
            utxo: number | BN | string;
          };
          responseBody: {
            blockNumber: number | BN | string;
            blockTimestamp: number | BN | string;
            sourceAddressHash: string;
            sourceAddressesRoot: string;
            receivingAddressHash: string;
            intendedReceivingAddressHash: string;
            spentAmount: number | BN | string;
            intendedSpentAmount: number | BN | string;
            receivedAmount: number | BN | string;
            intendedReceivedAmount: number | BN | string;
            standardPaymentReference: string;
            oneToOne: boolean;
            status: number | BN | string;
          };
        };
      },
      _collateralReservationId: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _payment: {
        merkleProof: string[];
        data: {
          attestationType: string;
          sourceId: string;
          votingRound: number | BN | string;
          lowestUsedTimestamp: number | BN | string;
          requestBody: {
            transactionId: string;
            inUtxo: number | BN | string;
            utxo: number | BN | string;
          };
          responseBody: {
            blockNumber: number | BN | string;
            blockTimestamp: number | BN | string;
            sourceAddressHash: string;
            sourceAddressesRoot: string;
            receivingAddressHash: string;
            intendedReceivingAddressHash: string;
            spentAmount: number | BN | string;
            intendedSpentAmount: number | BN | string;
            receivedAmount: number | BN | string;
            intendedReceivedAmount: number | BN | string;
            standardPaymentReference: string;
            oneToOne: boolean;
            status: number | BN | string;
          };
        };
      },
      _collateralReservationId: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _payment: {
        merkleProof: string[];
        data: {
          attestationType: string;
          sourceId: string;
          votingRound: number | BN | string;
          lowestUsedTimestamp: number | BN | string;
          requestBody: {
            transactionId: string;
            inUtxo: number | BN | string;
            utxo: number | BN | string;
          };
          responseBody: {
            blockNumber: number | BN | string;
            blockTimestamp: number | BN | string;
            sourceAddressHash: string;
            sourceAddressesRoot: string;
            receivingAddressHash: string;
            intendedReceivingAddressHash: string;
            spentAmount: number | BN | string;
            intendedSpentAmount: number | BN | string;
            receivedAmount: number | BN | string;
            intendedReceivedAmount: number | BN | string;
            standardPaymentReference: string;
            oneToOne: boolean;
            status: number | BN | string;
          };
        };
      },
      _collateralReservationId: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _payment: {
        merkleProof: string[];
        data: {
          attestationType: string;
          sourceId: string;
          votingRound: number | BN | string;
          lowestUsedTimestamp: number | BN | string;
          requestBody: {
            transactionId: string;
            inUtxo: number | BN | string;
            utxo: number | BN | string;
          };
          responseBody: {
            blockNumber: number | BN | string;
            blockTimestamp: number | BN | string;
            sourceAddressHash: string;
            sourceAddressesRoot: string;
            receivingAddressHash: string;
            intendedReceivingAddressHash: string;
            spentAmount: number | BN | string;
            intendedSpentAmount: number | BN | string;
            receivedAmount: number | BN | string;
            intendedReceivedAmount: number | BN | string;
            standardPaymentReference: string;
            oneToOne: boolean;
            status: number | BN | string;
          };
        };
      },
      _collateralReservationId: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  mintFromFreeUnderlying: {
    (
      _agentVault: string,
      _lots: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _agentVault: string,
      _lots: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _agentVault: string,
      _lots: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _agentVault: string,
      _lots: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  selfMint: {
    (
      _payment: {
        merkleProof: string[];
        data: {
          attestationType: string;
          sourceId: string;
          votingRound: number | BN | string;
          lowestUsedTimestamp: number | BN | string;
          requestBody: {
            transactionId: string;
            inUtxo: number | BN | string;
            utxo: number | BN | string;
          };
          responseBody: {
            blockNumber: number | BN | string;
            blockTimestamp: number | BN | string;
            sourceAddressHash: string;
            sourceAddressesRoot: string;
            receivingAddressHash: string;
            intendedReceivingAddressHash: string;
            spentAmount: number | BN | string;
            intendedSpentAmount: number | BN | string;
            receivedAmount: number | BN | string;
            intendedReceivedAmount: number | BN | string;
            standardPaymentReference: string;
            oneToOne: boolean;
            status: number | BN | string;
          };
        };
      },
      _agentVault: string,
      _lots: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _payment: {
        merkleProof: string[];
        data: {
          attestationType: string;
          sourceId: string;
          votingRound: number | BN | string;
          lowestUsedTimestamp: number | BN | string;
          requestBody: {
            transactionId: string;
            inUtxo: number | BN | string;
            utxo: number | BN | string;
          };
          responseBody: {
            blockNumber: number | BN | string;
            blockTimestamp: number | BN | string;
            sourceAddressHash: string;
            sourceAddressesRoot: string;
            receivingAddressHash: string;
            intendedReceivingAddressHash: string;
            spentAmount: number | BN | string;
            intendedSpentAmount: number | BN | string;
            receivedAmount: number | BN | string;
            intendedReceivedAmount: number | BN | string;
            standardPaymentReference: string;
            oneToOne: boolean;
            status: number | BN | string;
          };
        };
      },
      _agentVault: string,
      _lots: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _payment: {
        merkleProof: string[];
        data: {
          attestationType: string;
          sourceId: string;
          votingRound: number | BN | string;
          lowestUsedTimestamp: number | BN | string;
          requestBody: {
            transactionId: string;
            inUtxo: number | BN | string;
            utxo: number | BN | string;
          };
          responseBody: {
            blockNumber: number | BN | string;
            blockTimestamp: number | BN | string;
            sourceAddressHash: string;
            sourceAddressesRoot: string;
            receivingAddressHash: string;
            intendedReceivingAddressHash: string;
            spentAmount: number | BN | string;
            intendedSpentAmount: number | BN | string;
            receivedAmount: number | BN | string;
            intendedReceivedAmount: number | BN | string;
            standardPaymentReference: string;
            oneToOne: boolean;
            status: number | BN | string;
          };
        };
      },
      _agentVault: string,
      _lots: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _payment: {
        merkleProof: string[];
        data: {
          attestationType: string;
          sourceId: string;
          votingRound: number | BN | string;
          lowestUsedTimestamp: number | BN | string;
          requestBody: {
            transactionId: string;
            inUtxo: number | BN | string;
            utxo: number | BN | string;
          };
          responseBody: {
            blockNumber: number | BN | string;
            blockTimestamp: number | BN | string;
            sourceAddressHash: string;
            sourceAddressesRoot: string;
            receivingAddressHash: string;
            intendedReceivingAddressHash: string;
            spentAmount: number | BN | string;
            intendedSpentAmount: number | BN | string;
            receivedAmount: number | BN | string;
            intendedReceivedAmount: number | BN | string;
            standardPaymentReference: string;
            oneToOne: boolean;
            status: number | BN | string;
          };
        };
      },
      _agentVault: string,
      _lots: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  methods: {
    executeMinting: {
      (
        _payment: {
          merkleProof: string[];
          data: {
            attestationType: string;
            sourceId: string;
            votingRound: number | BN | string;
            lowestUsedTimestamp: number | BN | string;
            requestBody: {
              transactionId: string;
              inUtxo: number | BN | string;
              utxo: number | BN | string;
            };
            responseBody: {
              blockNumber: number | BN | string;
              blockTimestamp: number | BN | string;
              sourceAddressHash: string;
              sourceAddressesRoot: string;
              receivingAddressHash: string;
              intendedReceivingAddressHash: string;
              spentAmount: number | BN | string;
              intendedSpentAmount: number | BN | string;
              receivedAmount: number | BN | string;
              intendedReceivedAmount: number | BN | string;
              standardPaymentReference: string;
              oneToOne: boolean;
              status: number | BN | string;
            };
          };
        },
        _collateralReservationId: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _payment: {
          merkleProof: string[];
          data: {
            attestationType: string;
            sourceId: string;
            votingRound: number | BN | string;
            lowestUsedTimestamp: number | BN | string;
            requestBody: {
              transactionId: string;
              inUtxo: number | BN | string;
              utxo: number | BN | string;
            };
            responseBody: {
              blockNumber: number | BN | string;
              blockTimestamp: number | BN | string;
              sourceAddressHash: string;
              sourceAddressesRoot: string;
              receivingAddressHash: string;
              intendedReceivingAddressHash: string;
              spentAmount: number | BN | string;
              intendedSpentAmount: number | BN | string;
              receivedAmount: number | BN | string;
              intendedReceivedAmount: number | BN | string;
              standardPaymentReference: string;
              oneToOne: boolean;
              status: number | BN | string;
            };
          };
        },
        _collateralReservationId: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _payment: {
          merkleProof: string[];
          data: {
            attestationType: string;
            sourceId: string;
            votingRound: number | BN | string;
            lowestUsedTimestamp: number | BN | string;
            requestBody: {
              transactionId: string;
              inUtxo: number | BN | string;
              utxo: number | BN | string;
            };
            responseBody: {
              blockNumber: number | BN | string;
              blockTimestamp: number | BN | string;
              sourceAddressHash: string;
              sourceAddressesRoot: string;
              receivingAddressHash: string;
              intendedReceivingAddressHash: string;
              spentAmount: number | BN | string;
              intendedSpentAmount: number | BN | string;
              receivedAmount: number | BN | string;
              intendedReceivedAmount: number | BN | string;
              standardPaymentReference: string;
              oneToOne: boolean;
              status: number | BN | string;
            };
          };
        },
        _collateralReservationId: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _payment: {
          merkleProof: string[];
          data: {
            attestationType: string;
            sourceId: string;
            votingRound: number | BN | string;
            lowestUsedTimestamp: number | BN | string;
            requestBody: {
              transactionId: string;
              inUtxo: number | BN | string;
              utxo: number | BN | string;
            };
            responseBody: {
              blockNumber: number | BN | string;
              blockTimestamp: number | BN | string;
              sourceAddressHash: string;
              sourceAddressesRoot: string;
              receivingAddressHash: string;
              intendedReceivingAddressHash: string;
              spentAmount: number | BN | string;
              intendedSpentAmount: number | BN | string;
              receivedAmount: number | BN | string;
              intendedReceivedAmount: number | BN | string;
              standardPaymentReference: string;
              oneToOne: boolean;
              status: number | BN | string;
            };
          };
        },
        _collateralReservationId: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    mintFromFreeUnderlying: {
      (
        _agentVault: string,
        _lots: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _agentVault: string,
        _lots: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _agentVault: string,
        _lots: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _agentVault: string,
        _lots: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    selfMint: {
      (
        _payment: {
          merkleProof: string[];
          data: {
            attestationType: string;
            sourceId: string;
            votingRound: number | BN | string;
            lowestUsedTimestamp: number | BN | string;
            requestBody: {
              transactionId: string;
              inUtxo: number | BN | string;
              utxo: number | BN | string;
            };
            responseBody: {
              blockNumber: number | BN | string;
              blockTimestamp: number | BN | string;
              sourceAddressHash: string;
              sourceAddressesRoot: string;
              receivingAddressHash: string;
              intendedReceivingAddressHash: string;
              spentAmount: number | BN | string;
              intendedSpentAmount: number | BN | string;
              receivedAmount: number | BN | string;
              intendedReceivedAmount: number | BN | string;
              standardPaymentReference: string;
              oneToOne: boolean;
              status: number | BN | string;
            };
          };
        },
        _agentVault: string,
        _lots: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _payment: {
          merkleProof: string[];
          data: {
            attestationType: string;
            sourceId: string;
            votingRound: number | BN | string;
            lowestUsedTimestamp: number | BN | string;
            requestBody: {
              transactionId: string;
              inUtxo: number | BN | string;
              utxo: number | BN | string;
            };
            responseBody: {
              blockNumber: number | BN | string;
              blockTimestamp: number | BN | string;
              sourceAddressHash: string;
              sourceAddressesRoot: string;
              receivingAddressHash: string;
              intendedReceivingAddressHash: string;
              spentAmount: number | BN | string;
              intendedSpentAmount: number | BN | string;
              receivedAmount: number | BN | string;
              intendedReceivedAmount: number | BN | string;
              standardPaymentReference: string;
              oneToOne: boolean;
              status: number | BN | string;
            };
          };
        },
        _agentVault: string,
        _lots: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _payment: {
          merkleProof: string[];
          data: {
            attestationType: string;
            sourceId: string;
            votingRound: number | BN | string;
            lowestUsedTimestamp: number | BN | string;
            requestBody: {
              transactionId: string;
              inUtxo: number | BN | string;
              utxo: number | BN | string;
            };
            responseBody: {
              blockNumber: number | BN | string;
              blockTimestamp: number | BN | string;
              sourceAddressHash: string;
              sourceAddressesRoot: string;
              receivingAddressHash: string;
              intendedReceivingAddressHash: string;
              spentAmount: number | BN | string;
              intendedSpentAmount: number | BN | string;
              receivedAmount: number | BN | string;
              intendedReceivedAmount: number | BN | string;
              standardPaymentReference: string;
              oneToOne: boolean;
              status: number | BN | string;
            };
          };
        },
        _agentVault: string,
        _lots: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _payment: {
          merkleProof: string[];
          data: {
            attestationType: string;
            sourceId: string;
            votingRound: number | BN | string;
            lowestUsedTimestamp: number | BN | string;
            requestBody: {
              transactionId: string;
              inUtxo: number | BN | string;
              utxo: number | BN | string;
            };
            responseBody: {
              blockNumber: number | BN | string;
              blockTimestamp: number | BN | string;
              sourceAddressHash: string;
              sourceAddressesRoot: string;
              receivingAddressHash: string;
              intendedReceivingAddressHash: string;
              spentAmount: number | BN | string;
              intendedSpentAmount: number | BN | string;
              receivedAmount: number | BN | string;
              intendedReceivedAmount: number | BN | string;
              standardPaymentReference: string;
              oneToOne: boolean;
              status: number | BN | string;
            };
          };
        },
        _agentVault: string,
        _lots: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };
  };

  getPastEvents(event: string): Promise<EventData[]>;
  getPastEvents(
    event: string,
    options: PastEventOptions,
    callback: (error: Error, event: EventData) => void
  ): Promise<EventData[]>;
  getPastEvents(event: string, options: PastEventOptions): Promise<EventData[]>;
  getPastEvents(
    event: string,
    callback: (error: Error, event: EventData) => void
  ): Promise<EventData[]>;
}

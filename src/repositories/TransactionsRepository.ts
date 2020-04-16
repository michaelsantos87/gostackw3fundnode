import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const sumIncome = this.transactions.reduce(
      (initValue, actualTransaction) =>
        initValue +
        (actualTransaction.type === 'income' ? actualTransaction.value : 0),
      0,
    );

    const sumOutcome = this.transactions.reduce(
      (initValue, actualTransaction) =>
        initValue +
        (actualTransaction.type === 'outcome' ? actualTransaction.value : 0),
      0,
    );

    const total = sumIncome - sumOutcome;

    const currentBalancy: Balance = {
      income: sumIncome,
      outcome: sumOutcome,
      total,
    };

    return currentBalancy;
  }

  public create({ title, value, type }: CreateTransaction): Transaction {
    // TODO
    const newTransaction = new Transaction({ title, value, type });

    const actualBalance = this.getBalance();

    if (type === 'outcome' && value > actualBalance.total) {
      throw Error(
        `Insufficient balance for the transacion, current balance: ${actualBalance.total}`,
      );
    }

    this.transactions.push(newTransaction);

    return newTransaction;
  }
}

export default TransactionsRepository;

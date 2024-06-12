import {instance as axios} from '../axiosInterceptor';

const API = {
  getCategoryExpense: '/expense/get-category-expenses',
  getExpense: '/expense/get-expenses',
  createExpense: '/expense/add-expense',
};

interface getExpenseProps {
  limit?: number;
  page?: number;
}
interface createExpenseProps {
  categoryId: string;
  name: string;
  description: string;
  amount: string;
  date: string;
}
export const getExpenseByCategory = async () => {
  try {
    const {
      data: {data},
    } = await axios.get(API.getCategoryExpense);
    return data;
  } catch (error) {
    return {
      message: 'Something went wrong while fetching categories expense!',
    };
  }
};

export const getExpenses = async ({limit, page}: getExpenseProps) => {
  try {
    const {
      data: {data},
    } = await axios.get(API.getExpense, {
      params: {
        limit,
        ...(page ? {page} : {}),
      },
    });

    return data;
  } catch (error) {
    return {
      message: 'Api issue',
    };
  }
};

export const createExpense = async ({
  name,
  categoryId,
  description,
  amount,
  date,
}: createExpenseProps) => {
  try {
    const response = await axios.post(API.createExpense, {
      name,
      categoryId,
      description,
      amount,
      date,
    });
    return response.data;
  } catch (error) {
    console.error('Error creating expense:', error);
    return {
      message: 'API issue',
      error: error.response ? error.response.data : error.message,
    };
  }
};

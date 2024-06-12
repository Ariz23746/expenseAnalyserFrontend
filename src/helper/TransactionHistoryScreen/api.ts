import {instance as axios} from '../axiosInterceptor';
import {ReportsProps} from '../types';

const API = {
  getReports: '/reports/get-reports',
  getBudgets: '/budgets/get-budgets',
};

interface getReportProps {
  page?: number;
}

export const fetchReports = async ({page}: getReportProps) => {
  try {
    const {
      data: {data},
    } = await axios.get(API.getReports, {
      params: {
        ...(page ? {page} : {}),
      },
    });
    // const data2: ReportsProps[] = [
    //   {month: 1, totalAmountSpent: 5258, year: 2024},
    //   {month: 2, totalAmountSpent: 6258, year: 2024},
    //   {month: 3, totalAmountSpent: 3258, year: 2024},
    //   {month: 4, totalAmountSpent: 3258, year: 2024},
    //   {month: 5, totalAmountSpent: 4000, year: 2024},
    //   {month: 6, totalAmountSpent: 4258, year: 2024},
    // ];

    // return data2;
    return data;
  } catch (error) {
    return {
      message: 'Api issue',
    };
  }
};

export const fetchBudgets = async ({page}: getReportProps) => {
  try {
    const {
      data: {
        data: {budgets},
      },
    } = await axios.get(API.getBudgets, {
      params: {
        ...(page ? {page} : {}),
      },
    });
    return budgets;
  } catch (error) {
    return {
      message: 'Api issue',
    };
  }
};

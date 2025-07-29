import React from 'react'
import CustomPieChart from '../charts/CustomPieChart'

const COLORS = ["#875CF5", "#FA2C37", "#FF6900"] 

const FinanceOverview = ({totalBalance, totalIncome, totalExpense}) => {

    const balanceData = [
        { name: "Total Balance", amount: totalBalance},
        { name: "Total Expenses", amount: totalExpense},
        { name: "Total Income", amount: totalIncome},
    ]
  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <h5 className='text-lg'>Financial Overview</h5>
      </div>

      <CustomPieChart
        data = {balanceData}
        label = "Total Balance"
        totalAmount = {`$${totalBalance}`}
        colors = {COLORS}
        showTextAnchor
       />
    </div>
  )
}

export default FinanceOverview

// import React from 'react';
// import CustomPieChart from '../charts/CustomPieChart';

// const COLORS = ['#4CAF50', '#F44336']; // Green = Income, Red = Expenses

// const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
//   const chartData = [
//     { name: 'Income', amount: totalIncome },
//     { name: 'Expenses', amount: totalExpense },
//   ];

//   return (
//     <div className='card'>
//       <div className='flex items-center justify-between mb-4'>
//         <h5 className='text-lg font-semibold'>Financial Overview</h5>
//       </div>

//       <CustomPieChart
//         data={chartData}
//         label='Net Balance'
//         totalAmount={`$${totalBalance.toLocaleString()}`}
//         colors={COLORS}
//         showTextAnchor
//       />
//     </div>
//   );
// };

// export default FinanceOverview;



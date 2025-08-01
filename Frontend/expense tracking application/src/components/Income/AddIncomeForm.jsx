import React, { useState } from 'react'
import MyInput from '../../components/Inputs/MyInput';
import EmojiPickerPopup from '../EmojiPickerPopup';

const AddIncomeForm = ({onAddIncome}) => {
    const [income, setIncome] = useState({
        source: "",
        amount: "",
        date: "",
        icon: "",
    });

    const handleChange = (key, value) => setIncome({...income, [key]: value});

  return (
    <div>

      <EmojiPickerPopup 
        icon={income.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />  
      <MyInput
        value={income.source}
        onChange={({target}) => handleChange("source", target.value)}
        label="Income Source"
        placeholder="Freelance, Salary, etc"
        type="text" 
      />

      <MyInput
        value={income.amount}
        onChange={({target}) => handleChange("amount", target.value)}
        label="Amount"
        placeholder=""
        type="number" 
      />

      <MyInput
        value={income.date}
        onChange={({target}) => handleChange("date", target.value)}
        label="Date"
        placeholder=""
        type="date" 
      />

      <div className='flex justify-end mt-6'>
        <button
            type='button'
            className='add-btn add-btn-fill'
            onClick={() => onAddIncome (income)}
        >
            Add Income
        </button>
      </div>
    </div>
  )
}

export default AddIncomeForm

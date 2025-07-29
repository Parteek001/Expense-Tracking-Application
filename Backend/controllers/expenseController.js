
const Expense = require("../models/Expense");
const xlsx = require('xlsx');

// Add Expense Source
exports.addExpense = async (req, res) => {
    const userId = req.user.id;

    try{
        const {icon, category, amount, date} = req.body;

        // Validation: Check for missing fields
        if(!category || !amount || !date){
            return res.status(400).json({message: "All fields are required"});
        }

        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date)
        });
        await newExpense.save();
        res.status(200).json(newExpense);  
    } catch(err){
        res.status(500).json({message: "Server Error"});
    }
};

// Get all Expense Source
exports.getAllExpense = async (req, res) => {
    const userId = req.user.id;

    try{
        const expense = await Expense.find({userId}).sort({date: -1});
        res.json(expense);
    } catch (error){
        res.status(500).json({message: "Server Error"})
    }
};

// Delete Expense Source
exports.deleteExpense = async (req, res) => {
    try{
        await Expense.findByIdAndDelete(req.params.id);
        res.json({message: "Expense deleted successfully"})
    } catch (error){
        res.status(500).json({message: "server Error"});
    }
};

//Download expense Source
// exports.downloadExpenseExcel = async (req, res) => {
//     const userId = req.user.id;
//     try{
//         const expense = await Expense.find({userId}).sort({date: -1});

//         //Prepare data for Excel 
//         const data = expense.map((item) =>({
//             category: item.category,
//             Amount: item.amount,
//             Date: item.date,
//         }));

//         const wb = xlsx.utils.book_new();
//         const ws = xlsx.utils.json_to_sheet(data);
//         xlsx.utils.book_append_sheet(wb,ws,"Expense");
//         xlsx.writeFile(wb,'expense_details.xlsx');
//         res.download('expense_details.xlsx')
//     } catch(error){
//         res.status(500).json({message: "Server Error"});
//     }
// };

exports.downloadExpenseExcel = async (req, res) => {
  const userId = req.user.id;
  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });

    const data = expense.map((item) => ({
      Category: item.category,
      Amount: item.amount,
      Date: item.date ? item.date.toISOString().split('T')[0] : "",
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Expense");

    // Write to buffer instead of disk
    const buffer = xlsx.write(wb, { bookType: "xlsx", type: "buffer" });

    // Set headers
    res.setHeader("Content-Disposition", "attachment; filename=expense_details.xlsx");
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

    // Send file as response
    res.send(buffer);
  } catch (error) {
    console.error("Error generating Excel file:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


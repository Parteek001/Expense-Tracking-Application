
const Income = require("../models/Income");
const xlsx = require('xlsx');

// Add Income Source
exports.addIncome = async (req, res) => {
    const userId = req.user.id;

    try{
        const {icon, source, amount, date} = req.body;

        // Validation: Check for missing fields
        if(!source || !amount || !date){
            return res.status(400).json({message: "All fields are required"});
        }

        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date)
        });
        await newIncome.save();
        res.status(200).json(newIncome);  
    } catch(err){
        res.status(500).json({message: "Server Error"});
    }
};

// Get all Income Source
exports.getAllIncome = async (req, res) => {
    const userId = req.user.id;

    try{
        const income = await Income.find({userId}).sort({date: -1});
        res.json(income);
    } catch (error){
        res.status(500).json({message: "Server Error"})
    }
};

// Delete Income Source
exports.deleteIncome = async (req, res) => {
    try{
        await Income.findByIdAndDelete(req.params.id);
        res.json({message: "Income deleted successfully"})
    } catch (error){
        res.status(500).json({message: "server Error"});
    }
};

// Download Income Source
// exports.downloadIncomeExcel = async (req, res) => {
//     const userId = req.user.id;
//     try{
//         const income = await Income.find({userId}).sort({date: -1});

//         //Prepare data for Excel 
//         const data = income.map((item) =>({
//             Source: item.source,
//             Amount: item.amount,
//             Date: item.date,
//         }));

//         const wb = writeXLSX.utils.book_new();
//         const ws = writeXLSX.utils.json_to_sheet(data);
//         xlsx.utils.book_append_sheet(wb,ws,"Income");
//         xlsx.writeFile(wb,'income_details.xlsx');
//         res.download('income_details.xlsx')
//     } catch(error){
//         res.status(500).json({message: "Server Error"});
//     }
// };



exports.downloadIncomeExcel = async (req, res) => {
  const userId = req.user.id;
  try {
    const income = await Income.find({ userId }).sort({ date: -1 });

    const data = income.map((item) => ({
      Source: item.source,
      Amount: item.amount,
      Date: item.date ? item.date.toISOString().split('T')[0] : "",
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Income");

    // Write to memory buffer instead of disk
    const buffer = xlsx.write(wb, { bookType: "xlsx", type: "buffer" });

    // Set response headers for download
    res.setHeader("Content-Disposition", "attachment; filename=income_details.xlsx");
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

    // Send buffer as file response
    res.send(buffer);
  } catch (error) {
    console.error("Error generating income Excel file:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

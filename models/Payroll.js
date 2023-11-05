const mongoose = require('mongoose');

const payrollschema = new mongoose.Schema({
    employeeId: {
      type: String,
      required: true,
      unique: true,
    },

    basicSalary: {
      type: Number,
      required: true,
    },
    //ignore if not needed
    allowances: {
      type: Number,
      default: 0
    },
    //ignore if not needed

    deductions: {
      type: Number,
      default: 0
    },

    netSalary: {
      type: Number,
    },
    paymentHistory: [
      {
        paymentDate: {
          type: Date,
          required: true,
        },
        amountPaid: {
          type: Number,
          required: true,
        },
      },
    ],
  },
    {timestamps: true}
  );
module.exports = mongoose.model('Payroll', payrollschema);
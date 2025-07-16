export const STEPS = [
  { id: 1, label: "Initialization", component: "Initialization" },
  {
    id: 2,
    label: "Review Supporting Documents",
    component: "ReviewSupportingDocuments",
  },
  { id: 3, label: "Review Payroll Summary" },
  { id: 4, label: "Complete Payroll Upload" },
];

export const ALLOWED_FILES = [
  "payrolh1.dbf",
  "payrold1.dbf",
  "payrolh2.dbf",
  "payrold2.dbf",
  "payremh.dbf",
  "payremd.dbf",
  "paysplh.dbf",
  "payspld.dbf",
];

export const TRANSACTION_TYPES = {
  plantilla: [
    {
      id: "regular payroll",
      label: "Regular Payroll",
      sequence_numbers_source_file: "payrolh1.dbf",
      payroll_files: [
        "payrolh1.dbf",
        "payrold1.dbf",
        "payrolh2.dbf",
        "payrold2.dbf",
        "payremh.dbf",
        "payremd.dbf",
      ],
      supporting_documents: {
        required: ["OBR", "MRA", "Payroll Registers"],
        optional: [],
      },
    },
    {
      id: "backpay 1",
      label: "Backpay (leave credits > 5d, < 10d)",
      sequence_numbers_source_file: "paysplh.dbf",
      payroll_files: [],
      supporting_documents: {
        required: ["OBR", "MRA of previous month", "1-15 DTR of claimed month"],
        optional: [],
      },
    },
    {
      id: "backpay 2",
      label: "Backpay (leave credits < 5d or last salary)",
      sequence_numbers_source_file: "paysplh.dbf",
      payroll_files: [],
      supporting_documents: {
        required: ["OBR", "DTR of claimed month", "Payroll Registers"],
        optional: [
          "Application for Leave",
          "Clearance (if Application for Leave of more than 30 days or last salary claimed)",
        ],
      },
    },
    {
      id: "last salary",
      label: "Last Salary (Voucher)",
      sequence_numbers_source_file: "payrolh1.dbf",
      payroll_files: [
        "payrolh1.dbf",
        "payrold1.dbf",
        "payrolh2.dbf",
        "payrold2.dbf",
        "payremh.dbf",
        "payremd.dbf",
      ],
      supporting_documents: {
        required: ["OBR", "Clearance", "DTR", "Voucher Payroll"],
        optional: [],
      },
    },
  ],
  non_plantilla: [
    {
      id: "first salary",
      label: "First Salary",
      sequence_numbers_source_file: "payrolh1.dbf",
      payroll_files: [
        "payrolh1.dbf",
        "payrold1.dbf",
        "payrolh2.dbf",
        "payrold2.dbf",
        "payremh.dbf",
        "payremd.dbf",
      ],
      supporting_documents: {
        required: [
          "OBR",
          "Masterlist",
          "Assumption of Duties",
          "Work Schedule",
          "Employee Inventory Form",
          "DTR",
          "Payroll Registers / Voucher Payroll",
        ],
        optional: [],
      },
    },
  ],
};

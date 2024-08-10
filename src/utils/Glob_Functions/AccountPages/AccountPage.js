
export const accountDetailPages = () => {
    let arr = [
        { id: 1163, tabLabel: "Quote", tabComp: "QuotationQuote", compPath: "./QuotationQuote/QuotationQuote" },
        { id: 1164, tabLabel: "Job", tabComp: "QuotationJob", compPath: "./quotationFilters/QuotationJob" },
        { id: 1157, tabLabel: "Sales", tabComp: "Sales", compPath: "../sales/Sales/Sales" },
        { id: 1314, tabLabel: "Sales Report", tabComp: "SalesReport", compPath: "../sales/salesReport/SalesReport" },
        { id: 17020, tabLabel: "Design Wise Sales Report", tabComp: "DesignWiseSalesReport", compPath: "../sales/DesignWiseSalesReport/DesignWiseSalesReport" },
        { id: 1159, tabLabel: "Account Ledger", tabComp: "AccountLedger", compPath: "./accountLedger/AccountLedger" },
        // { id: 1314, tabLabel: "Pending Memo", tabComp: "PendingMemo", compPath: "./PendingMemo/PendingMemo" }, //demo id
    ];

    let getValArr = [];
    arr?.forEach((e, i) => {
        let getVal = JSON?.parse(sessionStorage?.getItem("myAccountFlags"))?.find(ele => ele?.pageid === e?.id);
        getVal !== undefined && (getVal?.isvisible === 1 && getValArr?.push(e))
        // getValArr?.push({ label: e?.tabLabel,id: e?.id, comp: e?.tabComp, value: false }))  
        // getValArr?.push({ label: e?.tabLabel,id: e?.id, comp: e?.tabComp, value: false });
    });
    return getValArr;
}

export const accountValidation = () => {
    let getVal = JSON?.parse(sessionStorage.getItem("storeInit"))?.["IsMyaccount"];

    let getVals = [1163, 1164, 1157, 1314, 17020, 1159];
    let pageIsOn = false;
    getVals?.forEach((e, i) => {
        let getValss = JSON?.parse(sessionStorage?.getItem("myAccountFlags"))?.find(ele => ele?.pageid === e);
        if (getValss !== undefined) {
            if (getValss?.isvisible === 1) {
                pageIsOn = true;
            }
        }
    })
    return (getVal === 1 && pageIsOn === true) ? true : false;
}

export function formatAmount(amount) {
    const formattedAmount = parseFloat(+amount).toLocaleString('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    return formattedAmount;
}
export function formatAmount2(amount) {
    // Convert the amount to a number, round it down, and then format it
    const amountNumber = Math.floor(parseFloat(amount));
    const formattedAmount = amountNumber.toLocaleString('en-IN');

    return formattedAmount;
}
export const checkMonth = (val) => {
    // month = "January" month = "February" month = "March" month = "April" month = "May" month = "June" month = "July" month = "August" month = "September" month = "October" month = "November" month = "December"
    let month = "";
    switch (val) {
        case 0:
            month = "01"
            break;
        case 1:
            month = "02"
            break;
        case 2:
            month = "03"
            break;
        case 3:
            month = "04"
            break;
        case 4:
            month = "05"
            break;
        case 5:
            month = "06"
            break;
        case 6:
            month = "07"
            break;
        case 7:
            month = "08"
            break;
        case 8:
            month = "09"
            break;
        case 9:
            month = "10"
            break;
        case 10:
            month = "11"
            break;
        case 11:
            month = "12"
            break;

        default:
            break;
    }

    return month;
};

export const NumberWithCommas = (value, val) => {
    const roundedValue = Number(value).toFixed(val || 2);
    const stringValue = roundedValue.toString();
    const [integerPart, decimalPart] = stringValue.split('.');
    let formattedString = integerPart
        .split('')
        .reverse()
        .map((char, index) => (index > 0 && index % 2 === 0 ? ',' + char : char))
        .reverse()
        .join('');
    if (decimalPart !== undefined && val && val !== 0) {
        formattedString += '.' + decimalPart.padEnd(val || 2, '0');
    }
    formattedString = formattedString.replace(/^,+/, '');
    return formattedString;
};

// export const customComparator_Col = (a, b) => {
//     const regex = /([^\d]+)(\d+)/;
//     const [, wordA, numA] = a?.match(regex);
//     const [, wordB, numB] = b?.match(regex);
    
//     if (wordA !== wordB) {
//         return wordA?.localeCompare(wordB);
//     }
    
//     return parseInt(numB, 10) - parseInt(numA, 10);
// };

export const customComparator_Col = (a, b) => {
    const regex = /([^\d]*)(\d+)/; // Adjusted regex to handle cases where there might not be a match
    const matchA = a?.match(regex);
    const matchB = b?.match(regex);
    
    if (!matchA || !matchB) {
      return a?.localeCompare(b); // Default to string comparison if regex does not match
    }
    
    const [, wordA, numA] = matchA;
    const [, wordB, numB] = matchB;
  
    if (wordA !== wordB) {
      return wordA?.localeCompare(wordB);
    }
    
    return parseInt(numA, 10) - parseInt(numB, 10);
  };

export function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}
  
import instance from "./customAxios"
export const getTop10SubProd = (year,month) =>{
    return instance.get(process.env.REACT_APP_API_SERVER + `/top-10-subprod?year=${year}&month=${month}`);
}

export const getTop10Prod = (year,month) =>{
    return instance.get(process.env.REACT_APP_API_SERVER + `/top-10-prod?year=${year}&month=${month}`);
}

export const getTop10Users = (year,month) =>{
    return instance.get(process.env.REACT_APP_API_SERVER + `/top-10-user?year=${year}&month=${month}`);
}
export const getTop10SubCate = (year,month) =>{
    return instance.get(process.env.REACT_APP_API_SERVER + `/top-10-sub-cate?year=${year}&month=${month}`);
}
export const getTop10Brand = (year,month) =>{
    return instance.get(process.env.REACT_APP_API_SERVER + `/top-10-brand?year=${year}&month=${month}`);
}

export const getTop10Invoices = (year,month) =>{
    return instance.get(process.env.REACT_APP_API_SERVER + `/top-10-invoices?year=${year}&month=${month}`);
}
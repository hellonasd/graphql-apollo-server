import {v4} from 'uuid';


const customerInit = [
  [v4(), {
    name : "Nick",
    age : 25,
    language : "rus",
    city: 'Moss',
    gender : 'famale'
  }]
]

const customerDB = new Map(customerInit);


export const getCustomers = () => {
  const customer = [];
  customerDB.forEach((value, key) => {
    const currentCustomer = {
      id : key,
      ...value
    };
    customer.push(currentCustomer);
  })
  return customer;
}



export const CustomerCreate = (customer) => {
  const id = v4();
  customerDB.set(id, customer);
  const saveCustomer = customerDB.get(id);
  return {id, ...saveCustomer}
}

export const mgCustomer = (id, customer) => {
  const previousCustomer = customerDB.get(id);
  const expectedCustomer = {
    ...previousCustomer,
    ...customer
  };
  customerDB.delete(id);
  customerDB.set(id, expectedCustomer);
  const saveCustomer = customerDB.get(id);
  return {
    id,
    ...saveCustomer
  }
}

export const removeCustomer = (id) => {

  const explay = customerDB.get(id);
  customerDB.delete(id);
  return {
    id,
    ...explay
  }
}
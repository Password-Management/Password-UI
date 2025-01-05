import axios from "axios";
const API_URL = `http://localhost:8001`;

export const AddCustomer = async (
  email: string,
  name: string,
  algorithm: string,
  type: string,
  env: string
) => {
  try {
    const response = await axios.post(API_URL + `/customer`, {
      email: email,
      name: name,
      plan: type,
      algorithm: algorithm,
      platform: env,
    });
    return response.data;
  } catch (error) {
    console.log("error while adding the customer: ", error);
    throw error;
  }
};

export const GetCustomer = async (email: string) => {
  try {
    const response = await axios.get(API_URL + `/customer?email=${email}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("error while getting the customer information: ", error);
    throw error;
  }
};

export const CreateContract = async (email: string) => {
  try {
    const response = await axios.put(API_URL + `/contract?email=${email}`);
    return response.data;
  } catch (error) {
    console.log("error while create contract: ", error);
    throw error;
  }
};

export const GetContract = async (id: string) => {
  try {
    const response = await axios.get(API_URL + `/contract?id=${id}`);
    return response.data;
  } catch (error) {
    console.log("error while getting the contract: ", error);
    throw error;
  }
};

export const AcceptContract = async (id: string) => {
  try {
    const response = await axios.put(API_URL + `/accept?id=${id}`);
    return response.data;
  } catch (error) {
    console.log("error while accepting the contract: ", error);
    throw error;
  }
};

export const CheckLicense = async (id: string) => {
  try {
    const response = await axios.get(API_URL + `/check?id=${id}`);
    return response.data;
  } catch (error) {
    console.log("error while checking the license: ", error);
    throw error;
  }
};

export const CheckOsScript = async (os: string) => {
  try {
    const response = await axios.get(API_URL + `/script?ostype=${os}`, {
      responseType: "blob",
    });
    return response.data;
  } catch (error) {
    console.log("error while getting the os script: ", error);
    throw error;
  }
};

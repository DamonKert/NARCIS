// const HOST = "https://localhost:7266";
const HOST = "https://localhost:7266/api";

const LOGIN = "/Login";

const GET_USER = "/Users";
const CREATE_USER = GET_USER;
const UPDATE_USER = GET_USER + "/EditUser";
const GET_USER_BY_ID = (id) => (GET_USER + "/" + id)

const GET_MODEL = "/Models";
const CREATE_MODEL = GET_MODEL;
const UPDATE_MODEL = GET_MODEL + "/EditModel";
const GET_MODEL_BY_ID = (id) => (GET_MODEL + "/" + id)


const GET_PROVINCE = "/CityProvinces";
const UPDATE_PROVINCE_DELIVERYFEE = (id, data) => (GET_PROVINCE + '/Edit/' + id + "?cost=" + data)

export { HOST, LOGIN, GET_USER, CREATE_USER, UPDATE_USER, GET_USER_BY_ID, GET_MODEL, CREATE_MODEL, UPDATE_MODEL, GET_MODEL_BY_ID, GET_PROVINCE, UPDATE_PROVINCE_DELIVERYFEE };
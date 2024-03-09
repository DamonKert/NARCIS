// const HOST = "https://localhost:7266";
const HOST = "https://localhost:7266/api";

const LOGIN = "/Login";

const GET_USER = "/Users";
const CREATE_USER = GET_USER;
const UPDATE_USER = GET_USER + "/EditUser";
const GET_USER_BY_ID = (id) => (GET_USER + "/" + id)
const DELETE_USER_BY_ID = (id) => (GET_USER + "/" + id)

const GET_MODEL = "/Models";
const CREATE_MODEL = GET_MODEL;
const UPDATE_MODEL = GET_MODEL + "/EditModel";
const GET_MODEL_BY_ID = (id) => (GET_MODEL + "/" + id)
const DELETE_MODEL_BY_ID = (id) => (GET_MODEL + "/" + id)

const GET_CATEGORIES = "/Categories";
const CREATE_CATEGORIES = GET_CATEGORIES;
const UPDATE_CATEGORIES = (id) => (GET_CATEGORIES + '/EditCategory/' + id)
const GET_CATEGORIES_BY_ID = (id) => (GET_CATEGORIES + "/" + id)
const DELETE_CATEGORIES_BY_ID = (id) => (GET_CATEGORIES + "/" + id)

const GET_CLOTHES = "/Clothes";

const GET_PROVINCE = "/CityProvinces";
const UPDATE_PROVINCE_DELIVERYFEE = (id, data) => (GET_PROVINCE + '/Edit/' + id + "?cost=" + data)

export { HOST, LOGIN, GET_CLOTHES, GET_CATEGORIES, CREATE_CATEGORIES, GET_CATEGORIES_BY_ID, DELETE_CATEGORIES_BY_ID, UPDATE_CATEGORIES, GET_USER, CREATE_USER, UPDATE_USER, GET_USER_BY_ID, DELETE_USER_BY_ID, GET_MODEL, CREATE_MODEL, UPDATE_MODEL, GET_MODEL_BY_ID, DELETE_MODEL_BY_ID, GET_PROVINCE, UPDATE_PROVINCE_DELIVERYFEE };
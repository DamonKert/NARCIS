const Customer = "/Customer";

const GET_CATEGORY = Customer + "/GetParentCategory";

const GET_CATEGORY_BY_ID = (id) => Customer + `/GetCategoryByID/${id}`;

export { GET_CATEGORY, GET_CATEGORY_BY_ID };
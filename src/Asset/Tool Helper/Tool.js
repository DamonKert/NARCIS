const ConvertObjectToFormData = (Data) => {
    const formData = new FormData();
    Object.keys(Data).forEach((key) => {
        formData.append(key, Data[key]);
    })
    return formData;
};

const ConvertImageAntdToOrigin = (Files) => {
    const files = Files.map((items) => {
        return items.originFileObj;
    })
    return files;
}

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

export { ConvertObjectToFormData, ConvertImageAntdToOrigin, getBase64 };
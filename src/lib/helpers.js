import api from "./axios";

// get all
export const getAll = async (url) => {
    const res = await api.get(url);
    return res.data;
};

// get detail by id
export const getOne = async (url, id) => {
    const res = await api.get(`${url}/${id}`);
    return res.data;
}

// post create
export const updateData = async (url, id, data) => {
    const res = await api.put(`${url}/${id}`, data);
    return res.data;
}

// delete
export const deleteData = async (url, id) => {
    const res = await api.delete(`${url}/${id}`);
    return res.data;
}

// format tanggal
export const formatData = (date) => {
    if(!date) return "-";
    return new Date(date).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

// format angka ke rupiah
export const toRupiah = (num) => {
    if(!num && num !==0 ) return "-";
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(num);
};

// Capitalize
export const capitalize = (str) => {
    if(!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
};

// validasi
export const isEmailValid = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
}

// Short text (memotong panjangnya)
export const truncate = (text, length = 20) => {
  if (!text) return "";
  return text.length > length ? text.substring(0, length) + "..." : text;
};
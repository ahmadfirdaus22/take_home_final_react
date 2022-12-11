import axios from "axios"

export const addBook =  async (e,data) => {
    try{
        const res = await axios.post("http://localhost:3004/books",
        {
            title : e.target[0].value,
            cover : e.target[2].value,
            desc : e.target[4].value,
            authorId : data.authorId,
            genre : data.genre,
            author : data.author 
        })
    }catch(err){
        console.log(err);
    }
}

export const deleteBook = async (id) => {
    try{
        const res = await axios.delete("http://localhost:3004/books/"+id)
    }catch(err){
        console.log(err);
    }
}

export const deleteAuthor = async (id) => {
    try{
        const res = await axios.delete("http://localhost:3004/author/"+id)
    }catch(err){
        console.log(err);
    }
}

export const addAuthor = async (e) => {
    try{
        const res = await axios.post("http://localhost:3004/author",
        {
            value : e.target[0].value,
            label : e.target[0].value,
            biography : e.target[1].value
        })
    }catch(err){
        console.log(err);
    }
}
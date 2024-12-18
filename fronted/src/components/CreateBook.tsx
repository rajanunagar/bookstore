import  { useState } from "react";
import { generateClient} from 'aws-amplify/api';
import { BookInput } from "../API";
import { createBook } from "../graphql/mutations";

const client = generateClient();
interface Errors {
    title: string;
    author: string;
    price: string;
  }
function CreateBook() {

  const [fetching, setFetching] = useState(false);
  const [errors, setErrors] = useState<Errors>({
    title: '',
    author: '',
    price: '',
  });
  const [formData, setFormData] = useState<BookInput>({
    title: '',
    description: null,
    imageUrl: null,
    author: '',
    price: 0,
  });

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };

  const validate = () => {
    const tempErrors : Errors = {  title: '',
            author: '',
            price: ''};
    let isValid = true;
    if (!formData.price) {
      tempErrors["price"] = "Price is required";
      isValid = false;
    }
    if (!formData.author) {
        tempErrors["author"] = "Author is required";
        isValid = false;
    }
    if (!formData.title) {
      tempErrors["title"] = "Title is required";
      isValid = false;
    } else if (formData.title.length < 4) {
      tempErrors["title"] = "Title must be at least 4 characters";
      isValid = false;
    }
    setErrors(tempErrors);
    return isValid;
  };
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    if (validate()) {
        try {
        const price = parseFloat(formData.price.toString());
        await client.graphql({
            query:createBook,
            variables :{
                newBook:{...formData,price:price}
            }
        });
        }
        catch(err:unknown){
            if (err instanceof Error) {
                console.log(err.message); // Accessing the error message safely
            } else {
                console.log("An unknown error occurred:", err);
            }
        }
    }
    setFetching(false);
  };


  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form className="row g-3" onSubmit={handleSubmit}>
              <div className="col-12">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={formData.title}
                  onChange={handleChange}
                  name="title"
                />
                {errors.title && (
                  <small id="titleHelp" className="form-text text-danger">
                    {errors.title}
                  </small>
                )}
              </div>

              <div className="col-12">
                <label htmlFor="author" className="form-label">
                  Author
                </label>
                <input
                  type="text"
                  className="form-control"
                  // id="content"
                  value={formData.author}
                  onChange={handleChange}
                  name="author"
                />
                {errors.author && (
                  <small id="authorHelp" className="form-text text-danger">
                    {errors.author}
                  </small>
                )}
              </div>

              <div className="col-12">
                <label htmlFor="price" className="form-label">
                Price
                </label>
                <input
                  type="number"
                  className="form-control"
                  // id="content"
                  value={formData.price}
                  onChange={handleChange}
                  name="price"
                />
                {errors.price && (
                  <small id="priceHelp" className="form-text text-danger">
                    {errors.price}
                  </small>
                )}
              </div>
              <div className="col-12">
                <label htmlFor="description" className="form-label">
                Description
                </label>
                <input
                  type="text"
                  className="form-control"
                  // id="content"
                  value={formData?.description?formData?.description:''}
                  onChange={handleChange}
                  name="description"
                />
              </div>
              <div className="col-12">
                {!fetching && (
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                )}
                {fetching && (
                  <div className="spinner-border" role="status">
                    <span className="sr-only"> </span>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateBook;

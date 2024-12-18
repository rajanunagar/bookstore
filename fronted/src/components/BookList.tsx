import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/api";
import "@aws-amplify/ui-react/styles.css";
import { listBooks } from "../graphql/queries";
import { Book } from "../API";
import CreateOrder from "./CreateOrder";
import { onCreateBook } from "../graphql/subscriptions";
const client = generateClient();

function DisplayPosts() {
  const [books, setBooks] = useState<Book[]>([]);
  const [bookId,setBookId]=useState<string>('');
  const [orderModelOpen,setOrderModelOpen]=useState<boolean>(false);
  const onClickOrder = (id:string)=>{
   setBookId(id);
   setOrderModelOpen(true);
  }

  const getBooks = async () => {
    try {
      const result = await client.graphql({
        query: listBooks,
        variables: {
          limit: 20,
          nextToken: null,
        },
      });
      if (result.data.listBooks.books) {
        const results: Book[] = result.data.listBooks.books.filter(
          (book: Book | null) => book !== null
        ) as Book[];

        setBooks(results);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err.message); // Accessing the error message safely
      } else {
        console.log("An unknown error occurred:", err);
      }
    }
  };
  useEffect(() => {
   client.graphql({ query: onCreateBook }).subscribe({
    next: ({ data }) => {
    setBooks((items)=>[...items,data.onCreateBook]);
    },
    error: (error) => console.warn(error)
  });
    getBooks();
  }, []);

  return (
    <div className="container mt-5">
        {orderModelOpen && <CreateOrder open={orderModelOpen} bookId={bookId} setOrderModelOpen = {setOrderModelOpen}/>}
      <div className="row justify-content-center text-center">
        {/* <h2>Posts</h2> */}
        <div className="table-responsive">
        <table className="table  table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Index</th>
              <th scope="col">Title</th>
              <th scope="col">Author</th>
              <th scope="col">Price</th>
              <th>Order</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, key) => (
              <tr key = {key}>
                <th scope="row">{key+1}</th>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.price}</td>
                <td onClick={()=>onClickOrder(book.bookId)}>click</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}

export default DisplayPosts;

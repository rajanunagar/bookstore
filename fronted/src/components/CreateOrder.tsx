import React, { useState } from 'react';
import { createOrder } from '../graphql/mutations';
import { generateClient } from "aws-amplify/api";
import { currentAuthenticatedUser } from '../utils/util';

const client = generateClient();

type ChildProps = {
    setOrderModelOpen: React.Dispatch<React.SetStateAction<boolean>>; // State setter type
    open: boolean; // Function type
    bookId:string
  };
const CreateOrder:React.FC<ChildProps> = ({ setOrderModelOpen, open,bookId }) => {
  const [quantity,setQuantity]=useState(0);
  const [error,setError]=useState('');

  const handleClose = () => {
     
    setOrderModelOpen(false);
  };

  const handleSubmit = async () => {
    if(!quantity) {
       setError('required field');
       return ;
    }
    const user= await currentAuthenticatedUser();
    const userId = user?.userId?user.userId:'';
    try{
     await client.graphql({
           query: createOrder,
           variables: {
            newOrder : {
                bookId:bookId,
                quantity:quantity,
                userId:userId
            }
           },
      });
      setOrderModelOpen(false);
    }
    catch(err:unknown){
        if (err instanceof Error) {
            console.log(err.message); // Accessing the error message safely
        } else {
            console.log("An unknown error occurred:", err);
        }
    }
  };
  
  return (
    <div>
      {open && (
        <div className="modal show d-block" tabIndex={-1} role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Order Book</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleClose}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="col-12">
                  <label htmlFor="content" className="form-label">
                    Quntity
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    // id="content"
                    onChange={(e)=>setQuantity(parseInt(e.target.value))}
                    name="content"
                  />
                  {error && (
                    <small id="contentHelp" className="form-text text-danger">
                      {error}
                    </small>
                  )}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleClose}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                 Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Backdrop */}
      {open && <div className="modal-backdrop fade show"></div>}
    </div>
  );
};

export default CreateOrder;

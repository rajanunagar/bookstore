"use strict";
const { v4 } = require("uuid");
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient,PutCommand } = require("@aws-sdk/lib-dynamodb");
const { BOOKS_TABLE } = process.env;
const dynamoDBClient = new DynamoDBClient({
  region: 'us-west-1',
});
const documentClient = DynamoDBDocumentClient.from(dynamoDBClient);

module.exports.handler = async (event) => {
  if (event.field === "createBook") {
    var { title,author,price } = event.arguments;
    try {
    const newItem = {
        bookId: v4(),
        title,
        author,
        price,
        createdAt: new Date().toISOString(),
      };
    const params = {
      TableName: BOOKS_TABLE,
      Item:newItem
    };
    const result = await documentClient.send(new PutCommand(params));
    return newItem;
  } catch (err) {
    return err;
  }
}
else{
    return null;
}
};

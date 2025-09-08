import getConnection from "../config/database";

const handleCreateUser = (fullname: string, email: string, address: string) => {
  console.log(">>> Check data: ", fullname, email, address);
};

const getAllUsers = async () => {
  const connection = await getConnection();
  // A simple SELECT query
  try {
    const [results, fields] = await connection.query("SELECT * FROM `users`");

    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
    return results;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export { handleCreateUser, getAllUsers };

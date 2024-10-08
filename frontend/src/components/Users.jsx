import { useEffect, useState } from "react";
import { SearchBox } from "./SearchBox";
import { User } from "./User";
import axios from "axios";

export function Users() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/user/bulk?filter=" + filter, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setUsers(response.data.users);
      });
  });
  return (
    <div className="flex flex-col mx-4">
      <div className="text-xl font-bold my-2">Users</div>
      <SearchBox setFilter={setFilter} />
      <div className="mt-4">
        {users.map((user) => (
          <User
            key={user._id}
            firstName={user.firstName}
            lastName={user.lastName}
          />
        ))}
      </div>
    </div>
  );
}

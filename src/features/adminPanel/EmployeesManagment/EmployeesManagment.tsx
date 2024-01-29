import { Button } from "@/components/ui/button";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";
import fetchReducer, { initialState } from "@/reducer/reducerFetching";
import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetchEmployees from "./api/fetchEmployees";
import { GridLoader } from "react-spinners";
import useAuthContext from "@/context/AuthContext";
import { Input } from "@/components/ui/input";

type TUser = {
  id: string;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
}

export default function EmployeesManagment() {
  const [state, dispatch] = useReducer(fetchReducer, initialState)
  const user = useAuthContext()
  const token = localStorage.getItem('token')

  const navigate = useNavigate()
  const fetchEmployees = useFetchEmployees(dispatch, token)

  const [isEditable, setIsEditable] = useState(false)
  const [editedUserData, setEditedUserData] = useState<TUser>({
    id: user.user?.id,
    userName: "",
    email: "",
    firstName: "",
    lastName: "",
    roles: [],
  })


  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const deleteUser = async (userId: string) => {
    const URL = process.env.REACT_APP_URL + `/api/users?id=${userId}`;
    try {
      await axios.delete(URL, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchEmployees();
    } catch (error) {
      console.error("Error deleting user:", error);
      throw new Error("Error in function: deleteUser");
    }
  };

  const updateUser = async (userId: string) => {
    const URL = process.env.REACT_APP_URL + `/api/users?id=${userId}`;
    try {
      await axios.put(URL, editedUserData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchEmployees();
    } catch (error) {
      console.error("Error deleting user:", error);
      throw new Error("Error in function: deleteUser");
    }
  }


  return (
    <>
      {state.isLoading && <div className="pt-48 flex justify-center w-full">
        <GridLoader />
      </div>}
      {state.error && <p>Error fetching data</p>}
      {!state.isLoading && !state.error && (
        <div className="w-full flex justify-center flex-col">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>firstName</TableHead>
                <TableHead>lastName</TableHead>
                <TableHead>userName</TableHead>
                <TableHead>email</TableHead>
                <TableHead>roles</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {state.data?.map((user: TUser) => (
                <TableRow key={user.id}>
                  {isEditable ? (<div className="flex gap-x-5">
                    <Input placeholder={user.firstName} />
                    <Input placeholder={user.lastName} />
                    <Input placeholder={user.userName} />
                    <Input placeholder={user.email} />
                    <Input placeholder={user.roles.join(" ")} />
                  </div>
                  ) :
                    (<>
                      <TableCell>{user.firstName}</TableCell>
                      <TableCell>{user.lastName}</TableCell>
                      <TableCell>{user.userName}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.roles}</TableCell>
                    </>)}

                  <TableCell>
                    <Button size="sm" variant="outline" onClick={() => setIsEditable(prev => !prev)}>
                      Edytuj
                    </Button>
                    {isEditable && <Button size="sm" variant="outline" onClick={() => updateUser(user.id)}>
                      Zapisz
                    </Button>}
                    <Button size="sm" variant="outline" onClick={() => deleteUser(user.id)}>
                      Usuń
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button variant={"outline"} className="mt-5" onClick={() => navigate('/admin/employees/adduser')}>Dodaj Użytkownika</Button>
        </div>
      )}
    </>
  );
}

import { Button } from "@/components/ui/button";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";
import useAuthContext from "@/context/AuthContext";
import axios from "axios";
import { Delete, Edit } from "lucide-react";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


type TUser = {
  id: string;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
}

export default function EmployeesManagment() {
  const [users, setUsers] = useState<TUser[] | undefined>([])
  const navigate = useNavigate()
  const { token } = useAuthContext()

  useEffect(() => {
    const fetchEmployees = async () => {
      const URL = process.env.REACT_APP_URL + "/api/users"
      try {
        const { data } = await axios.get(URL, {
          headers: {
            Authorization: `bearer ${token} `
          }
        })
        console.log(data);
        setUsers(data)
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
    fetchEmployees()
  }, [setUsers, token])

  return (
    <>
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
            {users?.map(users => (
              <TableRow key={users.id}>
                <TableCell>{users.firstName}</TableCell>
                <TableCell>{users.lastName}</TableCell>
                <TableCell>{users.userName}</TableCell>
                <TableCell>{users.email}</TableCell>
                <TableCell>{users.roles}</TableCell>
                <TableCell>
                  <Button size="sm" variant="outline">
                    <Edit />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Delete />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button variant={"outline"} className="mt-5" onClick={() => navigate('/admin/employees/adduser')}>Dodaj Użytkownika</Button>
      </div>
    </>
  );
}

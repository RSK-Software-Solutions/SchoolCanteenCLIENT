import { Button } from "@/components/ui/button";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";


type TUser = {
  userid: string;
  login: string;
  firstName: string;
  lastName: string;
  roles: string[];
}

export default function EmployeesManagment() {
  const [user, setUsers] = useState<TUser[] | undefined>([])

  //TODO GET COMPANYID 

  useEffect(() => {
    const fetchEmployees = async (CompanyID: string) => {
      const URL = process.env.REACT_APP_BASE_URL + `/api/User/GetAll?companyId=${CompanyID}`
      try {
        const { data } = await axios.get(URL)
        console.log(data);
        setUsers(data)
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
    //fetchEmployees(/* place for company id*/)
  })

  return (
    <>
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">userId</TableHead>
            <TableHead>login</TableHead>
            <TableHead>firstName</TableHead>
            <TableHead>lastName</TableHead>
            <TableHead>roles</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>

          {user?.map(users => (
            <TableRow>
              <TableCell className="font-medium">{users.userid}</TableCell>
              <TableCell>{users.firstName}</TableCell>
              <TableCell>{users.lastName}</TableCell>
              <TableCell>{users.login}</TableCell>
              <TableCell>{users.roles}</TableCell>
              <TableCell>
                <Button size="sm" variant="outline">
                  Edit
                </Button>
                <Button className="ml-2" size="sm" variant="outline">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}

        </TableBody>
      </Table>
    </>
  );
}

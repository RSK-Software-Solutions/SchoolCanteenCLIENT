import { Button } from "@/components/ui/button";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";
import fetchReducer, { initialState } from "@/reducer/reducerFetching";
import React, { useEffect, useReducer, useState } from "react";
import useFetchEmployees from "./api/fetchEmployees";
import { GridLoader } from "react-spinners";
import { Input } from "@/components/ui/input";
import { handleChangeInput } from "@/lib/handleChangeInput";
import useGetAllRoles from "./api/fetchRoles";
import { deleteUser } from "./api/deleteUser";
import { updateUser } from "./api/updateUser";
import { UserData } from "./static/TableHeadersData";
import NewEmployeesForm from "../addNewEmployees/NewEmployeesForm";

export type TEditedUserForm = {
  id: string | null;
  firstName: string;
  lastName: string;
  userName: string;
  street: string;
  postalCode: string;
  email: string;
  state: string;
  city: string;
  country: string;
  roles: string;
  [key: string]: string | null;
}

export type TNewUserForm = {
  userName: string;
  email: string;
  password: string;
  roleName: string;
}

export default function EmployeesManagment() {
  const [state, dispatch] = useReducer(fetchReducer, initialState);
  const token = localStorage.getItem('token');
  const [roles, setRoles] = useState<string[]>([]);
  const [toggleAddUser, setToggleAddUser] = useState<boolean>(false);

  const fetchEmployees = useFetchEmployees(dispatch, token);
  const getRoles = useGetAllRoles(token)
  const [isEditable, setIsEditable] = useState<string | null>("");

  const [editedUserData, setEditedUserData] = useState<TEditedUserForm>({
    id: isEditable,
    firstName: "",
    lastName: "",
    userName: "",
    street: "",
    postalCode: "",
    city: "",
    state: "",
    country: "",
    email: "",
    roles: "",
  });

  const [newUserForm, setNewUserForm] = useState<TNewUserForm>({
    userName: "",
    email: "",
    password: "",
    roleName: "User",
  });

  useEffect(() => {
    const setRolesFromApi = async () => {
      setRoles(await getRoles())
    }

    fetchEmployees();
    setRolesFromApi();
  }, [fetchEmployees, getRoles]);

  return (
    <>
      {state.isLoading && <div className=" flex justify-center w-full">
        <GridLoader />
      </div>}
      {state.error && <p>Error fetching data</p>}
      {!state.isLoading && !state.error && (
        <div className="w-full flex justify-center  flex-col mx-5">
          <div className="w-full flex justify-end pr-36 my-5">
            <Button variant="outline" className="w-fit " onClick={() => setToggleAddUser(prev => !prev)}>{toggleAddUser ? "Anuluj" : "Dodaj użytkownika"}</Button>
          </div>
          <Table className="w-full border">
            <TableHeader>
              <TableRow >
                {UserData.map(headers =>
                  <TableHead key={headers.key}>{headers.label}</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {state.data?.map((user: TEditedUserForm) => (
                <TableRow key={user.id}>
                  {isEditable === user.id ? (
                    <>
                      {
                        UserData.map(userForm => (
                          <TableCell key={userForm.label}>
                            {userForm.key === 'roles' ? (
                              // Display value without input for 'roles' and 'akcje'
                              <select
                                value={editedUserData.roles}
                                onChange={(e) =>
                                  setEditedUserData({
                                    ...editedUserData,
                                    id: user.id,
                                    roles: e.target.value,
                                  })}
                              >
                                {roles.map((role: undefined | any) => (
                                  <option key={role?.name} value={role?.name}>
                                    {role?.name}
                                  </option>
                                ))}
                              </select>
                            ) : userForm.key === "akcje" ? (<TableCell className="flex">
                              {isEditable && (
                                <Button size="sm" variant="outline" onClick={() => setIsEditable("")}>
                                  Anuluj
                                </Button>
                              )}
                              <Button size="sm" variant="outline" onClick={() => updateUser(token, fetchEmployees, editedUserData)}>
                                Zapisz
                              </Button>
                            </TableCell>) : (
                              <Input
                                className="m-0"
                                placeholder={user[userForm.key] as string}
                                onChange={(e) => handleChangeInput(setEditedUserData, e, userForm)}
                              />
                            )}
                          </TableCell>
                        ))
                      }
                    </>
                  ) : (
                    <>
                      <TableCell>{user.firstName}</TableCell>
                      <TableCell>{user.lastName}</TableCell>
                      <TableCell>{user.userName}</TableCell>
                      <TableCell>{user.street}</TableCell>
                      <TableCell>{user.postalCode}</TableCell>
                      <TableCell>{user.city}</TableCell>
                      <TableCell>{user.state}</TableCell>
                      <TableCell>{user.country}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.roles}</TableCell>
                      <TableCell className="flex">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setIsEditable(user.id)}
                        >
                          Edytuj
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => deleteUser(user.id, token, fetchEmployees)}>
                          Usuń
                        </Button>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Add User Form to refactor */}

          {toggleAddUser ? (<> <NewEmployeesForm setNewUserForm={setNewUserForm} newUserForm={newUserForm} roles={roles} token={token} fetchEmployees={fetchEmployees} />
          </>
          ) : (null)}

        </div >
      )
      }
    </>
  );
}
